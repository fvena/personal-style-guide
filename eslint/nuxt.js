import base from "./_base.js";

/**
 * ESLint configuration for Nuxt.js applications.
 * Extends base configuration with Nuxt-specific rules and integrations.
 *
 * Features:
 * - Nuxt 4+ support with @nuxt/eslint integration
 * - Vue.js single file component support
 * - TypeScript support with Nuxt auto-imports
 * - Server-side rendering optimizations
 * - Performance and accessibility best practices
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...base,
  {
    extends: ["@nuxt/eslint-config"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      // Vue-specific overrides for Nuxt
      "vue/multi-word-component-names": "off", // Nuxt allows single-word page names
      "vue/require-default-prop": "off", // Not required in Composition API
    },
  },
  {
    files: ["pages/**/*.vue", "layouts/**/*.vue"],
    rules: {
      // Page and layout specific rules
      "vue/multi-word-component-names": "off", // Pages can have single words
    },
  },
  {
    files: ["server/**/*.{js,ts}"],
    rules: {
      // Server-side specific rules
      "unicorn/prefer-module": "off", // Server might need CommonJS
    },
  },
  {
    files: ["nuxt.config.{js,ts}"],
    rules: {
      // Nuxt config specific rules
      "import/no-default-export": "off", // Nuxt config requires default export
    },
  },
];
