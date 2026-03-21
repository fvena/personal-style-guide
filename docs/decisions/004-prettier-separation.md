# ADR-004: Keep Prettier separate from ESLint

**Status:** Accepted
**Date:** 2026-03-21

## Context

Two schools of thought exist for integrating Prettier with ESLint. The first runs Prettier as an ESLint plugin (`eslint-plugin-prettier`), surfacing formatting issues as lint errors. The second keeps them as separate tools, using `eslint-config-prettier` to disable ESLint's formatting rules so the two never conflict.

## Decision

Keep Prettier and ESLint as separate tools with distinct responsibilities. `eslint-config-prettier` is applied as the last config in every preset to disable all formatting rules from every plugin:

```text
// Prettier must be last -- it disables formatting rules from all configs above
{ ...eslintConfigPrettier, name: 'fvena/base/prettier' },
```

ESLint owns correctness. Prettier owns style. There is no overlap.

## Alternatives Considered

- **`eslint-plugin-prettier`** -- runs Prettier inside ESLint so formatting violations appear as lint errors. In practice, this means every keystroke in an IDE triggers formatting diagnostics, adding noise to the error list. It also makes ESLint slower because it runs Prettier on every file.
- **ESLint stylistic rules only (no Prettier)** -- requires maintaining formatting rules across 10+ plugins. Prettier handles this with zero configuration.

## Consequences

- Zero conflicts between ESLint and Prettier -- no "fix loop" where one tool undoes the other's changes.
- IDE performance is better because ESLint only reports correctness issues, not formatting.
- Consumers must configure Prettier separately (the package exports a shared Prettier config at `@fvena/kata/prettier` to make this trivial).
- `eslint-config-prettier` must always be the last config in the array to ensure it disables rules from all preceding plugins.
