import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import {
  baseComments,
  baseIgnores,
  baseJavascript,
  baseMarkdown,
  baseOxlint,
  basePerfectionist,
  baseRegexp,
  baseTsdoc,
  baseTypeScript,
  baseUnicorn,
  baseYaml
} from '../eslint/base.js'

describe('eslint/base composable blocks — composition behavior', () => {
  it('baseIgnores excludes node_modules and dist', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores],
      overrideConfigFile: true
    })
    expect(await eslint.isPathIgnored('node_modules/lodash/index.js')).toBe(true)
    expect(await eslint.isPathIgnored('dist/bundle.js')).toBe(true)
  })

  it('baseJavascript includes core rules', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.js')
    expect(config.rules?.['eqeqeq']).toBeDefined()
    expect(config.rules?.['no-await-in-loop']).toBeDefined()
  })

  it('baseTypeScript includes @typescript-eslint rules when composed with baseJavascript', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseTypeScript],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.ts')
    expect(config.rules?.['@typescript-eslint/no-explicit-any']).toBeDefined()
    expect(config.rules?.['@typescript-eslint/no-floating-promises']).toBeDefined()
  })

  it('basePerfectionist includes import sorting rule', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...basePerfectionist],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.js')
    expect(config.rules?.['perfectionist/sort-imports']).toBeDefined()
  })

  it('baseUnicorn includes unicorn rules', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseUnicorn],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.js')
    expect(config.rules?.['unicorn/prefer-node-protocol']).toBeDefined()
  })

  it('baseComments includes eslint-comments rules', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseComments],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.js')
    expect(config.rules?.['@eslint-community/eslint-comments/no-unlimited-disable']).toBeDefined()
  })

  it('baseRegexp includes regexp rules', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseRegexp],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.js')
    expect(config.rules?.['regexp/no-dupe-characters-character-class']).toBeDefined()
  })

  it('baseTsdoc includes tsdoc rule', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseTsdoc],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.ts')
    expect(config.rules?.['tsdoc/syntax']).toBeDefined()
  })

  it('blocks compose without conflict — full stack', async () => {
    const eslint = new ESLint({
      overrideConfig: [
        ...baseIgnores,
        ...baseJavascript,
        ...baseTypeScript,
        ...basePerfectionist,
        ...baseUnicorn,
        ...baseComments,
        ...baseRegexp
      ],
      overrideConfigFile: true
    })
    // Should not throw — all blocks compose cleanly
    await expect(eslint.calculateConfigForFile('src/index.ts')).resolves.toBeDefined()
  })

  it('baseYaml applies yml rules and scopes parser to yaml files', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseYaml],
      overrideConfigFile: true
    })
    const jsConfig = await eslint.calculateConfigForFile('src/index.js')
    const yamlConfig = await eslint.calculateConfigForFile('.github/workflows/ci.yml')
    // yml rules should appear in yaml config
    const yamlYmlRules = Object.keys(yamlConfig.rules ?? {}).filter(r => r.startsWith('yml/'))
    expect(yamlYmlRules.length).toBeGreaterThan(0)
    // yaml files get a different parser than JS files
    const jsParserName =
      jsConfig.languageOptions?.parser?.name ?? jsConfig.languageOptions?.parser?.meta?.name
    const yamlParserName =
      yamlConfig.languageOptions?.parser?.name ?? yamlConfig.languageOptions?.parser?.meta?.name
    expect(yamlParserName).not.toBe(jsParserName)
  })

  it('baseOxlint composes without conflict and disables covered rules', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseOxlint],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('src/index.js')
    // baseOxlint should disable rules that oxlint covers (e.g. constructor-super)
    const rule = config.rules?.['constructor-super']
    expect(rule).toBeDefined()
    expect(rule[0]).toBe(0)
  })

  it('baseMarkdown scopes rules to markdown files only', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseMarkdown],
      overrideConfigFile: true
    })
    const jsConfig = await eslint.calculateConfigForFile('src/index.js')
    const mdConfig = await eslint.calculateConfigForFile('README.md')
    // markdown rules should not bleed into JS files
    const jsMdRules = Object.keys(jsConfig.rules ?? {}).filter(r => r.startsWith('markdown/'))
    expect(jsMdRules).toHaveLength(0)
    // markdown processor should be active for .md files
    expect(mdConfig.processor).toBeDefined()
  })
})
