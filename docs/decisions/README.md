# Architecture Decision Records

| ADR                                        | Decision                                            | Status   |
| ------------------------------------------ | --------------------------------------------------- | -------- |
| [001](./001-flat-config.md)                | Use ESLint flat config format                       | Accepted |
| [002](./002-strict-type-checked.md)        | Use `strictTypeChecked` over `recommended`          | Accepted |
| [003](./003-project-service.md)            | Use `projectService` over `project: [...]`          | Accepted |
| [004](./004-prettier-separation.md)        | Keep Prettier separate from ESLint                  | Accepted |
| [005](./005-vue-scss-enforcement.md)       | Enforce TypeScript and SCSS in Vue SFCs             | Accepted |
| [006](./006-scoped-styles-only.md)         | Require scoped or module styles in Vue SFCs         | Accepted |
| [007](./007-composable-blocks-api.md)      | Expose composable blocks as the public API          | Accepted |
| [008](./008-node-22-minimum.md)            | Require Node >=22.11.0                              | Accepted |
| [009](./009-eslint-prettier-base.md)       | ESLint + Prettier as the core technology stack      | Accepted |
| [010](./010-eslint-v10-features.md)        | ESLint v10 feature adoption                         | Accepted |
| [011](./011-stylelint-standard-and-vue.md) | Stylelint standard configs and Vue via postcss-html | Accepted |
| [012](./012-oxlint-precheck.md)            | Oxlint as opt-in performance layer                  | Accepted |
| [013](./013-tooling-migration-path.md)     | Tooling migration path principle                    | Accepted |
| [014](./014-vue-nuxt-peer-dependencies.md) | Vue and Nuxt plugins as optional peer dependencies  | Accepted |

> These ADRs were formalized in March 2026 from decisions made progressively during development of v0.2–v1.1. The dates on each record reflect when the decision was originally made, not when it was written down.
