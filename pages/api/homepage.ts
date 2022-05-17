import type { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '@/interfaces/Post'
import { SearchResult } from '@/interfaces/SearchResult'
import { User } from '@/interfaces/User'
import { getLatestPosts, getTopPosts, getUserNewsFeed } from '@/services/posts'
import { getUsersInfoByIDList } from '@/services/users'

type Message = {
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | SearchResult>,
) {
  const method = req.method
  try {
    switch (method) {
      case 'GET': {
        const option = req.query.option
        let results = [] as Post[]
        let userList = [] as User[]
        const getIDList = (posts: Post[]) =>
          posts.map((post) => post._source.authorID)
        if (option === 'Relevant') {
          const followings = JSON.parse(`${req.query.followings}`) as string[]
          const tags = JSON.parse(`${req.query.tags}`) as string[]

          results = await getUserNewsFeed(followings, tags)
          userList = await getUsersInfoByIDList(getIDList(results))
        } else if (option === 'Latest') {
          results = await getLatestPosts()
          userList = await getUsersInfoByIDList(getIDList(results))
        } else {
          results = await getTopPosts()
          userList = await getUsersInfoByIDList(getIDList(results))
        }

        return res.status(200).json({ results: results, userList: userList })
      }
    }
  } catch (err) {
    //return res.status(500).json({ content: 'database error' })
    // for debug only
    return res.status(500).json({ content: `${err}` })
  }
}
