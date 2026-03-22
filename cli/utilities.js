import { exec as execCallback } from 'node:child_process'
import { accessSync } from 'node:fs'
import { access, writeFile as fsWriteFile, mkdir, readFile, rename } from 'node:fs/promises'
import path from 'node:path'

const RED = '\u001B[0;31m'
export const GREEN = '\u001B[0;32m'
const YELLOW = '\u001B[1;33m'
export const CYAN = '\u001B[1;36m'
export const DIM = '\u001B[2m'
export const NC = '\u001B[0m'

export async function writeFile(filePath, content) {
  const fullPath = path.resolve(filePath)
  await mkdir(path.dirname(fullPath), { recursive: true })
  await fsWriteFile(fullPath, content, 'utf8')
}

export async function backupFile(filePath) {
  const fullPath = path.resolve(filePath)
  await rename(fullPath, `${fullPath}.bak`)
}

export async function fileExists(filePath) {
  try {
    await access(path.resolve(filePath))
    return true
  } catch {
    return false
  }
}

export async function readPackageJson() {
  const content = await readFile(path.resolve('package.json'), 'utf8')
  return JSON.parse(content)
}

export async function writePackageJson(packageData) {
  await fsWriteFile(
    path.resolve('package.json'),
    `${JSON.stringify(packageData, null, 2)}\n`,
    'utf8'
  )
}

export function detectPackageManager() {
  const managers = {
    'pnpm-lock.yaml': {
      add: 'pnpm add -D',
      cache: 'pnpm',
      install: 'pnpm install --frozen-lockfile',
      name: 'pnpm'
    },
    'yarn.lock': {
      add: 'yarn add -D',
      cache: 'yarn',
      install: 'yarn install --frozen-lockfile',
      name: 'yarn'
    }
  }

  for (const [lockfile, pm] of Object.entries(managers)) {
    try {
      accessSync(path.resolve(lockfile))
      return pm
    } catch {
      // continue
    }
  }

  return {
    add: 'npm install -D',
    cache: 'npm',
    install: 'npm ci',
    name: 'npm'
  }
}

export async function exec(command) {
  return new Promise((resolve, reject) => {
    execCallback(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message))
        return
      }
      resolve(stdout)
    })
  })
}

export function printHeader(version) {
  console.log()
  console.log(`  ${CYAN}kata${NC} ${DIM}v${version}${NC}`)
  console.log()
}

export function printError(message) {
  console.log(`  ${RED}✗${NC} ${message}`)
}

export function printInfo(message) {
  console.log(`  ${DIM}ℹ${NC} ${message}`)
}

export function printWarning(message) {
  console.log(`  ${YELLOW}⚠${NC} ${message}`)
}
