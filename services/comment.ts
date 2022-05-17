import client from './client'
import { CommentSource } from '@/interfaces/Comment'

const createComment = async (data: CommentSource) => {
  const response = await client.index({ index: 'comments', document: data })
  return response._id
}
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
    body: {
      sort: [{ commentAt: { order: 'desc' } }],
    },
    size: 100,
  })
  return result.hits.hits
}

const likeComment = (commentID: string, userID: string) => {
  client.update<Document>({
    index: 'comments',
    id: commentID,
    script: {
      source:
        'if (ctx._source.likes.contains(params.liked)) { ctx._source.likes.remove(ctx._source.likes.indexOf(params.liked)) } else {ctx._source.likes.add(params.liked)}',
      lang: 'painless',
      params: {
        liked: userID,
      },
    },
  })
}

export { createComment, getCommentByPostID, likeComment }
