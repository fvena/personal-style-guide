import turbo from "eslint-config-turbo/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ...turbo[0],
    name: "fvena/turbo/recommended",
  },
]);
