<br /> <!-- markdownlint-disable-line -->

<p align="right">
  ⭐ &nbsp;&nbsp;<strong>to the project if you like it</strong> ↗️:
</p>

<p align="center">
  <h2 align="center">Style Guide</h2>
  <div align="center">
    This package provides a unified configuration for ESLint, Prettier, Stylelint, and TypeScript, ensuring consistency and quality across all your projects at Didor.
  </div>
</p>

<br/>

<div align="center">

<!-- markdownlint-disable MD042 -->

[![SemVer](https://img.shields.io/npm/v/personal-style-guide)]()
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Build Status](https://github.com/fvena/personal-style-guide/workflows/CI%2FCD/badge.svg)]()

<!-- markdownlint-enable MD042 -->

</div>

<br/>

<details open="false">
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#-motivation">Motivation</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#eslint">ESLint</a></li>
    <li><a href="#prettier">Prettier</a></li>
    <li><a href="#stylelint">Stylelint</a></li>
    <li><a href="#typescript">TypeScript</a></li>
    <li><a href="#markdown">Markdown</a></li>
    <li><a href="#-scripts">Scripts</a></li>
    <li><a href="#-updating">Updating</a></li>
  </ol>
</details>

## 💡 Motivation

Consistency in code style is key to maintaining scalable and maintainable projects. While many tools like ESLint, Prettier, and Stylelint exist, configuring them repeatedly across projects can be tedious and error-prone. This package centralizes the configuration for these tools, saving time and ensuring a unified development experience across all Didor projects.

This style guide also promotes best practices.

## 🚀Getting Started

### Prerequisites

ESLint, Prettier, Stylelint, Typescript are a peer dependency, so you need to install at the root of your project:

```sh
npm install --save-dev eslint prettier stylelint typescript
```

### Installation

To install the package, run:

```sh
npm install --save-dev personal-style-guide
```

## ESLint

### Plugins Integrated

- **[@eslint/js](https://github.com/eslint/eslint)**: JavaScript linting rules.
- **[typescript-eslint](https://typescript-eslint.io)**: TypeScript linting rules.
- **[eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n#readme)**: Node.js specific rules.
- **[eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)**: Import validation and sorting.
- **[eslint-plugin-security](https://github.com/eslint-community/eslint-plugin-security#readme)**: Detects security issues.
- **[eslint-plugin-perfectionist](https://perfectionist.dev)**: Code organization rules.
- **[eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)**: Advanced JS/TS best practices.
- **[eslint-plugin-tsdoc](https://www.npmjs.com/package/eslint-plugin-tsdoc)**: TSDoc comment validation.
- **[eslint-plugin-eslint-comments](https://www.npmjs.com/package/@eslint-community/eslint-plugin-eslint-comments)**: ESLint comment rules.
- **[eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript#readme)**: TypeScript import resolver.

### How to Use

You need to extend one or both of the following configurations.

- `personal-style-guide/eslint/browser` for browser projects.
- `personal-style-guide/eslint/node` for Node projects.

Create or update `eslint.config.js` in your project root and extend the configurations you need:

```js
import eslintNode from "personal-style-guide/eslint/node";

export default [...eslintNode];
```

## Prettier

### How to Use

To use the shared Prettier config, create or update `.prettierrc.config.js` in your project root:

```js
export { default } from "personal-style-guide/prettier/index.js";
```

If you need to extend the configuration, you can do so:

```js
import prettierConfig from "personal-style-guide/prettier/index.js";

export default {
  ...prettierConfig,
  ...
};
```

### Why We Don't Use Prettier with ESLint or Stylelint

To improve **IDE performance** and avoid redundant processing, we separate the responsibilities of Prettier and linters (ESLint/Stylelint):

- **ESLint and Stylelint**: Focus only on code validation and enforcing rules.
- **Prettier**: Handles code formatting exclusively.

By not integrating Prettier directly into ESLint or Stylelint:

1. **Faster IDE Performance**: Linters don’t need to process formatting errors, reducing overhead.
1. **Avoid Duplicated Tasks**: Prevent running the file through both a linter and Prettier simultaneously.

## Stylelint

### Plugins Integrated

- **[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended#readme)**: Recommended stylelint rules.
- **[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss#readme)**: Recommended SCSS stylelint rules.
- **[stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue#readme)**: Recommended Vue stylelint rules.
- **[stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)**: Recess order stylelint rules.

### How to Use

Create or update `stylelint.config.js` in your project root:

```js
module.exports = {
  extends: ["personal-style-guide/stylelint"],
};
```

## TypeScript

### How to Use

This style guide provides multiple TypeScript configs. These configurations are based on the environment you are working on, so you need to extend one of the following configurations:

- `personal-style-guide/typescript/node`.
- `personal-style-guide/typescript/browser`.

Ensure you have a `tsconfig.json` in your project root. You can extend the provided configuration if necessary:

```json
{
  "extends": "personal-style-guide/typescript/node"
}
```

## Markdown

> ⚠️ **Note**: This configuration is designed for `markdownlint`. Install the Markdownlint extension in your editor (e.g., VS Code) for optimal use.

### How to Use

To lint Markdown files, extend the provided configuration by creating or updating a `.markdownlint.json` file in your project root:

````json
{
  "extends": "personal-style-guide/markdown"
}


## 📑 Scripts

Add the following scripts to your `package.json` to lint and format your code:

```json
{
  "scripts": {
    "lint:js": "eslint 'src/**/*.{js,ts,vue}'",
    "lint:css": "stylelint 'src/**/*.{scss,css}'",
    "format": "prettier --write 'src/**/*.{js,ts,vue,scss,css}'"
  }
}
````

## 🔄 Updating

To check for outdated dependencies, run:

```bash
npx npm-check-updates
```

This lists all outdated dependencies. It's important to read the release notes for each dependency to understand the changes.

Update dependencies running the interactive mode. It's recommended to update them one by one to avoid breaking changes.:

```bash
npx npm-check-updates --interactive
```

## 🗺️ Roadmap

- [ ] Add configurations for testing frameworks (e.g., Jest, Vitest).
- [ ] Add configurations for Vue and Nuxt projects.
- [ ] Improve the ESLint configuration to group by file type.
- [ ] Add [@eslint/json](https://github.com/eslint/json#readme) and [@eslint/markdown](https://github.com/eslint/markdown#readme) configurations to the ESLint setup.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
1. Create a new branch (git checkout -b feature/my-feature).
1. Make your changes and write tests.
1. Commit your changes using a [conventional commit message](<(https://gist.github.com/fvena/9e42792ad951b47ad143ba7e4bfedb5a)>).
1. Push your branch and open a Pull Request.

## 📜 License

This template is licensed under the MIT License, which allows you to use, modify, and distribute the code freely, as long as the original license is included.

For more details, see the [LICENSE](./LICENSE) file included in this repository.

## 🌟 Star Support

Your ⭐️ helps others discover this template and motivates continued development and improvements.

Special thanks to the open-source community for inspiring and supporting this template.
