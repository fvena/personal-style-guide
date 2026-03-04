# Roadmap: @fvena/kata

## Overview

Take an existing, functional config package from "works for me" to "portfolio-grade v1.0". The journey follows the project's hierarchy: demonstrate technical judgment first, build infrastructure to back it up, then polish the presentation.

## Phases

- [ ] **Phase 1: Audit & Research** - Assess current state, identify gaps, produce actionable findings
- [ ] **Phase 2: Testing & CI** - Tests with real coverage running in CI, functional badges
- [ ] **Phase 3: Vitest Config** - Opt-in Vitest config (resolve internal inconsistency)
- [ ] **Phase 4: Presentation** - README as landing page, docs accurate, Design Philosophy visible
- [ ] **Phase 5: Release v1.0** - Version bump, CHANGELOG, tag, clean publish

## Phase Details

### Phase 1: Audit & Research

**Goal**: Understand exactly what exists, what's missing, and what "portfolio-grade" means concretely for this project
**Depends on**: Nothing
**Plans**: 2 plans

Plans:

- [ ] 01-01: Audit codebase — tests, CI, docs, configs, export map, package.json
- [ ] 01-02: Research — compare with top config packages (antfu, airbnb, standard), identify portfolio differentiators

### Phase 2: Testing & CI

**Goal**: Every config has meaningful tests, CI runs them on every PR, coverage is reported with real badges
**Depends on**: Phase 1 (findings inform what to test)
**Plans**: 3 plans

Plans:

- [ ] 02-01: Expand test coverage — audit existing 8 test files, fill gaps, add coverage reporting
- [ ] 02-02: CI pipeline — add test + coverage jobs to GitHub Actions workflow
- [ ] 02-03: Badges — wire up coverage badge, verify all badges reflect real state

### Phase 3: Vitest Config

**Goal**: Opt-in Vitest ESLint config that the project itself uses (dog-fooding)
**Depends on**: Phase 2 (testing infrastructure must be solid first)
**Plans**: 2 plans

Plans:

- [ ] 03-01: Create Vitest ESLint config with tests
- [ ] 03-02: Add export entry, documentation, dog-food in project

### Phase 4: Presentation

**Goal**: README communicates technical judgment to someone scanning the repo in 30 seconds
**Depends on**: Phases 2-3 (badges and configs must exist before documenting them)
**Plans**: 2 plans

Plans:

- [ ] 04-01: README redesign — hero, comparison table, Design Philosophy, troubleshooting
- [ ] 04-02: Docs consistency — CLAUDE.md, CONTRIBUTING.md, CHANGELOG accurate

### Phase 5: Release v1.0

**Goal**: Clean, tagged v1.0 release published to npm
**Depends on**: Phase 4
**Plans**: 1 plan

Plans:

- [ ] 05-01: Version bump, CHANGELOG review, tag, verify GitHub Actions publish

## Progress

| Phase               | Plans Complete | Status      | Completed |
| ------------------- | -------------- | ----------- | --------- |
| 1. Audit & Research | 0/2            | Not started | -         |
| 2. Testing & CI     | 0/3            | Not started | -         |
| 3. Vitest Config    | 0/2            | Not started | -         |
| 4. Presentation     | 0/2            | Not started | -         |
| 5. Release v1.0     | 0/1            | Not started | -         |
