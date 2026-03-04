// @expect-error: unicorn/prefer-number-properties
const value = parseInt("42");

// @expect-error: @typescript-eslint/no-explicit-any
function bad(parameter: any) {
  return parameter;
}

// @expect-error: no-console
console.log(value, bad("test"));
