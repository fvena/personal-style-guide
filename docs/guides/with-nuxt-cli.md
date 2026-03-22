# Using kata with Nuxt CLI

`nuxi init` creates a Nuxt project with the `@nuxt/eslint` module. Kata works alongside it.

## After running nuxi

```bash
npx nuxi init my-nuxt-app
cd my-nuxt-app
npm install
```

## Add kata

```bash
npm install -D @franvena/kata eslint prettier stylelint typescript
```

## Configure

Set `standalone: false` so kata provides the rules:

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

## Or use the CLI

```bash
npx @franvena/kata init
```

Select "Nuxt 3" as project type.
