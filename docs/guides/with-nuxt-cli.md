# Using kata with Nuxt CLI

`nuxi init` creates a Nuxt project. When you add the `@nuxt/eslint` module, it generates a base ESLint config. Kata extends it with 500+ additional rules: stricter TypeScript checking, Vue accessibility, modern JS best practices, code organization, and more.

## After running nuxi

```bash
npx nuxi init my-nuxt-app
cd my-nuxt-app
npm install
```

## Add kata

```bash
npm install -D @franvena/kata @nuxt/eslint-config eslint-plugin-vue @vue/eslint-config-typescript eslint-plugin-vuejs-accessibility eslint prettier stylelint typescript
```

## Configure

Set `standalone: false` so Nuxt only provides its specific rules and kata handles the rest:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  eslint: { config: { standalone: false } }
})
```

Extend the generated config by adding kata after Nuxt's base:

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
