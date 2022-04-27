import client from './client'
import { CommentSource } from '@/interfaces/Comment'

const createComment = async (data: CommentSource) =>
  client.index({ index: 'comments', document: data })

// const getCommentByPostID = async (postID: string) => {}

const getCommentByPostID = async (postID: string) => {
  const result = await client.search<Document>({
    index: 'comments',
    query: {
      bool: {
        must: [
          {
            match: {
              postID: `${postID}`,
            },
          },
        ],
      },
    },
  })
  return result.hits.hits
}

export { createComment, getCommentByPostID }
