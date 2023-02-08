<script lang="ts" setup>
const props = defineProps({
  publicationId: { type: String, required: true },
})
const emit = defineEmits(['open'])

const logger = useLogger('PostComments')
const lens = useLens()

const state = reactive({
  // TODO move to the storeLens
  comments: [],
  commentsNotFound: false,
  type: 'Comments',
  types: ['Comments', 'Collects', 'Mirrors', 'Upvotes', 'Downvotes']
}) as any

watch(
  () => props.publicationId,
  async (to, from) => {
    logger.log(':W props.publicationId', to)
    if (state.type === 'Comments') {
      state.commentsNotFound = false
      const comments = await lens.getPublicationComments(to)
      state.commentsNotFound = comments.length === 0
      state.comments = comments.map((i: any) => {
        return {
          root: i,
        }
      })
    }
    else {
      logger.log('NOT_IMPLEMENTED')
    }
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  logger.log(':onMounted', props.publicationId)
})
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- <div>{{ publicationId }}</div> -->
    <!-- <pre>{{ state.comments }}</pre> -->
    <div class="flex flex-row w-full py-2 px-4 gap-x-2 justify-start" style="border-bottom: 1px solid #eee">
      <span
        v-for="t in state.types" @click="state.type = t"
        :class="{'text-hex-999': t !== state.type}"
        class="cursor-pointer"
      >
        {{ t }}
      </span>
    </div>
    <div class="w-full vcol overflow-hidden">
      <div v-if="state.commentsNotFound" class="flex flex-row w-full py-8 justify-center">
        <span>Comments not found</span>
      </div>
      <PostFeed :posts="state.comments" @open="emit('open', $event)" />
    </div>
  </div>
</template>
