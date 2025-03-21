/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-recess-order",
  ],
  rules: {
    "no-descending-specificity": [true, { severity: "warning" }],
    "no-empty-source": [true, { severity: "warning" }],
    "scss/comment-no-empty": [true, { severity: "warning" }],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global", "slotted"] },
    ],
  },
};
