import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/interfaces/User'

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
