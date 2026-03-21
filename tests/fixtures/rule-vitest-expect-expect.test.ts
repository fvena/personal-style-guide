import { test } from "vitest";

test("missing assertion", () => {
  const x = 1 + 1; // no expect() — should trigger vitest/expect-expect
  console.log(x);
});
