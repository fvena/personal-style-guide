import pluginPlaywright from 'eslint-plugin-playwright'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['**/*.spec.ts', '**/e2e/**/*.ts', '**/tests/**/*.ts'],
    name: 'fvena/playwright/recommended'
  },
  {
    files: ['**/*.spec.ts', '**/e2e/**/*.ts', '**/tests/**/*.ts'],
    name: 'fvena/playwright/overrides',
    rules: {
      'no-console': 'off',
      'playwright/expect-expect': 'error',
      'playwright/no-focused-test': 'error'
    }
  }
])
