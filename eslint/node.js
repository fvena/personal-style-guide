import { defineConfig } from "eslint/config";
import globals from "globals";
import base from "./base.js";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  ...base,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    name: "fvena/node/globals",
  },
]);
