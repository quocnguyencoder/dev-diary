import client from './client'
import { Post, PostSource } from '@/interfaces/Post'

const getLatestPosts = async () => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      match_all: {},
    },
    body: {
      sort: [{ publishedAt: { order: 'desc' } }],
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const getPostBySlug = async (slug: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          {
            match: {
              slug: `${slug}`,
            },
          },
        ],
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits[0])) as Post
}

const getPostsBySearch = async (
  searchTerm: string,
  filterBy: string,
  orderBy: string,
) => {
  const result =
    orderBy !== 'asc' && orderBy !== 'desc'
      ? await client.search<Document>({
          index: 'posts',
          query: {
            bool: {
              must: [
                {
                  query_string: {
                    query: `${searchTerm}`,
                    fields: ['content', 'description', 'title', 'tags'],
                  },
                },
                {
                  query_string: {
                    query: filterBy,
                    fields: ['authorID'],
                  },
                },
              ],
              should: {
                query_string: {
                  query: `${searchTerm}`,
                  fields: ['content', 'description', 'title', 'tags'],
                  type: 'phrase',
                  phrase_slop: 10,
                },
              },
            },
          },
        })
      : await client.search<Document>({
          index: 'posts',
          query: {
            bool: {
              must: [
                {
                  query_string: {
                    query: `${searchTerm}`,
                    fields: ['content', 'description', 'title', 'tags'],
                  },
                },
                {
                  query_string: {
                    query: filterBy,
                    fields: ['authorID'],
                  },
                },
              ],
              should: {
                query_string: {
                  query: `${searchTerm}`,
                  fields: ['content', 'description', 'title', 'tags'],
                  type: 'phrase',
                  phrase_slop: 10,
                },
              },
            },
          },
          body: {
            sort: [{ publishedAt: { order: orderBy } }],
          },
        })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const countAuthorPostsBySlug = async (authorID: string, slug: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          {
            match: {
              authorID: `${authorID}`,
            },
          },
          {
            match: {
              slug: slug,
            },
          },
        ],
      },
    },
  })
  return result.hits.hits.length
}

const queryPostsBySameAuthor = async (postIDList: string[]) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        should: {
          terms: {
            _id: postIDList,
          },
        },
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const createPost = async (data: PostSource) => {
  const response = await client.index({ index: 'posts', document: data })
  return response._id
}

export {
  getLatestPosts,
  getPostBySlug,
  createPost,
  countAuthorPostsBySlug,
  getPostsBySearch,
  queryPostsBySameAuthor,
}
