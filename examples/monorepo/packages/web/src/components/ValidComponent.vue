<script setup lang="ts">
interface ComponentProperties {
  label: string
}

const { label } = defineProps<ComponentProperties>()
</script>

<template>
  <span class="label">{{ label }}</span>
</template>

<style scoped lang="scss">
.label {
  font-weight: 600;
}
</style>
