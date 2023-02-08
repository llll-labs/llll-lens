<script lang="ts" setup>
const logger = useLogger('Button')
</script>

<template>
<button class="rounded flex flex-row font-medium bg-gray-100 p-2">
  <slot />
</button>
</template>

<style lang="scss" scoped>
</style>
