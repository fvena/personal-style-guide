# ADR-013: Tooling migration path principle

**Status:** Accepted
**Date:** 2026-03

## Context

kata uses ESLint + Prettier because they are the only tools with complete coverage for Vue SFC + SCSS + type-aware rules. Alternative tools (Biome, Oxlint, oxfmt) are maturing rapidly but don't yet cover the full surface.

## Decision

kata is pragmatic about its tooling stack. The architecture of package exports (`@franvena/kata/eslint/node`, `@franvena/kata/stylelint`, etc.) is designed so that underlying tools can be replaced without changing the consumer-facing API.

When evaluating tool changes:

1. **Coverage first**: A replacement must cover the same rule surface. Partial coverage with fallbacks adds complexity without reducing the dependency count.
2. **Stability requirement**: Tools must be at 1.0 or have a clear stability commitment before integration into default presets.
3. **Opt-in before default**: New tools enter as composable blocks (like `baseOxlint`) before being included in default exports.
4. **Quarterly review**: Evaluate Biome Vue SFC support, Oxlint type-aware rules, and oxfmt progress each quarter.

## Consequences

- Consumers are insulated from tool churn — their config files reference kata exports, not tool-specific APIs
- New tools can be tested as opt-in blocks without breaking existing users
- The decision to migrate a tool is explicit and documented via ADR
