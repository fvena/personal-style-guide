import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs'
import pluginJs from '@eslint/js'
import markdown from '@eslint/markdown'
import eslintConfigPrettier from 'eslint-config-prettier'
import nodePlugin from 'eslint-plugin-n'
import oxlint from 'eslint-plugin-oxlint'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import pluginRegexp from 'eslint-plugin-regexp'
import tsdocPlugin from 'eslint-plugin-tsdoc'
import unicornPlugin from 'eslint-plugin-unicorn'
import eslintPluginYml from 'eslint-plugin-yml'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

/* eslint-disable perfectionist/sort-objects -- Disabling sorting to maintain logical grouping of plugin hooks */

/** @type {import('eslint').Linter.Config[]} */
export const baseIgnores = [globalIgnores(['node_modules/', '**/dist/', '**/cache/'])]

/** @type {import('eslint').Linter.Config[]} */
export const baseJavascript = [
  pluginJs.configs.recommended,
  nodePlugin.configs['flat/recommended-module'],
  {
    name: 'fvena/base/javascript/rules',
    rules: {
      'array-callback-return': ['warn', { allowImplicit: true }],
      eqeqeq: ['error', 'smart'],
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': ['error', { ignores: ['import.meta.dirname'] }],

      // Bug-prevention rules from eslint:all — not in recommended but high-value, low false-positive
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-promise-executor-return': ['error', { allowVoid: true }],
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unmodified-loop-condition': 'error'
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export const baseTypeScript = defineConfig([
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: 'fvena/base/typescript/parser',
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    name: 'fvena/base/typescript/rules',
    rules: {
      // Prevent subtle bugs where default params shadow required ones in overloads
      '@typescript-eslint/default-param-last': 'error',
      // Closures over loop variables cause stale-reference bugs — force explicit scoping
      '@typescript-eslint/no-loop-func': 'error',
      // Encourage ?? over || for nullish checks, but allow || for booleans/strings
      // where falsy-coalescing is the intended behavior
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignorePrimitives: {
            boolean: true,
            string: true
          }
        }
      ],
      // Side-effectful type imports bypass tree-shaking — enforce type-only imports
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // Immutability by default — flag fields that are never reassigned
      '@typescript-eslint/prefer-readonly': 'error',
      // Prevent accidental [object Object] in template strings — allow numbers since
      // they stringify predictably
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        {
          allowNumber: true
        }
      ]
    }
  },
  {
    name: 'fvena/base/javascript/disable-type-checked',
    extends: [tseslint.configs.disableTypeChecked],
    files: ['**/*.js']
  }
])

/** @type {import('eslint').Linter.Config[]} */
export const basePerfectionist = [
  perfectionistPlugin.configs['recommended-natural'],
  {
    name: 'fvena/base/perfectionist/rules',
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          groups: ['type', 'builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          newlinesBetween: 0,
          order: 'asc',
          type: 'natural'
        }
      ],
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-modules': 'off'
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export const baseUnicorn = [
  unicornPlugin.configs['recommended'],
  {
    name: 'fvena/base/unicorn/rules',
    rules: {
      'unicorn/no-array-reduce': 'off',
      // Conflicts with guard-clause patterns; too opinionated for a shared config
      'unicorn/no-negated-condition': 'off',
      // null is too pervasive in DOM APIs, Vue refs, and third-party libraries
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            args: { arguments: false },
            attrs: { attributes: false },
            btn: { button: false },
            dir: { directory: false },
            el: { element: false },
            env: { environment: false },
            fn: { function: false },
            param: { parameter: false },
            params: { parameters: false },
            prop: { property: false },
            props: { properties: false },
            ref: { reference: false }
          }
        }
      ]
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export const baseComments = [
  eslintCommentsPlugin.recommended,
  {
    name: 'fvena/base/comments/rules',
    rules: {
      '@eslint-community/eslint-comments/require-description': [
        'error',
        { ignore: ['eslint-enable'] }
      ]
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export const baseRegexp = [
  {
    ...pluginRegexp.configs['flat/recommended'],
    name: 'fvena/base/regexp'
  }
]

/** @type {import('eslint').Linter.Config[]} */
export const baseTsdoc = [
  {
    name: 'fvena/base/plugins/tsdoc',
    plugins: {
      tsdoc: tsdocPlugin
    }
  },
  {
    name: 'fvena/base/typescript/tsdoc',
    files: ['**/*.ts'],
    rules: {
      'tsdoc/syntax': 'error'
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export const baseYaml = defineConfig([
  ...eslintPluginYml.configs['flat/recommended'],
  {
    name: 'fvena/base/yaml/disable-type-checked',
    extends: [tseslint.configs.disableTypeChecked],
    files: ['**/*.yaml', '**/*.yml']
  }
])

/** @type {import('eslint').Linter.Config[]} */
export const baseMarkdown = defineConfig([
  {
    name: 'fvena/base/markdown/processor',
    files: ['**/*.md'],
    plugins: { markdown },
    processor: 'markdown/markdown'
  },
  {
    name: 'fvena/base/markdown/disable-type-checked',
    extends: [tseslint.configs.disableTypeChecked],
    files: ['**/*.md/*.js', '**/*.md/*.ts']
  },
  {
    name: 'fvena/base/markdown/code-blocks',
    files: ['**/*.md/*.js', '**/*.md/*.ts'],
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'n/no-missing-import': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-objects': 'off'
    }
  }
])

/** @type {import('eslint').Linter.Config[]} */
export const baseOxlint = oxlint.configs['flat/recommended']

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  ...baseIgnores,
  ...baseJavascript,
  ...baseTypeScript,
  ...basePerfectionist,
  ...baseUnicorn,
  ...baseRegexp,
  ...baseComments,
  ...baseYaml,
  ...baseMarkdown,
  // Prettier must be last — it disables formatting rules from all configs above
  { ...eslintConfigPrettier, name: 'fvena/base/prettier' }
])
/* eslint-enable perfectionist/sort-objects */
