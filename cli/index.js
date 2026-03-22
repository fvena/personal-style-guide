#!/usr/bin/env node

import { init } from './commands/init.js'

const command = process.argv[2]

if (command === 'init') {
  await init()
} else {
  console.error(`Unknown command${command ? `: ${command}` : ''}. Run: npx @franvena/kata init`)
  // eslint-disable-next-line n/no-process-exit -- CLI entry point requires explicit exit for unknown commands
  process.exit(1)
}
