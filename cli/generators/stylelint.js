export function generateStylelint() {
  return {
    content: `export default {\n  extends: ['@franvena/kata/stylelint']\n}\n`,
    path: 'stylelint.config.js'
  }
}
