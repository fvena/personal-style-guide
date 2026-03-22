# Migrating from eslint-config-airbnb to @franvena/kata

Airbnb's ESLint config was archived in May 2025. It does not support ESLint 9, flat config, or ESLint v10. If you are still using it, your config is already broken or will break on your next ESLint upgrade.

## What you had

```js
// .eslintrc.js (legacy format — does not work in ESLint v10)
module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // accumulated overrides
  }
}
```

## What you install

```bash
npm install -D @franvena/kata eslint prettier typescript
```

## What your config looks like now

```js
// eslint.config.js (flat config — required by ESLint v10)
import eslintNode from '@franvena/kata/eslint/node'

export default [...eslintNode]
```

## Dependencies you can remove

```bash
npm uninstall \
  eslint-config-airbnb-base \
  eslint-config-airbnb-typescript \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-config-prettier \
  eslint-plugin-import
```

## Common issues

### `import/extensions` rule missing

Airbnb enforces file extensions on imports. Kata uses TypeScript's module resolution instead. If you need this rule, add it manually.

### `no-restricted-syntax` differences

Airbnb bans `for...of`, `for...in`, labels, and `with`. Kata does not restrict these. If your team relied on these restrictions, add them as overrides:

```js
export default [
  ...eslintNode,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'ForInStatement', message: 'Use Object.keys/values/entries instead.' },
        { selector: 'ForOfStatement', message: 'Use Array methods instead.' }
      ]
    }
  }
]
```

### Stricter TypeScript rules

Kata uses `recommendedTypeChecked` which includes rules Airbnb did not have (`no-floating-promises`, `no-unsafe-*`). Expect new errors on first run — these are real bugs. Run `npx eslint . --fix` to auto-fix what is fixable, then address the rest.

### Formatting changes

Kata uses Prettier with no semicolons, single quotes, and 100 character width. If you want different defaults, extend the Prettier config:

```js
import prettierConfig from '@franvena/kata/prettier'
export default { ...prettierConfig, semi: true }
```
