import { defineStore } from 'pinia'

export const useLens = defineStore('lens', () => {
  const logger = useLogger('storeLens')
  const baseURL = 'https://api.lens.dev'

  const publicationsFocused = ref([]) as any
  const publicationFocused = computed(() => {
    return publicationsFocused.value[publicationsFocused.value.length - 1]
  })
  function publicationFocus (id: any, idx: any) {
    logger.log(':publicationFocus', id, idx)
    publicationsFocused.value.splice(idx, Infinity)
    publicationsFocused.value.push(id)
  }

  const interceptors = {
    async onRequest({ request, options }) {
      // options.baseURL = baseURL
      // TODO add Authentication headers
    }
  }

  function ftch(url: string, options: any): any {
    return $fetch(url, {
      ...options,
      ...interceptors,
    })
  }

  async function query(query: any, variables?: any) {
    logger.log(':query', query, variables)
    // $fetch with interceptors
    // baseURL is the same
    return ftch(baseURL, {
      method: 'POST',
      body: {
        query,
        variables,
      }
    })
  }

  async function getProfileByHandle(handle: any) {
    const { data: { profile } } = await query(
      `
      query Profile($handle: Handle!) {
        profile(request: { handle: $handle }) {
          id
          name
          bio
          picture {
            ... on MediaSet {
              original {
                url
                
              }
            }
          }
          handle
        }
      }`,
      {
        handle
      },
    )
    return profile
  }

  async function getAccountPublications(handle: any) {
    logger.log(':getAccountPublications', handle)
    const { data: { feed: { items } } } = await query(`
      query($handle: ProfileId!) {
        feed(request: {profileId: $handle, limit: 10}) {
          items {
            root {
              ... on Post {
                id
                appId
                createdAt
                metadata {
                  name
                  description
                  content
                }
                stats {
                  id
                  totalAmountOfMirrors
                  totalAmountOfCollects
                  totalAmountOfComments
                  totalUpvotes
                  totalDownvotes
                  # commentsTotal(forSources)
                  __typename
                }
              }
              ... on Comment {
                id
                appId
                createdAt
                stats {
                  id
                  totalAmountOfMirrors
                  totalAmountOfCollects
                  totalAmountOfComments
                  totalUpvotes
                  totalDownvotes
                  __typename
                  # commentsTotal(forSources)
                }
              }
            }
            __typename
          }
        }
      }
    `, {
      handle,
    })
    return items
  }

  async function getPublicationComments(id: string) {
    logger.log(':getPublicationComments', id)
    const { data: { publications: { items }} } = await query(`
      query($id: InternalPublicationId) {
        publications(request: {commentsOf: $id}) {
          items {
            ... on Comment {
              id
              metadata {
                content
              }
              stats {
                id
                totalAmountOfMirrors
                totalAmountOfCollects
                totalAmountOfComments
                totalUpvotes
                totalDownvotes
                __typename
                # commentsTotal(forSources)
              }
            }
            __typename
          }
        }
      }
    `, {
      id,
    })
    logger.log(':getPublicationComments', items)
    return items
  }

  return {
    publicationsFocused,
    publicationFocused,
    publicationFocus,

    query,
    getProfileByHandle,
    getAccountPublications,
    getPublicationComments,
  }
})
