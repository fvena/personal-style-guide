import path from 'node:path'

interface User {
  age: number
  email: string
  name: string
}

export function formatUser(user: User): string {
  return `${user.name} <${user.email}>`
}

export function resolvePath(filePath: string): string {
  return path.resolve(process.cwd(), filePath)
}
