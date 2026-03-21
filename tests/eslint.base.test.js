import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import {
  baseComments,
  baseIgnores,
  baseJavascript,
  baseMarkdown,
  basePerfectionist,
  baseRegexp,
  baseTsdoc,
  baseTypeScript,
  baseUnicorn,
  baseYaml
} from '../eslint/base.js'

describe('eslint/base composable blocks', () => {
  it('each block exports a non-empty array', () => {
    expect(Array.isArray(baseIgnores)).toBe(true)
    expect(baseIgnores.length).toBeGreaterThan(0)

    expect(Array.isArray(baseJavascript)).toBe(true)
    expect(baseJavascript.length).toBeGreaterThan(0)

    expect(Array.isArray(baseTypeScript)).toBe(true)
    expect(baseTypeScript.length).toBeGreaterThan(0)

    expect(Array.isArray(basePerfectionist)).toBe(true)
    expect(basePerfectionist.length).toBeGreaterThan(0)

    expect(Array.isArray(baseUnicorn)).toBe(true)
    expect(baseUnicorn.length).toBeGreaterThan(0)

    expect(Array.isArray(baseRegexp)).toBe(true)
    expect(baseRegexp.length).toBeGreaterThan(0)

    expect(Array.isArray(baseComments)).toBe(true)
    expect(baseComments.length).toBeGreaterThan(0)

    expect(Array.isArray(baseTsdoc)).toBe(true)
    expect(baseTsdoc.length).toBeGreaterThan(0)

    expect(Array.isArray(baseYaml)).toBe(true)
    expect(baseYaml.length).toBeGreaterThan(0)

    expect(Array.isArray(baseMarkdown)).toBe(true)
    expect(baseMarkdown.length).toBeGreaterThan(0)
  })

  it('baseTypeScript rules are active when composed with baseJavascript', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseTypeScript],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('virtual.ts')
    const rules = Object.keys(config.rules ?? {})
    expect(rules.some(r => r.startsWith('@typescript-eslint/'))).toBe(true)
    expect(rules.some(r => r.startsWith('n/'))).toBe(true)
  })

  it('basePerfectionist rules are absent when not composed', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('virtual.ts')
    const rules = Object.keys(config.rules ?? {})
    expect(rules.some(r => r.startsWith('perfectionist/'))).toBe(false)
  })

  it('baseUnicorn disables no-null by default', async () => {
    const eslint = new ESLint({
      overrideConfig: [...baseIgnores, ...baseJavascript, ...baseUnicorn],
      overrideConfigFile: true
    })
    const config = await eslint.calculateConfigForFile('virtual.ts')
    expect(config.rules?.['unicorn/no-null']).toEqual(['off'])
  })
})
