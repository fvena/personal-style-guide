import path from 'node:path'

/** Resolves a file path relative to the current directory. */
export function resolvePath(filePath) {
  return path.resolve(process.cwd(), filePath)
}

/** Joins multiple path segments. */
export function joinPaths(...segments) {
  return path.join(...segments)
}
