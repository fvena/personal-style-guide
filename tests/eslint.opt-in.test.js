import { describe, expect, it } from 'vitest'
import { createESLint, findRule, lintFixture } from './helpers.js'

describe('eslint/playwright config', () => {
  it('loads without errors', async () => {
    const eslint = createESLint('playwright.js')
    await expect(eslint.calculateConfigForFile('e2e/login.spec.ts')).resolves.toBeDefined()
  })

  it('does not apply playwright rules to non-test files', async () => {
    const eslint = createESLint('playwright.js')
    const config = await eslint.calculateConfigForFile('src/utils.ts')
    const ruleKeys = Object.keys(config?.rules ?? {})
    const playwrightRules = ruleKeys.filter(r => r.startsWith('playwright/'))
    expect(playwrightRules).toHaveLength(0)
  })
})

describe('eslint/testing-library config', () => {
  it('loads without errors', async () => {
    const eslint = createESLint('testing-library.js')
    await expect(eslint.calculateConfigForFile('src/Button.spec.ts')).resolves.toBeDefined()
  })
})

describe('eslint/turbo config', () => {
  it('loads without errors', async () => {
    const eslint = createESLint('turbo.js')
    await expect(eslint.calculateConfigForFile('turbo.json')).resolves.not.toThrow()
  })
})

describe('eslint/vitest config', () => {
  it('loads without errors', async () => {
    const eslint = createESLint('vitest.js')
    await expect(eslint.calculateConfigForFile('src/utils.test.ts')).resolves.toBeDefined()
  })

  it('does not apply vitest rules to non-test files', async () => {
    const eslint = createESLint('vitest.js')
    const config = await eslint.calculateConfigForFile('src/utils.ts')
    const ruleKeys = Object.keys(config?.rules ?? {})
    const vitestRules = ruleKeys.filter(r => r.startsWith('vitest/'))
    expect(vitestRules).toHaveLength(0)
  })

  it('vitest/expect-expect: flags test without assertion', async () => {
    const eslint = createESLint('vitest.js')
    const messages = await lintFixture(eslint, 'rule-vitest-expect-expect.test.ts')
    expect(findRule(messages, 'vitest/expect-expect').length).toBeGreaterThan(0)
  })

  it('valid test: no errors on well-formed test file', async () => {
    const eslint = createESLint('vitest.js')
    const messages = await lintFixture(eslint, 'valid.test.ts')
    const errors = messages.filter(m => m.severity === 2)
    expect(errors).toHaveLength(0)
  })
})
