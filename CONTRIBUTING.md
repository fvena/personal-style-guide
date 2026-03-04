# Contributing

## Setup

```bash
git clone https://github.com/fvena/kata.git
cd kata
nvm use   # requires Node >=22.11.0
npm ci
```

## Project structure

| Directory     | Description                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eslint/`     | ESLint flat configs. `base.js` is the core; `node.js`, `browser.js`, `vue.js`, `nuxt.js` add environment-specific settings. |
| `prettier/`   | Shared Prettier config.                                                                                                     |
| `stylelint/`  | Shared Stylelint config (CSS/SCSS/Vue).                                                                                     |
| `typescript/` | Base tsconfigs (`tsconfig.node.json`, `tsconfig.browser.json`).                                                             |
| `markdown/`   | Markdownlint config.                                                                                                        |
| `tests/`      | Vitest tests and fixture files to verify configs load and rules work.                                                       |

Consumers import via package exports: `@franvena/kata/eslint/node`, `@franvena/kata/prettier`, etc. Every config file must have a matching entry in the `exports` field of `package.json`.

## Adding a new rule

1. Add the rule in the corresponding file inside `eslint/`, `stylelint/`, etc.
2. Add a JSDoc comment explaining the reasoning behind the rule.
3. If you're disabling a recommended rule, explain why.
4. Update `tests/fixtures/valid.ts` or `tests/fixtures/invalid.ts` if the rule has a clear valid/invalid case.
5. Verify everything works:

```bash
npm run lint && npm test
```

## Adding support for a new environment

For example, React or Svelte:

1. Create `eslint/<environment>.js` importing `./base.js` and adding environment-specific plugins/globals.
2. Add the corresponding export in `package.json` under `exports`.
3. Document the new config in the README.
4. Add a test file in `tests/` (see `eslint.node.test.js` as reference).

## Commit conventions

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint + husky.

```
feat(eslint): add vue3 config
fix(typescript): correct noUncheckedIndexedAccess default
docs: update README with inspector section
chore: update package dependencies
```

Scopes match directory names: `eslint`, `prettier`, `stylelint`, `typescript`, `markdown`.

## Release process

Run `npm run release`. This uses release-it to bump the version, update the CHANGELOG, and push the tag. Publishing to npm happens automatically via GitHub Actions — do not publish manually.
