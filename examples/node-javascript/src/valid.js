import path from 'node:path'

export function resolvePath(filePath) {
  return path.resolve(process.cwd(), filePath)
}

export function greet(name) {
  return `Hello, ${name}!`
}
