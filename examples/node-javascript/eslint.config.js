import {
  baseComments,
  baseIgnores,
  baseJavascript,
  basePerfectionist,
  baseRegexp,
  baseUnicorn
} from '@franvena/kata/eslint/base'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  ...baseIgnores,
  ...baseJavascript,
  ...basePerfectionist,
  ...baseUnicorn,
  ...baseRegexp,
  ...baseComments,
  eslintConfigPrettier
]
