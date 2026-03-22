import { describe, expect, it } from 'vitest'
import { createESLint, lintCode, lintFixture } from './helpers.js'

describe('eslint/nuxt config', () => {
  it('loads without errors', async () => {
    const eslint = createESLint('nuxt.js')
    await expect(eslint.calculateConfigForFile('pages/index.vue')).resolves.toBeDefined()
  })

  it('reports no errors on a valid Vue component', async () => {
    const eslint = createESLint('nuxt.js')
    const messages = await lintFixture(eslint, 'ValidComponent.vue')
    const errors = messages.filter(m => m.severity === 2)
    expect(errors).toHaveLength(0)
  })

  it('inherits vue/component-api-style from vue config', async () => {
    const eslint = createESLint('nuxt.js')
    const messages = await lintFixture(eslint, 'rule-vue-options-api.vue')
    const match = messages.filter(m => m.ruleId === 'vue/component-api-style')
    expect(match.length).toBeGreaterThan(0)
  })

  it('allows single-word component names for Nuxt pages', async () => {
    const eslint = createESLint('nuxt.js')
    // Nuxt overrides vue/multi-word-component-names to allow page/layout names
    // A single-word component in pages/ should NOT trigger the rule
    const messages = await lintCode(
      eslint,
      `<script setup lang="ts"></script><template><div>index</div></template><style scoped lang="scss"></style>`.trim(),
      'pages/index.vue'
    )
    const match = messages.filter(m => m.ruleId === 'vue/multi-word-component-names')
    expect(match).toHaveLength(0)
  })
})
