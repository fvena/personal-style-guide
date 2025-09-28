/**
 * Base Stylelint configuration for all environments.
 * Contains core CSS/SCSS linting rules that apply universally.
 */

/**
 * Base Stylelint configuration with essential rules and ordering
 * @type {import('stylelint').Config}
 */
const config = {
  // Extend recommended configs for solid foundation
  extends: [
    // Core recommended rules for CSS best practices
    "stylelint-config-recommended",
    // Recess property ordering for consistent CSS organization
    // Orders properties: positioning > box model > typography > visual > misc
    "stylelint-config-recess-order",
  ],

  rules: {
    // Warn when selectors are ordered by descending specificity
    // Later rules shouldn't have lower specificity than earlier ones
    // Set as warning because refactoring legacy CSS may not be immediate
    "no-descending-specificity": [true, { severity: "warning" }],

    // Warn on empty CSS files
    // Empty sources might indicate forgotten implementation
    // Warning allows gradual cleanup without blocking
    "no-empty-source": [true, { severity: "warning" }],
  },
};

export default config;
