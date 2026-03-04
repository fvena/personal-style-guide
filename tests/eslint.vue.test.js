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

describe("eslint/vue config", () => {
  it("loads without errors", async () => {
    const eslint = createESLint("vue.js");
    await expect(eslint.calculateConfigForFile("test.vue")).resolves.toBeDefined();
  });

  it("loads without errors for .ts files", async () => {
    const eslint = createESLint("vue.js");
    await expect(eslint.calculateConfigForFile("test.ts")).resolves.toBeDefined();
  });

  it("reports no errors on valid.ts", async () => {
    const eslint = createESLint("vue.js");
    const results = await eslint.lintFiles([path.join(root, "fixtures/valid.ts")]);
    const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2));
    expect(errors).toHaveLength(0);
  });

  it("reports errors on invalid.ts", async () => {
    const eslint = createESLint("vue.js");
    const results = await eslint.lintFiles([path.join(root, "fixtures/invalid.ts")]);
    const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2));
    expect(errors.length).toBeGreaterThan(0);
  });

  it("reports no errors on valid-component.vue", async () => {
    const eslint = createESLint("vue.js");
    const results = await eslint.lintFiles([path.join(root, "fixtures/valid-component.vue")]);
    const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2));
    expect(errors).toHaveLength(0);
  });

  it("reports errors on invalid-component.vue", async () => {
    const eslint = createESLint("vue.js");
    const results = await eslint.lintFiles([path.join(root, "fixtures/invalid-component.vue")]);
    const errors = results.flatMap((r) => r.messages.filter((m) => m.severity === 2));
    expect(errors.length).toBeGreaterThan(0);
  });
});
