export function generateCI(config) {
  const { ciPr, ciPush, language, packageManager } = config
  const files = []

  const pm = packageManagerConfig(packageManager)
  const hasTypeScript = language === 'typescript'

  if (ciPush) {
    files.push({
      content: generatePushWorkflow(pm, hasTypeScript),
      path: '.github/workflows/quality.yml'
    })
  }

  if (ciPr) {
    files.push({
      content: generatePrWorkflow(pm, hasTypeScript),
      path: '.github/workflows/quality-pr.yml'
    })
  }

  return files
}

function packageManagerConfig(pm) {
  const configs = {
    npm: { cache: 'npm', install: 'npm ci' },
    pnpm: { cache: 'pnpm', install: 'pnpm install --frozen-lockfile' },
    yarn: { cache: 'yarn', install: 'yarn install --frozen-lockfile' }
  }
  return configs[pm] || configs.npm
}

function generatePushWorkflow(pm, hasTypeScript) {
  let steps = `      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: ${pm.cache}
      - run: ${pm.install}
      - run: npm run lint`

  if (hasTypeScript) {
    steps += '\n      - run: npm run typecheck'
  }

  return `name: Quality

on:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
${steps}
`
}

function generatePrWorkflow(pm, hasTypeScript) {
  let steps = `      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: ${pm.cache}
      - run: ${pm.install}
      - run: npm run lint`

  if (hasTypeScript) {
    steps += '\n      - run: npm run typecheck'
  }

  steps += '\n      - run: npm test'

  return `name: Quality PR

on:
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
${steps}
`
}
