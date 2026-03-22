# Using kata in a monorepo

Each package in a monorepo can use a different kata preset. Run `kata init` inside each package, not at the workspace root.

## Structure

```
packages/
  api/
    eslint.config.js    -> @franvena/kata/eslint/node
    tsconfig.json        -> @franvena/kata/typescript/node
    package.json
  web/
    eslint.config.js    -> @franvena/kata/eslint/nuxt
    tsconfig.json        -> @franvena/kata/typescript/browser
    package.json
  shared/
    eslint.config.js    -> @franvena/kata/eslint/node
    tsconfig.json        -> @franvena/kata/typescript/node
    package.json
package.json             -> workspace root
```

## Setup

Install kata at the root:

```bash
npm install -D @franvena/kata eslint prettier typescript
```

Each package has its own `eslint.config.js` importing the appropriate preset. The `typescript-eslint` project service auto-discovers the nearest `tsconfig.json` for each file.

## Running lint

From the root:

```bash
npx eslint packages/
```

Or per-package:

```bash
cd packages/api && npx eslint .
```

## Shared rules

If all packages share the same overrides, create a shared config at the root:

```js
// eslint.config.shared.js
export const sharedRules = {
  rules: {
    'unicorn/no-array-for-each': 'off'
  }
}
```

```js
// packages/api/eslint.config.js
import eslintNode from '@franvena/kata/eslint/node'
import { sharedRules } from '../../eslint.config.shared.js'

export default [...eslintNode, sharedRules]
```
