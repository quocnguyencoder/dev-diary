import { Container, HStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Error from 'next/error'
import React from 'react'
import BlogList from '@/components/BlogList'
import UserActivitiesList from '@/components/UserActivitiesList'
import UserOverview from '@/components/UserOverview'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'
import { getAllUserPosts } from '@/services/posts'
import { getUserByUsername } from '@/services/users'

interface Props {
  userInfo: User
  userPosts: Post[]
  statusCode: number
}

const Profile = ({ userInfo, userPosts, statusCode }: Props) => {
  const userNotFound = statusCode === 404

  return userNotFound ? (
    <Error statusCode={statusCode} />
  ) : (
    <Container maxW="container.lg" pt="2" pb="3">
      <UserOverview userInfo={userInfo} />
      <HStack mt={3} alignItems={'top'}>
        <UserActivitiesList
          postsNum={userPosts.length}
          commentNum={userInfo._source.comments.length}
        />
        <BlogList postList={userPosts} userList={[userInfo]} />
      </HStack>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query
  let userInfo = {} as User
  let userPosts = [] as Post[]
  let statusCode = 200
  try {
    userInfo = await getUserByUsername(`${username}`)
    // exclude password field before send data to client
    userInfo._source.password = ''
    userPosts = await getAllUserPosts(userInfo._id)
  } catch (err) {
    statusCode = 404
  }

  // Pass data to the page via props
  return { props: { userInfo, userPosts, statusCode } }
}

export default Profile
