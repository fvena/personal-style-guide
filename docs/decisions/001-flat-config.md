# ADR-001: Use ESLint flat config format

**Status:** Accepted
**Date:** 2026-03-21

## Context

ESLint 9 introduced the flat config format as the new default, deprecating the legacy `.eslintrc` format. A shared config package must choose one format. At the time of creation, the legacy format had broader ecosystem compatibility, but flat config is the clear forward path.

## Decision

Use the flat config format exclusively. The base config exports arrays of config objects using `tseslint.config()` as the wrapper. Consumer entry points (like `eslint.config.js`) can use `defineConfig()` from `eslint/config` to compose presets via spread syntax.

The project's own `eslint.config.js` demonstrates this pattern:

```js
import { defineConfig } from "eslint/config";
import eslintNode from "./eslint/node.js";

export default defineConfig([{ ignores: ["tests/fixtures/"] }, ...eslintNode]);
```

## Alternatives Considered

- **Legacy `.eslintrc` format** -- broader ecosystem support at the time but officially deprecated. Building on a deprecated format would require migration later.
- **Dual-format support** -- maintaining both formats doubles maintenance for a transitional benefit that shrinks with every ESLint release.

## Consequences

- Requires ESLint ^9.0.0 as a peer dependency.
- Consumers get native config composition via array spread -- no `extends` indirection.
- Named exports (`baseIgnores`, `baseTypeScript`, etc.) are first-class arrays that compose naturally in flat config.
- Consumers on ESLint 8 or earlier cannot use this package.
