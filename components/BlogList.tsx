import { VStack } from '@chakra-ui/react'
import React from 'react'
import BlogItem from './BlogItem'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  postsList: Post[]
  usersList: User[]
}

const BlogList = ({ postsList, usersList }: Props) => {
  return (
    <VStack flex={1}>
      {postsList.map((post) => {
        const userInfo = usersList.filter(
          (user) => user._id === post._source.authorID,
        )
        return (
          <BlogItem
            key={`post-${post._id}`}
            post={post}
            userInfo={userInfo[0]}
          />
        )
      })}
    </VStack>
  )
}

export default BlogList
