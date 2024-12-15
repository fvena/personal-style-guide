import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments/configs";
import pluginJs from "@eslint/js";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importPlugin from "eslint-plugin-import-x";
import nodePlugin from "eslint-plugin-n";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import pluginSecurity from "eslint-plugin-security";
import unicornPlugin from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  pluginJs.configs.recommended,
  nodePlugin.configs["flat/recommended-module"],
  eslintCommentsPlugin.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  perfectionistPlugin.configs["recommended-natural"],
  unicornPlugin.configs["flat/recommended"],
  pluginSecurity.configs.recommended,
  ...tseslint.configs.strictTypeChecked, // eslint-disable-line import-x/no-named-as-default-member -- This is a bug in the plugin
  ...tseslint.configs.stylisticTypeChecked, // eslint-disable-line import-x/no-named-as-default-member -- This is a bug in the plugin
  prettierPlugin,
  {
    ignores: ["node_modules/", "**/dist/", "**/cache/"],
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
          project: "./tsconfig.json",
        }),
      ],
    },
  },
  {
    rules: {
      "@eslint-community/eslint-comments/require-description": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/no-loop-func": "error",
      "n/no-missing-import": "off",
      "prettier/prettier": "error",
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
  {
    extends: [tseslint.configs.disableTypeChecked], // eslint-disable-line import-x/no-named-as-default-member -- This is a bug in the plugin
    files: ["**/*.js"],
  },
);
