---
phase: 02-adrs-readme
plan: 02
status: completed
completed: 2026-03-21
---

## Summary

Linked all 7 ADRs from the README Design Philosophy section and fixed multiple inaccuracies in CLAUDE.md.

## Tasks Completed

### Task 1: Add ADR links to README Design Philosophy section
- Added new paragraph for ADR-001 (flat config) at the top of Design Philosophy
- Appended ADR link lines after each of the 6 existing decision paragraphs (ADR-002 through ADR-007)
- Zero existing prose removed or rewritten -- diff shows only additions
- Marked Vitest roadmap checkbox as complete

### Task 2: Fix CLAUDE.md accuracy
- Fixed package name: `@fvena/kata` -> `@franvena/kata` (2 occurrences)
- Replaced "no tests" statement with `npm run test` and `npm run test:watch` commands
- Updated architecture diagram: `_base.js` -> `base.js`, added all 9 eslint configs (base, node, browser, vue, nuxt, playwright, testing-library, turbo, vitest), added `tests/` and `docs/decisions/` directories
- Updated export path examples to use correct package name

## Verification

- [x] README Design Philosophy has ADR links for all 7 decisions
- [x] README prose content unchanged (only additions)
- [x] README Vitest roadmap checkbox marked
- [x] CLAUDE.md package name is `@franvena/kata` throughout
- [x] CLAUDE.md documents test commands
- [x] CLAUDE.md architecture diagram matches actual file structure (9 eslint configs + tests + docs/decisions)
- [x] `npm run lint` passes
- [x] All 7 ADR link targets exist in `docs/decisions/`

## Files Modified

- `README.md`
- `CLAUDE.md`

## Files Created

- `.planning/phases/02-adrs-readme/02-02-SUMMARY.md`
