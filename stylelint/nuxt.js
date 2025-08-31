import vue from "./vue.js";

/**
 * Stylelint configuration for Nuxt.js applications.
 * Extends Vue configuration with Nuxt-specific rules and patterns.
 *
 * Features:
 * - Nuxt application structure support
 * - CSS Modules integration for Nuxt
 * - Server-side rendering optimizations
 * - Nuxt-specific CSS custom properties
 * - Performance optimizations for SSR/SSG
 *
 * @type {import('stylelint').Config}
 */
export default {
  ...vue,
  /**
   * File-specific overrides for Nuxt project structure
   */
  overrides: [
    ...vue.overrides,
    {
      files: ["assets/css/**/*.{css,scss}", "assets/scss/**/*.scss"],
      rules: {
        "custom-property-pattern": "^[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",
        // Global styles specific rules
        // eslint-disable-next-line unicorn/no-null -- allow disabling rules
        "selector-class-pattern": null, // More flexible for utility classes
      },
    },
    {
      files: ["components/**/*.vue", "pages/**/*.vue", "layouts/**/*.vue"],
      rules: {
        // Nuxt-specific component styles
        "selector-pseudo-class-no-unknown": [
          true,
          {
            ignorePseudoClasses: [
              "deep",
              "global",
              "slotted",
              // Vue 3 specific pseudo-classes
              "v-deep",
              "v-global",
              "v-slotted",
              // Nuxt specific pseudo-classes
              "nuxt-loading",
              "nuxt-error",
            ],
          },
        ],
      },
    },
    {
      files: ["app.vue"],
      rules: {
        // App.vue specific rules
        // eslint-disable-next-line unicorn/no-null -- allow disabling rules
        "no-empty-source": null,
        // eslint-disable-next-line unicorn/no-null -- allow disabling rules
        "selector-class-pattern": null, // More flexible for root app styles
      },
    },
  ],

  rules: {
    ...vue.rules,

    /**
     * Nuxt-specific CSS optimizations
     */
    "custom-property-pattern": "^[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",

    /**
     * Performance optimizations for SSR
     */
    "property-no-unknown": [
      true,
      {
        ignoreProperties: [
          // CSS Grid properties
          "grid-template-areas",
          "grid-template-columns",
          "grid-template-rows",
          // Container Query properties
          "container-type",
          "container-name",
          // CSS Logical Properties
          "margin-inline-start",
          "margin-inline-end",
          "padding-inline-start",
          "padding-inline-end",
          // Nuxt specific properties (if any)
          "view-transition-name",
        ],
      },
    ],
  },
};
