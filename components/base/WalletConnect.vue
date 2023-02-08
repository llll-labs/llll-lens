<script lang="ts" setup>
const { x, y } = useMouse()
</script>

<template>
  <div class="flex flex-col">
    <BaseButton>
      <span class="whitespace-nowrap">{{ x }}:{{ y }} Connect wallet </span>
    </BaseButton>
  </div>
</template>
