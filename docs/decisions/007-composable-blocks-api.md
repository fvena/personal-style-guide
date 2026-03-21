# ADR-007: Expose composable blocks as the public API

**Status:** Accepted
**Date:** 2025-06-01

## Context

Most shared ESLint configs export a single default object. Consumers either accept the entire config or fork it to make changes. This creates an all-or-nothing choice that discourages adoption and makes customization opaque.

## Decision

Export named blocks (`baseIgnores`, `baseJavascript`, `baseTypeScript`, `basePerfectionist`, `baseUnicorn`, `baseRegexp`, `baseComments`, `baseYaml`, `baseMarkdown`) as the public API from `eslint/base.js`. Each preset (node, browser, vue) composes these blocks into its default export. Consumers can import individual blocks to build custom presets without forking:

```js
import { baseTypeScript, basePerfectionist } from '@franvena/kata/eslint/base'
```

Opt-in configs follow the same composable principle. Vitest (`eslint/vitest.js`) and Playwright (`eslint/playwright.js`) are independent blocks scoped to specific file patterns (e.g., `**/*.test.ts`, `**/*.spec.ts`). They are not bundled into the base or framework presets -- consumers add them explicitly when their project uses those tools:

```js
import eslintNode from '@franvena/kata/eslint/node'
import eslintVitest from '@franvena/kata/eslint/vitest'

export default defineConfig([...eslintNode, ...eslintVitest])
```

Each opt-in config is self-contained with its own plugin, rules, and file patterns.

## Alternatives Considered

- **Single default export** -- simpler API surface, but no granularity. Consumers who disagree with one block must override rules individually or fork the entire config.
- **Plugin-based architecture** -- more complex infrastructure (plugin registration, rule namespacing) for a problem that flat config's array composition already solves.

## Consequences

- Consumers can audit the full rule set by reading the import chain -- no hidden configuration.
- Custom presets are possible without forking: import the blocks you want, spread them into your config array.
- The API surface is larger (multiple named exports instead of one default), but each export is self-documenting by name.
- Opt-in presets (Vitest, Playwright, Testing Library, Turbo) demonstrate the same pattern at the package level: independent, composable, scoped to their file patterns.
