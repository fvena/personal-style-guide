import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { defineConfig } from 'eslint/config'
import vueConfig from './vue.js'

// createConfigForNuxt returns a FlatConfigComposer (thenable) — top-level await resolves it
const nuxtBase = await createConfigForNuxt({
  features: {
    standalone: false, // Our vue.js config already provides JS/TS/Vue setup
    stylistic: false, // Prettier handles formatting
    tooling: false // Our base config already includes unicorn, etc.
  }
})

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  ...vueConfig,
  ...nuxtBase,
  // Nuxt-specific overrides
  {
    name: 'fvena/nuxt/rules',
    rules: {
      // In Nuxt, pages/ and layouts/ have valid single-word names
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['App', 'index', 'default', 'error']
        }
      ]
    }
  }
])
