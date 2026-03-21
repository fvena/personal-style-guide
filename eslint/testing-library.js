import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ...testingLibrary.configs["flat/vue"],
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    name: "fvena/testing-library/vue",
    rules: {
      ...testingLibrary.configs["flat/vue"].rules,
      // Allows destructuring of `render` in Vue component tests
      "@typescript-eslint/unbound-method": "off",
    },
  },
]);
