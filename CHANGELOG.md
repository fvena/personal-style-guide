# Changelog

## [3.0.0](https://github-personal/fvena/kata/compare/v2.0.0...v3.0.0) (2026-03-22)

### ⚠ BREAKING CHANGES

- Stylelint config now uses stylelint-config-standard-scss
  instead of stylelint-config-recommended + stylelint-config-recommended-scss.
  ESLint peer dependency requires ^10.0.0 (drops ^9.0.0).
  TypeScript peer dependency requires ^5.7.0 (drops ^5.0.0).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

### Features

- add oxlint as opt-in performance layer ([dfc6bc4](https://github-personal/fvena/kata/commit/dfc6bc4ad9f4b36f018ae4c9939e74f5f2e4203a))
- enhance ESLint and TypeScript configurations across examples ([f245d2e](https://github-personal/fvena/kata/commit/f245d2e6ebab83a5c052c667ad6edd2909b23aa2))

### Bug Fixes

- add .prettierignore to exclude examples directory ([d7a6617](https://github-personal/fvena/kata/commit/d7a661717eb431c124aeb54cbe3d710bf0ba7999))
- correct ESLint 10 migration bugs and replace incompatible Stylelint configs ([02c1b70](https://github-personal/fvena/kata/commit/02c1b704d27d5bd57d24f649d06502d677bb697d))

## [Unreleased]

### ⚠ BREAKING CHANGES

- **eslint:** ESLint peer dependency narrowed from `^9.0.0 || ^10.0.0` to `^10.0.0`. kata v2 is ESLint 10 only.
- **typescript:** TypeScript peer dependency tightened from `^5.0.0` to `^5.7.0` (required for `isolatedDeclarations` and Node.js native TS support).
- **stylelint:** Replaced `stylelint-config-recommended-vue` (incompatible with Stylelint 17) with `postcss-html` custom syntax. Upgraded from `stylelint-config-recommended` + `stylelint-config-recommended-scss` to `stylelint-config-standard-scss`. Users with Stylelint overrides that depended on `stylelint-config-recommended-vue` will need to update their config. See [ADR-011](./docs/decisions/011-stylelint-standard-and-vue.md).

### Bug Fixes

- **eslint:** bump `@eslint/js` from `^9.39.3` to `^10.0.1` — was not resolving to v10
- **eslint:** clean ESLint peer dep to `^10.0.0` — kata is ESLint 10 only

### Features

- **eslint:** add `baseOxlint` composable block for Oxlint integration (opt-in, not in default export). See [ADR-012](./docs/decisions/012-oxlint-precheck.md).
- **cli:** add Oxlint as opt-in tool in `kata init` — generates `oxlint &&` prefixed lint scripts and includes `baseOxlint` in eslint config when selected.

### Chores

- Add knip, publint, and attw for package quality checks
- Add Node 24 to CI test matrix
- Add package-quality CI job (publint + knip)

## [2.0.0](https://github-personal/fvena/kata/compare/v1.2.0...v2.0.0) (2026-03-22)

### ⚠ BREAKING CHANGES

- Added interactive CLI (kata init) that generates configs,
  pre-commit hooks, commitlint, and CI workflows. Requires Node.js >=22.13.0.
  ESLint peer dependency expanded to ^9.0.0 || ^10.0.0.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

- **eslint:** The default TypeScript-ESLint preset changes from
  strictTypeChecked to recommendedTypeChecked. This reduces the number
  of active rules but improves semver stability and adoption friction.
  Users who want the stricter preset can opt in — see README section
  "Customizing kata" for instructions.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

### Features

- **cli:** add file generators for all config types ([a2ec3d9](https://github-personal/fvena/kata/commit/a2ec3d9bcffbea84ed086da1601894fb960524c4))
- **cli:** add native prompt components and utilities ([e4b84a1](https://github-personal/fvena/kata/commit/e4b84a14b6013d442708a4b235eb6fba89450189))
- **cli:** implement kata init interactive flow ([0a08283](https://github-personal/fvena/kata/commit/0a0828397424cdcd94bcb9201e2a37cd6e5e72f4))
- **eslint:** change TypeScript default to recommendedTypeChecked ([6abc667](https://github-personal/fvena/kata/commit/6abc667545b0d1c091352a27d74491bb7b39a09e))
- upgraded ESLint to version 10.0.0, migrate to new configuration format ([91bdd7b](https://github-personal/fvena/kata/commit/91bdd7b7006164d1e85c20ab633fd24d4d235121))

### Performance Improvements

- add lint benchmark script per preset ([f7c6f0a](https://github-personal/fvena/kata/commit/f7c6f0aabb551d1f51ee9068c4545bd4104a6020))

### Documentation

- update README and CONTRIBUTING for post-1.0 changes ([e3dec77](https://github-personal/fvena/kata/commit/e3dec773b64f48447c9500b62f2785e907f430fe))

## [1.2.0](https://github-personal/fvena/kata/compare/v1.1.0...v1.2.0) (2026-03-22)

### Features

- **eslint:** enhance Vue and Stylelint configurations ([0e2b7e1](https://github-personal/fvena/kata/commit/0e2b7e10476a72d95fa7abf1fc98137162d365f9))
- **eslint:** update dependencies and enhance ESLint configurations ([d8a2b81](https://github-personal/fvena/kata/commit/d8a2b814c758ede5d63f02d3cd9dcd391cf0df0b))

## [1.1.0](https://github-personal/fvena/kata/compare/v1.0.0...v1.1.0) (2026-03-21)

### Features

- **eslint:** add vitest opt-in config ([ad5344f](https://github-personal/fvena/kata/commit/ad5344fc0545dff73fa847ac81dfbbc3adaeb04d))

## [1.0.0](https://github-personal/fvena/kata/compare/v0.6.0...v1.0.0) (2026-03-21)

### ⚠ BREAKING CHANGES

- package has been renamed from @fvena/style-guide to @fvena/kata.
  Update your imports and package.json dependency accordingly.

Migration: npm uninstall @fvena/style-guide && npm install --save-dev @fvena/kata

### Features

- **eslint:** add eslint-plugin-regexp for improved regex linting ([f0fea42](https://github-personal/fvena/kata/commit/f0fea4238f6352b3f4edbf8d2811bcf2201bf95a))
- **eslint:** add eslint-plugin-vuejs-accessibility for improved Vue accessibility linting ([d4f21cb](https://github-personal/fvena/kata/commit/d4f21cb87cc7c1d5bdf761232e66a6fe13e6d47b))
- **eslint:** add Playwright support with eslint-plugin-playwright and configuration ([319f1ec](https://github-personal/fvena/kata/commit/319f1ecc96ba2ea67b42580739014a1360ae52cb))
- **eslint:** add support for Markdown linting with @eslint/markdown ([c57e742](https://github-personal/fvena/kata/commit/c57e74257f0e04761a6bd0e4d6f2d3d502f4608e))
- **eslint:** add support for Testing Library with eslint-plugin-testing-library and configuration ([a043a01](https://github-personal/fvena/kata/commit/a043a01f09a8fd68165e0b5ddb61499a40c9650c))
- **eslint:** add Turborepo support with eslint-config-turbo and configuration ([252c20c](https://github-personal/fvena/kata/commit/252c20c61e8bf7167eba7ff4ab4b299fae9c0c36))
- **eslint:** add Vue 3 and Nuxt 3 configurations with dedicated ESLint rules ([2949fdb](https://github-personal/fvena/kata/commit/2949fdbaeed1dc90bd714ca0937144ba81f3c03e))
- **eslint:** enhance ESLint and Stylelint configurations for improved code quality and consistency ([a708aba](https://github-personal/fvena/kata/commit/a708abab6edeca333d618895dab302530aaef682))
- **eslint:** enhance ESLint rules for JavaScript and TypeScript with additional configurations ([c0c89ad](https://github-personal/fvena/kata/commit/c0c89ad1c00b3520364af10c1a28d0f3aa490324))
- **eslint:** integrate @vue/eslint-config-typescript for improved TypeScript support in Vue project ([a1b551d](https://github-personal/fvena/kata/commit/a1b551da8c077ecd4cbf0cce5d6b590be68f3b8e))
- **tests:** integrate Vitest for testing ESLint configurations ([6ce5f37](https://github-personal/fvena/kata/commit/6ce5f37286eb9a879e5fcd012d8051fc12f76199))

### Miscellaneous Chores

- rename package to @fvena/kata ([8201973](https://github-personal/fvena/kata/commit/82019730e9b709224c9cf06679f8c871da3e1352))

## 0.6.0 (2025-03-15)

- feat: add eslint-plugin-yml and yaml-eslint-parser for YAML support ([fcb4187](https://github.com/fvena/personal-style-guide/commit/fcb4187))
- chore: upgrade package dependencies ([26bbc0b](https://github.com/fvena/personal-style-guide/commit/26bbc0b))

## <small>0.5.5 (2025-01-26)</small>

- chore: upgrade package dependencies ([2ba681b](https://github.com/fvena/personal-style-guide/commit/2ba681b))
- fix(eslint): adjust perfectionist and unicorn plugin rules for better configuration ([33f664e](https://github.com/fvena/personal-style-guide/commit/33f664e))

## <small>0.5.4 (2024-12-17)</small>

- refactor: simplify CI/CD workflow name and remove unused eslint-plugin-prettier ([e633d5c](https://github.com/fvena/personal-style-guide/commit/e633d5c))

## <small>0.5.3 (2024-12-15)</small>

- fix(package): update markdown exports to use directory path ([cb6a19d](https://github.com/fvena/personal-style-guide/commit/cb6a19d))

## <small>0.5.2 (2024-12-15)</small>

- fix(markdown): update package.json exports to include markdownlint configuration ([16d428f](https://github.com/fvena/personal-style-guide/commit/16d428f))

## <small>0.5.1 (2024-12-15)</small>

- fix(eslint): update configuration rules ([f848a67](https://github.com/fvena/personal-style-guide/commit/f848a67))

## 0.5.0 (2024-12-15)

- feat(eslint): add eslint-plugin-eslint-comments for improved ESLint disable comment rules ([9f4f5b4](https://github.com/fvena/personal-style-guide/commit/9f4f5b4))
- feat(eslint): add eslint-plugin-security for enhanced security checks ([ab02637](https://github.com/fvena/personal-style-guide/commit/ab02637))
- feat(eslint): add eslint-plugin-tsdoc for TypeScript documentation linting ([00b044e](https://github.com/fvena/personal-style-guide/commit/00b044e))
- fix(eslint): replace eslint-plugin-import-x with eslint-plugin-import and update configurations ([b831b93](https://github.com/fvena/personal-style-guide/commit/b831b93))

## <small>0.4.1 (2024-12-14)</small>

- chore(dependencies): update dependencies to latest versions ([13e3616](https://github.com/fvena/personal-style-guide/commit/13e3616))

## 0.4.0 (2024-12-14)

- feat(markdown): set up Markdownlint configuration ([85a56fc](https://github.com/fvena/personal-style-guide/commit/85a56fc))

## 0.3.0 (2024-12-10)

- feat(eslint): add unicorn/prevent-abbreviations rule to ESLint configuration ([c083b9c](https://github.com/fvena/personal-style-guide/commit/c083b9c))
- docs: update README badges and section headings for clarity ([9354200](https://github.com/fvena/personal-style-guide/commit/9354200))

## <small>0.2.1 (2024-12-09)</small>

- chore: rename project from style-guide to personal-style-guide and update references ([50d5a19](https://github.com/fvena/personal-style-guide/commit/50d5a19))

## 0.2.0 (2024-12-09)

- refactor: remove TypeScript parser configuration from ESLint base setup ([f96655a](https://github.com/fvena/personal-style-guide/commit/f96655a))
- refactor: update GitHub workflow to match project requirements ([2da58a5](https://github.com/fvena/personal-style-guide/commit/2da58a5))
- docs: update README to enhance clarity and structure ([e9f91f0](https://github.com/fvena/personal-style-guide/commit/e9f91f0))
- feat: set up EsLint configuration ([1be4a4f](https://github.com/fvena/personal-style-guide/commit/1be4a4f))
- feat: set up Prettier configuration ([68f951f](https://github.com/fvena/personal-style-guide/commit/68f951f))
- feat: set up Stylelint configuration ([be37881](https://github.com/fvena/personal-style-guide/commit/be37881))
- feat: set up Typescript configuration ([7a09d59](https://github.com/fvena/personal-style-guide/commit/7a09d59))
- chore: update project information and configuration ([b88d02c](https://github.com/fvena/personal-style-guide/commit/b88d02c))
- Initial commit ([2e001dd](https://github.com/fvena/personal-style-guide/commit/2e001dd))
