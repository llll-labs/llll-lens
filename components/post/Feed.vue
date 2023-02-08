<script lang="ts" setup>
const props = defineProps({
  posts: { type: Array, required: true },
  tintUnfocusedPosts: { type: Boolean, default: false },
  tintIndex: { type: Number, default: 0 },
})
const emit = defineEmits(['open'])

const logger = useLogger('PostFeed')
const lens = useLens()

function isPostTinted(postId: any) {
  if (!props.tintUnfocusedPosts) return false
  if (!lens.publicationFocused) return false
  // return false
  return !lens.publicationsFocused.includes(postId)
}

onMounted(() => {
  logger.log(':onMounted')
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- <div class="flex flex-row w-full br">header</div> -->
    <div class="w-full vcol relative overflow-auto">
      <PostItem
        v-for="post in posts"
        :key="post.root.id"
        :post="post" @open="emit('open', $event)"
        class="top-0"
      >
        <div
          v-if="isPostTinted(post.root.id)"
          class="h-full bg-hex-00000050 w-full top-0 right-0 bottom-0 left-0 z-100 absolute pointer-events-none">
        </div>
      </PostItem>
    </div>
    <!-- <div class="flex flex-row w-full br">footer</div> -->
  </div>
</template>
