import { Box, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import BlogAuthor from './BlogAuthor'
import BlogTags from './BlogTags'
import { Post } from '@/interfaces/Post'

interface Props {
  post: Post
}

const BlogItem = ({ post }: Props) => {
  return (
    <>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        p={3}
        borderRadius={'10'}
        boxShadow={'0 0 1px'}
      >
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}
          gap={'1'}
        >
          <BlogAuthor
            name={`Author's name`}
            date={post._source.publishedAt}
            id={post._source.authorID}
          />
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {post._source.title}
            </Link>
          </Heading>
          <BlogTags tags={post._source.tags} />
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            {post._source.description}
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default BlogItem
