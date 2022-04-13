import { Container, Heading } from '@chakra-ui/react'
import React from 'react'
import BlogItem from './BlogItem'
import { useHomeContext } from '@/contexts/HomeContext'

const BlogList = () => {
  const { latestPosts } = useHomeContext()

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">Latest</Heading>
      {latestPosts.map((post) => (
        <BlogItem key={`latest-${post._id}`} post={post} />
      ))}
    </Container>
  )
}

export default BlogList
