# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shared configuration package (`@fvena/kata`) providing unified ESLint, Prettier, Stylelint, TypeScript, and Markdownlint configs. Published to npm as a single package with multiple export paths. ESM-only (`"type": "module"`). Requires Node >=22.11.0.

## Commands

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Typecheck:** `npm run typecheck`
- **Release:** `npm run release` (bumps version, updates CHANGELOG, pushes tag — does NOT publish to npm; publishing happens via GitHub Actions on `chore(release):` commits)

There are no tests — this is a configuration-only package.

## Architecture

```
eslint/
  _base.js      ← core flat config with all plugins (10+), shared by node/browser
  node.js       ← adds node globals, imports _base
  browser.js    ← adds browser globals, imports _base
prettier/index.js       ← shared Prettier config
stylelint/index.js      ← shared Stylelint config (CSS/SCSS/Vue)
typescript/
  tsconfig.node.json    ← strict TS config for Node
  tsconfig.browser.json ← extends node, adds DOM libs
markdown/markdownlint.json
```

Consumers import via package exports: `@fvena/kata/eslint/node`, `@fvena/kata/prettier`, etc. The export map in `package.json` is critical — any new config file must have a corresponding export entry.

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
