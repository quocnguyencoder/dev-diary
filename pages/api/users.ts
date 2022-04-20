import type { NextApiRequest, NextApiResponse } from 'next'
import { Post, PostSource } from '@/interfaces/Post'
import { getPostBySlug } from '@/services/getData'
import createPost from '@/services/putData'

type Message = {
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | Post[] | Post>,
) {
  const method = req.method
  //const query = req.query
  try {
    switch (method) {
      case 'GET': {
        //const dataQuery = query === 'latest' ? {-- elastic query --}
        //const data = await getLatestPosts()
        const data = await getPostBySlug(`sample-post-1`)
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
}
