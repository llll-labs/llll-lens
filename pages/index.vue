<script lang="ts" setup>
const props = defineProps({
  height: {
    type: Number
  }
})

const logger = useLogger('PageIndex')

definePageMeta({
  name: 'index',
  // middleware: [
  //   (to, from) => {
  //     return navigateTo('/explore')
  //   },
  // ],
})
</script>

<template>
<div
  class="flex w-full justify-center items-center content-center"
  :style="{height: height+'px'}">
  <span>login to see your feed</span>
</div>
</template>

<style lang="scss" scoped>
</style>
