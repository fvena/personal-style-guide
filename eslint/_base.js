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
/*
 * tseslint.config() is kept as the internal wrapper because it resolves
 * typescript-eslint's `extends` shorthand and typed plugin references.
 * defineConfig() from "eslint/config" is not used here to avoid double-wrapping
 * and potential type conflicts. Consumers that import this base config can wrap
 * it with defineConfig() in their own entry points.
 */
/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  pluginJs.configs.recommended,
  nodePlugin.configs["flat/recommended-module"],
  eslintCommentsPlugin.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  perfectionistPlugin.configs["recommended-natural"],
  unicornPlugin.configs["recommended"],
  pluginSecurity.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "fvena/base/ignores",
    ignores: ["node_modules/", "**/dist/", "**/cache/"],
  },
  {
    name: "fvena/base/plugins/tsdoc",
    plugins: {
      tsdoc: tsdocPlugin,
    },
  },
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
    name: "fvena/base/rules",
    rules: {
      /**
       * Typescript plugin rules
       */
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/no-loop-func": "error",

      /**
       * Node plugin rules
       */
      "n/no-missing-import": "off",
      "n/no-unsupported-features/node-builtins": ["error", { ignores: ["import.meta.dirname"] }],

      /**
       * Perfectionist plugin rules
       */
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-classes": "off",
      "perfectionist/sort-modules": "off",

      /**
       * Unicorn plugin rules
       */
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

      /**
       * Import plugin rules
       */
      "import/named": "off", // Typescript handles this, disable for performance
      "import/namespace": "off", // Typescript handles this, disable for performance
      "import/default": "off", // Typescript handles this, disable for performance
      "import/no-named-as-default-member": "off", // Typescript handles this, disable for performance
      "import/no-unresolved": "off", // Typescript handles this, disable for performance
      "import/extensions": "off", // Typescript handles this, disable for performance
      "import/order": [
        "warn",
        {
          groups: [
            "type", // Type imports
            "builtin", // Node.js built-in modules
            "external", // Packages
            "internal", // Aliased modules
            "parent", // Relative parent
            "sibling", // Relative sibling
            "index", // Relative index
          ],
          "newlines-between": "never",
          warnOnUnassignedImports: true,
        },
      ],

      /**
       * ESLint comments plugin rules
       */
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] },
      ],
    },
  },
  {
    name: "fvena/base/javascript/disable-type-checked",
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.js"],
  },
  {
    name: "fvena/base/yaml/disable-type-checked",
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.yaml", "**/*.yml"],
  },
  {
    name: "fvena/base/typescript/tsdoc",
    files: ["**/*.ts"],
    rules: {
      "tsdoc/syntax": "error",
    },
  },
  ...eslintPluginYml.configs["flat/recommended"],
  {
    name: "fvena/base/yaml",
    files: ["**/*.yaml", "**/*.yml"],
    languageOptions: { parser: yamlParser },
  },
);
/* eslint-enable perfectionist/sort-objects */
