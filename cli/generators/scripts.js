export function generateScripts(config) {
  const { hasHusky, language, projectType, tools } = config
  const scripts = {}
  const isVue = projectType === 'vue' || projectType === 'nuxt'

  if (tools.includes('eslint')) {
    const oxlintPrefix = tools.includes('oxlint') ? 'oxlint && ' : ''
    scripts.lint = `${oxlintPrefix}eslint .`
    scripts['lint:fix'] = `${oxlintPrefix}eslint . --fix`
  }

  if (tools.includes('prettier')) {
    scripts.format = 'prettier --write .'
    scripts['format:check'] = 'prettier --check .'
  }

  if (language === 'typescript') {
    scripts.typecheck = 'tsc --noEmit'
  }

  if (tools.includes('stylelint')) {
    const extensions = isVue ? '*.{scss,css,vue}' : '*.{scss,css}'
    scripts['lint:css'] = `stylelint 'src/**/${extensions}'`
  }

  if (tools.includes('markdownlint')) {
    scripts['lint:md'] = "markdownlint-cli2 '**/*.md' '#node_modules'"
  }

  if (hasHusky) {
    scripts.prepare = 'husky'
  }

  return scripts
}
