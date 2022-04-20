import client from './client'
import { Post } from '@/interfaces/Post'

const getLatestPosts = async () => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      match_all: {},
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

export { getLatestPosts, getPostBySlug }
