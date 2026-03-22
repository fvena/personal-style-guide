import { describe, expect, it } from 'vitest'
import { generatePrettier } from '../../../cli/generators/prettier.js'

describe('generatePrettier', () => {
  it('generates prettier config', () => {
    const result = generatePrettier()

    expect(result.path).toBe('prettier.config.js')
    expect(result.content).toContain("export { default } from '@franvena/kata/prettier'")
  })
})
