<script setup lang="ts">
  interface ComponentProperties {
    count?: number
    label: string
  }

  const { count = 0, label } = defineProps<ComponentProperties>()

  const emit = defineEmits<{
    increment: [value: number]
  }>()

  function handleClick(): void {
    emit('increment', Number(count) + 1)
  }
</script>

<template>
  <div class="counter">
    <span>{{ label }}: {{ count }}</span>
    <button type="button" @click="handleClick">+1</button>
  </div>
</template>

<style scoped lang="scss">
  .counter {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
