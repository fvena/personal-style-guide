# Changelog

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
