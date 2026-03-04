import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments/configs";
import pluginJs from "@eslint/js";
import markdown from "@eslint/markdown";
import eslintConfigPrettier from "eslint-config-prettier";
import nodePlugin from "eslint-plugin-n";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import pluginRegexp from "eslint-plugin-regexp";
import tsdocPlugin from "eslint-plugin-tsdoc";
import unicornPlugin from "eslint-plugin-unicorn";
import eslintPluginYml from "eslint-plugin-yml";
import tseslint from "typescript-eslint";
import * as yamlParser from "yaml-eslint-parser";

/* eslint-disable perfectionist/sort-objects -- Disabling sorting to maintain logical grouping of plugin hooks */

/** @type {import('eslint').Linter.Config[]} */
export const baseIgnores = [
  { name: "fvena/base/ignores", ignores: ["node_modules/", "**/dist/", "**/cache/"] },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseJavascript = [
  pluginJs.configs.recommended,
  nodePlugin.configs["flat/recommended-module"],
  {
    name: "fvena/base/javascript/rules",
    rules: {
      "array-callback-return": ["warn", { allowImplicit: true }],
      eqeqeq: ["error", "smart"],
      "n/no-missing-import": "off",
      "n/no-unsupported-features/node-builtins": ["error", { ignores: ["import.meta.dirname"] }],
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseTypeScript = tseslint.config(
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "fvena/base/typescript/parser",
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "fvena/base/typescript/rules",
    rules: {
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/no-loop-func": "error",
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignorePrimitives: {
            boolean: true,
            string: true,
          },
        },
      ],
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "warn",
        {
          allowNumber: true,
        },
      ],
    },
  },
  {
    name: "fvena/base/javascript/disable-type-checked",
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.js"],
  },
);

/** @type {import('eslint').Linter.Config[]} */
export const basePerfectionist = [
  perfectionistPlugin.configs["recommended-natural"],
  {
    name: "fvena/base/perfectionist/rules",
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          groups: ["type", "builtin", "external", "internal", ["parent", "sibling", "index"]],
          newlinesBetween: 0,
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-classes": "off",
      "perfectionist/sort-modules": "off",
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseUnicorn = [
  unicornPlugin.configs["recommended"],
  {
    name: "fvena/base/unicorn/rules",
    rules: {
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            dir: {
              directory: false,
            },
            env: {
              environment: false,
            },
          },
        },
      ],
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseComments = [
  eslintCommentsPlugin.recommended,
  {
    name: "fvena/base/comments/rules",
    rules: {
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] },
      ],
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseRegexp = [
  {
    ...pluginRegexp.configs["flat/recommended"],
    name: "fvena/base/regexp",
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseTsdoc = [
  {
    name: "fvena/base/plugins/tsdoc",
    plugins: {
      tsdoc: tsdocPlugin,
    },
  },
  {
    name: "fvena/base/typescript/tsdoc",
    files: ["**/*.ts"],
    rules: {
      "tsdoc/syntax": "error",
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const baseYaml = tseslint.config(
  ...eslintPluginYml.configs["flat/recommended"],
  {
    name: "fvena/base/yaml",
    files: ["**/*.yaml", "**/*.yml"],
    languageOptions: { parser: yamlParser },
  },
  {
    name: "fvena/base/yaml/disable-type-checked",
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.yaml", "**/*.yml"],
  },
);

/** @type {import('eslint').Linter.Config[]} */
export const baseMarkdown = tseslint.config(
  {
    name: "fvena/base/markdown/processor",
    files: ["**/*.md"],
    plugins: { markdown },
    processor: "markdown/markdown",
  },
  {
    name: "fvena/base/markdown/disable-type-checked",
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.md/*.js", "**/*.md/*.ts"],
  },
  {
    name: "fvena/base/markdown/code-blocks",
    files: ["**/*.md/*.js", "**/*.md/*.ts"],
    rules: {
      "no-console": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "n/no-missing-import": "off",
      "unicorn/filename-case": "off",
      "unicorn/prefer-module": "off",
      "perfectionist/sort-named-imports": "off",
      "perfectionist/sort-objects": "off",
    },
  },
);

/*
 * tseslint.config() is kept as the wrapper because it resolves
 * typescript-eslint's `extends` shorthand and typed plugin references.
 * defineConfig() from "eslint/config" is not used here to avoid double-wrapping
 * and potential type conflicts. Consumers that import this base config can wrap
 * it with defineConfig() in their own entry points.
 */
/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseIgnores,
  ...baseJavascript,
  ...baseTypeScript,
  ...basePerfectionist,
  ...baseUnicorn,
  ...baseRegexp,
  ...baseComments,
  ...baseYaml,
  ...baseMarkdown,
  // Prettier must be last — it disables formatting rules from all configs above
  { ...eslintConfigPrettier, name: "fvena/base/prettier" },
];
/* eslint-enable perfectionist/sort-objects */
