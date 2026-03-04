import { describe, expect, it } from "vitest";

describe("prettier config", () => {
  it("loads without errors and exports a valid config object", async () => {
    const { default: config } = await import("../prettier/index.js");

    expect(config).toBeDefined();
    expect(typeof config).toBe("object");
  });

  it("has required formatting properties", async () => {
    const { default: config } = await import("../prettier/index.js");

    expect(config).toHaveProperty("singleQuote");
    expect(config).toHaveProperty("semi");
    expect(config).toHaveProperty("printWidth");
    expect(config).toHaveProperty("trailingComma");
  });

  it("enforces expected values", async () => {
    const { default: config } = await import("../prettier/index.js");

    expect(config.singleQuote).toBe(true);
    expect(config.semi).toBe(false);
    expect(config.printWidth).toBe(100);
    expect(config.trailingComma).toBe("none");
    expect(config.endOfLine).toBe("lf");
  });
});

describe("stylelint config", () => {
  it("loads without errors and exports a valid config object", async () => {
    const { default: config } = await import("../stylelint/index.js");

    expect(config).toBeDefined();
    expect(typeof config).toBe("object");
  });

  it("extends the expected base configs", async () => {
    const { default: config } = await import("../stylelint/index.js");

    expect(Array.isArray(config.extends)).toBe(true);
    expect(config.extends).toContain("stylelint-config-recommended");
    expect(config.extends).toContain("stylelint-config-recommended-scss");
    expect(config.extends).toContain("stylelint-config-recess-order");
  });

  it("has rules defined", async () => {
    const { default: config } = await import("../stylelint/index.js");

    expect(config.rules).toBeDefined();
    expect(typeof config.rules).toBe("object");
  });
});
