# ADR-002: TypeScript-ESLint preset selection

**Status:** Superseded
**Date:** 2024-12-15
**Superseded:** 2026-03 — Default changed to `recommendedTypeChecked`. See rationale below.

## Original decision

Use `strictTypeChecked` as the TypeScript preset.

## Revision (2026-03)

The default has been changed to `recommendedTypeChecked` + `stylisticTypeChecked` for three reasons:

1. **Semver instability.** `strictTypeChecked` is explicitly not semver-stable in typescript-eslint. Rules can be added or changed in minor versions. For a shared config that promises stable upgrades, this creates uncontrolled risk — a routine `npm update` of typescript-eslint could break user builds without kata publishing anything new.

2. **Signal-to-noise ratio.** `recommendedTypeChecked` includes the highest-value type-aware rules (`no-floating-promises`, `no-unsafe-*`, `no-misused-promises`). The rules that `strictTypeChecked` adds (`no-unnecessary-condition`, `no-confusing-void-expression`, stricter `restrict-template-expressions`) are useful but generate more false positives in idiomatic TypeScript code.

3. **Adoption friction.** The typescript-eslint documentation recommends `strictTypeChecked` only when "a nontrivial percentage of developers are highly proficient in TypeScript." For a shared config targeting teams of varying experience levels, the recommended preset is the better default.

`strictTypeChecked` remains available as an explicit opt-in. See the README section "Customizing kata" for instructions.

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
