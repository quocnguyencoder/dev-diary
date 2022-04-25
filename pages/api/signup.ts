import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserSource } from '@/interfaces/User'
import { checkUserExists, createUser } from '@/services/users'

type Message = {
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | UserSource>,
) {
  const method = req.method
  //const query = req.query
  try {
    switch (method) {
      case 'POST': {
        const data = req.body.data as UserSource
        // TODO: make data validate function
        const dataValidated = data.username !== undefined
        if (dataValidated) {
          let userExists
          try {
            userExists = await checkUserExists(data.username)
          } catch {
            userExists = false
          }
          if (userExists) {
            return res.status(409).end()
          } else {
            // has password and stored data in to elastic search
            hash(data.password, 10, async (err, hash) => {
              if (!err) {
                data.password = hash
                await createUser(data)
                return res.status(201).json({ content: 'OK' })
              } else {
                // case hash function somehow failed
                return res.status(500).json({ content: `something went wrong` })
              }
            })
            break
          }
        } else {
          return res.status(400).json({ content: `data not valid` })
        }
      }
      default: {
        return res.status(405).json({ content: 'Method not supported' })
      }
    }
  } catch (err) {
    //return res.status(500).json({ content: 'database error' })
    // log database error for debug only
    return res.status(500).json({ content: `${err}` })
  }
}
