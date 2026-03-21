# ADR-005: Enforce TypeScript and SCSS in Vue SFCs

**Status:** Accepted
**Date:** 2025-03-01

## Context

Vue Single File Components allow any language in `<script>` and `<style>` blocks. Without enforcement, teams accumulate a mix of JavaScript and TypeScript, CSS and SCSS across components. This inconsistency creates maintenance debt: different tooling paths, inconsistent type safety, and unpredictable build behavior.

## Decision

Use `vue/block-lang` to require `lang="ts"` on `<script>` blocks and `lang="scss"` on `<style>` blocks:

```text
'vue/block-lang': [
  'error',
  {
    script: { lang: 'ts' },
    style: { lang: 'scss' },
  },
],
```

This is applied in the Vue preset (`eslint/vue.js`) alongside other opinionated Vue rules.

## Alternatives Considered

- **Allow mixed languages** -- more flexible for teams migrating incrementally, but the inconsistency compounds over time. A component in JavaScript next to one in TypeScript means two mental models, two sets of type assumptions, and incomplete type coverage.
- **Enforce only TypeScript (not SCSS)** -- partial solution. SCSS provides variables, nesting, and mixins that plain CSS lacks. Allowing both creates the same inconsistency problem in stylesheets.

## Consequences

- Every Vue SFC uses the same languages, enabling consistent tooling and type safety across the entire component tree.
- Teams migrating from JavaScript or plain CSS must update all components before adopting this config. The README Troubleshooting section documents how to override this rule for incremental migration.
- SCSS is required even for components with minimal styling. The overhead is negligible (SCSS is a superset of CSS), but it is a conscious tradeoff favoring consistency over minimal syntax.
