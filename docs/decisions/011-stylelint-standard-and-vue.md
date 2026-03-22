# ADR-011: Stylelint standard configs and Vue support via postcss-html

**Status:** Accepted
**Date:** 2026-03

## Context

`stylelint-config-recommended-vue@1.6.1` depends on `stylelint-config-recommended@^15`, which is incompatible with Stylelint 17. This created an unresolvable peer dependency conflict in kata v2.

Additionally, the Stylelint documentation recommends `stylelint-config-standard` over `stylelint-config-recommended` for most projects, as it adds modern CSS conventions beyond basic error prevention.

## Decision

1. **Replace `stylelint-config-recommended-vue`** with `postcss-html` as a custom syntax for Vue files. The Vue override is applied via Stylelint's `overrides` mechanism rather than a dedicated config package.

2. **Upgrade to `stylelint-config-standard-scss`**, which transitively includes both `stylelint-config-standard` and `stylelint-config-recommended-scss`. This replaces the previous `stylelint-config-recommended` + `stylelint-config-recommended-scss` combination.

The resulting extends chain is:

```js
extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order']
```

With a Vue override:

```js
overrides: [{ customSyntax: 'postcss-html', files: ['**/*.vue'] }]
```

## Consequences

- Fewer direct dependencies (3 removed, 2 added)
- Stylelint 17 compatibility resolved
- Standard configs enforce stricter CSS conventions (e.g., shorthand properties, value keywords) which may surface new warnings in consumer projects
- Vue SFC linting continues to work via postcss-html, which is the approach recommended by Stylelint's official documentation
