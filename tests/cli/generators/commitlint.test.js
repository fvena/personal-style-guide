import { describe, expect, it } from 'vitest'
import { generateCommitlint } from '../../../cli/generators/commitlint.js'

describe('generateCommitlint', () => {
  it('generates commitlint config', () => {
    const result = generateCommitlint()

    expect(result.path).toBe('commitlint.config.js')
    expect(result.content).toContain("extends: ['@commitlint/config-conventional']")
  })
})
