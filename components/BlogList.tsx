import { VStack } from '@chakra-ui/react'
import React from 'react'
import BlogItem from './BlogItem'
import { Post } from '@/interfaces/Post'

interface Props {
  postsList: Post[]
}

const BlogList = ({ postsList }: Props) => {
  return (
    <VStack flex={1}>
      {postsList.map((post) => (
        <BlogItem key={`post-${post._id}`} post={post} />
      ))}
    </VStack>
  )
}

export default BlogList
