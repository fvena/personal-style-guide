<br />
<p align="right">
  ⭐ &nbsp;&nbsp;<strong>to the project if you like it</strong> ↗️:
</p>

<p align="center">
  <h2 align="center">Style Guide</h2>
  <div align="center">This package provides a unified configuration for ESLint, Prettier, Stylelint, and TypeScript, ensuring consistency and quality across all your projects at Didor.</div>
</p>

<br/>

<div align="center">
<!--
There are countless badges you can use for your projects. The most common ones are:
I usually use https://shields.io/ to generate badges.
-->
<!-- Replace <library> with your library name on npm -->

[![SemVer](https://img.shields.io/npm/v/<library>)]()
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

<p align="center">
  <a href="#"><strong>Documentation »</strong></a>
  <br />
  <br />
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="https://github.com/<repo>/issues">Report Bug</a>
  ·
  <a href="https://github.com/<repo>/issues">Request Feature</a>
</p>

<br/>

<!-- TABLE OF CONTENTS -->
<!-- Adding a Table of Contents (TOC) is recommended. It helps readers navigate your README and find exactly what they’re looking for. -->

<details open="false">
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#motivation">Motivation</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## 💡 Motivation

Write one or two paragraphs describing the purpose of your library and what motivated you to develop it.

What problem does this library solve? Why is it better than existing alternatives?

## 🚀Getting Started

### Prerequisites

ESLint, Prettier y Stylelint are a peer dependency, so you need to install at the root of your project:

```sh
npm install --save-dev eslint prettier stylelint
```

### Installation

To install the package, run:

```sh
npm install --save-dev style-guide
```

## 🛠️ Usage

### ESLint

You need to extend one or both of the following configurations.

- `style-guide/eslint/browser` for browser projects.
- `style-guide/eslint/node` for Node projects.

Create or update `eslint.config.js` in your project root and extend the configurations you need:

```js
import eslintNode from "style-guide/eslint/node";

export default [...eslintNode];
```

## Prettier

To use the shared Prettier config, create or update `.prettierrc.config.js` in your project root:

```js
import prettierConfig from "style-guide/prettier";

export default prettierConfig;
```

## 🗺️ Roadmap

When starting a project, we often aim for the Minimum Viable Product (MVP) as quickly as possible, but there are always ideas left for later or parts that need refactoring for better performance.

Having a public roadmap for your project is always a good idea. It lets you pick up where you left off after a break and gives users confidence in an actively maintained library.

Additionally, users who know your development plans can suggest changes, ideas, or collaborations.

Use checkboxes to show progress on your roadmap.

- [] Feature 1
- [] Improve performance of X
- [] Add advanced documentation

## 🤝 Contributions

Explain how users can contribute to your library, typically:

Reporting bugs
Fixing bugs
Adding new features
Sharing on social media
Becoming an official contributor
Making a small donation

## 📜 License

Indicating the type of license for your project helps others know what they can and cannot do with it. You can find templates for all types of licenses here: <https://opensource.org/licenses>. Choose wisely, as this will determine how others can use your library.

In my case, I am developing open-source code and using the MIT license, which allows users to do almost anything with the code.

## 🙌 Footer

This is the closing section of your README. You can be creative here: introduce yourself, thank users for their interest, or ask them to give the project a star.
