export function generateCommitlint() {
  return {
    content: `export default { extends: ['@commitlint/config-conventional'] }\n`,
    path: 'commitlint.config.js'
  }
}
