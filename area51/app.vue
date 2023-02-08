<script lang="ts" setup>
const logger = useLogger('App')
const lens = useLens()
useHead({
  title: 'area51'
})
onMounted(() => {
  logger.log(':onMounted')
})
</script>

<template>
  <AppLayout />
  <!-- <ClientOnly>
    <Teleport to="#base-app-name">
      <button>fuck!!!</button>
    </Teleport>
  </ClientOnly> -->
</template>
