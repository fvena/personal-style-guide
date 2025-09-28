import nuxtConfig from "@nuxt/eslint-config";
import vueConfig from "./vue.js";

/**
 * Nuxt.js ESLint configuration.
 * Includes Vue configuration internally and adds Nuxt-specific rules.
 *
 * Usage:
 * import browserConfig from '@personal-style-guide/eslint/browser'  // or nodeConfig for universal
 * import nuxtConfig from '@personal-style-guide/eslint/nuxt'
 * export default [
 *   ...browserConfig,
 *   ...nuxtConfig,
 *   // Your custom rules here
 * ]
 *
 * Features:
 * - Vue.js configuration included automatically
 * - Nuxt 4+ support with @nuxt/eslint-config integration
 * - TypeScript support with Nuxt auto-imports
 * - Server-side rendering optimizations
 * - Performance and accessibility best practices
 * - File-specific rules for Nuxt project structure
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  // Include Vue configuration automatically
  ...vueConfig,

  // Nuxt-specific ignore patterns
  {
    ignores: ["**/.nuxt/", "**/.output/", "**/.nitro/"],
  },

  // Include Nuxt's official configuration
  ...(Array.isArray(nuxtConfig) ? nuxtConfig : [nuxtConfig]),

  // Nuxt-specific overrides for Vue files
  {
    files: ["**/*.vue"],
    rules: {
      // Nuxt allows single-word component names for pages and layouts
      "vue/multi-word-component-names": "off",

      // Not required in Composition API with auto-imports
      "vue/require-default-prop": "off",
    },
  },

  // Nuxt pages - Special handling
  {
    files: ["pages/**/*.vue", "layouts/**/*.vue"],
    rules: {
      // Pages and layouts can have single words
      "vue/multi-word-component-names": "off",

      // Pages may not need name property (auto-generated)
      "vue/require-name-property": "off",
    },
  },

  // Nuxt composables
  {
    files: ["composables/**/*.{js,ts}", "utils/**/*.{js,ts}"],
    rules: {
      // Composables should use named exports for auto-imports
      "import/prefer-default-export": "off",
      "import/no-default-export": "error",
    },
  },

  // Nuxt middleware
  {
    files: ["middleware/**/*.{js,ts}"],
    rules: {
      // Middleware should use default export
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",
    },
  },

  // Nuxt plugins
  {
    files: ["plugins/**/*.{js,ts}"],
    rules: {
      // Plugins should use default export
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",
    },
  },

  // Nuxt server API routes
  {
    files: ["server/api/**/*.{js,ts}", "server/routes/**/*.{js,ts}"],
    rules: {
      // Server routes should use default export
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",

      // Allow console in server files for logging
      "no-console": "warn",

      // Server files might need CommonJS
      "unicorn/prefer-module": "off",
    },
  },

  // Nuxt server middleware
  {
    files: ["server/middleware/**/*.{js,ts}"],
    rules: {
      // Server middleware should use default export
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",

      // Allow console in server files
      "no-console": "warn",
    },
  },

  // Nuxt configuration files
  {
    files: ["nuxt.config.{js,ts}", "app.config.{js,ts}"],
    rules: {
      // Config files require default export
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",

      // Allow magic numbers in config
      "unicorn/no-magic-numbers": "off",
    },
  },

  // Nuxt app files
  {
    files: ["app.vue", "error.vue", "app.{js,ts}"],
    rules: {
      // App files can have single-word names
      "vue/multi-word-component-names": "off",

      // App files should use default export
      "import/no-default-export": "off",
    },
  },
];
