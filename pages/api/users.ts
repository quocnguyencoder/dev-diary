import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@/interfaces/User'
import { likePost } from '@/services/posts'
import { followAuthor, getFollowingsOfUser, savedPosts } from '@/services/users'

type Message = {
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | User>,
) {
  const method = req.method
  //const query = req.query

  try {
    switch (method) {
      case 'GET': {
        const session = await getSession({ req })
        if (session) {
          const user = await getFollowingsOfUser(session.id as string)
          return res.status(200).json(user)
        }
        return res.status(401).json({ content: 'request failed' })
      }
      case 'POST': {
        const session = await getSession({ req })
        const postID = req.body.postID
        const action = req.body.action
        const authorID = req.body.authorID
        if (session)
          if (action === 'save') savedPosts(session.id as string, postID)
          else if (action === 'like') likePost(postID, session.id as string)
          else followAuthor(session.id as string, authorID)

        return res.status(200).end()
      }
      default: {
        return res.status(405).json({ content: 'Method not supported' })
      }
    }
  } catch (err) {
    //return res.status(500).json({ content: 'database error' })
    // for debug only
    return res.status(500).json({ content: `${err}` })
  }
}
