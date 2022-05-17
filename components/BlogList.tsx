import { VStack } from '@chakra-ui/react'
import React from 'react'
import BlogItem from './BlogItem'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  postList: Post[]
  userList: User[]
}

const BlogList = ({ postList, userList }: Props) => {
  const haveData = postList !== undefined && userList !== undefined
  const isNotEmpty = haveData && postList.length !== 0 && userList.length !== 0

  return (
    <VStack flex={1}>
      {isNotEmpty &&
        postList.map((post) => {
          const userInfo = userList.filter(
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
