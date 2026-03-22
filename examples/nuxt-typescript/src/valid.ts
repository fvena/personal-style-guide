export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] ?? ''
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^\w-]+/g, '')
}
