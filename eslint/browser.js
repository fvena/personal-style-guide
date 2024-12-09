import globals from "globals";

import base from "./_base.js";

export default [
  ...base,
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
];
