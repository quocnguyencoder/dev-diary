import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Post, PostSource } from '@/interfaces/Post'
import { createPost, getLatestPosts } from '@/services/posts'

type Message = {
  content: string
}

const authenticated =
  (fn: NextApiHandler) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<Message | Post[] | Post>,
  ) => {
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

export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | Post[] | Post>,
) {
  const method = req.method
  //const query = req.query
  try {
    switch (method) {
      case 'GET': {
        //const dataQuery = query === 'latest' ? {-- elastic query --}
        const data = await getLatestPosts()
        //const data = await getPostBySlug(`sample-post-1`)
        return res.status(200).json(data)
      }
      case 'PUT': {
        const data = req.body.data as PostSource
        const dbRes = await createPost(data)
        return res.status(201).json({ content: `${dbRes}` })
      }
    }
  } catch (err) {
    //return res.status(500).json({ content: 'database error' })
    // for debug only
    return res.status(500).json({ content: `${err}` })
  }
})
