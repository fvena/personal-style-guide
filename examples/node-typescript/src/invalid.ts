// @expect-error: @typescript-eslint/no-floating-promises
async function saveUser(data: unknown): Promise<void> {
  await Promise.resolve(data)
}

export function handleRequest(): void {
  // Floating promise — no await
  saveUser({ name: 'test' })
}

// @expect-error: @typescript-eslint/no-explicit-any
export function processData(input: any): any {
  return input
}
