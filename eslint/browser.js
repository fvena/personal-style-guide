import globals from "globals";
import baseConfig from "./_base.js";

/**
 * Browser ESLint configuration.
 * Extends base configuration with browser-specific globals and rules.
 *
 * Usage:
 * import browserConfig from '@personal-style-guide/eslint/browser'
 * export default [
 *   ...browserConfig,
 *   // Your custom rules here
 * ]
 *
 * Features:
 * - All base configuration (JavaScript, TypeScript, JSON, package.json, Vitest)
 * - Browser global variables and APIs
 * - Client-side development patterns
 * - File-specific rules for different browser contexts
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...baseConfig,

  // Browser-specific ignore patterns
  {
    ignores: ["**/public/", "**/assets/", "**/*.min.js", "**/*.min.css"],
  },

  // Browser JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Browser specific rules can be added here
    },
  },

  // Browser TypeScript files
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Browser TypeScript specific rules can be added here
    },
  },

  // Client/Frontend specific files
  {
    files: [
      "src/**/*.{js,ts}",
      "client/**/*.{js,ts}",
      "frontend/**/*.{js,ts}",
      "public/**/*.{js,ts}",
      "assets/**/*.{js,ts}",
    ],
    rules: {
      // Frontend files should generally avoid console
      "no-console": "error",

      // Browser files should not use Node.js APIs
      "n/no-unsupported-features/node-builtins": "error",
    },
  },

  // Component files (generic JS/TS components)
  {
    files: ["components/**/*.{js,ts}", "src/components/**/*.{js,ts}"],
    rules: {
      // Components should avoid console
      "no-console": "error",

      // Components should prefer named exports
      "import/prefer-default-export": "off",
      "import/no-default-export": "warn",
    },
  },

  // Utility files
  {
    files: [
      "utils/**/*.{js,ts}",
      "src/utils/**/*.{js,ts}",
      "helpers/**/*.{js,ts}",
      "src/helpers/**/*.{js,ts}",
      "lib/**/*.{js,ts}",
      "src/lib/**/*.{js,ts}",
    ],
    rules: {
      // Utilities should prefer named exports for tree shaking
      "import/prefer-default-export": "off",
      "import/no-default-export": "warn",
    },
  },

  // Service Worker files
  {
    files: [
      "**/sw.{js,ts}",
      "**/service-worker.{js,ts}",
      "**/serviceWorker.{js,ts}",
      "public/sw.{js,ts}",
    ],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
    rules: {
      // Service workers may need console for debugging
      "no-console": "warn",

      // Service workers have different global scope
      "no-restricted-globals": "off",
    },
  },

  // Web Worker files
  {
    files: ["**/*.worker.{js,ts}", "**/worker.{js,ts}", "workers/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.worker,
      },
    },
    rules: {
      // Workers may need console for debugging
      "no-console": "warn",

      // Workers have different global scope
      "no-restricted-globals": "off",
    },
  },

  // Build and bundler files
  {
    files: [
      "webpack.config.{js,ts}",
      "rollup.config.{js,ts}",
      "vite.config.{js,ts}",
      "build/**/*.{js,ts}",
    ],
    languageOptions: {
      globals: {
        ...globals.node, // Build tools run in Node
      },
    },
    rules: {
      // Build files can use console
      "no-console": "off",

      // Build files need devDependencies
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Allow default export in config files
      "import/no-default-export": "off",
    },
  },
];
