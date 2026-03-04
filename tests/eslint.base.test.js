import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";
import {
  baseComments,
  baseIgnores,
  baseJavascript,
  baseMarkdown,
  basePerfectionist,
  baseRegexp,
  baseTsdoc,
  baseTypeScript,
  baseUnicorn,
  baseYaml,
} from "../eslint/base.js";

const root = path.dirname(fileURLToPath(import.meta.url));

describe("eslint/base composable blocks", () => {
  it("each block exports a non-empty array", () => {
    expect(Array.isArray(baseIgnores)).toBe(true);
    expect(baseIgnores.length).toBeGreaterThan(0);

    expect(Array.isArray(baseJavascript)).toBe(true);
    expect(baseJavascript.length).toBeGreaterThan(0);

    expect(Array.isArray(baseTypeScript)).toBe(true);
    expect(baseTypeScript.length).toBeGreaterThan(0);

    expect(Array.isArray(basePerfectionist)).toBe(true);
    expect(basePerfectionist.length).toBeGreaterThan(0);

    expect(Array.isArray(baseUnicorn)).toBe(true);
    expect(baseUnicorn.length).toBeGreaterThan(0);

    expect(Array.isArray(baseRegexp)).toBe(true);
    expect(baseRegexp.length).toBeGreaterThan(0);

    expect(Array.isArray(baseComments)).toBe(true);
    expect(baseComments.length).toBeGreaterThan(0);

    expect(Array.isArray(baseTsdoc)).toBe(true);
    expect(baseTsdoc.length).toBeGreaterThan(0);

    expect(Array.isArray(baseYaml)).toBe(true);
    expect(baseYaml.length).toBeGreaterThan(0);

    expect(Array.isArray(baseMarkdown)).toBe(true);
    expect(baseMarkdown.length).toBeGreaterThan(0);
  });

  it("composed config loads without errors", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        ...baseIgnores,
        ...baseJavascript,
        ...basePerfectionist,
        ...baseUnicorn,
        ...baseComments,
      ],
      overrideConfigFile: true,
    });
    await expect(eslint.calculateConfigForFile("test.js")).resolves.toBeDefined();
  });

  it("baseTypeScript loads without errors for .ts files", async () => {
    const eslint = new ESLint({
      overrideConfigFile: path.resolve(root, "..", "eslint", "node.js"),
    });
    await expect(eslint.calculateConfigForFile("test.ts")).resolves.toBeDefined();
  });
});
