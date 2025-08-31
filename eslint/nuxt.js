import nuxtConfig from "@nuxt/eslint-config";
import base from "./_base.js";
import testBase from "./_test.js";
import packageJsonConfig from "./_package-json.js";

/**
 * ESLint configuration for Nuxt.js applications.
 * Extends base configuration with Nuxt-specific rules and integrations.
 *
 * Features:
 * - Nuxt 4+ support with @nuxt/eslint-config integration
 * - Vue.js single file component support
 * - TypeScript support with Nuxt auto-imports
 * - Server-side rendering optimizations
 * - Performance and accessibility best practices
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...base,
  ...nuxtConfig,
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
  {
    ...testBase,
    rules: {
      ...testBase.rules,

      // Nuxt-specific test rules
      "import/no-default-export": "off", // Test files might export default for component testing

      // Vue-specific test rules (inherited from Vue config)
      "vue/multi-word-component-names": "off", // Test components can have single word names
      "vue/no-undef-components": "off", // Test components might use testing utilities
      "vue/require-default-prop": "off", // Not required in test components
      "vue/require-name-property": "off", // Test components don't need name property

      // Accessibility rules can be more relaxed in test components
      "vuejs-accessibility/alt-text": "warn",
      "vuejs-accessibility/click-events-have-key-events": "warn",
      "vuejs-accessibility/form-control-has-label": "warn",
      "vuejs-accessibility/interactive-supports-focus": "warn",
    },
  },
  ...packageJsonConfig,
];
