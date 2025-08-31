import globals from "globals";
import base from "./_base.js";
import testBase from "./_test.js";
import jsonConfig from "./_json.js";
import packageJsonConfig from "./_package-json.js";

export default [
  ...base,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    ...testBase,
    rules: {
      ...testBase.rules,

      // Allow longer describe/it names for clarity in Node.js tests
      "unicorn/prefer-string-slice": "off",
    },
  },
  ...jsonConfig,
  ...packageJsonConfig,
];
