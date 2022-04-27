import { Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import BlogItem from './BlogItem'
import { useHomeContext } from '@/contexts/HomeContext'

const BlogList = () => {
  const { latestPosts } = useHomeContext()

  return (
    <Container maxW="container.md" pt="3" pb="3">
      <Heading as="h1" mb={1}>
        Latest
      </Heading>
      <VStack>
        {latestPosts.map((post) => (
          <BlogItem key={`latest-${post._id}`} post={post} />
        ))}
      </VStack>
    </Container>
  )
}

export default BlogList
