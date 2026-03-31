import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { ESLint } from 'eslint'
import pluginVue from 'eslint-plugin-vue'
import { describe, expect, it } from 'vitest'
import { createESLint } from './helpers.js'

const root = path.dirname(fileURLToPath(import.meta.url))

describe('eslint/vue config', () => {
  it('loads without errors', async () => {
    const eslint = createESLint('vue.js')
    await expect(eslint.calculateConfigForFile('test.vue')).resolves.toBeDefined()
  })

  it('loads without errors for .ts files', async () => {
    const eslint = createESLint('vue.js')
    await expect(eslint.calculateConfigForFile('test.ts')).resolves.toBeDefined()
  })

  it('reports no errors on valid.ts', async () => {
    const eslint = createESLint('vue.js')
    const results = await eslint.lintFiles([path.join(root, 'fixtures/valid.ts')])
    const errors = results.flatMap(r => r.messages.filter(m => m.severity === 2))
    expect(errors).toHaveLength(0)
  })

  it('reports errors on invalid.ts', async () => {
    const eslint = createESLint('vue.js')
    const results = await eslint.lintFiles([path.join(root, 'fixtures/invalid.ts')])
    const errors = results.flatMap(r => r.messages.filter(m => m.severity === 2))
    expect(errors.length).toBeGreaterThan(0)
  })

  it('reports no errors on ValidComponent.vue', async () => {
    const eslint = createESLint('vue.js')
    const results = await eslint.lintFiles([path.join(root, 'fixtures/ValidComponent.vue')])
    const errors = results.flatMap(r => r.messages.filter(m => m.severity === 2))
    expect(errors).toHaveLength(0)
  })

  it('reports errors on InvalidComponent.vue', async () => {
    const eslint = createESLint('vue.js')
    const results = await eslint.lintFiles([path.join(root, 'fixtures/InvalidComponent.vue')])
    const errors = results.flatMap(r => r.messages.filter(m => m.severity === 2))
    expect(errors.length).toBeGreaterThan(0)
  })
})

function createComposedESLint() {
  return new ESLint({
    overrideConfig: defineConfigWithVueTs(
      ...pluginVue.configs['flat/essential'],
      vueTsConfigs.recommended
    ),
    overrideConfigFile: path.resolve(root, '..', 'eslint', 'vue.js')
  })
}

describe('eslint/vue composition with create-vue', () => {
  it('loads without errors when composed with create-vue config', async () => {
    const eslint = createComposedESLint()
    await expect(eslint.calculateConfigForFile('test.vue')).resolves.toBeDefined()
  })

  it('kata-specific rules are active in composed config', async () => {
    const eslint = createComposedESLint()
    const results = await eslint.lintFiles([path.join(root, 'fixtures/InvalidComponent.vue')])
    const ruleIds = results.flatMap(r => r.messages.map(m => m.ruleId))
    expect(ruleIds).toContain('vue/component-api-style')
    expect(ruleIds).toContain('vue/block-order')
    expect(ruleIds).toContain('vue/enforce-style-attribute')
  })

  it('kata recommended rules override create-vue essential rules', async () => {
    const eslint = createComposedESLint()
    const config = await eslint.calculateConfigForFile('Test.vue')
    const ruleKeys = Object.keys(config.rules)
    const vueRules = ruleKeys.filter(r => r.startsWith('vue/'))
    // flat/recommended has ~50 rules, flat/essential has ~15
    // Composed config should have recommended-level coverage
    expect(vueRules.length).toBeGreaterThan(30)
  })

  it('kata extra plugins are active in composed config', async () => {
    const eslint = createComposedESLint()
    const config = await eslint.calculateConfigForFile('Test.vue')
    const ruleKeys = Object.keys(config.rules)
    expect(ruleKeys.some(r => r.startsWith('unicorn/'))).toBe(true)
    expect(ruleKeys.some(r => r.startsWith('perfectionist/'))).toBe(true)
    expect(ruleKeys.some(r => r.startsWith('vuejs-accessibility/'))).toBe(true)
  })
})
