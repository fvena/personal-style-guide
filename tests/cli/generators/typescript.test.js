import { describe, expect, it } from 'vitest'
import { generateTypescript } from '../../../cli/generators/typescript.js'

describe('generateTypescript', () => {
  it('generates node tsconfig', () => {
    const result = generateTypescript({ projectType: 'node' })

    expect(result.path).toBe('tsconfig.json')
    const parsed = JSON.parse(result.content)
    expect(parsed.extends).toBe('@franvena/kata/typescript/node')
    expect(parsed.include).toContain('src/**/*.ts')
    expect(parsed.include).not.toContain('src/**/*.vue')
  })

  it('generates browser tsconfig with DOM libs', () => {
    const result = generateTypescript({ projectType: 'browser' })

    const parsed = JSON.parse(result.content)
    expect(parsed.extends).toBe('@franvena/kata/typescript/browser')
    expect(parsed.include).toContain('src/**/*.ts')
    expect(parsed.include).toContain('src/**/*.vue')
  })

  it('generates vue tsconfig with vue files', () => {
    const result = generateTypescript({ projectType: 'vue' })

    const parsed = JSON.parse(result.content)
    expect(parsed.extends).toBe('@franvena/kata/typescript/browser')
    expect(parsed.include).toContain('src/**/*.ts')
    expect(parsed.include).toContain('src/**/*.vue')
  })

  it('generates nuxt tsconfig with vue files', () => {
    const result = generateTypescript({ projectType: 'nuxt' })

    const parsed = JSON.parse(result.content)
    expect(parsed.extends).toBe('@franvena/kata/typescript/browser')
    expect(parsed.include).toContain('src/**/*.vue')
    expect(parsed.include).toContain('*.config.ts')
  })
})
