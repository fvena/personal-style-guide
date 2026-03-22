// @expect-error: @typescript-eslint/no-explicit-any
export function processData(input: any): any {
  return input
}
