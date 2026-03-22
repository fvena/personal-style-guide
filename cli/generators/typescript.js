export function generateTypescript(config) {
  const { projectType } = config

  const isWebStack = projectType === 'browser' || projectType === 'vue' || projectType === 'nuxt'
  const extendsPath = isWebStack
    ? '@franvena/kata/typescript/browser'
    : '@franvena/kata/typescript/node'

  const include = ['src/**/*.ts', '*.config.ts']
  if (isWebStack) {
    include.splice(1, 0, 'src/**/*.vue')
  }

  const tsconfig = {
    extends: extendsPath,
    include
  }

  return {
    content: `${JSON.stringify(tsconfig, null, 2)}\n`,
    path: 'tsconfig.json'
  }
}
