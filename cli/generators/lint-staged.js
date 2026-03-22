export function generateLintStaged(config) {
  const { language = 'typescript', projectType, tools } = config
  const isVue = projectType === 'vue' || projectType === 'nuxt'
  const hasTs = language === 'typescript'
  const result = {}

  if (tools.includes('prettier')) {
    result['*'] = 'prettier -w --ignore-unknown'
  }

  if (tools.includes('eslint')) {
    const jsExtensions = hasTs
      ? isVue
        ? '*.{js,ts,vue}'
        : '*.{js,ts}'
      : isVue
        ? '*.{js,vue}'
        : '*.js'
    result[jsExtensions] = 'eslint --fix'
  }

  if (tools.includes('stylelint')) {
    const cssExtensions = isVue ? '*.{css,scss,vue}' : '*.{css,scss}'
    result[cssExtensions] = 'stylelint --fix'
  }

  if (tools.includes('markdownlint')) {
    result['*.md'] = 'markdownlint-cli2'
  }

  return result
}
