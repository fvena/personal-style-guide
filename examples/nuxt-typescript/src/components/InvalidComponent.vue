<!-- @expect-error: vue/component-api-style — Options API -->
<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
  export default {
    data() {
      return { msg: 'hello' }
    }
  }
</script>

<style lang="scss">
  /* @expect-error: vue/enforce-style-attribute — missing scoped */
  div {
    color: red;
  }
</style>
