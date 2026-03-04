<div align="center">

# @fvena/style-guide

**Zero-config, opinionated linting and formatting for TypeScript, Vue, and Nuxt projects.**

Unified ESLint, Prettier, Stylelint, and TypeScript configurations — install once, lint everything.

[![npm version](https://img.shields.io/npm/v/personal-style-guide)](https://www.npmjs.com/package/personal-style-guide)
[![CI](https://github.com/fvena/personal-style-guide/workflows/CI%2FCD/badge.svg)](https://github.com/fvena/personal-style-guide/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node >=22.11.0](https://img.shields.io/badge/node-%3E%3D22.11.0-brightgreen)](https://nodejs.org)

</div>

---

## Table of Contents

- [Motivation](#motivation)
- [Getting Started](#getting-started)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Stylelint](#stylelint)
- [TypeScript](#typescript)
- [Markdown](#markdown)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Motivation

Configuring ESLint, Prettier, Stylelint, and TypeScript from scratch on every new project is repetitive and error-prone. This package centralizes those configurations so you get a consistent, well-reasoned setup that you can extend — not fight.

**What makes this different:**

- Built for **flat ESLint config** (`eslint.config.js`) from the ground up — no legacy compat layers.
- **Composable by design**: import the full preset or cherry-pick individual config blocks.
- Covers the full **Vue 3 + Nuxt 3 + TypeScript + SCSS** stack out of the box.
- **Prettier and ESLint are kept separate** — no formatting rules in ESLint, no linting in Prettier. Faster IDE, no conflicts.
- Every disabled rule has an **inline explanation** of why.

---

## Getting Started

### Prerequisites

Install peer dependencies at your project root:

```sh
npm install --save-dev eslint prettier stylelint typescript
```

### Installation

```sh
npm install --save-dev personal-style-guide
```

That's it. Pick the config for your environment below.

---

## ESLint

### Plugins included

| Plugin                                                                                                                 | Purpose                                |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [`@eslint/js`](https://github.com/eslint/eslint)                                                                       | JavaScript recommended rules           |
| [`typescript-eslint`](https://typescript-eslint.io)                                                                    | Strict TypeScript rules + parser       |
| [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)                                               | Node.js-specific rules                 |
| [`eslint-plugin-perfectionist`](https://perfectionist.dev)                                                             | Import and code organization sorting   |
| [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)                                       | Modern JS/TS best practices            |
| [`eslint-plugin-regexp`](https://github.com/ota-meshi/eslint-plugin-regexp)                                            | Regex correctness and readability      |
| [`eslint-plugin-tsdoc`](https://www.npmjs.com/package/eslint-plugin-tsdoc)                                             | TSDoc comment validation (opt-in)      |
| [`@eslint-community/eslint-plugin-eslint-comments`](https://github.com/eslint-community/eslint-plugin-eslint-comments) | ESLint disable comment rules           |
| [`eslint-plugin-yml`](https://github.com/ota-meshi/eslint-plugin-yml)                                                  | YAML file linting                      |
| [`@eslint/markdown`](https://github.com/eslint/markdown)                                                               | Lint JS/TS code blocks inside Markdown |

### Presets

Choose the preset that matches your environment:

```js
// eslint.config.js

// Node.js projects
import eslintNode from "personal-style-guide/eslint/node";
export default [...eslintNode];

// Browser projects
import eslintBrowser from "personal-style-guide/eslint/browser";
export default [...eslintBrowser];

// Vue 3 projects
import eslintVue from "personal-style-guide/eslint/vue";
export default [...eslintVue];

// Nuxt 3 projects
import eslintNuxt from "personal-style-guide/eslint/nuxt";
export default [...eslintNuxt];
```

### Composable config blocks

If you only need specific parts, import individual blocks from `personal-style-guide/eslint/base`:

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
  baseMarkdown,
} from "personal-style-guide/eslint/base";

export default [...baseIgnores, ...baseJavascript, ...baseTypeScript, ...basePerfectionist];
```

Available blocks:

| Export              | Description                                     |
| ------------------- | ----------------------------------------------- |
| `baseIgnores`       | Global ignore patterns (`node_modules`, `dist`) |
| `baseJavascript`    | JS recommended rules + Node.js plugin           |
| `baseTypeScript`    | Strict type-checked TS rules + parser           |
| `basePerfectionist` | Import and code organization sorting            |
| `baseUnicorn`       | Modern JS best practices                        |
| `baseRegexp`        | Regex correctness rules                         |
| `baseComments`      | ESLint directive comment rules                  |
| `baseTsdoc`         | TSDoc validation — **opt-in only**, see below   |
| `baseYaml`          | YAML file linting                               |
| `baseMarkdown`      | Lint JS/TS code blocks inside Markdown          |

### Opt-in: TSDoc validation

`baseTsdoc` is not included by default — it's only useful for libraries that publish API documentation. Enable it explicitly:

```js
import { baseTsdoc } from "personal-style-guide/eslint/base";
import eslintNode from "personal-style-guide/eslint/node";

export default [...eslintNode, ...baseTsdoc];
```

### Vue 3

For Vue 3 projects using Composition API + `<script setup>` + TypeScript + SCSS:

```js
import eslintVue from "personal-style-guide/eslint/vue";

export default [...eslintVue];
```

Adds on top of the base config:

- **`eslint-plugin-vue`** `flat/vue3-recommended` as the rule foundation
- **`vue-eslint-parser`** for `.vue` files with TypeScript inner parser
- Enforces `<script setup>` (no Options API)
- Block order: `<script>` → `<template>` → `<style>`
- Type-based `defineProps<{}>()` and `defineEmits<{}>()`
- Scoped or module styles only — no global `<style>`
- Shorthand directives (`:prop`, `@event`)
- **`eslint-plugin-vuejs-accessibility`** for WCAG compliance

### Nuxt 3

Extends the [Vue 3 config](#vue-3) and adds Nuxt-specific rules from [`@nuxt/eslint-config`](https://eslint.nuxt.com).

#### Standalone usage

```js
import eslintNuxt from "personal-style-guide/eslint/nuxt";

export default [...eslintNuxt];
```

#### With `@nuxt/eslint` module

If you use the [`@nuxt/eslint`](https://eslint.nuxt.com/packages/module) Nuxt module, disable its standalone config to avoid duplicate rules:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/eslint"],
  eslint: {
    config: {
      standalone: false,
    },
  },
});
```

```js
// eslint.config.js
import eslintNuxt from "personal-style-guide/eslint/nuxt";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([...eslintNuxt]);
```

This lets the Nuxt module inject project-aware settings (auto-imported composables, component paths) while your config handles all linting rules.

### Opt-in: Playwright

For projects with Playwright E2E tests:

```js
import eslintNode from "personal-style-guide/eslint/node";
import eslintPlaywright from "personal-style-guide/eslint/playwright";

export default [...eslintNode, ...eslintPlaywright];
```

Applies to `**/*.spec.ts`, `**/e2e/**/*.ts`, `**/tests/**/*.ts`.

| Rule                         | What it enforces                        |
| ---------------------------- | --------------------------------------- |
| `flat/recommended`           | Playwright recommended rules            |
| `playwright/expect-expect`   | Every test must contain an assertion    |
| `playwright/no-focused-test` | No `.only()` tests slip into CI         |
| `no-console` off             | Allows console output in E2E test files |

### Opt-in: Testing Library

For component tests using `@testing-library/vue`:

```js
import eslintTestingLibrary from "personal-style-guide/eslint/testing-library";
import eslintVue from "personal-style-guide/eslint/vue";

export default [...eslintVue, ...eslintTestingLibrary];
```

### Opt-in: Turborepo

For monorepos using [Turborepo](https://turbo.build):

```js
import eslintNode from "personal-style-guide/eslint/node";
import eslintTurbo from "personal-style-guide/eslint/turbo";

export default [...eslintNode, ...eslintTurbo];
```

---

## Prettier

Create or update `.prettierrc.config.js` in your project root:

```js
export { default } from "personal-style-guide/prettier";
```

To extend:

```js
import prettierConfig from "personal-style-guide/prettier";

export default {
  ...prettierConfig,
  // your overrides here
};
```

### Why Prettier is separate from ESLint

Keeping Prettier and ESLint separate means:

- **Faster IDE**: linters don't process formatting errors.
- **No conflicts**: `eslint-config-prettier` disables all ESLint formatting rules, so there's a single source of truth for formatting.
- **Clearer errors**: lint errors are code quality issues, not style nits.

---

## Stylelint

Create or update `stylelint.config.js` in your project root:

```js
export default {
  extends: ["personal-style-guide/stylelint"],
};
```

Includes:

- `stylelint-config-recommended` — base CSS rules
- `stylelint-config-recommended-scss` — SCSS support
- `stylelint-config-recommended-vue/scss` — Vue SFC style block support
- `stylelint-config-recess-order` — consistent property ordering

---

## TypeScript

Extend one of the provided base configs:

```json
{
  "extends": "personal-style-guide/typescript/node"
}
```

Or for browser/DOM projects:

```json
{
  "extends": "personal-style-guide/typescript/browser"
}
```

Both configs are based on [Matt Pocock's TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet) with strict mode, `noUncheckedIndexedAccess`, and modern module settings.

---

## Markdown

> **Note:** Designed for [`markdownlint`](https://github.com/DavidAnson/markdownlint). Install the VS Code extension for the best experience.

Create or update `.markdownlint.json`:

```json
{
  "extends": "personal-style-guide/markdown"
}
```

---

## Scripts

Add these to your `package.json`:

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

## Roadmap

- [x] ESLint flat config for Node, Browser, Vue, Nuxt
- [x] Prettier shared config
- [x] Stylelint config with SCSS + Vue support
- [x] TypeScript base configs (Node + Browser)
- [x] Markdownlint config
- [x] YAML linting via `eslint-plugin-yml`
- [x] Playwright opt-in config
- [x] Testing Library opt-in config
- [x] Turborepo opt-in config
- [ ] Vitest opt-in config
- [ ] `@eslint/json` config for JSON file linting

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, conventions, and the release process.

---

## License

[MIT](./LICENSE) © [Francisco Vena](https://www.fvena.com)
