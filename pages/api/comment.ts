import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { CommentSource } from '@/interfaces/Comment'
import { createComment, getCommentByPostID } from '@/services/comment'
import { putCommentIDInPost } from '@/services/posts'
import { queryCommentator, updateUserComments } from '@/services/users'

type Message = {
  content: string
}

//authemticate user
const authenticated =
  (fn: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse<Message>) => {
    if (req.method === 'PUT') {
      const session = await getSession({ req })
      if (session) {
        return await fn(req, res)
      } else {
        return res.status(401).json({ content: 'request failed' })
      }
    } else {
      return await fn(req, res)
    }
  }

//handle comment
export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | CommentSource[]>,
) {
  const method = req.method

  try {
    switch (method) {
      case 'GET': {
        const query = req.query
        const data = await getCommentByPostID(query.postID as string)
        return res.status(200).json(data as any[])
      }
      case 'PUT': {
        const session = await getSession({ req })
        if (session) {
          const data = req.body.data as CommentSource
          data.commentatorID = session.id as string
          const commentID = await createComment(data)
          const result = await updateUserComments(data.commentatorID, commentID)
          putCommentIDInPost(data.postID, commentID)
          return res.status(201).json({ content: `${result}` })
        }

        return res.status(401).json({ content: 'request failed' })
      }
      case 'POST': {
        const data = req.body.array as string[]
        const dbRes = await queryCommentator(data)
        return res.status(200).json(dbRes as any[])
      }
    }
  } catch (err) {
    //return res.status(500).json({ content: 'database error' })
    // for debug only
    return res.status(500).json({ content: `${err}` })
  }
})
