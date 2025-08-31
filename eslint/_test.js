import globals from "globals";

/**
 * Base ESLint configuration for test files.
 * Contains common rules and overrides that apply to all test environments.
 *
 * Features:
 * - DevDependencies allowed in test files
 * - Console warnings instead of errors for debugging
 * - Relaxed rules for test setup and mock functions
 * - Flexible limits for test structure and data
 * - Magic numbers and nested callbacks allowed
 * - Vitest globals enabled
 *
 * @type {import('eslint').Linter.Config}
 */
export default {
  // Test files specific configuration
  files: [
    "**/*.{test,spec}.{js,ts,vue}",
    "**/test/**/*.{js,ts,vue}",
    "**/tests/**/*.{js,ts,vue}",
    "**/__tests__/**/*.{js,ts,vue}",
    "**/vitest/setup/**/*.{js,ts}",
  ],
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
    // Allow dynamic delete in test cleanup
    "@typescript-eslint/no-dynamic-delete": "off",

    // Allow empty functions in test mocks
    "@typescript-eslint/no-empty-function": "off",

    // Allow any types in test mocks when necessary
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

    // Disable Node.js version checks for browser APIs in tests
    "n/no-unsupported-features/node-builtins": "off",

    // Allow console for test debugging (warning instead of error)
    "no-console": "warn",

    // Allow non-literal fs operations in test scripts
    "security/detect-non-literal-fs-filename": "off",

    // Allow object injection in test utilities
    "security/detect-object-injection": "off",

    // Allow magic numbers in test data
    "unicorn/no-magic-numbers": "off",

    // Allow null in test mocks and assertions
    "unicorn/no-null": "off",
  },
};
