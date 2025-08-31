import base from "./_base.js";

/**
 * Stylelint configuration for Vue.js Single File Components.
 * Optimized for Vue 3 with comprehensive CSS/SCSS rules and modern practices.
 *
 * Features:
 * - Vue SFC style block support (<style scoped>, <style module>)
 * - SCSS/Sass preprocessing support
 * - CSS Modules integration
 * - Vue-specific pseudo-selectors (:deep(), :global(), :slotted())
 * - CSS custom properties (CSS variables) support
 * - Modern CSS features (Grid, Flexbox, Container Queries)
 *
 * @type {import('stylelint').Config}
 */
export default {
  ...base,
  extends: [
    ...base.extends,
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue",
  ],
  /**
   * File-specific overrides for different Vue styling approaches
   */
  overrides: [
    {
      files: ["**/*.vue"],
      rules: {
        // More lenient rules for Vue SFC style blocks
        // eslint-disable-next-line unicorn/no-null -- Allow empty source
        "no-empty-source": null,
      },
    },
    {
      files: ["**/*.module.{css,scss}"],
      rules: {
        // CSS Modules specific rules
        "selector-class-pattern": "^[a-z][a-zA-Z0-9]*$",
      },
    },
    {
      files: ["**/*.scss"],
      rules: {
        "scss/at-import-no-partial-leading-underscore": true,
        // SCSS specific enhancements
        "scss/at-import-partial-extension": "never",
      },
    },
  ],

  rules: {
    ...base.rules,

    /**
     * Animation and Transitions for Vue Components
     */
    "animation-duration-max": "5s",
    /**
     * CSS Quality and Best Practices
     */
    "color-function-notation": "modern",

    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-named": "never",
    "color-no-invalid-hex": true,

    "custom-property-no-missing-var-function": true,
    /**
     * CSS Custom Properties (CSS Variables) for Vue Theming
     */
    "custom-property-pattern": "^[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",

    /**
     * Performance and Accessibility
     */
    "declaration-no-important": [true, { severity: "warning" }],

    /**
     * Typography and Layout Rules
     */
    "font-family-name-quotes": "always-where-recommended",
    "font-family-no-duplicate-names": true,
    "font-weight-notation": "numeric",

    "no-descending-specificity": [true, { severity: "warning" }],
    /**
     * Vue Component Scoping and Organization
     */
    "no-duplicate-selectors": true,
    "no-empty-source": [true, { severity: "warning" }],
    /**
     * Modern CSS Features Support
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
        ],
      },
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          // Vue specific at-rules
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          // SCSS built-ins
          "include",
          "mixin",
          "extend",
          "if",
          "else",
          "for",
          "each",
          "while",
          "function",
          "return",
        ],
      },
    ],

    /**
     * SCSS/Sass Rules for Vue Components
     */
    "scss/comment-no-empty": [true, { severity: "warning" }],
    "scss/dollar-variable-pattern": "^[a-z][a-zA-Z0-9]*$",
    "scss/percent-placeholder-pattern": "^[a-z][a-zA-Z0-9]*$",

    /**
     * CSS Modules Support (for Vue components using CSS Modules)
     */
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$|^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)+$",
      {
        message: "Expected class selector to be kebab-case or camelCase",
      },
    ],
    /**
     * Vue.js Specific Rules
     */
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
        ],
      },
    ],

    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
      },
    ],
    "shorthand-property-no-redundant-values": true,

    "time-min-milliseconds": 100,
  },
};
