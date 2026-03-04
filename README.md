<div align="center">

# @fvena/style-guide

**Zero-config, opinionated linting and formatting for TypeScript, Vue, and Nuxt projects.**

Unified ESLint, Prettier, Stylelint, and TypeScript configurations — install once, lint everything.

[![npm version](https://img.shields.io/npm/v/@fvena/style-guide)](https://www.npmjs.com/package/@fvena/style-guide)
[![CI](https://github.com/fvena/style-guide/workflows/CI%2FCD/badge.svg)](https://github.com/fvena/style-guide/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node >=22.11.0](https://img.shields.io/badge/node-%3E%3D22.11.0-brightgreen)](https://nodejs.org)

</div>

---

## Table of Contents

- [Motivation](#motivation)
- [Design Philosophy](#design-philosophy)
- [Getting Started](#getting-started)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Stylelint](#stylelint)
- [TypeScript](#typescript)
- [Markdown](#markdown)
- [Compatibility](#compatibility)
- [Troubleshooting](#troubleshooting)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Motivation

Configuring ESLint, Prettier, Stylelint, and TypeScript from scratch on every new project is repetitive and error-prone. This package centralizes those configurations so you get a consistent, well-reasoned setup that you can extend — not fight.

**What makes this different from `@antfu/eslint-config` or `eslint-config-airbnb`:**

| Feature                                  | @fvena/style-guide | @antfu/eslint-config | eslint-config-airbnb |
| ---------------------------------------- | :----------------: | :------------------: | :------------------: |
| Vue 3 + `<script setup>` enforcement     |         ✅         |          ✅          |          ❌          |
| Nuxt 3 integration                       |         ✅         |          ✅          |          ❌          |
| SCSS `lang` enforcement in Vue SFCs      |         ✅         |          ❌          |          ❌          |
| Stylelint included                       |         ✅         |          ❌          |          ❌          |
| Vue accessibility (WCAG) rules           |         ✅         |          ❌          |          ❌          |
| Playwright + Testing Library opt-in      |         ✅         |          ❌          |          ❌          |
| Composable config blocks                 |         ✅         |          ✅          |          ❌          |
| Flat config native                       |         ✅         |          ✅          |   ⚠️ compat layer    |
| Prettier separate (no ESLint formatting) |         ✅         |          ❌          |          ❌          |

If your stack is Vue 3 + Nuxt 3 + TypeScript + SCSS, this is the most complete and opinionated setup available as a single package.

---

## Design Philosophy

These are the deliberate decisions behind this config — not just what the rules do, but why.

**1. `strictTypeChecked` over `recommended`**

TypeScript-ESLint offers three presets: `recommended`, `strict`, and `strictTypeChecked`. This config uses `strictTypeChecked` — the most rigorous. It requires type information for every rule, which means slower linting but catches a class of bugs that type-unaware rules miss entirely: unsafe assignments, unhandled promise rejections, incorrect nullish coalescing. The performance cost is acceptable; the safety gain is not optional.

**2. `projectService` over `project: [...]`**

The TypeScript parser can be configured with either a static `project` array or the newer `projectService`. This config uses `projectService`, which auto-discovers `tsconfig.json` files relative to each linted file. It handles monorepos, nested packages, and workspace setups without manual path configuration. The tradeoff: `tsconfigRootDir` must point to the package root, not the consumer's project — this is intentional and documented in the source.

**3. Prettier is not an ESLint plugin**

Many configs integrate Prettier via `eslint-plugin-prettier`, making formatting violations appear as ESLint errors. This config deliberately does not do that. ESLint runs on every keystroke; adding formatting errors adds noise and slows down the IDE. More importantly, `eslint-config-prettier` disables all formatting rules from every plugin so there are zero conflicts — ESLint owns code quality, Prettier owns formatting, and they don't overlap.

**4. Vue SFCs enforce TypeScript and SCSS**

The Vue config requires `lang="ts"` on `<script>` blocks and `lang="scss"` on `<style>` blocks via `vue/block-lang`. Mixed-language SFCs — some TypeScript, some plain JS; some SCSS, some CSS — create inconsistency that accumulates into maintenance debt. The default is strict. If your project needs flexibility, override the rule explicitly.

**5. Scoped or module styles only**

The Vue config enforces `vue/enforce-style-attribute` with `["scoped", "module"]`. Global `<style>` blocks without a scoping attribute are the most common source of CSS leakage in Vue apps. If you need global styles, use a separate `.scss` file, not a component `<style>` block.

**6. Composable blocks as the public API**

The ESLint base config exports named arrays (`baseIgnores`, `baseTypeScript`, etc.) rather than a single opaque config object. Each preset (`node`, `vue`, `nuxt`) is composed from these blocks — there is no hidden configuration. This lets consumers import exactly what they need, audit the full rule set by reading the import chain, and build custom presets without forking the package.

---

## Getting Started

### Prerequisites

Install the peer dependencies you need at your project root:

```sh
# ESLint only
npm install --save-dev eslint typescript

# ESLint + Prettier
npm install --save-dev eslint prettier typescript

# Full stack (ESLint + Prettier + Stylelint)
npm install --save-dev eslint prettier stylelint typescript
```

> **Why Node >=22.11.0?** This package uses `import.meta.dirname`, which requires Node 21+. Version 22.11.0 is the current LTS that ships this feature as stable. Linting tools run in the developer's environment, not production — so this constraint doesn't affect your runtime target.

### Installation

```sh
npm install --save-dev @fvena/style-guide
```

Pick the config for your environment below.

---

## ESLint

### Presets

```js
// eslint.config.js

// Node.js projects
import eslintNode from "@fvena/style-guide/eslint/node";
export default [...eslintNode];

// Browser projects
import eslintBrowser from "@fvena/style-guide/eslint/browser";
export default [...eslintBrowser];

// Vue 3 projects
import eslintVue from "@fvena/style-guide/eslint/vue";
export default [...eslintVue];

// Nuxt 3 projects
import eslintNuxt from "@fvena/style-guide/eslint/nuxt";
export default [...eslintNuxt];
```

### Extending and overriding rules

Add your own rules after spreading the preset:

```js
import eslintVue from "@fvena/style-guide/eslint/vue";

export default [
  ...eslintVue,
  {
    rules: {
      // Disable a rule you disagree with
      "unicorn/no-array-for-each": "off",
      // Relax SCSS enforcement during migration
      "vue/block-lang": ["error", { script: { lang: "ts" }, style: { lang: ["scss", "css"] } }],
    },
  },
];
```

### Composable config blocks

If you only need specific parts, import individual blocks from `@fvena/style-guide/eslint/base`:

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
} from "@fvena/style-guide/eslint/base";

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

### Opt-in: TSDoc validation

`baseTsdoc` is not included by default — only useful for libraries that publish API documentation:

```js
import { baseTsdoc } from "@fvena/style-guide/eslint/base";
import eslintNode from "@fvena/style-guide/eslint/node";

export default [...eslintNode, ...baseTsdoc];
```

### Vue 3

For Vue 3 projects using Composition API + `<script setup>` + TypeScript + SCSS:

```js
import eslintVue from "@fvena/style-guide/eslint/vue";

export default [...eslintVue];
```

Enforces on top of the base config:

- `<script setup>` only — no Options API
- Block order: `<script>` → `<template>` → `<style>`
- `lang="ts"` on `<script>`, `lang="scss"` on `<style>`
- Type-based `defineProps<{}>()` and `defineEmits<{}>()`
- Scoped or module styles only — no global `<style>`
- Shorthand directives (`:prop`, `@event`)
- Reactive props destructuring (Vue 3.5+)
- WCAG accessibility rules via `eslint-plugin-vuejs-accessibility`

### Nuxt 3

Extends the [Vue 3 config](#vue-3) and adds Nuxt-specific rules from [`@nuxt/eslint-config`](https://eslint.nuxt.com).

#### Standalone usage

```js
import eslintNuxt from "@fvena/style-guide/eslint/nuxt";

export default [...eslintNuxt];
```

#### With `@nuxt/eslint` module

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
import eslintNuxt from "@fvena/style-guide/eslint/nuxt";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([...eslintNuxt]);
```

### Opt-in: Playwright

```js
import eslintNode from "@fvena/style-guide/eslint/node";
import eslintPlaywright from "@fvena/style-guide/eslint/playwright";

export default [...eslintNode, ...eslintPlaywright];
```

Applies to `**/*.spec.ts`, `**/e2e/**/*.ts`, `**/tests/**/*.ts`.

### Opt-in: Testing Library

```js
import eslintTestingLibrary from "@fvena/style-guide/eslint/testing-library";
import eslintVue from "@fvena/style-guide/eslint/vue";

export default [...eslintVue, ...eslintTestingLibrary];
```

### Opt-in: Turborepo

```js
import eslintNode from "@fvena/style-guide/eslint/node";
import eslintTurbo from "@fvena/style-guide/eslint/turbo";

export default [...eslintNode, ...eslintTurbo];
```

---

## Prettier

```js
// .prettierrc.config.js
export { default } from "@fvena/style-guide/prettier";
```

To extend:

```js
import prettierConfig from "@fvena/style-guide/prettier";

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

```js
// stylelint.config.js
export default {
  extends: ["@fvena/style-guide/stylelint"],
};
```

Includes:

- `stylelint-config-recommended` — base CSS rules
- `stylelint-config-recommended-scss` — SCSS support
- `stylelint-config-recommended-vue/scss` — Vue SFC style block support
- `stylelint-config-recess-order` — consistent property ordering

---

## TypeScript

```json
{ "extends": "@fvena/style-guide/typescript/node" }
```

```json
{ "extends": "@fvena/style-guide/typescript/browser" }
```

Both configs use strict mode, `noUncheckedIndexedAccess`, and modern module settings based on [Matt Pocock's TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet).

---

## Markdown

```json
{ "extends": "@fvena/style-guide/markdown" }
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

**Symptom**: `Error: No tsconfig.json found for file X` or `Cannot read tsconfig`.

**Cause**: `typescript-eslint`'s project service can't locate a `tsconfig.json` for the file being linted.

**Fix — config files at the project root** (e.g., `eslint.config.js`, `vite.config.ts`): add a `tsconfig.node.json` that covers them:

```json
{
  "extends": "@fvena/style-guide/typescript/node",
  "include": ["*.config.ts", "*.config.js"]
}
```

**Fix — monorepo**: each package must have its own `tsconfig.json` with an `include` field that covers all linted files. The project service discovers tsconfigs per-file, not globally.

---

### `vue/block-lang` errors on an existing project

**Symptom**: Every `.vue` file errors with `Expected "scss" as the lang of the "style" block.`

**Cause**: You're adding this config to a project that uses plain CSS or another preprocessor.

**Fix — incremental migration**: add `lang="scss"` to `<style>` blocks as you touch each file, and relax the rule in the meantime:

```js
export default [...eslintVue, { rules: { "vue/block-lang": "warn" } }];
```

---

### Conflicts with `@nuxt/eslint` module

**Symptom**: Duplicate rules, conflicting configs, or `standalone` warnings in the console.

**Fix**: Set `standalone: false` in `nuxt.config.ts` and use `withNuxt()` to compose configs. See the [Nuxt 3 with `@nuxt/eslint` module](#with-nuxt-eslint-module) section.

---

### Accessibility false positives (`vuejs-accessibility`)

**Symptom**: `click-events-have-key-events` or `no-autofocus` flagging components that handle keyboard navigation correctly.

**Fix**: Both rules have no configuration options, so disable them per-file or globally if the false positive rate is too high:

```js
export default [
  ...eslintVue,
  {
    rules: {
      "vuejs-accessibility/click-events-have-key-events": "off",
    },
  },
];
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
- [ ] React/JSX opt-in config

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, conventions, and the release process.

---

## License

[MIT](./LICENSE) © [Francisco Vena](https://www.fvena.com)
