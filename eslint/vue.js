import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import vueParser from "vue-eslint-parser";
import base from "./_base.js";
import testBase from "./_test.js";

/**
 * Vue.js ESLint configuration with comprehensive accessibility support.
 * Extends base configuration with Vue 3 specific rules and best practices.
 *
 * Features:
 * - Vue 3 Composition API and <script setup> support
 * - Full WCAG 2.1 AA accessibility compliance
 * - TypeScript integration for .vue files
 * - Modern Vue.js best practices and patterns
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...base,
  ...pluginVue.configs["flat/recommended"],
  ...pluginVueA11y.configs["flat/recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "import/no-default-export": "off", // Vue components use default export
      /**
       * Disable conflicting rules from base configuration
       * that don't apply well to Vue templates
       */
      "unicorn/filename-case": "off", // Vue components use PascalCase
      /**
       * Vue.js Template Formatting Rules
       */
      "vue/attribute-hyphenation": ["error", "always"],
      /**
       * Vue.js Best Practices and Quality Rules
       */
      "vue/block-order": [
        "error",
        {
          order: ["script", "template", "style"],
        },
      ],
      /**
       * Vue.js Core Rules - Essential for Vue 3
       */
      "vue/component-api-style": ["error", ["script-setup", "composition"]],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/component-tags-order": [
        "error",
        {
          order: ["script", "template", "style"],
        },
      ],
      "vue/custom-event-name-casing": ["error", "camelCase"],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
        },
      ],
      "vue/first-attribute-linebreak": [
        "error",
        {
          multiline: "below",
          singleline: "beside",
        },
      ],
      "vue/html-closing-bracket-newline": [
        "error",
        {
          multiline: "always",
          singleline: "never",
        },
      ],
      "vue/html-closing-bracket-spacing": [
        "error",
        {
          endTag: "never",
          selfClosingTag: "always",
          startTag: "never",
        },
      ],
      "vue/html-indent": [
        "error",
        2,
        {
          alignAttributesVertically: true,
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
        },
      ],
      "vue/html-quotes": ["error", "double", { avoidEscape: false }],
      "vue/html-self-closing": [
        "error",
        {
          html: { component: "always", normal: "always", void: "always" },
          math: "always",
          svg: "always",
        },
      ],
      "vue/max-attributes-per-line": [
        "error",
        {
          multiline: { max: 1 },
          singleline: { max: 2 },
        },
      ],
      "vue/multi-word-component-names": "error",
      "vue/mustache-interpolation-spacing": ["error", "always"],
      "vue/no-duplicate-attr-inheritance": "error",

      "vue/no-empty-component-block": "error",
      "vue/no-multi-spaces": ["error", { ignoreProperties: false }],
      "vue/no-multiple-objects-in-class": "error",
      "vue/no-potential-component-option-typo": [
        "error",
        {
          presets: ["vue", "vue-router"],
          threshold: 1,
        },
      ],
      "vue/no-ref-object-destructure": "error",
      "vue/no-required-prop-with-default": "error",
      "vue/no-setup-props-destructure": "error",
      /**
       * Vue.js Performance and Modern Patterns
       */
      "vue/no-setup-props-reactivity-loss": "error",
      "vue/no-spaces-around-equal-signs-in-attribute": "error",
      "vue/no-static-inline-styles": "error",
      "vue/no-template-target-blank": "error",
      "vue/no-this-in-before-route-enter": "error",
      "vue/no-undef-components": [
        "error",
        {
          ignorePatterns: ["router-link", "nuxt-link", "client-only"],
        },
      ],

      "vue/no-undef-properties": "error",
      "vue/no-unsupported-features": [
        "error",
        {
          ignores: [],
          version: "^3.0.0",
        },
      ],
      "vue/no-unused-properties": [
        "error",
        {
          groups: ["props", "data", "computed", "methods", "setup"],
        },
      ],
      "vue/no-useless-mustaches": [
        "error",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      "vue/no-useless-v-bind": [
        "error",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      "vue/no-v-text-v-html-on-component": "error",
      "vue/no-watch-after-await": "error",
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/prefer-define-options": "error",
      "vue/prefer-import-from-vue": "error",
      "vue/prefer-separate-static-class": "error",
      "vue/prefer-true-attribute-shorthand": "error",
      "vue/prefer-use-template-ref": "error",
      "vue/prop-name-casing": ["error", "camelCase"],
      "vue/require-default-prop": "error",
      "vue/require-emit-validator": "error",
      "vue/require-explicit-emits": "error",
      "vue/require-macro-variable-name": "error",
      "vue/require-name-property": "error",
      "vue/require-prop-types": "error",

      "vue/require-typed-ref": "error",
      "vue/script-indent": [
        "error",
        2,
        {
          baseIndent: 0,
          ignores: [],
          switchCase: 1,
        },
      ],
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          ignores: ["pre", "textarea", "router-link", "nuxt-link"],
          ignoreWhenEmpty: true,
          ignoreWhenNoAttributes: true,
        },
      ],
      "vue/v-bind-style": ["error", "shorthand"],

      "vue/v-on-style": ["error", "shorthand"],
      "vue/v-slot-style": ["error", "shorthand"],
      /**
       * Accessibility Rules - WCAG 2.1 AA Compliance
       *
       * These rules ensure comprehensive accessibility support
       * following Vue.js accessibility best practices
       */
      "vuejs-accessibility/alt-text": "error",
      "vuejs-accessibility/anchor-has-content": "error",
      "vuejs-accessibility/aria-props": "error",
      "vuejs-accessibility/aria-role": "error",
      "vuejs-accessibility/aria-unsupported-elements": "error",
      "vuejs-accessibility/click-events-have-key-events": "error",
      "vuejs-accessibility/form-control-has-label": "error",
      "vuejs-accessibility/heading-has-content": "error",
      "vuejs-accessibility/iframe-has-title": "error",
      "vuejs-accessibility/interactive-supports-focus": "error",
      "vuejs-accessibility/label-has-for": [
        "error",
        {
          required: { some: ["nesting", "id"] },
        },
      ],
      "vuejs-accessibility/media-has-caption": "error",
      "vuejs-accessibility/mouse-events-have-key-events": "error",
      "vuejs-accessibility/no-access-key": "error",
      "vuejs-accessibility/no-autofocus": "error",
      "vuejs-accessibility/no-distracting-elements": "error",
      "vuejs-accessibility/no-onchange": "error",
      "vuejs-accessibility/no-redundant-roles": "error",

      "vuejs-accessibility/role-has-required-aria-props": "error",
      "vuejs-accessibility/tabindex-no-positive": "error",
    },
  },
  {
    // Disable type checking for Vue template blocks
    files: ["*.vue"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
  {
    // Additional rules for script setup syntax
    files: ["**/*.vue"],
    rules: {
      "vue/script-setup-uses-vars": "error",
    },
  },
  {
    ...testBase,
    rules: {
      ...testBase.rules,

      // Vue-specific test rules
      "vue/multi-word-component-names": "off", // Test components can have single word names
      "vue/no-undef-components": "off", // Test components might use testing utilities
      "vue/require-name-property": "off", // Test components don't need name property

      // Accessibility rules can be more relaxed in test components
      "vuejs-accessibility/alt-text": "warn",
      "vuejs-accessibility/click-events-have-key-events": "warn",
      "vuejs-accessibility/form-control-has-label": "warn",
      "vuejs-accessibility/interactive-supports-focus": "warn",
    },
  },
];
