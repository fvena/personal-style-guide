/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-recess-order",
  ],
  rules: {
    // Modern CSS: enforce percentage notation for alpha values (e.g. oklch(50% 0.2 250 / 80%))
    "alpha-value-notation": "percentage",
    "at-rule-no-deprecated": [true, { ignoreAtRules: ["apply"] }],
    // Modern CSS: enforce rgb(0 0 0) over rgb(0, 0, 0), oklch() over legacy notations
    "color-function-notation": "modern",
    "declaration-block-no-duplicate-properties": [
      true,
      {
        ignore: [
          "consecutive-duplicates-with-different-values",
          "consecutive-duplicates-with-different-syntaxes",
        ],
      },
    ],
    "no-descending-specificity": null,
    "no-empty-source": [true, { severity: "warning" }],
    "scss/comment-no-empty": [true, { severity: "warning" }],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global", "slotted"] },
    ],
  },
};
