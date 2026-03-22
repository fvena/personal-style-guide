# Migrating from @antfu/eslint-config to @franvena/kata

@antfu/eslint-config is an excellent ESLint-only config. This migration is relevant if you need Prettier, Stylelint, or Markdownlint in addition to ESLint.

## What you had

```js
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true
})
```

## What you install

```bash
npm install -D @franvena/kata eslint prettier stylelint typescript
```

## What your config looks like now

```js
// eslint.config.js
import eslintVue from '@franvena/kata/eslint/vue'

export default [...eslintVue]
```

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

## Dependencies you can remove

```bash
npm uninstall @antfu/eslint-config
```

## Common issues

### Formatting changes

Antfu uses ESLint Stylistic for formatting. Kata uses Prettier. The two have different formatting opinions. Run `npx prettier --write .` once to reformat your codebase.

### Plugin names differ

Antfu renames some plugins internally (e.g., `ts/` instead of `@typescript-eslint/`). If you had overrides using antfu's plugin names, update them to the standard names.

### Stricter Vue rules

Kata enforces `<script setup>` only, `lang="ts"` on `<script>`, and scoped/module styles. If your components use Options API or global styles, see the [Customizing kata](../../README.md#relax-vue-sfc-enforcement-during-migration) section in the README.

### New tools, new errors

Kata adds Stylelint and Markdownlint coverage that antfu does not have. Expect CSS and Markdown errors on first run. These are genuine issues — typos in CSS properties, inconsistent heading levels in Markdown.
