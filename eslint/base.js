import path from "node:path";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments/configs";
import pluginJs from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import pluginSecurity from "eslint-plugin-security";
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
    },
  },
  {
    name: "fvena/base/javascript/disable-type-checked",
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.js"],
  },
);

/** @type {import('eslint').Linter.Config[]} */
export const baseImports = [
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    name: "fvena/base/import-resolver",
    settings: {
      "import/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: path.resolve(import.meta.dirname, "./tsconfig.json"),
        }),
      ],
    },
  },
  {
    name: "fvena/base/import/rules",
    rules: {
      "import/named": "off",
      "import/namespace": "off",
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off",
      "import/order": [
        "warn",
        {
          groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "never",
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const basePerfectionist = [
  perfectionistPlugin.configs["recommended-natural"],
  {
    name: "fvena/base/perfectionist/rules",
    rules: {
      "perfectionist/sort-imports": "off",
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
export const baseSecurity = [pluginSecurity.configs.recommended];

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
  ...baseImports,
  ...basePerfectionist,
  ...baseUnicorn,
  ...baseSecurity,
  ...baseComments,
  ...baseTsdoc,
  ...baseYaml,
];
/* eslint-enable perfectionist/sort-objects */
