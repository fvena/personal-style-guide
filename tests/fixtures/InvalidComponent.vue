<template>
  <div>
    <!-- @expect-error: vue/no-v-html (error) -->
    <div v-html="rawHtml" />
  </div>
</template>

<!-- @expect-error: vue/component-api-style — Options API instead of <script setup> -->
<script lang="ts">
  export default {
    data() {
      return {
        rawHtml: '<span>bad</span>'
      }
    }
  }
</script>

<style lang="scss">
  /* @expect-error: vue/enforce-style-attribute — missing scoped or module */
  div {
    color: red;
  }
</style>
