import pluginVitest from 'eslint-plugin-vitest'
import { defineConfig } from 'eslint/config'

const testFiles = [
  '**/*.test.ts',
  '**/*.test.js',
  '**/*.spec.ts',
  '**/*.spec.js',
  '**/__tests__/**/*.[jt]s'
]

export default defineConfig([
  {
    ...pluginVitest.configs.recommended,
    files: testFiles,
    name: 'fvena/vitest/recommended'
  },
  {
    files: testFiles,
    name: 'fvena/vitest/overrides',
    rules: {
      'no-console': 'off',
      'vitest/expect-expect': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error'
    }
  }
])
