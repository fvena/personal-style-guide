export function generateEslint(config) {
  const { hasOxlint = false, language, projectType, testingTools = [] } = config

  return language === 'javascript'
    ? generateJavascriptEslint(testingTools, hasOxlint)
    : generateTypescriptEslint(projectType, testingTools, hasOxlint)
}

function generateTypescriptEslint(projectType, testingTools, hasOxlint) {
  const presetMap = {
    browser: { import: 'eslintBrowser', path: '@franvena/kata/eslint/browser' },
    node: { import: 'eslintNode', path: '@franvena/kata/eslint/node' },
    nuxt: { import: 'eslintNuxt', path: '@franvena/kata/eslint/nuxt' },
    vue: { import: 'eslintVue', path: '@franvena/kata/eslint/vue' }
  }

  const preset = presetMap[projectType]
  const imports = [{ name: preset.import, path: preset.path }]
  const spreads = [preset.import]

  if (hasOxlint) {
    imports.push({ name: '{ baseOxlint }', path: '@franvena/kata/eslint/base' })
    spreads.push('baseOxlint')
  }

  for (const tool of sortTestingTools(testingTools)) {
    const toolImport = testingToolImport(tool)
    imports.push(toolImport)
    spreads.push(toolImport.name)
  }

  imports.sort((a, b) => a.path.localeCompare(b.path))

  const importLines = imports.map(item => `import ${item.name} from '${item.path}'`).join('\n')
  const spreadLine = spreads.map(s => `...${s}`).join(', ')

  return {
    content: `${importLines}\n\nexport default [${spreadLine}]\n`,
    path: 'eslint.config.js'
  }
}

function generateJavascriptEslint(testingTools, hasOxlint) {
  const baseExports = [
    'baseComments',
    'baseIgnores',
    'baseJavascript',
    ...(hasOxlint ? ['baseOxlint'] : []),
    'basePerfectionist',
    'baseRegexp',
    'baseUnicorn'
  ]
  const baseImport = `{\n  ${baseExports.join(',\n  ')}\n}`
  const spreads = [
    'baseIgnores',
    'baseJavascript',
    'basePerfectionist',
    'baseUnicorn',
    'baseRegexp',
    'baseComments',
    ...(hasOxlint ? ['baseOxlint'] : []),
    'eslintConfigPrettier'
  ]

  const testingImports = []
  for (const tool of sortTestingTools(testingTools)) {
    const toolImport = testingToolImport(tool)
    testingImports.push(toolImport)
    spreads.push(toolImport.name)
  }

  testingImports.sort((a, b) => a.path.localeCompare(b.path))

  let importLines = `import ${baseImport} from '@franvena/kata/eslint/base'\n`
  importLines += `import eslintConfigPrettier from 'eslint-config-prettier'\n`
  for (const testingImport of testingImports) {
    importLines += `import ${testingImport.name} from '${testingImport.path}'\n`
  }

  const spreadLine = spreads.map(s => `...${s}`).join(', ')

  return {
    content: `${importLines}\nexport default [${spreadLine}]\n`,
    path: 'eslint.config.js'
  }
}

function testingToolImport(tool) {
  const map = {
    playwright: { name: 'eslintPlaywright', path: '@franvena/kata/eslint/playwright' },
    'testing-library': {
      name: 'eslintTestingLibrary',
      path: '@franvena/kata/eslint/testing-library'
    },
    vitest: { name: 'eslintVitest', path: '@franvena/kata/eslint/vitest' }
  }
  return map[tool]
}

function sortTestingTools(tools) {
  const order = ['playwright', 'testing-library', 'vitest']
  return [...tools].toSorted((a, b) => order.indexOf(a) - order.indexOf(b))
}
