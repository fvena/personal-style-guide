import { defineConfig } from "eslint/config";
import eslintNode from "./eslint/node.js";

export default defineConfig([{ ignores: ["tests/fixtures/"] }, ...eslintNode]);
