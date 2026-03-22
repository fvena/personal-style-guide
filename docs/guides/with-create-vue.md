# Using kata with create-vue

`create-vue` generates a basic ESLint config. Kata replaces and extends it.

## After running create-vue

```bash
npm create vue@latest my-app
cd my-app
```

## Add kata

```bash
npm install -D @franvena/kata eslint prettier stylelint typescript
```

## Replace the generated config

Replace the `eslint.config.js` that `create-vue` generated:

```js
// eslint.config.js
import eslintVue from '@franvena/kata/eslint/vue'

export default [...eslintVue]
```

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

## Dependencies you can remove

`create-vue` installs ESLint plugins separately. Kata bundles them:

```bash
npm uninstall \
  @vue/eslint-config-prettier \
  @vue/eslint-config-typescript \
  eslint-plugin-vue
```

## Or use the CLI

```bash
npx @franvena/kata init
```

Select "Vue 3" as project type. The CLI generates all configs and handles dependencies.
