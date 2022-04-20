import { compare } from 'bcrypt'
import cookie from 'cookie'
import { sign } from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserSource } from '@/interfaces/User'
import { getUserByUsername } from '@/services/users'

type Message = {
  content: string
}
type AuthToken = {
  authToken: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | AuthToken | UserSource>,
) {
  const method = req.method
  //const query = req.query
  try {
    switch (method) {
      case 'POST': {
        const username = req.body.username as string
        const password = req.body.password as string
        // TODO: make data validate function
        const isDataValidated = username !== undefined && password !== undefined
        if (isDataValidated) {
          const userData = await getUserByUsername(username)
          const isUserExist = userData._id !== undefined
          if (isUserExist) {
            compare(
              password,
              userData._source.password,
              function (err, result) {
                if (!err && result) {
                  const claims = { userData: userData }
                  const jwt = sign(claims, process.env.JWT_SECRET_KEY || '', {
                    expiresIn: '12h',
                  })
                  res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('auth', jwt, {
                      httpOnly: true,
                      secure: process.env.NODE_ENV !== 'development',
                      sameSite: 'strict',
                      maxAge: 3600,
                      path: '/',
                    }),
                  )
                  return res
                    .status(200)
                    .json({
                      content: `Welcome,${userData._source.displayName}`,
                    })
                } else {
                  return res.status(401).json({ content: 'login failed' })
                }
              },
            )
            break
          } else {
            return res.status(401).json({ content: 'login failed' })
          }
        } else return res.status(400).json({ content: `data not valid` })
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
