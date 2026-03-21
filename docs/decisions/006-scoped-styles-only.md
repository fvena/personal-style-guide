# ADR-006: Require scoped or module styles in Vue SFCs

**Status:** Accepted
**Date:** 2025-03-01

## Context

Global `<style>` blocks in Vue SFCs are the most common source of CSS leakage in Vue applications. A component's styles bleed into other components, causing unpredictable visual regressions that are difficult to trace. Vue provides two encapsulation mechanisms: `scoped` (attribute-based selector scoping) and `module` (CSS Modules with locally scoped class names).

## Decision

Use `vue/enforce-style-attribute` to require either `scoped` or `module` on every `<style>` block:

```text
'vue/enforce-style-attribute': [
  'error',
  {
    allow: ['scoped', 'module'],
  },
],
```

Global styles are forbidden in Vue SFCs. If a project needs global styles (resets, typography, design tokens), they belong in standalone `.scss` files where they are intentional and visible.

## Alternatives Considered

- **Allow global styles** -- permits `<style>` without attributes. Convenient for quick prototyping but creates CSS leakage that compounds as the component tree grows.
- **Scoped only (no module option)** -- less flexible. CSS Modules offer stronger encapsulation (no attribute selectors in the DOM) and are preferred by teams using utility-class patterns or design systems with programmatic class composition.

## Consequences

- No CSS leakage from Vue components. Every component's styles are encapsulated by default.
- Global styles must be placed in standalone `.scss` files, making them explicitly visible in the project structure rather than hidden inside a component.
- Teams using `<style>` without `scoped` or `module` must update their components. This is a deliberate strictness tradeoff.
