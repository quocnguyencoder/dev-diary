import client from './client'
import { User, UserSource } from '@/interfaces/User'

const createUser = async (data: UserSource) =>
  client.index({ index: 'users', document: data })

const queryByUsername = async (username: string) => {
  const result = await client.search<Document>({
    index: 'users',
    query: {
      bool: {
        must: [
          {
            match: {
              username: `${username}`,
            },
          },
        ],
      },
    },
  })
  return result.hits.hits
}

const queryCommentator = async (userIDList: string[]) => {
  const result = await client.search<Document>({
    index: 'users',
    _source_excludes: 'password',
    query: {
      bool: {
        should: {
          terms: {
            _id: userIDList,
          },
        },
      },
    },
  })
  return result.hits.hits
}

const checkUserExists = async (username: string) => {
  const result = await queryByUsername(username)
  return result.length !== 0
}

const getUserByUsername = async (username: string) => {
  const result = await queryByUsername(username)
  return JSON.parse(JSON.stringify(result[0])) as User
}

export { createUser, checkUserExists, getUserByUsername, queryCommentator }
