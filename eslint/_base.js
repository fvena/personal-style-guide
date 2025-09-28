import js from "@eslint/js";
import json from "@eslint/json";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import securityPlugin from "eslint-plugin-security";
import stylisticPlugin from "@stylistic/eslint-plugin";
import unicornPlugin from "eslint-plugin-unicorn";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";

/**
 * Base ESLint configuration shared by all environments.
 * Includes JavaScript, TypeScript, JSON, Package.json, and Vitest support.
 *
 * This configuration is never exported directly but is included in:
 * - node.js (Node.js environment)
 * - browser.js (Browser environment)
 *
 * Features included:
 * - Core JavaScript and TypeScript rules with file-specific patterns
 * - JSON linting with @eslint/json
 * - Package.json validation with eslint-plugin-package-json
 * - Vitest testing framework support for all projects
 * - Import/export validation and sorting
 * - Code quality and consistency rules
 * - Security and performance best practices
 * - Stylistic formatting rules
 * - Configuration files support
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  // Global ignore patterns that apply to all file types
  // These directories are common in both Node.js and browser projects
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/build/",
      "**/lib/",
      "**/coverage/",
      "**/.cache/",
      "**/.temp/",
    ],
  },

  // JavaScript files - Base configuration
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@eslint-community/eslint-comments": eslintCommentsPlugin,
      import: importPlugin,
      n: nodePlugin,
      perfectionist: perfectionistPlugin,
      security: securityPlugin,
      "@stylistic": stylisticPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,

      // Import plugin rules
      "import/extensions": "off", // TypeScript handles this
      "import/named": "off", // TypeScript handles this for performance
      "import/namespace": "off", // TypeScript handles this for performance
      "import/default": "off", // TypeScript handles this for performance
      "import/no-named-as-default-member": "off", // TypeScript handles this for performance
      "import/no-unresolved": "off", // TypeScript handles this for performance
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

      // Node plugin rules
      "n/no-missing-import": "off",

      // Perfectionist plugin rules
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-classes": "off",
      "perfectionist/sort-modules": "off",

      // Unicorn plugin rules
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

      // ESLint comments plugin rules
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] },
      ],
    },
  },

  // TypeScript files - Base configuration
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      ecmaVersion: "latest",
      parser: typescriptParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
    },
    plugins: {
      "@eslint-community/eslint-comments": eslintCommentsPlugin,
      "@typescript-eslint": typescript,
      import: importPlugin,
      n: nodePlugin,
      perfectionist: perfectionistPlugin,
      security: securityPlugin,
      "@stylistic": stylisticPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,

      // TypeScript plugin rules
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/no-loop-func": "error",

      // Import plugin rules (same as JS)
      "import/extensions": "off",
      "import/named": "off",
      "import/namespace": "off",
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "never",
          warnOnUnassignedImports: true,
        },
      ],

      // Node plugin rules
      "n/no-missing-import": "off",

      // Perfectionist plugin rules
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-classes": "off",
      "perfectionist/sort-modules": "off",

      // Unicorn plugin rules
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

      // ESLint comments plugin rules
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] },
      ],
    },
  },

  // JSON files
  {
    files: ["**/*.json"],
    ignores: [
      "typescript/**/*.json", // TypeScript config files are handled separately
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
    ],
    plugins: {
      json: json,
    },
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },

  // JSONC files
  {
    files: ["**/*.jsonc", ".vscode/*.json"],
    plugins: {
      json: json,
    },
    language: "json/jsonc",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },

  // JSON5 files
  {
    files: ["**/*.json5"],
    plugins: {
      json: json,
    },
    language: "json/json5",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },

  // Package.json validation
  {
    files: ["package.json"],
    plugins: {
      json: json,
    },
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },

  // Vitest test files - Included in base for all projects
  {
    files: [
      "**/*.{test,spec}.{js,ts,vue}",
      "**/tests/**/*.{js,ts,vue}",
      "**/__tests__/**/*.{js,ts,vue}",
      "**/vitest/**/*.{js,ts}",
      "vitest/**/*.{js,ts}",
    ],
    ignores: ["**/__snapshots__/**", "**/test-results/**", "**/playwright-report/**"],
    plugins: {
      "@typescript-eslint": typescript,
      import: importPlugin,
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Vitest globals
        afterAll: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
        test: "readonly",
        vi: "readonly",
      },
    },
    rules: {
      // Use Vitest plugin recommended rules
      ...vitestPlugin.configs.recommended.rules,

      // Customize Vitest rules
      "vitest/no-disabled-tests": "warn", // Warn instead of error for .skip tests
      "vitest/no-focused-tests": "error", // Error on .only tests
      "vitest/consistent-test-it": ["error", { fn: "test" }], // Prefer 'test' over 'it'
      "vitest/prefer-lowercase-title": "error", // Enforce lowercase test titles
      "vitest/expect-expect": "error", // Ensure tests have assertions

      // TypeScript overrides for tests
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Allow devDependencies in test files
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // More flexible for test setup and mock functions
      "max-lines-per-function": ["warn", 150],

      // Allow nested callbacks in test structure
      "max-nested-callbacks": ["warn", 10],

      // Disable Node.js version checks for browser APIs in tests (setup files often mock these)
      "n/no-unsupported-features/node-builtins": "off",

      // Allow console for test debugging (warning instead of error)
      "no-console": "warn",

      // Allow non-literal fs operations in test scripts
      "security/detect-non-literal-fs-filename": "off",

      // Allow object injection in test utilities (dynamic property access common in mocks)
      "security/detect-object-injection": "off",

      // Allow magic numbers in test data
      "unicorn/no-magic-numbers": "off",

      // Allow null in test mocks and assertions
      "unicorn/no-null": "off",
    },
  },

  // Configuration files
  {
    files: ["*.config.{js,ts,mjs}", ".eslintrc.{js,ts}", "eslint.config.{js,ts,mjs}"],
    ignores: ["**/.vite/"],
    rules: {
      // Allow default export in config files
      "import/no-default-export": "off",

      // Allow devDependencies in config files
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Allow magic numbers in configuration
      "unicorn/no-magic-numbers": "off",
    },
  },
];
