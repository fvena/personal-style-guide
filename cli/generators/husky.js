export function generateHusky(config) {
  const { commitlint, preCommit, prePush, prePushChecks = [] } = config
  const files = []

  if (preCommit) {
    files.push({
      content: 'npx lint-staged\n',
      path: '.husky/pre-commit'
    })
  }

  if (commitlint) {
    files.push({
      content: 'npx --no -- commitlint --edit $1\n',
      path: '.husky/commit-msg'
    })
  }

  if (prePush && prePushChecks.length > 0) {
    const scriptMap = {
      'format-check': 'npm run format:check',
      lint: 'npm run lint',
      test: 'npm run test',
      typecheck: 'npm run typecheck'
    }

    const order = ['lint', 'typecheck', 'format-check', 'test']
    const lines = order
      .filter(check => prePushChecks.includes(check))
      .map(check => scriptMap[check])

    files.push({
      content: `${lines.join('\n')}\n`,
      path: '.husky/pre-push'
    })
  }

  return files
}
