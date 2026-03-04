/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-recess-order",
  ],
  rules: {
    "at-rule-no-deprecated": [true, { ignoreAtRules: ["apply"] }],
    "declaration-block-no-duplicate-properties": [
      true,
      {
        ignore: [
          "consecutive-duplicates-with-different-values",
          "consecutive-duplicates-with-different-syntaxes",
        ],
      },
    ],
    // eslint-disable-next-line unicorn/no-null -- Stylelint requires null to disable a rule
    "no-descending-specificity": null,
    "no-empty-source": [true, { severity: "warning" }],
    "scss/comment-no-empty": [true, { severity: "warning" }],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["deep", "global", "slotted"] },
    ],
  },
};
