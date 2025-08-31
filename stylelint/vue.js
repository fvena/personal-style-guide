import base from "./_base.js";

/**
 * Stylelint configuration for Vue.js environments.
 * Extends base configuration with Vue-specific SCSS rules and pseudo-class support.
 */

/** @type {import('stylelint').Config} */
export default {
  ...base,
  extends: [
    ...base.extends,
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
  ],
  rules: {
    ...base.rules,
    "scss/comment-no-empty": [true, { severity: "warning" }],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global", "slotted"] },
    ],
  },
};
