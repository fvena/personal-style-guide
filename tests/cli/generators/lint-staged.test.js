import { describe, expect, it } from 'vitest'
import { generateLintStaged } from '../../../cli/generators/lint-staged.js'

describe('generateLintStaged', () => {
  it('includes vue extensions for vue project', () => {
    const result = generateLintStaged({
      projectType: 'vue',
      tools: ['eslint', 'prettier', 'stylelint']
    })

    expect(result['*.{js,ts,vue}']).toBe('eslint --fix')
    expect(result['*.{css,scss,vue}']).toBe('stylelint --fix')
    expect(result['*']).toBe('prettier -w --ignore-unknown')
  })

  it('includes vue extensions for nuxt project', () => {
    const result = generateLintStaged({
      projectType: 'nuxt',
      tools: ['eslint', 'stylelint']
    })

    expect(result['*.{js,ts,vue}']).toBe('eslint --fix')
    expect(result['*.{css,scss,vue}']).toBe('stylelint --fix')
  })

  it('uses node extensions for node project', () => {
    const result = generateLintStaged({
      projectType: 'node',
      tools: ['eslint', 'prettier', 'stylelint']
    })

    expect(result['*.{js,ts}']).toBe('eslint --fix')
    expect(result['*.{css,scss}']).toBe('stylelint --fix')
  })

  it('only includes selected tools', () => {
    const result = generateLintStaged({
      projectType: 'node',
      tools: ['eslint', 'prettier']
    })

    expect(result['*.{js,ts}']).toBe('eslint --fix')
    expect(result['*']).toBe('prettier -w --ignore-unknown')
    expect(result['*.{css,scss}']).toBeUndefined()
    expect(result['*.md']).toBeUndefined()
  })

  it('includes markdownlint when selected', () => {
    const result = generateLintStaged({
      projectType: 'node',
      tools: ['eslint', 'markdownlint']
    })

    expect(result['*.md']).toBe('markdownlint-cli2')
  })

  it('uses js-only extensions for javascript language', () => {
    const result = generateLintStaged({
      language: 'javascript',
      projectType: 'node',
      tools: ['eslint']
    })

    expect(result['*.js']).toBe('eslint --fix')
    expect(result['*.{js,ts}']).toBeUndefined()
  })

  it('uses js+vue extensions for javascript vue project', () => {
    const result = generateLintStaged({
      language: 'javascript',
      projectType: 'vue',
      tools: ['eslint']
    })

    expect(result['*.{js,vue}']).toBe('eslint --fix')
  })
})
