import { describe, expect, it } from 'vitest'
import { generateHusky } from '../../../cli/generators/husky.js'

describe('generateHusky', () => {
  it('generates pre-commit hook', () => {
    const result = generateHusky({
      commitlint: false,
      preCommit: true,
      prePush: false
    })

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('.husky/pre-commit')
    expect(result[0].content).toContain('npx lint-staged')
  })

  it('generates commit-msg hook for commitlint', () => {
    const result = generateHusky({
      commitlint: true,
      preCommit: false,
      prePush: false
    })

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('.husky/commit-msg')
    expect(result[0].content).toContain('commitlint --edit')
  })

  it('generates pre-push hook with selected checks', () => {
    const result = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: true,
      prePushChecks: ['lint', 'typecheck', 'format-check']
    })

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('.husky/pre-push')
    expect(result[0].content).toContain('npm run lint')
    expect(result[0].content).toContain('npm run typecheck')
    expect(result[0].content).toContain('npm run format:check')
  })

  it('maintains correct order in pre-push hooks', () => {
    const result = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: true,
      prePushChecks: ['test', 'lint', 'format-check', 'typecheck']
    })

    const content = result[0].content
    const lintIndex = content.indexOf('npm run lint')
    const typecheckIndex = content.indexOf('npm run typecheck')
    const formatIndex = content.indexOf('npm run format:check')
    const testIndex = content.indexOf('npm run test')

    expect(lintIndex).toBeLessThan(typecheckIndex)
    expect(typecheckIndex).toBeLessThan(formatIndex)
    expect(formatIndex).toBeLessThan(testIndex)
  })

  it('generates all hooks together', () => {
    const result = generateHusky({
      commitlint: true,
      preCommit: true,
      prePush: true,
      prePushChecks: ['lint']
    })

    expect(result).toHaveLength(3)
    expect(result.map(f => f.path)).toEqual([
      '.husky/pre-commit',
      '.husky/commit-msg',
      '.husky/pre-push'
    ])
  })

  it('returns empty array when no hooks needed', () => {
    const result = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: false
    })

    expect(result).toHaveLength(0)
  })

  it('skips pre-push when no checks selected', () => {
    const result = generateHusky({
      commitlint: false,
      preCommit: false,
      prePush: true,
      prePushChecks: []
    })

    expect(result).toHaveLength(0)
  })
})
