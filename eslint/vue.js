import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintConfigPrettier from 'eslint-config-prettier'
import vuePlugin from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import base from './base.js'

/* eslint-disable perfectionist/sort-objects -- Disabling sorting to maintain logical grouping of Vue rules */

/**
 * Opt-in: enforce lang="scss" on <style> blocks.
 * Spread after the default export to enable SCSS enforcement:
 *   import vueConfig, { vueScss } from '@franvena/kata/eslint/vue'
 *   export default [...vueConfig, ...vueScss]
 */
/** @type {import('eslint').Linter.Config[]} */
export const vueScss = [
  {
    name: 'fvena/vue/scss',
    files: ['**/*.vue'],
    rules: {
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
          style: { lang: 'scss' }
        }
      ]
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export default defineConfigWithVueTs(
  ...base,
  // Vue 3 recommended rules as a starting point
  ...vuePlugin.configs['flat/recommended'],
  // Apply full TypeScript rule sets for .vue files.
  // Duplicates base.js strictTypeChecked but ensures Vue SFC <script> blocks
  // are covered by the same strictness level as .ts files.
  vueTsConfigs.strictTypeChecked,
  vueTsConfigs.stylisticTypeChecked,
  // Opinionated rules for the exact stack: Vue 3 + script setup + TS + SCSS
  {
    name: 'fvena/vue/rules',
    files: ['**/*.vue'],
    rules: {
      // Enforce <script setup> — no Options API, no composition without setup
      'vue/component-api-style': ['error', ['script-setup']],

      // SFC block order: <script setup> first, then template, then style
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ],

      // Macro order inside <script setup>
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots']
        }
      ],

      // Multi-word component names (ignores App and index pages)
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['App', 'index']
        }
      ],

      // Props must always be typed with TypeScript (defineProps<{...}>())
      'vue/define-props-declaration': ['error', 'type-based'],

      // Emits must always be typed with TypeScript
      'vue/define-emits-declaration': ['error', 'type-based'],

      // Enforce scoped or module styles — no global <style> without attribute
      'vue/enforce-style-attribute': [
        'error',
        {
          allow: ['scoped', 'module']
        }
      ],

      // Template attributes: one per line when multiline
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 3 },
          multiline: { max: 1 }
        }
      ],

      // Consistent self-closing tags
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'always', component: 'always' },
          svg: 'always',
          math: 'always'
        }
      ],

      // Always use v-bind shorthand (:prop instead of v-bind:prop)
      'vue/v-bind-style': ['error', 'shorthand'],

      // Always use v-on shorthand (@event instead of v-on:event)
      'vue/v-on-style': ['error', 'shorthand'],

      // Avoid v-html (XSS risk) — warn instead of error for legitimate cases
      'vue/no-v-html': 'warn',

      // Enforce lang="ts" on <script>
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' }
        }
      ],

      // Enforce consistent variable names for compiler macros (Vue conventions)
      'vue/require-macro-variable-name': [
        'error',
        {
          defineProps: 'props',
          defineEmits: 'emit',
          defineSlots: 'slots',
          useSlots: 'slots',
          useAttrs: 'attrs'
        }
      ],

      // Props with defaults should not be required — the default would never be used
      'vue/no-required-prop-with-default': 'error',

      // Enforce reactive props destructuring (Vue 3.5+)
      'vue/define-props-destructuring': 'error'
    }
  },
  // Vue accessibility rules (WCAG compliance)
  ...pluginVueA11y.configs['flat/recommended'],
  {
    name: 'fvena/vue/accessibility',
    files: ['**/*.vue'],
    rules: {
      // Allow autofocus — ARIA dialog best practices recommend focusing the first interactive
      // element. The rule has no role-based exceptions (only ignoreNonDOM), so "off" is the
      // only practical option for apps with modals and form dialogs.
      'vuejs-accessibility/no-autofocus': 'off',

      // The rule has zero configuration options — no role/element exceptions. Disabling it
      // avoids false positives on interactive components (tables, custom widgets) that handle
      // keyboard navigation at the container level.
      'vuejs-accessibility/click-events-have-key-events': 'off'
    }
  },
  // Prettier must be last — it disables formatting rules from all configs above
  { ...eslintConfigPrettier, name: 'fvena/vue/prettier' }
)
/* eslint-enable perfectionist/sort-objects */
