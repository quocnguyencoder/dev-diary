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
    size: 100,
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
          size: 100,
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
          size: 100,
        })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

// update to count api
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
    body: {
      sort: [{ publishedAt: { order: 'desc' } }],
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const createPost = async (data: PostSource) => {
  const response = await client.index({ index: 'posts', document: data })
  return response._id
}

const likePost = (postID: string, userID: string) => {
  client.update<Document>({
    index: 'posts',
    id: postID,
    script: {
      source: 'ctx._source.liked.add(params.liked)',
      lang: 'painless',
      params: {
        liked: userID,
      },
    },
  })
}

const getAllUserPosts = async (userID: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          {
            match: {
              authorID: `${userID}`,
            },
          },
        ],
      },
    },
    body: {
      sort: [{ publishedAt: { order: 'desc' } }],
    },
    size: 100,
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

export {
  getLatestPosts,
  getPostBySlug,
  createPost,
  countAuthorPostsBySlug,
  getPostsBySearch,
  queryPostsBySameAuthor,
  likePost,
  getAllUserPosts,
}
