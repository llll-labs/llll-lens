<script lang="ts" setup>
const props = defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['open'])
const lens = useLens()

const isPostFocused = computed(() => {
  return lens.publicationsFocused.includes(props.post.root.id)
})
</script>

<template>
  <div
    class="flex flex-col w-full py-8 px-4 justify-start items-start content-start relative"
    style="border-bottom: 1px solid #eee"
    :style="isPostFocused ? {background: '#eee'} : {}"
    @click="emit('open', post.root.id)"
  >
    <!-- author -->
    <div v-if="post.root.metadata" v-html="post.root.metadata.content" class="" style="word-wrap: break-word"></div>
    <!-- <pre class="text-xs">{{ post }}</pre> -->
    <!-- stats -->
    <div class="flex flex-row w-full py-2 gap-x-2 items-center content-center">
      <small>Comments: {{ post.root.stats.totalAmountOfComments }}</small>
      <small>Mirrors: {{ post.root.stats.totalAmountOfMirrors }}</small>
      <small>Collects: {{ post.root.stats.totalAmountOfCollects }}</small>
      <small>Upvotes: {{ post.root.stats.totalUpvotes }}</small>
      <small>Downvotes: {{ post.root.stats.totalDownvotes }}</small>
    </div>
    <!-- <pre class="text-xs">{{ post.root.stats }}</pre> -->
    <slot />
  </div>
</template>
