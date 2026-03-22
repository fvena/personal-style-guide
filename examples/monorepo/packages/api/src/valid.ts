import path from 'node:path'

interface Config {
  host: string
  port: number
}

export function resolveConfigPath(filePath: string): string {
  return path.resolve(process.cwd(), filePath)
}

export function createConfig(overrides: Partial<Config> = {}): Config {
  return {
    host: 'localhost',
    port: 3000,
    ...overrides
  }
}
