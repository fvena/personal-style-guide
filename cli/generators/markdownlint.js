export function generateMarkdownlint() {
  return {
    content: `{\n  "extends": "@franvena/kata/markdown"\n}\n`,
    path: '.markdownlint.jsonc'
  }
}
