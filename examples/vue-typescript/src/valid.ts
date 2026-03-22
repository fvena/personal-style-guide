export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
