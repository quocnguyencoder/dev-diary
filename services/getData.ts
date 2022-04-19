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

export default getLatestPosts
