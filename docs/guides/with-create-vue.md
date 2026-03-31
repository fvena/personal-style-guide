# Using kata with create-vue

`create-vue` generates a basic ESLint config with essential Vue rules. Kata extends it with 500+ additional rules: stricter TypeScript checking, Vue accessibility, modern JS best practices, code organization, and more.

## After running create-vue

```bash
npm create vue@latest my-app
cd my-app
```

## Add kata

```bash
npm install -D @franvena/kata eslint-plugin-vue @vue/eslint-config-typescript eslint-plugin-vuejs-accessibility prettier stylelint typescript
```

## Extend the generated config

Modify the `eslint.config.js` that `create-vue` generated to add kata after the existing config:

```js
// eslint.config.js
import eslintVue from '@franvena/kata/eslint/vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}']
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // create-vue defaults
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  // kata extends: +400 rules, strictTypeChecked, unicorn, perfectionist, a11y...
  ...eslintVue
)
```

Kata's config comes last, so its stricter rules override the defaults (`flat/recommended` over `flat/essential`, `strictTypeChecked` over `recommended`). Both use the same plugin references — no conflicts.

Add Prettier and Stylelint configs:

```js
// prettier.config.js
export { default } from '@franvena/kata/prettier'
```

```js
// stylelint.config.js
export default {
  extends: ['@franvena/kata/stylelint']
}
```

## Or use the CLI

```bash
npx @franvena/kata init
```

Select "Vue 3" as project type. The CLI generates all configs and handles dependencies.
