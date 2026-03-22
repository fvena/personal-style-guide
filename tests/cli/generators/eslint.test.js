import { describe, expect, it } from 'vitest'
import { generateEslint } from '../../../cli/generators/eslint.js'

describe('generateEslint', () => {
  it('generates node + typescript config', () => {
    const result = generateEslint({
      language: 'typescript',
      projectType: 'node',
      testingTools: []
    })

    expect(result.path).toBe('eslint.config.js')
    expect(result.content).toContain("from '@franvena/kata/eslint/node'")
    expect(result.content).toContain('export default [...eslintNode]')
  })

  it('generates browser + typescript config', () => {
    const result = generateEslint({
      language: 'typescript',
      projectType: 'browser',
      testingTools: []
    })

    expect(result.content).toContain("from '@franvena/kata/eslint/browser'")
    expect(result.content).toContain('...eslintBrowser')
  })

  it('generates vue + typescript config', () => {
    const result = generateEslint({
      language: 'typescript',
      projectType: 'vue',
      testingTools: []
    })

    expect(result.content).toContain("from '@franvena/kata/eslint/vue'")
    expect(result.content).toContain('...eslintVue')
  })

  it('generates nuxt + typescript config', () => {
    const result = generateEslint({
      language: 'typescript',
      projectType: 'nuxt',
      testingTools: []
    })

    expect(result.content).toContain("from '@franvena/kata/eslint/nuxt'")
    expect(result.content).toContain('...eslintNuxt')
  })

  it('generates nuxt + typescript + vitest config', () => {
    const result = generateEslint({
      language: 'typescript',
      projectType: 'nuxt',
      testingTools: ['vitest']
    })

    expect(result.content).toContain("from '@franvena/kata/eslint/nuxt'")
    expect(result.content).toContain("from '@franvena/kata/eslint/vitest'")
    expect(result.content).toContain('...eslintNuxt, ...eslintVitest')
  })

  it('generates config with multiple testing tools sorted by import path', () => {
    const result = generateEslint({
      language: 'typescript',
      projectType: 'node',
      testingTools: ['vitest', 'playwright', 'testing-library']
    })

    expect(result.content).toContain("from '@franvena/kata/eslint/playwright'")
    expect(result.content).toContain("from '@franvena/kata/eslint/testing-library'")
    expect(result.content).toContain("from '@franvena/kata/eslint/vitest'")

    const nodeImportIndex = result.content.indexOf('@franvena/kata/eslint/node')
    const playwrightIndex = result.content.indexOf('@franvena/kata/eslint/playwright')
    expect(nodeImportIndex).toBeLessThan(playwrightIndex)
  })

  it('generates javascript config without type-aware blocks', () => {
    const result = generateEslint({
      language: 'javascript',
      projectType: 'node',
      testingTools: []
    })

    expect(result.content).not.toContain('eslint/node')
    expect(result.content).toContain('baseJavascript')
    expect(result.content).toContain('baseUnicorn')
    expect(result.content).toContain('baseRegexp')
    expect(result.content).toContain('baseComments')
    expect(result.content).toContain('basePerfectionist')
    expect(result.content).toContain('eslintConfigPrettier')
    expect(result.content).not.toContain('baseTypeScript')
  })

  it('generates javascript config with testing tools', () => {
    const result = generateEslint({
      language: 'javascript',
      projectType: 'node',
      testingTools: ['vitest']
    })

    expect(result.content).toContain('baseJavascript')
    expect(result.content).toContain("from '@franvena/kata/eslint/vitest'")
    expect(result.content).toContain('...eslintVitest')
  })
})
