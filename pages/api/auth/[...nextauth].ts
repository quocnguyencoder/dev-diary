import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { getUserByUsername } from '@/services/users'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const username = credentials?.username
        const password = credentials?.password

        const dataValidated = username !== undefined && password !== undefined

        if (dataValidated) {
          const userData = await getUserByUsername(username)
          const userExists = userData._id !== undefined
          if (userExists) {
            // compare 2 hashed passwords
            const doPasswordsMatch = await compare(
              password,
              userData._source.password,
            )
            return doPasswordsMatch
              ? {
                  id: userData._id,
                  username: userData._source.username,
                  displayName: userData._source.displayName,
                }
              : null
          }
          return null
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.displayName = user.displayName
      }
      return token
    },
    session: ({ token, session }) => {
      if (token) {
        session.id = token.id
        session.username = token.username
        session.displayName = token.displayName
      }
      return session
    },
  },
  secret: process.env.JWT_SECRET_KEY,
  pages: {
    signIn: '/login',
    error: '/login',
  },
})
