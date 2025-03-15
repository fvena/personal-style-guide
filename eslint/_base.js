import path from "node:path";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments/configs";
import pluginJs from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import pluginSecurity from "eslint-plugin-security";
import unicornPlugin from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";
import tsdocPlugin from "eslint-plugin-tsdoc";
import eslintPluginYml from "eslint-plugin-yml";

/* eslint-disable perfectionist/sort-objects -- Disabling sorting to maintain logical grouping of plugin hooks */
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
    ignores: ["node_modules/", "**/dist/", "**/cache/"],
  },
  {
    plugins: {
      tsdoc: tsdocPlugin,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
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
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.js"],
  },
  {
    files: ["**/*.ts"],
    rules: {
      "tsdoc/syntax": "error",
    },
  },
  {
    files: ["*.yaml", "*.yml"],
    ...eslintPluginYml.configs["flat/recommended"],
    parser: "yaml-eslint-parser",
  },
);
/* eslint-enable perfectionist/sort-objects */
