import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.dirname(fileURLToPath(import.meta.url));

function stripJsoncComments(text) {
  let result = "";
  let index = 0;
  while (index < text.length) {
    if (text[index] === '"') {
      const start = index;
      index++;
      while (index < text.length && text[index] !== '"') {
        if (text[index] === "\\") index++;
        index++;
      }
      index++;
      result += text.slice(start, index);
    } else if (text[index] === "/" && text[index + 1] === "/") {
      while (index < text.length && text[index] !== "\n") index++;
    } else if (text[index] === "/" && text[index + 1] === "*") {
      index += 2;
      while (index < text.length && !(text[index] === "*" && text[index + 1] === "/")) index++;
      index += 2;
    } else {
      result += text[index];
      index++;
    }
  }
  return result;
}

function readTsConfig(name) {
  const filePath = path.resolve(root, "..", "typescript", name);
  const content = readFileSync(filePath, "utf8");
  return JSON.parse(stripJsoncComments(content));
}

describe("typescript/tsconfig.node.json", () => {
  it("loads without errors", () => {
    expect(() => readTsConfig("tsconfig.node.json")).not.toThrow();
  });

  it("has strict mode enabled", () => {
    const config = readTsConfig("tsconfig.node.json");
    expect(config.compilerOptions.strict).toBe(true);
  });

  it("has noUncheckedIndexedAccess enabled", () => {
    const config = readTsConfig("tsconfig.node.json");
    expect(config.compilerOptions.noUncheckedIndexedAccess).toBe(true);
  });

  it("targets es2022", () => {
    const config = readTsConfig("tsconfig.node.json");
    expect(config.compilerOptions.target).toBe("es2022");
  });

  it("has noEmit enabled", () => {
    const config = readTsConfig("tsconfig.node.json");
    expect(config.compilerOptions.noEmit).toBe(true);
  });
});

describe("typescript/tsconfig.browser.json", () => {
  it("loads without errors", () => {
    expect(() => readTsConfig("tsconfig.browser.json")).not.toThrow();
  });

  it("extends tsconfig.node.json", () => {
    const config = readTsConfig("tsconfig.browser.json");
    expect(config.extends).toBe("./tsconfig.node.json");
  });

  it("includes DOM lib", () => {
    const config = readTsConfig("tsconfig.browser.json");
    expect(config.compilerOptions.lib).toContain("dom");
  });
});
