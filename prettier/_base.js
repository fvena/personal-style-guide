/**
 * Base Prettier configuration for all environments.
 * Contains core formatting rules that apply universally.
 *
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */
const overridableDefaults = {
  endOfLine: "lf",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
};

export default {
  ...overridableDefaults,
  arrowParens: "avoid",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "strict",
  jsxSingleQuote: true,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  semi: false,
  singleQuote: true,
  trailingComma: "none",
};
