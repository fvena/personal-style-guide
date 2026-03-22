import { describe, expect, it } from 'vitest'
import { generateScripts } from '../../../cli/generators/scripts.js'

describe('generateScripts', () => {
  it('generates all scripts for full typescript setup', () => {
    const result = generateScripts({
      hasHusky: true,
      language: 'typescript',
      projectType: 'node',
      tools: ['eslint', 'prettier', 'stylelint', 'markdownlint']
    })

    expect(result.lint).toBe('eslint .')
    expect(result['lint:fix']).toBe('eslint . --fix')
    expect(result.format).toBe('prettier --write .')
    expect(result['format:check']).toBe('prettier --check .')
    expect(result.typecheck).toBe('tsc --noEmit')
    expect(result['lint:css']).toContain('stylelint')
    expect(result['lint:md']).toContain('markdownlint-cli2')
    expect(result.prepare).toBe('husky')
  })

  it('omits typecheck for javascript', () => {
    const result = generateScripts({
      hasHusky: false,
      language: 'javascript',
      projectType: 'node',
      tools: ['eslint']
    })

    expect(result.lint).toBe('eslint .')
    expect(result.typecheck).toBeUndefined()
    expect(result.prepare).toBeUndefined()
  })

  it('includes vue extensions in stylelint for vue project', () => {
    const result = generateScripts({
      hasHusky: false,
      language: 'typescript',
      projectType: 'vue',
      tools: ['eslint', 'stylelint']
    })

    expect(result['lint:css']).toContain('*.{scss,css,vue}')
  })

  it('uses node extensions in stylelint for node project', () => {
    const result = generateScripts({
      hasHusky: false,
      language: 'typescript',
      projectType: 'node',
      tools: ['eslint', 'stylelint']
    })

    expect(result['lint:css']).toContain('*.{scss,css}')
    expect(result['lint:css']).not.toContain('vue')
  })

  it('prefixes lint scripts with oxlint when selected', () => {
    const result = generateScripts({
      hasHusky: false,
      language: 'typescript',
      projectType: 'node',
      tools: ['eslint', 'oxlint']
    })

    expect(result.lint).toBe('oxlint && eslint .')
    expect(result['lint:fix']).toBe('oxlint && eslint . --fix')
  })

  it('only includes scripts for selected tools', () => {
    const result = generateScripts({
      hasHusky: false,
      language: 'typescript',
      projectType: 'node',
      tools: ['eslint']
    })

    expect(result.lint).toBeDefined()
    expect(result.format).toBeUndefined()
    expect(result['lint:css']).toBeUndefined()
    expect(result['lint:md']).toBeUndefined()
  })
})
