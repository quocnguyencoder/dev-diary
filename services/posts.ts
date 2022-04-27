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

const countAuthorPosts = async (authorID: string) => {
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
        ],
      },
    },
  })
  return result.hits.hits.length
}

const isPostsIndexExists = async () => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      match_all: {},
    },
  })
  return !Object.hasOwn(result, 'status')

}

const createPost = async (data: PostSource) =>
  client.index({ index: 'posts', document: data })


export {
  getLatestPosts,
  getPostBySlug,
  createPost,
  countAuthorPosts,
  isPostsIndexExists,
  getPostsBySearch
}

