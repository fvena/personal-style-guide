import { describe, expect, it } from 'vitest'
import { generateMarkdownlint } from '../../../cli/generators/markdownlint.js'

describe('generateMarkdownlint', () => {
  it('generates markdownlint config', () => {
    const result = generateMarkdownlint()

    expect(result.path).toBe('.markdownlint.jsonc')
    expect(result.content).toContain('"extends": "@franvena/kata/markdown"')
  })
})
