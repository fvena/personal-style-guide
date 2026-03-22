# ADR-012: Oxlint as opt-in performance layer

**Status:** Accepted
**Date:** 2026-03

## Context

Oxlint 1.0 (stable since March 2026) implements 650+ ESLint rules in Rust, running at native speed. The pattern `oxlint && eslint .` eliminates duplicate work: Oxlint runs covered rules first in milliseconds, and `eslint-plugin-oxlint` disables those same rules in ESLint.

Oxlint does not support Vue template linting, so `eslint-plugin-vue` remains necessary and unaffected.

## Decision

1. Add `eslint-plugin-oxlint` as a dependency and `oxlint` as an optional peer dependency.
2. Export `baseOxlint` as a composable block from `eslint/base.js`, but **do not include it in the default export**. This prevents silent coverage degradation — if included by default, ESLint rules would be disabled but nothing would replace them for users who haven't installed oxlint.
3. The CLI handles opt-in: when a user selects Oxlint in the init prompt, the generated `eslint.config.js` includes `...baseOxlint` and lint scripts get the `oxlint &&` prefix.

## Consequences

- Users who opt in via CLI get automatic performance gains with correct configuration
- Users who import presets directly can compose `baseOxlint` manually when ready
- No risk of silent rule coverage loss for users unaware of oxlint
- The `eslint-plugin-oxlint` dependency adds no runtime cost when `baseOxlint` is not composed
