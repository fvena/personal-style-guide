# ADR-009: ESLint + Prettier as the core technology stack

**Status:** Accepted
**Date:** 2026-03

## Context

The Rust-based tooling ecosystem is growing. Biome (5.4M weekly downloads) aims to unify linting and formatting. Oxlint (2.5M weekly downloads) offers a faster ESLint complement with 695+ native rules. Oxfmt provides Prettier-compatible formatting at 30× speed. A shared config package must decide whether to build on the established ESLint + Prettier ecosystem or adopt these newer tools.

The decision depends on coverage, not speed. Kata targets Vue 3, Nuxt 3, TypeScript with type-aware linting, SCSS, and Markdown — all in a single package.

## Decision

Use ESLint + Prettier as the core technology stack. Monitor Rust-based alternatives on a quarterly schedule. Design the architecture so that individual tools can be swapped without changing the public API.

### Rationale

**Biome** cannot replace the kata stack today:

- Vue SFC support arrived experimentally in v2.3 (late 2025) but remains incomplete. `<style lang="scss">` causes parse errors.
- Vue-specific lint rules are minimal compared to eslint-plugin-vue's 100+ rules.
- SCSS support is on the 2026 roadmap but work only recently started.
- Markdown support is seeking an implementer with no active development.
- No type-aware linting equivalent to typescript-eslint's `no-floating-promises`, `no-unsafe-*`, or `restrict-template-expressions`.

Realistic timeline for full kata-stack parity: late 2027 at earliest.

**Oxlint** is a complement, not a replacement:

- 695+ native Rust rules, JS plugins in alpha (March 2026).
- Does not lint CSS/SCSS (only formats via Oxfmt).
- Vue plugin support is alpha-quality.
- Best used as a fast pre-check before ESLint, not as a standalone solution.

**Oxfmt** is the most credible near-term alternative to Prettier:

- 30× faster with 100% JS/TS conformance.
- Already adopted by vuejs/core and Vercel's turborepo.
- Vue, SCSS, Markdown, YAML, HTML support.
- Still in beta. Adoption is limited.

### Quarterly review checklist

Every quarter, check:

1. Biome: stable Vue SFC support? Stable SCSS? Markdown linting? Type-aware rules?
2. Oxfmt: out of beta? Stable Vue/SCSS/Markdown formatting?
3. Oxlint: stable JS plugin support? Vue plugin quality?

If any tool reaches stable coverage for Vue SFC + SCSS + type-aware linting, evaluate integration as an opt-in alternative.

## Alternatives considered

- **Build on Biome instead of ESLint**: Would gain speed but lose Vue SFC coverage, type-aware linting depth, SCSS support, and Markdown linting. The coverage gap is too large for a tool that promises comprehensive quality.
- **Hybrid Oxlint + ESLint**: Viable as a performance optimization. `eslint-plugin-oxlint` can disable ESLint rules that Oxlint already covers, reducing ESLint's workload. Consider as an opt-in module when Oxlint's JS plugins stabilize.
- **Replace Prettier with Oxfmt**: Viable when Oxfmt exits beta and demonstrates stable Vue/SCSS formatting. The architecture should allow this swap without changing the consumer-facing API (`@franvena/kata/prettier`).

## Consequences

- Kata depends on the ESLint + Prettier ecosystem for the foreseeable future. This is the ecosystem with the deepest coverage for the target stack.
- Speed is not kata's differentiator. Completeness, type-aware depth, and enforcement are.
- The quarterly review ensures kata does not miss the window when Rust-based tools become viable.
- The export-path architecture (`@franvena/kata/prettier`, `@franvena/kata/eslint/*`) allows swapping underlying tools without breaking the public API.
