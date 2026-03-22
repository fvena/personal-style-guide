import { describe, expect, it } from 'vitest'
import { generateCI } from '../../../cli/generators/ci.js'

describe('generateCI', () => {
  it('generates push workflow with typescript', () => {
    const result = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'typescript',
      packageManager: 'npm'
    })

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('.github/workflows/quality.yml')
    expect(result[0].content).toContain('npm run lint')
    expect(result[0].content).toContain('npm run typecheck')
    expect(result[0].content).toContain('cache: npm')
  })

  it('generates push workflow without typecheck for javascript', () => {
    const result = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'javascript',
      packageManager: 'npm'
    })

    expect(result[0].content).toContain('npm run lint')
    expect(result[0].content).not.toContain('npm run typecheck')
  })

  it('generates PR workflow with tests', () => {
    const result = generateCI({
      ciPr: true,
      ciPush: false,
      language: 'typescript',
      packageManager: 'npm'
    })

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('.github/workflows/quality-pr.yml')
    expect(result[0].content).toContain('npm run lint')
    expect(result[0].content).toContain('npm run typecheck')
    expect(result[0].content).toContain('npm test')
  })

  it('generates both workflows', () => {
    const result = generateCI({
      ciPr: true,
      ciPush: true,
      language: 'typescript',
      packageManager: 'npm'
    })

    expect(result).toHaveLength(2)
    expect(result[0].path).toBe('.github/workflows/quality.yml')
    expect(result[1].path).toBe('.github/workflows/quality-pr.yml')
  })

  it('generates no workflows when both disabled', () => {
    const result = generateCI({
      ciPr: false,
      ciPush: false,
      language: 'typescript',
      packageManager: 'npm'
    })

    expect(result).toHaveLength(0)
  })

  it('uses pnpm package manager config', () => {
    const result = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'typescript',
      packageManager: 'pnpm'
    })

    expect(result[0].content).toContain('cache: pnpm')
    expect(result[0].content).toContain('pnpm install --frozen-lockfile')
  })

  it('uses yarn package manager config', () => {
    const result = generateCI({
      ciPr: false,
      ciPush: true,
      language: 'typescript',
      packageManager: 'yarn'
    })

    expect(result[0].content).toContain('cache: yarn')
    expect(result[0].content).toContain('yarn install --frozen-lockfile')
  })
})
