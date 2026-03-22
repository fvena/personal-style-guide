# Migrating from @nuxt/eslint-config (standalone) to @franvena/kata

## What you had

Standalone config:

```js
// eslint.config.js
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt()
```

Or with the `@nuxt/eslint` module:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint']
})
```

## What you install

```bash
npm install -D @franvena/kata eslint prettier stylelint typescript
```

## What your config looks like now

### With @nuxt/eslint module (recommended)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  eslint: { config: { standalone: false } }
})
```

```js
// eslint.config.js
import eslintNuxt from '@franvena/kata/eslint/nuxt'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([...eslintNuxt])
```

### Without @nuxt/eslint module

```js
// eslint.config.js
import eslintNuxt from '@franvena/kata/eslint/nuxt'

export default [...eslintNuxt]
```

Add Prettier and Stylelint:

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

If you used `@nuxt/eslint-config` standalone without the module:

```bash
npm uninstall @nuxt/eslint-config
```

If you use the `@nuxt/eslint` module, do not uninstall it — kata complements the module.

## Common issues

### `standalone: false` is required

If you use the `@nuxt/eslint` module, set `standalone: false` in `nuxt.config.ts` so kata provides the rules instead of the module's defaults.

### Single-word page names

Nuxt pages (`pages/index.vue`, `pages/about.vue`) trigger `vue/multi-word-component-names`. Kata's Nuxt preset already handles this — `index`, `default`, `error`, and `App` are allowed.

### New tools, new coverage

Kata adds Prettier, Stylelint, and Markdownlint. Your `.vue` style blocks and `.md` files will be linted for the first time.
