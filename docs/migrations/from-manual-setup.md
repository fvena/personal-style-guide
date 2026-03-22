# Migrating from a manual ESLint + Prettier + TypeScript setup

## What you had

```js
// eslint.config.js
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  },
  {
    rules: {
      // 30-50 custom rules accumulated over time
    }
  }
]
```

```js
// prettier.config.js
export default {
  semi: false,
  singleQuote: true
  // ...more options
}
```

## What you install

```bash
npm install -D @franvena/kata eslint prettier typescript
# Or use the CLI:
npx @franvena/kata init
```

## What your config looks like now

```js
// eslint.config.js
import eslintNode from '@franvena/kata/eslint/node'

export default [...eslintNode]
```

```js
// prettier.config.js
export { default } from '@franvena/kata/prettier'
```

## Dependencies you can remove

```bash
npm uninstall \
  @eslint/js \
  typescript-eslint \
  eslint-config-prettier \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-import \
  eslint-plugin-import-x
```

Only remove dependencies that kata replaces. If you have plugins kata does not cover (e.g., `eslint-plugin-react`), keep them and add them after the kata spread.

## Common issues

### `projectService` errors: "No tsconfig.json found for file X"

Kata uses `projectService` instead of `project: [...]`. If you have files in the root (`eslint.config.js`, `vite.config.ts`) not covered by any tsconfig, create a `tsconfig.node.json`:

```json
{
  "extends": "@franvena/kata/typescript/node",
  "include": ["*.config.ts", "*.config.js"]
}
```

### Custom rules that disappear

If you had custom rules in your previous config, add them after the kata spread:

```js
export default [...eslintNode, { rules: { 'your-rule': 'error' } }]
```

### Prettier config differs from kata defaults

Kata defaults to no semicolons, single quotes, and 100 character width. If your defaults are different, extend the Prettier config:

```js
import prettierConfig from '@franvena/kata/prettier'
export default { ...prettierConfig, semi: true }
```
