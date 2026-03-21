<div align="center">
  <img src=".github/assets/kata_logo.svg" alt="kata" height="140" />
</div>

<p align="center">
  <strong>Strict by default. Yours to extend.</strong><br/>
  A complete code quality toolkit for Vue&nbsp;3 · Nuxt&nbsp;3 · TypeScript · SCSS
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@franvena/kata">
    <img src="https://img.shields.io/npm/v/@franvena/kata?color=0e7490&label=npm" alt="npm version" />
  </a>
  <a href="https://github.com/fvena/kata/actions">
    <img src="https://github.com/fvena/kata/workflows/CI%2FCD/badge.svg" alt="CI" />
  </a>
  <img src="https://img.shields.io/badge/license-MIT-0e7490" alt="License MIT" />
  <img src="https://img.shields.io/badge/node-%3E%3D22.11.0-0e7490" alt="Node >=22.11.0" />
</p>

<br/>

<details>
<summary><strong>Table of Contents</strong></summary>

- [Motivation](#motivation)
- [Getting Started](#getting-started)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Stylelint](#stylelint)
- [TypeScript](#typescript)
- [Markdown](#markdown)
- [Compatibility](#compatibility)
- [Troubleshooting](#troubleshooting)
- [Design Philosophy](#design-philosophy)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

</details>

---

## Motivation

Getting ESLint, Prettier, Stylelint, and TypeScript to work correctly together in a Vue 3 + Nuxt 3 project is a full day's work — and it breaks again on the next major plugin update. The integration points are non-trivial: `typescript-eslint`'s `strictTypeChecked` must cover `.vue` files without conflicting with `vue-eslint-parser`, Stylelint needs separate config for SCSS-in-Vue scoped styles, and Prettier must be kept completely out of ESLint's rule set to avoid conflicts. `@franvena/kata` absorbs that integration work and keeps it up to date. Install once, configure in minutes, get strict linting across your full stack.

If your stack is **Vue 3 + Nuxt 3 + TypeScript + SCSS**, this is the most complete opinionated setup available as a single package.

---

## Getting Started

### Prerequisites

Install the peer dependencies you need:

```sh
# ESLint only
npm install --save-dev eslint typescript

# ESLint + Prettier
npm install --save-dev eslint prettier typescript

# Full stack
npm install --save-dev eslint prettier stylelint typescript
```

### Installation

```sh
npm install --save-dev @franvena/kata
```

---

## ESLint

### Presets

```js
// eslint.config.js — pick one

import eslintNode from "@franvena/kata/eslint/node";
export default [...eslintNode];

import eslintBrowser from "@franvena/kata/eslint/browser";
export default [...eslintBrowser];

import eslintVue from "@franvena/kata/eslint/vue";
export default [...eslintVue];

import eslintNuxt from "@franvena/kata/eslint/nuxt";
export default [...eslintNuxt];
```

### Extending and overriding rules

```js
import eslintVue from '@franvena/kata/eslint/vue'

export default [
  ...eslintVue,
  {
    rules: {
      'unicorn/no-array-for-each': 'off',
      // Relax SCSS enforcement during migration
      'vue/block-lang': ['error', { script: { lang: 'ts' }, style: { lang: ['scss', 'css'] } }]
    }
  }
]
```

### Composable config blocks

Import only what you need from `@franvena/kata/eslint/base`:

```js
import {
  baseIgnores,
  baseJavascript,
  baseTypeScript,
  basePerfectionist,
  baseUnicorn,
  baseComments,
  baseRegexp,
  baseYaml,
  baseMarkdown
} from '@franvena/kata/eslint/base'

export default [...baseIgnores, ...baseJavascript, ...baseTypeScript, ...basePerfectionist]
```

| Block               | Description                              |
| ------------------- | ---------------------------------------- |
| `baseIgnores`       | Global ignore patterns                   |
| `baseJavascript`    | JS recommended + Node.js plugin          |
| `baseTypeScript`    | Strict type-checked TS rules + parser    |
| `basePerfectionist` | Import and code organization sorting     |
| `baseUnicorn`       | Modern JS best practices                 |
| `baseRegexp`        | Regex correctness rules                  |
| `baseComments`      | ESLint directive comment rules           |
| `baseTsdoc`         | TSDoc validation — **opt-in**, see below |
| `baseYaml`          | YAML linting                             |
| `baseMarkdown`      | Lint JS/TS code blocks inside Markdown   |

### Plugins included

| Plugin                                                                                                                 | Purpose                              |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [`@eslint/js`](https://github.com/eslint/eslint)                                                                       | JavaScript recommended rules         |
| [`typescript-eslint`](https://typescript-eslint.io)                                                                    | Strict TypeScript rules + parser     |
| [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)                                               | Node.js-specific rules               |
| [`eslint-plugin-perfectionist`](https://perfectionist.dev)                                                             | Import and code organization sorting |
| [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)                                       | Modern JS/TS best practices          |
| [`eslint-plugin-regexp`](https://github.com/ota-meshi/eslint-plugin-regexp)                                            | Regex correctness                    |
| [`eslint-plugin-tsdoc`](https://www.npmjs.com/package/eslint-plugin-tsdoc)                                             | TSDoc validation (opt-in)            |
| [`@eslint-community/eslint-plugin-eslint-comments`](https://github.com/eslint-community/eslint-plugin-eslint-comments) | ESLint directive comment rules       |
| [`eslint-plugin-yml`](https://github.com/ota-meshi/eslint-plugin-yml)                                                  | YAML linting                         |
| [`@eslint/markdown`](https://github.com/eslint/markdown)                                                               | Lint code blocks inside Markdown     |

### Opt-in: TSDoc validation

Only useful for libraries that publish API documentation:

```js
import { baseTsdoc } from '@franvena/kata/eslint/base'
import eslintNode from '@franvena/kata/eslint/node'

export default [...eslintNode, ...baseTsdoc]
```

### Vue 3

```js
import eslintVue from '@franvena/kata/eslint/vue'
export default [...eslintVue]
```

Enforces on top of the base config:

- `<script setup>` only — no Options API
- Block order: `<script>` → `<template>` → `<style>`
- `lang="ts"` on `<script>`, `lang="scss"` on `<style>`
- Type-based `defineProps<{}>()` and `defineEmits<{}>()`
- Scoped or module styles only — no global `<style>`
- Shorthand directives (`:prop`, `@event`)
- Reactive props destructuring (Vue 3.5+)
- WCAG accessibility via `eslint-plugin-vuejs-accessibility`

### Nuxt 3

#### Standalone

```js
import eslintNuxt from '@franvena/kata/eslint/nuxt'
export default [...eslintNuxt]
```

#### With `@nuxt/eslint` module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  eslint: { config: { standalone: false } }
})
```

```js
// eslint.config.js
import eslintNuxt from '@franvena/kata/eslint/nuxt'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([...eslintNuxt])
```

### Opt-in: Playwright

Install the required peer dependency:

```sh
npm install --save-dev eslint-plugin-playwright
```

Then configure:

```js
import eslintPlaywright from '@franvena/kata/eslint/playwright'
```

### Opt-in: Vitest

Install the required peer dependency:

```sh
npm install --save-dev eslint-plugin-vitest
```

Then configure:

```js
import eslintVitest from '@franvena/kata/eslint/vitest'
```

### Opt-in: Testing Library

Install the required peer dependency:

```sh
npm install --save-dev eslint-plugin-testing-library
```

Then configure:

```js
import eslintTestingLibrary from '@franvena/kata/eslint/testing-library'
```

### Opt-in: Turborepo

Install the required peer dependency:

```sh
npm install --save-dev eslint-config-turbo
```

Then configure:

```js
import eslintTurbo from '@franvena/kata/eslint/turbo'
```

---

## Prettier

```js
// prettier.config.js
export { default } from '@franvena/kata/prettier'
```

```js
// extend
import prettierConfig from '@franvena/kata/prettier'
export default { ...prettierConfig }
```

**Why Prettier is not an ESLint plugin**: ESLint owns code quality, Prettier owns formatting — they don't overlap. `eslint-config-prettier` disables all formatting rules so there are zero conflicts and no duplicate work in the IDE.

---

## Stylelint

```js
// stylelint.config.js
export default {
  extends: ['@franvena/kata/stylelint']
}
```

Includes `stylelint-config-recommended`, `stylelint-config-recommended-scss`, `stylelint-config-recommended-vue/scss`, and `stylelint-config-recess-order`.

---

## TypeScript

```json
{ "extends": "@franvena/kata/typescript/node" }
```

```json
{ "extends": "@franvena/kata/typescript/browser" }
```

Strict mode, `noUncheckedIndexedAccess`, modern module settings. Based on [Matt Pocock's TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet).

---

## Markdown

```json
{ "extends": "@franvena/kata/markdown" }
```

> Requires the [markdownlint VS Code extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

---

## Compatibility

| Tool       | Supported versions |
| ---------- | ------------------ |
| Node.js    | >=22.11.0          |
| ESLint     | ^9.0.0             |
| TypeScript | ^5.0.0             |
| Vue        | ^3.4.0             |
| Nuxt       | ^3.10.0            |
| Prettier   | ^3.0.0             |
| Stylelint  | ^17.0.0            |

---

## Troubleshooting

### `projectService` errors: cannot find tsconfig

**Symptom**: `Error: No tsconfig.json found for file X`.

**Fix — root config files** (`eslint.config.js`, `vite.config.ts`): add a `tsconfig.node.json` that covers them:

```json
{
  "extends": "@franvena/kata/typescript/node",
  "include": ["*.config.ts", "*.config.js"]
}
```

**Fix — monorepo**: each package needs its own `tsconfig.json` with an `include` that covers all linted files.

---

### `vue/block-lang` errors on an existing project

**Symptom**: Every `.vue` file errors with `Expected "scss" as the lang of the "style" block.`

**Fix**: Relax while migrating, then tighten once complete:

```js
export default [...eslintVue, { rules: { 'vue/block-lang': 'warn' } }]
```

---

### Conflicts with `@nuxt/eslint` module

**Fix**: Set `standalone: false` in `nuxt.config.ts`. See [Nuxt 3 with `@nuxt/eslint` module](#with-nuxt-eslint-module).

---

### Accessibility false positives

**Fix**: Disable the rule if it has no configuration options that fit your case:

```js
export default [
  ...eslintVue,
  { rules: { 'vuejs-accessibility/click-events-have-key-events': 'off' } }
]
```

---

## Design Philosophy

These are the deliberate decisions behind this config — not just what the rules do, but why.

**Flat config over legacy `.eslintrc`** — ESLint 9's flat config is the only supported format. Native JavaScript composition via array spread, no implicit merging, no hidden config resolution. Every rule is traceable.
→ [Full decision: ADR-001](./docs/decisions/001-flat-config.md)

**`strictTypeChecked` over `recommended`** — The most rigorous TypeScript-ESLint preset. Requires type information for every rule, which means slower linting but catches unsafe assignments, unhandled promise rejections, and incorrect nullish coalescing that type-unaware rules miss entirely. The performance cost is acceptable; the safety gain is not optional.
→ [Full decision: ADR-002](./docs/decisions/002-strict-type-checked.md)

**`projectService` over `project: [...]`** — Auto-discovers `tsconfig.json` files relative to each linted file. Handles monorepos, nested packages, and workspace setups without manual path arrays. Tradeoff: `tsconfigRootDir` points to the package root, not the consumer's project — intentional, documented in source.
→ [Full decision: ADR-003](./docs/decisions/003-project-service.md)

**Prettier is not an ESLint plugin** — ESLint runs on every keystroke; formatting errors add noise. `eslint-config-prettier` disables all formatting rules from every plugin so there are zero conflicts. Single responsibility: ESLint owns correctness, Prettier owns style.
→ [Full decision: ADR-004](./docs/decisions/004-prettier-separation.md)

**Vue SFCs enforce TypeScript and SCSS** — `vue/block-lang` requires `lang="ts"` and `lang="scss"`. Mixed-language SFCs create inconsistency that accumulates into maintenance debt. The default is strict; override explicitly if you need flexibility.
→ [Full decision: ADR-005](./docs/decisions/005-vue-scss-enforcement.md)

**Scoped or module styles only** — `vue/enforce-style-attribute` with `["scoped", "module"]`. Global `<style>` blocks are the most common source of CSS leakage in Vue apps. If you need global styles, use a standalone `.scss` file.
→ [Full decision: ADR-006](./docs/decisions/006-scoped-styles-only.md)

**Composable blocks as the public API** — Named exports (`baseIgnores`, `baseTypeScript`, etc.) instead of a single opaque object. Each preset is composed from these blocks — no hidden configuration. Consumers can audit the full rule set by reading the import chain, and build custom presets without forking.
→ [Full decision: ADR-007](./docs/decisions/007-composable-blocks-api.md)

---

## Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:css": "stylelint 'src/**/*.{scss,css,vue}'",
    "format": "prettier --write ."
  }
}
```

---

## What's next

- **Biome** doesn't support Vue SFCs yet — we're watching it closely. If full SFC support lands, we'll evaluate it as a replacement for ESLint + Prettier. See [ADR-001](./docs/decisions/001-flat-config.md) for the full context.
- CSS-in-JS support (`@vanilla-extract`, `panda-css`) if there's demand from the community

## Out of scope

- **React/JSX** — different ecosystem, out of focus
- **JSON linting** — deferred until `@eslint/json` is compatible with files-scoped base config blocks

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/). As a linting config, rule changes follow this contract:

- **New rules that produce warnings** → minor version bump
- **New rules that produce errors, or existing rules becoming stricter** → major version bump
- **Bug fixes to existing rules** → patch version bump

Upgrade with confidence — breaking lint changes are always major versions.

---

## Also by @fvena

- [**kovo**](https://github.com/fvena/kovo) — Git submodule management for multi-repo workflows
- [**kenso**](https://github.com/fvena/kenso) — Knowledge base CLI for LLM coding agents

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, conventions, and release process.

---

## License

[MIT](./LICENSE) © [Francisco Vena](https://www.fvena.com)
