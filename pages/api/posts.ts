import { Client } from '@elastic/elasticsearch'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Post, PostSource } from '@/interfaces/Post'

type Message = {
  content: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | Post[]>,
) {
  const client = new Client({
    node: 'https://50.19.132.192:9200',
    auth: {
      username: 'elastic',
      password: 'JjpQZ7CpJxUL*+Gy=f_o',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const getData = async () => {
    const result = await client.search<Document>({
      index: 'posts',
      query: {
        match_all: {},
      },
    })
    return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
  }

  const createIndex = async (data: PostSource) =>
    client.index({ index: 'posts', document: data })

  return new Promise<void>((resolve) => {
    if (req.method === 'GET') {
      getData()
        .then((data) => {
          res.status(200).json(data)
          return resolve()
        })
        .catch((err) => {
          console.error(err.message)
          res.status(500).end()
          return resolve()
        })
    } else if (req.method === 'PUT') {
      const data = req.body.data as PostSource
      createIndex(data)
        .then(() => {
          res.status(201).json({ content: 'Created' })
          return resolve()
        })
        .catch((err) => {
          console.error(err.message)
          res.status(500).end()
          return resolve()
        })
    }
  })
}
