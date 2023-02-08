<script lang="ts" setup>
const logger = useLogger('AppLayout')
const { width, height } = useWindowSize()

onMounted(() => {
  logger.log(':onMounted')
})
</script>

<template>
  <div class="flex flex-col w-full justify-start items-start content-start">
    <AppHeader />
    <NuxtPage :height="height - 60" />
  </div>
</template>

<style>
html,
body,
#__nuxt {
  /* margin: 0; */
  /* padding: 0; */
  /* max-width: 100vw; */
  /* background: #191919; */
  /* color: white; */
  @apply font-sans;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.br {
  outline: 1px solid red;
}
.vcol {
  flex: 10000 1 0%;
  height: auto;
  min-height: 0;
  max-height: 100%;
}
</style>
