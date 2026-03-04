import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

const root = path.dirname(fileURLToPath(import.meta.url));

function createESLint(config) {
  return new ESLint({
    overrideConfigFile: path.resolve(root, "..", "eslint", config),
  });
}

describe("eslint/playwright config", () => {
  it("loads without errors", async () => {
    const eslint = createESLint("playwright.js");
    await expect(eslint.calculateConfigForFile("e2e/login.spec.ts")).resolves.toBeDefined();
  });

  it("returns no config for non-test files", async () => {
    const eslint = createESLint("playwright.js");
    const config = await eslint.calculateConfigForFile("src/utils.ts");
    expect(config).toBeUndefined();
  });
});

describe("eslint/testing-library config", () => {
  it("loads without errors", async () => {
    const eslint = createESLint("testing-library.js");
    await expect(eslint.calculateConfigForFile("src/Button.spec.ts")).resolves.toBeDefined();
  });
});

describe("eslint/turbo config", () => {
  it("loads without errors", async () => {
    const eslint = createESLint("turbo.js");
    await expect(eslint.calculateConfigForFile("turbo.json")).resolves.not.toThrow();
  });
});
