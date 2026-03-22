// @expect-error: @typescript-eslint/no-explicit-any
export function processData(input: any): any {
  return input
}

// @expect-error: @typescript-eslint/no-floating-promises
async function fetchData(url: string): Promise<string> {
  const response = await fetch(url)
  return response.text()
}

export function load(): void {
  // Floating promise — no await
  fetchData('/api/data')
}
