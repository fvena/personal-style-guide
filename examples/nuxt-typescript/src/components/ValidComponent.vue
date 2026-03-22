<script setup lang="ts">
  interface ComponentProperties {
    title: string
  }

  const { title } = defineProps<ComponentProperties>()
</script>

<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .card {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
</style>
