import { describe, expect, it } from 'vitest'
import { generateStylelint } from '../../../cli/generators/stylelint.js'

describe('generateStylelint', () => {
  it('generates stylelint config', () => {
    const result = generateStylelint()

    expect(result.path).toBe('stylelint.config.js')
    expect(result.content).toContain("extends: ['@franvena/kata/stylelint']")
  })
})
