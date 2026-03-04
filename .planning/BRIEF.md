# @fvena/kata

## Current State (Updated: 2026-03-20)

**Shipped:** v0.7.0 (pre-1.0, npm published)
**Status:** In use for personal projects, pre-portfolio
**Codebase:**

- ~530 lines of config (ESLint, Prettier, Stylelint, TypeScript, Markdownlint)
- 8 test files with Vitest (ESLint configs, Prettier, Stylelint, TypeScript)
- CI/CD: GitHub Actions (lint, typecheck — tests NOT yet in pipeline)
- ESM-only, Node >=22.11.0

**Known Issues:**

- CLAUDE.md says "no tests" but tests exist — docs out of sync
- CI runs lint + typecheck but does NOT run tests
- No test coverage reporting or badges
- README partially redesigned (WIP in working tree)
- Vitest config not offered as opt-in despite project using Vitest internally

## v1.0 Goals

**Vision:** Make this repo a senior-level portfolio piece. A CTO/tech lead should look at it and see deliberate technical judgment — not just tool configuration, but documented decisions, real infrastructure, and polished presentation.

**Motivation:**

- Portfolio differentiator: demonstrate senior-level engineering judgment
- Internal consistency: project uses Vitest but doesn't offer Vitest config
- Credibility: badges and CI must reflect real, passing infrastructure

**Hierarchy:** Criterio técnico demostrable → Infraestructura que lo respalda → Presentación que lo comunica.

**Scope (v1.0):**

- Tests running in CI with coverage reporting
- Vitest opt-in config (resolves internal inconsistency)
- Functional badges (CI status, coverage, npm version)
- README as landing page (hero, comparison table, Design Philosophy, troubleshooting)
- Clean, consistent documentation (CLAUDE.md accurate, CONTRIBUTING.md current)

**Success Criteria:**

- [ ] `npm test` passes with meaningful coverage across all configs
- [ ] CI pipeline runs lint + typecheck + tests on every PR
- [ ] Coverage badge shows real percentage (not a placeholder)
- [ ] README communicates technical judgment to a non-user scanning the repo
- [ ] Vitest opt-in config exists and is tested
- [ ] A developer can go from zero to linting in under 5 minutes following the README

**Out of Scope:**

- VitePress docs site (v1.1 horizon)
- React/JSX config (roadmap, not v1.0)
- `@eslint/json` config (roadmap, not v1.0)
- Landing page separate from README
- Marketing or social media presence
