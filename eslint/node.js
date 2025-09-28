import globals from "globals";
import baseConfig from "./_base.js";

/**
 * Node.js ESLint configuration.
 * Extends base configuration with Node.js specific globals and rules.
 *
 * Usage:
 * import nodeConfig from '@personal-style-guide/eslint/node'
 * export default [
 *   ...nodeConfig,
 *   // Your custom rules here
 * ]
 *
 * Features:
 * - All base configuration (JavaScript, TypeScript, JSON, package.json, Vitest)
 * - Node.js global variables and APIs
 * - Server-side development patterns
 * - File-specific rules for different Node.js contexts
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...baseConfig,

  // Node.js JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Node.js specific rules can be added here
    },
  },

  // Node.js TypeScript files
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Node.js TypeScript specific rules can be added here
    },
  },

  // Server/API specific files
  {
    files: [
      "server/**/*.{js,ts}",
      "api/**/*.{js,ts}",
      "src/server/**/*.{js,ts}",
      "src/api/**/*.{js,ts}",
      "backend/**/*.{js,ts}",
    ],
    rules: {
      // Allow console in server files for logging
      "no-console": "warn",

      // Server files often need process.env
      "n/no-process-env": "off",
    },
  },

  // Scripts and build files
  {
    files: ["scripts/**/*.{js,ts}", "build/**/*.{js,ts}", "tools/**/*.{js,ts}"],
    rules: {
      // Allow console in build scripts
      "no-console": "off",

      // Allow devDependencies in scripts
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Scripts may need process.exit
      "n/no-process-exit": "off",

      // Allow magic numbers in scripts (ports, timeouts, etc.)
      "unicorn/no-magic-numbers": "off",
    },
  },

  // CLI files
  {
    files: ["bin/**/*.{js,ts}", "cli/**/*.{js,ts}", "src/bin/**/*.{js,ts}", "src/cli/**/*.{js,ts}"],
    rules: {
      // CLI files often use console
      "no-console": "off",

      // CLI files may need process.exit
      "n/no-process-exit": "off",

      // CLI files may have hashbang
      "n/no-hashbang": "off",
    },
  },

  // Database and migration files
  {
    files: [
      "database/**/*.{js,ts}",
      "migrations/**/*.{js,ts}",
      "seeds/**/*.{js,ts}",
      "src/database/**/*.{js,ts}",
      "src/migrations/**/*.{js,ts}",
    ],
    rules: {
      // Database files may have async functions without await
      "@typescript-eslint/require-await": "off",

      // Migration files may have specific patterns
      "unicorn/filename-case": "off",
    },
  },
];
