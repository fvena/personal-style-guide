import { describe, expect, it } from 'vitest'
import { generateCI } from '../../cli/generators/ci.js'
import { generateEslint } from '../../cli/generators/eslint.js'
import { generateHusky } from '../../cli/generators/husky.js'
import { generateLintStaged } from '../../cli/generators/lint-staged.js'
import { generateScripts } from '../../cli/generators/scripts.js'
import { generateTypescript } from '../../cli/generators/typescript.js'

describe('kata init E2E — node + typescript + full protection', () => {
  const config = {
    language: 'typescript',
    projectType: 'node',
    testingTools: [],
    tools: ['eslint', 'prettier', 'stylelint', 'markdownlint', 'commitlint']
  }

  it('generates ESLint config with node preset', () => {
    const eslint = generateEslint(config)

    expect(eslint.path).toBe('eslint.config.js')
    expect(eslint.content).toContain("from '@franvena/kata/eslint/node'")
    expect(eslint.content).toContain('...eslintNode')
  })

  it('generates TypeScript config extending node', () => {
    const typescript = generateTypescript(config)

    expect(typescript.path).toBe('tsconfig.json')
    expect(typescript.content).toContain('@franvena/kata/typescript/node')
    expect(typescript.content).not.toContain('.vue')
  })

  it('generates scripts with lint, format, and typecheck', () => {
    const scripts = generateScripts({ ...config, hasHusky: true })

    expect(scripts.lint).toBe('eslint .')
    expect(scripts.typecheck).toBe('tsc --noEmit')
    expect(scripts.format).toBe('prettier --write .')
    expect(scripts['format:check']).toBe('prettier --check .')
    expect(scripts.prepare).toBe('husky')
  })

  it('generates lint-staged with TS extensions', () => {
    const lintStaged = generateLintStaged(config)

    expect(lintStaged['*.{js,ts}']).toBe('eslint --fix')
    expect(lintStaged['*']).toBe('prettier -w --ignore-unknown')
    expect(lintStaged['*.{css,scss}']).toBe('stylelint --fix')
    expect(lintStaged['*.md']).toBe('markdownlint-cli2')
  })

  it('generates 3 husky hooks with full enforcement', () => {
    const husky = generateHusky({
      commitlint: true,
      preCommit: true,
      prePush: true,
      prePushChecks: ['lint', 'typecheck', 'format-check']
    })

    expect(husky).toHaveLength(3)
    expect(husky.find(f => f.path === '.husky/pre-commit')).toBeTruthy()
    expect(husky.find(f => f.path === '.husky/commit-msg')).toBeTruthy()

    const prePush = husky.find(f => f.path === '.husky/pre-push')
    expect(prePush.content).toContain('npm run lint')
    expect(prePush.content).toContain('npm run typecheck')
    expect(prePush.content).toContain('npm run format:check')
  })

  it('generates CI workflows', () => {
    const ci = generateCI({
      ciPr: true,
      ciPush: true,
      language: 'typescript',
      packageManager: 'npm'
    })

    expect(ci).toHaveLength(2)
    expect(ci.find(f => f.path === '.github/workflows/quality.yml')).toBeTruthy()
    expect(ci.find(f => f.path === '.github/workflows/quality-pr.yml')).toBeTruthy()

    const pushWorkflow = ci.find(f => f.path === '.github/workflows/quality.yml')
    expect(pushWorkflow.content).toContain('npm run lint')
    expect(pushWorkflow.content).toContain('npm run typecheck')
  })
})

describe('kata init E2E — vue + typescript', () => {
  const config = {
    language: 'typescript',
    projectType: 'vue',
    testingTools: ['vitest'],
    tools: ['eslint', 'prettier', 'stylelint', 'markdownlint']
  }

  it('generates ESLint config with vue preset and vitest', () => {
    const eslint = generateEslint(config)

    expect(eslint.content).toContain("from '@franvena/kata/eslint/vue'")
    expect(eslint.content).toContain("from '@franvena/kata/eslint/vitest'")
    expect(eslint.content).toContain('...eslintVue')
    expect(eslint.content).toContain('...eslintVitest')
  })

  it('generates TypeScript config with Vue includes', () => {
    const typescript = generateTypescript(config)

    expect(typescript.content).toContain('@franvena/kata/typescript/browser')
    expect(typescript.content).toContain('src/**/*.vue')
  })

  it('generates lint-staged with vue extensions', () => {
    const lintStaged = generateLintStaged(config)

    expect(lintStaged['*.{js,ts,vue}']).toBe('eslint --fix')
    expect(lintStaged['*.{css,scss,vue}']).toBe('stylelint --fix')
  })

  it('generates scripts with css linting for vue', () => {
    const scripts = generateScripts({ ...config, hasHusky: false })

    expect(scripts['lint:css']).toContain('vue')
    expect(scripts.prepare).toBeUndefined()
  })
})

describe('kata init E2E — nuxt + typescript', () => {
  const config = {
    language: 'typescript',
    projectType: 'nuxt',
    testingTools: [],
    tools: ['eslint', 'prettier', 'stylelint']
  }

  it('generates ESLint config with nuxt preset', () => {
    const eslint = generateEslint(config)

    expect(eslint.content).toContain("from '@franvena/kata/eslint/nuxt'")
    expect(eslint.content).toContain('...eslintNuxt')
  })

  it('generates TypeScript config with browser + vue', () => {
    const typescript = generateTypescript(config)

    expect(typescript.content).toContain('@franvena/kata/typescript/browser')
    expect(typescript.content).toContain('src/**/*.vue')
  })

  it('generates lint-staged with vue extensions', () => {
    const lintStaged = generateLintStaged(config)

    expect(lintStaged['*.{js,ts,vue}']).toBe('eslint --fix')
    expect(lintStaged['*.{css,scss,vue}']).toBe('stylelint --fix')
  })
})

describe('kata init E2E — browser + typescript', () => {
  const config = {
    language: 'typescript',
    projectType: 'browser',
    testingTools: [],
    tools: ['eslint', 'prettier']
  }

  it('generates ESLint config with browser preset', () => {
    const eslint = generateEslint(config)

    expect(eslint.content).toContain("from '@franvena/kata/eslint/browser'")
    expect(eslint.content).toContain('...eslintBrowser')
  })

  it('generates TypeScript config with browser preset and vue includes', () => {
    const typescript = generateTypescript(config)

    expect(typescript.content).toContain('@franvena/kata/typescript/browser')
    expect(typescript.content).toContain('src/**/*.vue')
  })
})

describe('kata init E2E — javascript (no typescript)', () => {
  const config = {
    language: 'javascript',
    projectType: 'node',
    testingTools: [],
    tools: ['eslint', 'prettier']
  }

  it('generates composable ESLint config without TypeScript', () => {
    const eslint = generateEslint(config)

    expect(eslint.content).toContain('baseJavascript')
    expect(eslint.content).toContain('basePerfectionist')
    expect(eslint.content).toContain('baseUnicorn')
    expect(eslint.content).toContain('eslintConfigPrettier')
    expect(eslint.content).not.toContain('baseTypeScript')
  })

  it('does not generate typecheck script', () => {
    const scripts = generateScripts({ ...config, hasHusky: false })

    expect(scripts.typecheck).toBeUndefined()
    expect(scripts.lint).toBe('eslint .')
  })

  it('generates lint-staged with js-only extension', () => {
    const lintStaged = generateLintStaged(config)

    expect(lintStaged['*.js']).toBe('eslint --fix')
    expect(lintStaged['*.{js,ts}']).toBeUndefined()
  })
})

describe('kata init E2E — no enforcement', () => {
  it('generates no hooks when enforcement is empty', () => {
    const husky = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: false,
      prePushChecks: []
    })

    expect(husky).toHaveLength(0)
  })

  it('generates no prepare script without husky', () => {
    const scripts = generateScripts({
      hasHusky: false,
      language: 'typescript',
      projectType: 'node',
      tools: ['eslint', 'prettier']
    })

    expect(scripts.prepare).toBeUndefined()
  })

  it('generates no CI workflows when both disabled', () => {
    const ci = generateCI({
      ciPr: false,
      ciPush: false,
      language: 'typescript',
      packageManager: 'npm'
    })

    expect(ci).toHaveLength(0)
  })
})

describe('kata init E2E — pre-push with and without tests', () => {
  it('includes test in pre-push when selected', () => {
    const husky = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: true,
      prePushChecks: ['lint', 'typecheck', 'test']
    })

    const prePush = husky.find(f => f.path === '.husky/pre-push')
    expect(prePush.content).toContain('npm run test')
  })

  it('excludes test from pre-push when not selected', () => {
    const husky = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: true,
      prePushChecks: ['lint', 'typecheck']
    })

    const prePush = husky.find(f => f.path === '.husky/pre-push')
    expect(prePush.content).not.toContain('npm run test')
  })
})

describe('kata init E2E — CI without TypeScript', () => {
  it('generates CI workflow without typecheck step', () => {
    const ci = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'javascript',
      packageManager: 'npm'
    })

    const workflow = ci[0]
    expect(workflow.content).toContain('npm run lint')
    expect(workflow.content).not.toContain('npm run typecheck')
  })
})

describe('kata init E2E — testing tools combinations', () => {
  it('includes playwright and vitest together', () => {
    const eslint = generateEslint({
      language: 'typescript',
      projectType: 'node',
      testingTools: ['playwright', 'vitest']
    })

    expect(eslint.content).toContain("from '@franvena/kata/eslint/playwright'")
    expect(eslint.content).toContain("from '@franvena/kata/eslint/vitest'")
    expect(eslint.content).toContain('...eslintPlaywright')
    expect(eslint.content).toContain('...eslintVitest')
  })

  it('includes testing-library for vue projects', () => {
    const eslint = generateEslint({
      language: 'typescript',
      projectType: 'vue',
      testingTools: ['testing-library', 'vitest']
    })

    expect(eslint.content).toContain("from '@franvena/kata/eslint/testing-library'")
    expect(eslint.content).toContain("from '@franvena/kata/eslint/vitest'")
  })
})

describe('kata init E2E — package managers', () => {
  it('generates pnpm CI workflow', () => {
    const ci = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'typescript',
      packageManager: 'pnpm'
    })

    const workflow = ci[0]
    expect(workflow.content).toContain('cache: pnpm')
    expect(workflow.content).toContain('pnpm install --frozen-lockfile')
  })

  it('generates yarn CI workflow', () => {
    const ci = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'typescript',
      packageManager: 'yarn'
    })

    const workflow = ci[0]
    expect(workflow.content).toContain('cache: yarn')
    expect(workflow.content).toContain('yarn install --frozen-lockfile')
  })
})
