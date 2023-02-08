<script lang="ts" setup>
const appTab = ref('explore')
const appTabs = [
  // {id: 'home', name: 'Home', disabled: true},
  {id: 'explore', name: 'Explore'},
  {id: 'search', name: 'Search', disabled: true},
  {id: 'more', name: 'More', disabled: true},
]
</script>

<template>
  <div
    class="flex flex-row h-60px w-full items-center content-center justify-between"
    style="border-bottom: 1px solid #eee"
  >
    <NuxtLink to="/" class="mr-4">
      <AppLogo />
    </NuxtLink>
    <BaseTabs
      :model-value="$route.meta?.name" 
      :tabs="appTabs" class="gap-x-4"
      @update:model-value="$event => $router.push(`/${$event}`)"
    />
    <BaseWalletConnect class="mr-4"/>
  </div>
</template>
