import { Client } from '@elastic/elasticsearch'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '@/interfaces/Post'

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

  // const samplePost: PostSource = {
  //   authorID: '123123123',
  //   title: 'This is a sample post',
  //   metaTitle: 'Sample post',
  //   slug: 'sample-post',
  //   tags: ['react', 'next.js'],
  //   coverImg:
  //     'https://res.cloudinary.com/practicaldev/image/fetch/s--jNcdxw77--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/sfwcvweirpf2qka2lg2b.png',
  //   content: 'Hello, have a nice day',
  //   description: 'Simple sample post',
  //   published: true,
  //   publishedAt: '4/10/2022',
  //   createdAt: '4/10/2022',
  //   comments: [],
  // }

  // const samplePost1: PostSource = {
  //   authorID: '124125123',
  //   title: 'This is a sample post 1',
  //   metaTitle: 'Sample post 1',
  //   slug: 'sample-post-1',
  //   tags: ['react', 'next.js'],
  //   content: 'Hello, have a nice day',
  //   description: 'Simple sample post 1',
  //   published: true,
  //   publishedAt: '4/10/2022',
  //   createdAt: '4/10/2022',
  //   comments: [],
  // }

  // const createIndex = async () =>
  //   client.index({ index: 'posts', document: samplePost })

  return new Promise<void>((resolve) => {
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
  })
  // return new Promise<void>((resolve) => {
  //   createIndex()
  //     .then(() => {
  //       res.status(200).json({ content: 'ok' })
  //       return resolve()
  //     })
  //     .catch((err) => {
  //       console.error(err.message)
  //       res.status(500).end()
  //       return resolve()
  //     })
  // })
}
