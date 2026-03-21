# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shared configuration package (`@franvena/kata`) providing unified ESLint, Prettier, Stylelint, TypeScript, and Markdownlint configs. Published to npm as a single package with multiple export paths. ESM-only (`"type": "module"`). Requires Node >=22.11.0.

## Commands

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Typecheck:** `npm run typecheck`
- **Release:** `npm run release` (bumps version, updates CHANGELOG, pushes tag — does NOT publish to npm; publishing happens via GitHub Actions on `chore(release):` commits)

- **Test:** `npm run test` (Vitest — behavioral tests proving configs load and rules apply correctly)
- **Test watch:** `npm run test:watch`

## Architecture

```
eslint/
  base.js         ← core flat config with all plugins (10+), composable named exports
  node.js         ← adds node globals, imports base
  browser.js      ← adds browser globals, imports base
  vue.js          ← Vue 3 SFC rules (script setup, block-lang, scoped styles)
  nuxt.js         ← Nuxt 3 auto-imports, extends vue
  playwright.js   ← opt-in: Playwright test rules
  testing-library.js ← opt-in: Testing Library (Vue) rules
  turbo.js        ← opt-in: Turborepo rules
  vitest.js       ← opt-in: Vitest test rules
prettier/index.js       ← shared Prettier config
stylelint/index.js      ← shared Stylelint config (CSS/SCSS/Vue)
typescript/
  tsconfig.node.json    ← strict TS config for Node
  tsconfig.browser.json ← extends node, adds DOM libs
markdown/markdownlint.json
tests/                  ← Vitest behavioral tests + fixtures
docs/decisions/         ← Architecture Decision Records (ADRs)
```

Consumers import via package exports: `@franvena/kata/eslint/node`, `@franvena/kata/prettier`, etc. The export map in `package.json` is critical — any new config file must have a corresponding export entry. Adding a new top-level directory also requires updating the `files` field.

## Dependency Classification

- **`dependencies`** — ESLint/Stylelint/Prettier plugins and shared configs. Consumers need these at runtime when the config is loaded.
- **`devDependencies`** — Dev tooling for this repo only (commitlint, husky, release-it, vitest).
- **`peerDependencies`** — The tools themselves (`eslint`, `prettier`, `stylelint`, `typescript`). All are `optional: true` except `eslint`, which is required. This lets consumers install only the tools they use.

## Key Design Decisions

- **ESLint for validation only, Prettier for formatting only** — no overlap, better IDE performance.
- **TypeScript handles import resolution** — redundant ESLint import checks are disabled for performance.
- **ESLint uses flat config format** with `typescript-eslint` project service for type-aware linting.
- **Perfectionist plugin** handles code organization (sorting imports, interfaces, etc.).
- **Unicorn plugin** enforces modern JS best practices with custom abbreviation allowlist (`dir`, `env`).

## Conventions

- **Conventional Commits** enforced by commitlint + husky hooks (`feat:`, `fix:`, `chore:`, etc.).
- **Lint-staged** runs Prettier and ESLint --fix on pre-commit.
- Print width: 100 chars, 2-space indent, single quotes, no semicolons, no trailing commas.
