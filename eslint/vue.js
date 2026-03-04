import eslintConfigPrettier from "eslint-config-prettier";
import vuePlugin from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import base from "./base.js";

/* eslint-disable perfectionist/sort-objects -- Disabling sorting to maintain logical grouping of Vue rules */

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  // Vue 3 recommended rules as a starting point
  ...vuePlugin.configs["flat/vue3-recommended"],
  // Parser for .vue files
  {
    name: "fvena/vue/parser",
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
  // Opinionated rules for the exact stack: Vue 3 + script setup + TS + SCSS
  {
    name: "fvena/vue/rules",
    files: ["**/*.vue"],
    rules: {
      // Enforce <script setup> — no Options API, no composition without setup
      "vue/component-api-style": ["error", ["script-setup"]],

      // SFC block order: <script setup> first, then template, then style
      "vue/block-order": [
        "error",
        {
          order: ["script", "template", "style"],
        },
      ],

      // Macro order inside <script setup>
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
        },
      ],

      // Multi-word component names (ignores App and index pages)
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["App", "index"],
        },
      ],

      // Props must always be typed with TypeScript (defineProps<{...}>())
      "vue/define-props-declaration": ["error", "type-based"],

      // Emits must always be typed with TypeScript
      "vue/define-emits-declaration": ["error", "type-based"],

      // Enforce scoped or module styles — no global <style> without attribute
      "vue/enforce-style-attribute": [
        "error",
        {
          allow: ["scoped", "module"],
        },
      ],

      // Template attributes: one per line when multiline
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: { max: 3 },
          multiline: { max: 1 },
        },
      ],

      // Consistent self-closing tags
      "vue/html-self-closing": [
        "error",
        {
          html: { void: "always", normal: "always", component: "always" },
          svg: "always",
          math: "always",
        },
      ],

      // Always use v-bind shorthand (:prop instead of v-bind:prop)
      "vue/v-bind-style": ["error", "shorthand"],

      // Always use v-on shorthand (@event instead of v-on:event)
      "vue/v-on-style": ["error", "shorthand"],

      // Avoid v-html (XSS risk) — warn instead of error for legitimate cases
      "vue/no-v-html": "warn",
    },
  },
  // Vue accessibility rules (WCAG compliance)
  ...pluginVueA11y.configs["flat/recommended"],
  {
    name: "fvena/vue/accessibility",
    files: ["**/*.vue"],
    rules: {
      // Allow autofocus in modals and form dialogs — common UX pattern in financial apps
      "vuejs-accessibility/no-autofocus": "off",

      // Complex data-table components handle keyboard navigation at the container level,
      // so per-cell click-event key-event pairing is impractical
      "vuejs-accessibility/click-events-have-key-events": "off",
    },
  },
  // Prettier must be last — it disables formatting rules from all configs above
  { ...eslintConfigPrettier, name: "fvena/vue/prettier" },
];
/* eslint-enable perfectionist/sort-objects */
