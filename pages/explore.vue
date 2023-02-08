<script lang="ts" setup>
const logger = useLogger('PageExplore')

const lens = useLens()
const { data: { exploreProfiles } } = await lens.query(`
  query ExploreProfiles {
    exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
      items {
        id
        name
        bio
        handle
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        stats {
          totalFollowers
        }
      }
    }
  }`
)

function getPictureUrl(user: any) {
  const url = user.picture?.original?.url
  if (url && url.startsWith('ipfs://')) {
    return `https://picsum.photos/seed/${user.id}/100`
  }
  else {
    return url
  }
}
definePageMeta({
  name: 'explore',
})
</script>

<template>
  <div
    class="flex flex-col w-full max-w-600px"
    style="border-right: 1px solid #eee"
  >
    <NuxtLink
      v-for="(p,pi) in exploreProfiles.items" :key="pi"
      :to="`/profile/${p.handle}`"
      class="flex flex-row w-full py-2 px-4 items-center content-center"
      hover="bg-gray-100"
      style="border-bottom: 1px solid #eee"
    >
      <img :src="getPictureUrl(p)" class="rounded-full h-40px w-40px">
      <div class="flex flex-col pl-2">
        <span>{{ p.handle }}</span>
        <small>{{ p.stats?.totalFollowers || 0 }}</small>
      </div>
    </NuxtLink>
  </div>
</template>
