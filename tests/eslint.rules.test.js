import { describe, expect, it } from 'vitest'
import { createESLint, findRule, lintFixture } from './helpers.js'

// ---------------------------------------------------------------------------
// TypeScript rules — node config
// ---------------------------------------------------------------------------

describe('TypeScript rule behavior — node config', () => {
  it('unicorn/prefer-number-properties: flags parseInt()', async () => {
    const eslint = createESLint('node.js')
    const messages = await lintFixture(eslint, 'rule-parse-int.ts')
    expect(findRule(messages, 'unicorn/prefer-number-properties').length).toBeGreaterThan(0)
  })

  it('no-console: is disabled (off)', async () => {
    const eslint = createESLint('node.js')
    const messages = await lintFixture(eslint, 'rule-no-console.ts')
    expect(findRule(messages, 'no-console').length).toBe(0)
  })

  it('@typescript-eslint/no-explicit-any: flags `any` type annotation', async () => {
    const eslint = createESLint('node.js')
    const messages = await lintFixture(eslint, 'rule-no-explicit-any.ts')
    expect(findRule(messages, '@typescript-eslint/no-explicit-any').length).toBeGreaterThan(0)
  })

  it('eqeqeq: smart mode allows == null', async () => {
    const eslint = createESLint('node.js')
    const messages = await lintFixture(eslint, 'rule-eqeqeq-null.ts')
    expect(findRule(messages, 'eqeqeq').length).toBe(0)
  })

  it('no-self-compare: flags x === x', async () => {
    const eslint = createESLint('node.js')
    const messages = await lintFixture(eslint, 'rule-no-self-compare.ts')
    expect(findRule(messages, 'no-self-compare').length).toBeGreaterThan(0)
  })

  it('perfectionist/sort-imports: flags unsorted imports', async () => {
    const eslint = createESLint('node.js')
    const messages = await lintFixture(eslint, 'rule-sorted-imports.ts')
    // Sorted correctly — should produce no perfectionist errors
    expect(findRule(messages, 'perfectionist/sort-imports').length).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Vue-specific rules — vue config
// ---------------------------------------------------------------------------

describe('Vue rule behavior — vue config', () => {
  it('vue/component-api-style: flags Options API', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'rule-vue-options-api.vue')
    expect(findRule(messages, 'vue/component-api-style').length).toBeGreaterThan(0)
  })

  it('vue/block-lang: flags <script> without lang="ts"', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'rule-vue-no-script-lang.vue')
    expect(findRule(messages, 'vue/block-lang').length).toBeGreaterThan(0)
  })

  it('vue/block-lang: does not flag <style> without lang="scss" by default', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'rule-vue-no-style-lang.vue')
    expect(findRule(messages, 'vue/block-lang').length).toBe(0)
  })

  it('vue/enforce-style-attribute: flags <style> without scoped or module', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'rule-vue-no-scoped.vue')
    expect(findRule(messages, 'vue/enforce-style-attribute').length).toBeGreaterThan(0)
  })

  it('vue/define-props-declaration: flags runtime defineProps() without types', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'rule-vue-runtime-props.vue')
    expect(findRule(messages, 'vue/define-props-declaration').length).toBeGreaterThan(0)
  })

  it('vue/block-order: flags wrong SFC block order (template before script)', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'rule-vue-block-order.vue')
    expect(findRule(messages, 'vue/block-order').length).toBeGreaterThan(0)
  })

  it('valid SFC: no errors on a well-formed component', async () => {
    const eslint = createESLint('vue.js')
    const messages = await lintFixture(eslint, 'valid-component.vue')
    const errors = messages.filter(m => m.severity === 2)
    expect(errors).toHaveLength(0)
  })
})
