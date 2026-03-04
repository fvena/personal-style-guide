import { defineConfig } from "eslint/config";
import globals from "globals";
import base from "./_base.js";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  ...base,
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
    name: "fvena/browser/globals",
  },
]);
