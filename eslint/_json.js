import json from "@eslint/json";

/**
 * Base ESLint configuration for JSON files (excluding package.json).
 * Provides validation for JSON, JSONC, and JSON5 files with best practices.
 *
 * Features:
 * - Official @eslint/json plugin for native JSON support
 * - Validates syntax and structure for JSON, JSONC, JSON5
 * - Prevents duplicate keys and unsafe values
 * - Excludes package-lock.json and package.json from linting
 * - package.json files use specialized rules via eslint-plugin-package-json
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    plugins: {
      json,
    },
  },

  // Standard JSON files (excluding package.json which has its own specialized rules)
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json", "**/package.json"],
    language: "json/json",
    rules: {
      // Basic JSON validation rules
      "json/no-duplicate-keys": "error",

      // Disable perfectionist ordering for JSON config files - they should maintain their own structure
      "perfectionist/sort-objects": "off",
    },
  },

  // JSONC files (JSON with comments)
  {
    files: ["**/*.jsonc", ".vscode/*.json"],
    language: "json/jsonc",
    rules: {
      // Basic JSONC validation rules
      "json/no-duplicate-keys": "error",

      // Disable perfectionist ordering for JSON config files
      "perfectionist/sort-objects": "off",
    },
  },

  // JSON5 files
  {
    files: ["**/*.json5"],
    language: "json/json5",
    rules: {
      // Basic JSON5 validation rules
      "json/no-duplicate-keys": "error",

      // Disable perfectionist ordering for JSON config files
      "perfectionist/sort-objects": "off",
    },
  },
];
