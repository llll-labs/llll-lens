import { defineStore } from 'pinia'

export const useLensRaw = defineStore('lens-raw', () => {
  async function exploreProfiles() {
    // need to call blockchain here, to avoid using lens API
  }
  return {
    exploreProfiles,
  }
})
