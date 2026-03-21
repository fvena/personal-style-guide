# Architecture Decision Records

| ADR                                   | Decision                                    | Status   |
| ------------------------------------- | ------------------------------------------- | -------- |
| [001](./001-flat-config.md)           | Use ESLint flat config format               | Accepted |
| [002](./002-strict-type-checked.md)   | Use `strictTypeChecked` over `recommended`  | Accepted |
| [003](./003-project-service.md)       | Use `projectService` over `project: [...]`  | Accepted |
| [004](./004-prettier-separation.md)   | Keep Prettier separate from ESLint          | Accepted |
| [005](./005-vue-scss-enforcement.md)  | Enforce TypeScript and SCSS in Vue SFCs     | Accepted |
| [006](./006-scoped-styles-only.md)    | Require scoped or module styles in Vue SFCs | Accepted |
| [007](./007-composable-blocks-api.md) | Expose composable blocks as the public API  | Accepted |
| [008](./008-node-22-minimum.md)       | Require Node >=22.11.0                      | Accepted |

> **Note:** These ADRs were formalized in March 2026 from decisions made during development of v0.2–v1.1. The dates reflect when each decision was originally made, not when it was documented. Formalizing existing decisions as ADRs is a legitimate and recommended practice — the goal is to capture the reasoning, not to pretend the process was always this structured.
