// @expect-error: eqeqeq
const value = 1
if (value == '1') {
  console.log('loose equality')
}

export { value }
