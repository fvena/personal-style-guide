<div align="center">
  <img src=".github/assets/kata_logo.svg" alt="kata" height="140" />
</div>

<p align="center">
  <strong>Code quality, enforced.</strong><br/>
  Same standard for every developer, every AI agent, every commit.
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
  <a href="https://www.npmjs.com/package/@franvena/kata">
    <img src="https://img.shields.io/badge/provenance-verified-0e7490" alt="npm provenance" />
  </a>
  <a href="https://www.npmjs.com/package/@franvena/kata">
    <img src="https://img.shields.io/npm/dm/@franvena/kata?color=0e7490&label=downloads" alt="npm downloads" />
  </a>
</p>

<br/>

<details>
<summary><strong>Table of Contents</strong></summary>

- [Quick start](#quick-start)
- [Is kata for you?](#is-kata-for-you)
- [What kata catches](#what-kata-catches)
- [Getting Started](#getting-started)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Stylelint](#stylelint)
- [TypeScript](#typescript)
- [Markdown](#markdown)
- [Customizing kata](#customizing-kata)
- [Migrating to kata](#migrating-to-kata)
- [Comparison with alternatives](#comparison-with-alternatives)
- [Compatibility](#compatibility)
- [Troubleshooting](#troubleshooting)
- [Design Philosophy](#design-philosophy)
- [Versioning](#versioning)
- [What's next](#whats-next)
- [Contributing](#contributing)

</details>

---

Kata is a complete code quality toolkit for Node.js and TypeScript projects. One install gives you ESLint with type-aware rules, Prettier, Stylelint, TypeScript base configs, and Markdownlint — configured to work together without conflicts.

These tools catch bugs that compile and ship to production: floating promises that silently lose data, unsafe `any` propagation that defeats the type system, CSS properties the browser ignores without warning, Vue ref comparisons without `.value` that produce conditions that are always false. Style is 5% of what they do. The other 95% is finding bugs.

If your stack includes Vue 3 or Nuxt 3, kata is the most complete opinionated setup available as a single package. If you use Node.js without a framework, the base presets cover TypeScript, JavaScript, YAML, and Markdown with the same depth.

---

## Quick start

```sh
npm install --save-dev @franvena/kata eslint typescript
```

```js
// eslint.config.js
import eslintNode from '@franvena/kata/eslint/node'
export default [...eslintNode]
```

That's it. Run `npx eslint .` to see what kata finds in your code.

Need Prettier, Stylelint, or Vue/Nuxt presets? See the [full setup](#getting-started) below.

---

## Is kata for you?

Kata is built for developers and teams who:

- Maintain one or more Node.js/TypeScript repositories and want a single quality standard across all of them.
- Are starting a new project and want strict linting from day one instead of bolting it on later.
- Are migrating to ESLint v10 flat config and need a modern, maintained config that works out of the box.
- Work with Vue 3 or Nuxt 3 and need ESLint, Stylelint, and TypeScript configured to handle `.vue` SFCs correctly.
- Use AI coding tools (Copilot, Cursor, Claude) and want the same rules applied to AI-generated code as to human-written code.
- Want type-aware ESLint rules (`no-floating-promises`, `no-unsafe-*`) without spending hours on `typescript-eslint` configuration.

If you only need ESLint and prefer a factory function API, [@antfu/eslint-config](https://github.com/antfu/eslint-config) is an excellent choice. Kata covers more ground — Prettier, Stylelint, Markdownlint, TypeScript configs — for teams that want a complete solution.

---

## What kata catches

Kata is not about tabs vs. spaces. It catches bugs that compile, pass TypeScript, and reach production.

**TypeScript & JavaScript.** Floating promises that silently lose data. Unsafe `any` propagation that defeats the type system. Type assertions (`as User`) that silence the compiler until the API changes. Conditions that are always true or always false. Loops that await inside instead of using `Promise.all`.

**CSS & SCSS.** Properties the browser silently ignores (`colr: red`). Media queries with typos (`max-widht`). Shorthand properties that overwrite longhands you set three lines above. Duplicate properties with conflicting values.

**Vue templates.** Props mutated directly instead of emitting events. Refs compared without `.value`, producing conditions that are always false. Missing key attributes on `v-for`. Deprecated slot syntax. Accessibility violations (missing alt text, click handlers without keyboard equivalents).

**Markdown.** Inconsistent heading levels. Broken link references. Bare URLs without link syntax.

500+ rules across five tools. Every file type in your project covered.

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
| `baseTypeScript`    | Type-aware TS rules + parser             |
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
| [`typescript-eslint`](https://typescript-eslint.io)                                                                    | Type-aware TypeScript rules + parser |
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

## Customizing kata

Kata is opinionated by default and flexible when you need it. Every rule can be overridden, every block can be replaced, and every tool is optional.

### Override a rule

```js
// eslint.config.js
import eslintNode from '@franvena/kata/eslint/node'

export default [
  ...eslintNode,
  {
    rules: {
      // Disable a rule entirely
      'unicorn/no-array-for-each': 'off',
      // Change severity from error to warning
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]
```

### Compose only the blocks you need

Every preset is built from composable blocks. Import them individually to build a custom config:

```js
import {
  baseIgnores,
  baseJavascript,
  baseTypeScript,
  baseUnicorn
} from '@franvena/kata/eslint/base'

export default [...baseIgnores, ...baseJavascript, ...baseTypeScript, ...baseUnicorn]
```

See the full list of available blocks in the [ESLint section](#composable-config-blocks).

### Use strict TypeScript checking

The default TypeScript preset uses `recommendedTypeChecked` — the rules with the highest signal-to-noise ratio. For teams comfortable with stricter checking, switch to `strictTypeChecked`:

```js
import eslintNode from '@franvena/kata/eslint/node'
import tseslint from 'typescript-eslint'

export default [...eslintNode, ...tseslint.configs.strictTypeChecked]
```

`strictTypeChecked` adds rules like `no-unnecessary-condition`, `no-confusing-void-expression`, and stricter `restrict-template-expressions`. It catches more edge cases but may produce false positives in idiomatic code. It is also [not semver-stable in typescript-eslint](https://typescript-eslint.io/users/configs#strict-type-checked) — rules can change in minor versions.

### Relax Vue SFC enforcement during migration

If you're adopting kata on an existing Vue project, some rules may flag every component. Relax them temporarily:

```js
import eslintVue from '@franvena/kata/eslint/vue'

export default [
  ...eslintVue,
  {
    rules: {
      // Allow plain CSS while migrating to SCSS
      'vue/block-lang': 'warn',
      // Allow global styles temporarily
      'vue/enforce-style-attribute': 'warn'
    }
  }
]
```

### Different presets per package in a monorepo

Each package in a monorepo can use a different kata preset. Each needs its own `eslint.config.js` and `tsconfig.json`:

```
packages/
  api/
    eslint.config.js    → imports @franvena/kata/eslint/node
    tsconfig.json       → extends @franvena/kata/typescript/node
  web/
    eslint.config.js    → imports @franvena/kata/eslint/vue
    tsconfig.json       → extends @franvena/kata/typescript/browser
```

Run ESLint from the root with the `--config` flag or from each package directory.

---

## Migrating to kata

- [From a manual ESLint + Prettier setup](./docs/migrations/from-manual-setup.md)
- [From eslint-config-airbnb](./docs/migrations/from-eslint-config-airbnb.md)
- [From @antfu/eslint-config](./docs/migrations/from-antfu-eslint-config.md)
- [From @nuxt/eslint-config](./docs/migrations/from-nuxt-eslint-config.md)

Integration guides:

- [Using kata with create-vue](./docs/guides/with-create-vue.md)
- [Using kata with Nuxt CLI](./docs/guides/with-nuxt-cli.md)
- [Using kata in a monorepo](./docs/guides/monorepo.md)

ESLint v10 removed the legacy `.eslintrc` format. If your current config uses `.eslintrc.js`, `.eslintrc.json`, or `.eslintrc.yml`, it will not work with ESLint v10. All migration guides above assume ESLint v10 flat config.

---

## Comparison with alternatives

|                             | kata       | @antfu/eslint-config | XO          | Biome              | Manual setup  |
| --------------------------- | ---------- | -------------------- | ----------- | ------------------ | ------------- |
| ESLint flat config          | Yes        | Yes                  | Yes         | N/A                | Yes           |
| TypeScript type-aware rules | Yes        | Yes                  | Yes         | Partial            | Yes           |
| Prettier                    | Integrated | No (uses Stylistic)  | Optional    | Built-in formatter | Manual        |
| Stylelint (CSS/SCSS/Vue)    | Integrated | No                   | No          | No                 | Manual        |
| Markdownlint                | Integrated | No                   | No          | No                 | Manual        |
| TypeScript base configs     | Integrated | No                   | No          | No                 | Manual        |
| Vue 3 / Nuxt 3 presets      | Yes        | Yes                  | No          | Experimental       | Manual        |
| Composable config blocks    | Yes        | Factory function     | CLI wrapper | Config file        | N/A           |
| Single package install      | Yes        | Yes                  | Yes         | Yes                | 5-12 packages |

**[@antfu/eslint-config](https://github.com/antfu/eslint-config)** is excellent if you only need ESLint and prefer ESLint Stylistic over Prettier. It auto-detects Vue and TypeScript, and Anthony Fu (Vue/Nuxt core team) maintains it actively. Choose antfu if ESLint is all you need. Choose kata if you also need Prettier, Stylelint, Markdownlint, and TypeScript base configs in one package.

**[XO](https://github.com/xojs/xo)** wraps ESLint in a CLI with strong defaults. It does not cover CSS, Markdown, or Vue-specific rules. Good for Node.js-only projects that want zero config.

**[Biome](https://biomejs.dev)** is 25x faster and unifies linting and formatting in a single tool. However, Vue SFC support is experimental, SCSS is not supported, Markdown linting has no active development, and type-aware rules (the ones that catch the most bugs) are not available. For Vue/Nuxt projects with TypeScript and SCSS, the coverage gap is significant. See [ADR-009](./docs/decisions/009-eslint-prettier-base.md) for the full evaluation.

**Manual setup** gives you full control. But integrating ESLint, Prettier, Stylelint, TypeScript, and Markdownlint without conflicts takes hours — and you repeat that work in every repository. Kata absorbs the integration and keeps it updated.

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

**`recommendedTypeChecked` as the default** — The TypeScript-ESLint preset with the highest signal-to-noise ratio. Catches floating promises, unsafe `any` propagation, and misused promises — the rules that prevent the most real bugs. `strictTypeChecked` is available as an opt-in for teams that want additional strictness (see [Customizing kata](#use-strict-typescript-checking)). The default was changed from `strictTypeChecked` because it is [not semver-stable](https://typescript-eslint.io/users/configs#strict-type-checked) in typescript-eslint — rule changes can occur in minor versions, which would break user builds without kata publishing a new version.
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

## Versioning

This project follows [Semantic Versioning](https://semver.org/). As a linting config, rule changes follow this contract:

**Patch** (1.0.x): Bug fixes to existing rules. No new diagnostics in your code.

**Minor** (1.x.0): New rules that produce **warnings only**. New opt-in configs (e.g., a new `eslint/react` preset). Documentation improvements. Dependency updates that don't change lint behavior.

**Major** (x.0.0): New rules that produce **errors**. Existing rules becoming stricter (warning → error, or new cases flagged). Adding or removing plugins from core presets. Dropping Node.js versions. Changes to the export map or public API.

### Upgrade guarantee

When you run `npm update @franvena/kata` within the same major version, your build will not break due to new lint errors. Warnings may appear — errors will not.

Every major version includes a migration guide documenting what changed, why, and how to resolve new errors.

---

## What's next

- **CLI `kata init`** — One command to set up configs, pre-commit hooks, commitlint, and CI workflows. Auto-detects your stack. Choose your level: standards only, local enforcement, or full CI protection.
- **Migration guides** — Available now. See [Migrating to kata](#migrating-to-kata).
- **Biome/Oxlint watch** — Biome doesn't support Vue SFCs, SCSS, or Markdown at production quality yet. When it does, kata will evaluate integration. See [ADR-009](./docs/decisions/009-eslint-prettier-base.md).

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, conventions, and release process.

---

## License

[MIT](./LICENSE) © [Francisco Vena](https://www.fvena.com)
