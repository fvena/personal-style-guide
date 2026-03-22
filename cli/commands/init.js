import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { generateCI } from '../generators/ci.js'
import { generateCommitlint } from '../generators/commitlint.js'
import { generateEslint } from '../generators/eslint.js'
import { generateHusky } from '../generators/husky.js'
import { generateLintStaged } from '../generators/lint-staged.js'
import { generateMarkdownlint } from '../generators/markdownlint.js'
import { generatePrettier } from '../generators/prettier.js'
import { generateScripts } from '../generators/scripts.js'
import { generateStylelint } from '../generators/stylelint.js'
import { generateTypescript } from '../generators/typescript.js'
import { confirm, groupMultiselect, multiselect, select, spinner } from '../prompts.js'
import {
  backupFile,
  detectPackageManager,
  exec,
  fileExists,
  GREEN,
  NC,
  printError,
  printHeader,
  printInfo,
  printWarning,
  readPackageJson,
  writeFile,
  writePackageJson
} from '../utilities.js'

export async function init() {
  const version = await getKataVersion()
  printHeader(version)

  if (!(await fileExists('package.json'))) {
    printError('No package.json found. Run npm init first.')
    // eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit -- CLI requires explicit exit when no package.json found
    process.exit(1)
  }

  await checkMonorepo()

  const pm = detectPackageManager()

  // --- PROMPTS ---

  const projectType = await select('What type of project?', [
    { label: 'Node.js (server)', value: 'node' },
    { label: 'Node.js (browser / library)', value: 'browser' },
    { label: 'Vue 3', value: 'vue' },
    { label: 'Nuxt 3', value: 'nuxt' }
  ])

  const language = await select('Language?', [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' }
  ])

  const tools = await groupMultiselect(
    'Which tools do you want?',
    {
      Quality: [
        { fixed: true, label: 'ESLint', value: 'eslint' },
        { label: 'Prettier', value: 'prettier' },
        { label: 'Stylelint', value: 'stylelint' },
        { label: 'Markdownlint', value: 'markdownlint' },
        { label: 'Commitlint', value: 'commitlint' }
      ],
      Testing: [
        { label: 'Vitest', value: 'vitest' },
        { label: 'Playwright', value: 'playwright' },
        { label: 'Testing Library', value: 'testing-library' }
      ]
    },
    { defaults: ['eslint', 'prettier', 'stylelint', 'markdownlint', 'commitlint'] }
  )

  const testingTools = tools.filter(t => ['playwright', 'testing-library', 'vitest'].includes(t))

  const enforcement = await multiselect(
    'Which enforcement gates?',
    [
      { hint: 'lint-staged on staged files', label: 'Pre-commit', value: 'pre-commit' },
      { hint: 'checks before push', label: 'Pre-push', value: 'pre-push' },
      { hint: 'GitHub Actions', label: 'CI push workflow', value: 'ci-push' },
      { hint: 'blocks merge', label: 'CI PR workflow', value: 'ci-pr' }
    ],
    { defaults: ['pre-commit', 'pre-push', 'ci-push', 'ci-pr'] }
  )

  let prePushChecks = []
  if (enforcement.includes('pre-push')) {
    const options = [{ label: 'Lint', value: 'lint' }]
    if (language === 'typescript') options.push({ label: 'Typecheck', value: 'typecheck' })
    options.push(
      { label: 'Format check', value: 'format-check' },
      { label: 'Tests', value: 'test' }
    )

    prePushChecks = await multiselect('What should run on pre-push?', options, {
      defaults: options.filter(o => o.value !== 'test').map(o => o.value)
    })
  }

  // --- BUILD FILE LIST ---

  const hasPreCommit = enforcement.includes('pre-commit')
  const hasPrePush = enforcement.includes('pre-push')
  const hasCommitlint = tools.includes('commitlint')
  const needsHusky = hasPreCommit || hasPrePush || hasCommitlint

  const config = {
    enforcement,
    hasHusky: needsHusky,
    language,
    packageManager: pm.name,
    prePushChecks,
    projectType,
    testingTools,
    tools
  }

  const allFiles = buildFileList(config)

  // --- CONFLICT RESOLUTION ---

  const tsconfigSkipped = language === 'typescript' && (await fileExists('tsconfig.json'))
  if (tsconfigSkipped) {
    printInfo('tsconfig.json exists — skipped.')
  }

  const filesToCheck = allFiles.filter(f => f.path !== 'tsconfig.json')
  const existingFiles = await Promise.all(
    filesToCheck.map(async f => ((await fileExists(f.path)) ? f.path : null))
  ).then(results => results.filter(Boolean))

  let conflictStrategy = 'replace'
  if (existingFiles.length > 0) {
    printWarning(`These files already exist: ${existingFiles.join(', ')}`)
    conflictStrategy = await select('How do you want to handle them?', [
      { label: 'Back up and replace (.bak)', value: 'replace' },
      { label: 'Skip existing files', value: 'skip' }
    ])
  }

  // --- INSTALL ---

  const installDeps = await confirm('Install dependencies?')

  // --- EXECUTION ---

  const packages = buildPackageList(config)

  if (installDeps) {
    const s = spinner()
    s.start(`Installing ${packages.length} packages`)
    const toInstall = await filterInstalledPackages(packages)
    if (toInstall.length > 0) {
      await exec(`${pm.add} ${toInstall.join(' ')}`)
    }
    s.stop(`Installed ${packages.length} packages`)
  } else {
    printInfo('Run this command to install manually:')
    console.log(`  ${pm.add} ${packages.join(' ')}`)
  }

  // --- GENERATE FILES ---

  const generated = await generateFiles(allFiles, conflictStrategy)

  // --- UPDATE PACKAGE.JSON ---

  const packageData = await readPackageJson()
  const scripts = generateScripts(config)
  packageData.scripts = { ...packageData.scripts, ...scripts }

  if (hasPreCommit) {
    packageData['lint-staged'] = generateLintStaged(config)
  }

  await writePackageJson(packageData)

  // --- INIT HUSKY ---

  if (needsHusky) {
    if (!(await fileExists('.git'))) {
      printInfo('No .git found. Hooks will activate after git init.')
    }
    try {
      await exec('npx husky init')
    } catch {
      printWarning('Could not initialize husky. Run npx husky init manually.')
    }
  }

  // --- SUMMARY ---

  const scriptsAdded = Object.keys(scripts)
  console.log()
  console.log(
    `  ${GREEN}✓${NC} Created ${generated.length} files, added ${scriptsAdded.length} scripts`
  )
  console.log()
  console.log('    Files:')
  for (const f of generated) console.log(`      ${f}`)
  console.log()
  console.log('    Scripts:')
  console.log(`      ${scriptsAdded.join(', ')}`)
  console.log()
  console.log('  Next → npm run lint')
  console.log()
}

/* eslint-disable no-await-in-loop -- Files must be written sequentially to handle backup/skip logic */
async function generateFiles(allFiles, conflictStrategy) {
  const generated = []

  for (const file of allFiles) {
    if (file.path === 'tsconfig.json' && (await fileExists('tsconfig.json'))) continue

    const exists = await fileExists(file.path)
    if (exists) {
      if (conflictStrategy === 'skip') continue
      await backupFile(file.path)
    }

    await writeFile(file.path, file.content)
    generated.push(file.path)
  }

  return generated
}
/* eslint-enable no-await-in-loop */

function buildFileList(config) {
  const { enforcement, language, projectType, testingTools, tools } = config

  const hasPreCommit = enforcement.includes('pre-commit')
  const hasPrePush = enforcement.includes('pre-push')
  const hasCommitlint = tools.includes('commitlint')

  const files = [generateEslint({ language, projectType, testingTools })]

  if (tools.includes('prettier')) files.push(generatePrettier())
  if (tools.includes('stylelint')) files.push(generateStylelint())
  if (tools.includes('markdownlint')) files.push(generateMarkdownlint())
  if (tools.includes('commitlint')) files.push(generateCommitlint())

  if (language === 'typescript') {
    files.push(generateTypescript({ projectType }))
  }

  files.push(
    ...generateHusky({
      commitlint: hasCommitlint,
      preCommit: hasPreCommit,
      prePush: hasPrePush,
      prePushChecks: config.prePushChecks
    }),
    ...generateCI({
      ciPr: enforcement.includes('ci-pr'),
      ciPush: enforcement.includes('ci-push'),
      language,
      packageManager: config.packageManager
    })
  )

  return files
}

function buildPackageList(config) {
  const { enforcement, language, tools } = config
  const packages = ['@franvena/kata', 'eslint']

  if (language === 'typescript') packages.push('typescript')
  if (tools.includes('prettier')) packages.push('prettier')
  if (tools.includes('stylelint')) packages.push('stylelint')
  if (tools.includes('markdownlint')) packages.push('markdownlint-cli2')

  if (tools.includes('commitlint')) {
    packages.push('@commitlint/cli', '@commitlint/config-conventional')
  }

  if (tools.includes('vitest')) packages.push('@vitest/eslint-plugin')
  if (tools.includes('playwright')) packages.push('eslint-plugin-playwright')
  if (tools.includes('testing-library')) packages.push('eslint-plugin-testing-library')

  const hasPreCommit = enforcement.includes('pre-commit')
  const hasPrePush = enforcement.includes('pre-push')
  const hasCommitlint = tools.includes('commitlint')

  if (hasPreCommit) {
    packages.push('husky', 'lint-staged')
  } else if (hasPrePush || hasCommitlint) {
    packages.push('husky')
  }

  return [...new Set(packages)]
}

async function filterInstalledPackages(packages) {
  try {
    const packageData = await readPackageJson()
    const installed = {
      ...packageData.dependencies,
      ...packageData.devDependencies
    }
    return packages.filter(p => !installed[p])
  } catch {
    return packages
  }
}

async function getKataVersion() {
  try {
    const packagePath = path.resolve(import.meta.dirname, '..', 'package.json')
    const content = await readFile(packagePath, 'utf8')
    return JSON.parse(content).version
  } catch {
    return 'unknown'
  }
}

async function checkMonorepo() {
  try {
    const packageData = await readPackageJson()
    const hasPnpmWorkspace = await fileExists('pnpm-workspace.yaml')

    if (packageData.workspaces || hasPnpmWorkspace) {
      printInfo(
        'Workspace detected. Consider running kata init inside each package, not at the root.'
      )
      const shouldContinue = await confirm('Continue in this directory?')
      if (!shouldContinue) {
        // eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit -- CLI allows user to abort monorepo setup
        process.exit(0)
      }
    }
  } catch {
    // ignore
  }
}
