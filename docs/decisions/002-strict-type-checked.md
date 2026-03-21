# ADR-002: Use `strictTypeChecked` over `recommended`

**Status:** Accepted
**Date:** 2026-03-21

## Context

typescript-eslint offers three preset tiers: `recommended`, `strict`, and `strictTypeChecked`. Each tier adds more rules and more strictness. A shared config must decide which tier represents the right default for all consumers.

## Decision

Use `strictTypeChecked` combined with `stylisticTypeChecked` as the TypeScript preset. These are applied in `baseTypeScript` via `tseslint.configs.strictTypeChecked` and `tseslint.configs.stylisticTypeChecked`.

Additional rules are layered on top, including `@typescript-eslint/prefer-readonly`, `@typescript-eslint/no-import-type-side-effects`, and a tuned `@typescript-eslint/prefer-nullish-coalescing` that ignores boolean and string primitives.

## Alternatives Considered

- **`recommended`** -- faster linting (no type information needed for most rules), but misses unsafe assignments, unhandled promise rejections, and incorrect nullish coalescing. These are real bugs, not style preferences.
- **`strict`** (without type-checked) -- a middle ground, but without type-aware rules it still misses the highest-value checks like `@typescript-eslint/no-floating-promises`.

## Consequences

- Linting is slower because every rule has access to TypeScript type information via the project service.
- Catches categories of bugs that type-unaware rules cannot detect: unsafe `any` propagation, floating promises, incorrect template literal types.
- The performance cost is acceptable for CI and pre-commit hooks. For interactive IDE feedback, consumers can rely on TypeScript's own diagnostics for the type-aware subset.
- Type-checked rules are disabled for plain `.js` files via `tseslint.configs.disableTypeChecked` to avoid false positives.
