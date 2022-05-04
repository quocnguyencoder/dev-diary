import { Box, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import BlogAuthor from './BlogAuthor'
import BlogTags from './BlogTags'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  post: Post
  userInfo: User
}

const BlogItem = ({ post, userInfo }: Props) => {
  const hasUserInfo = userInfo._source !== undefined
  const displayName = hasUserInfo
    ? userInfo._source.displayName
    : `Author's name`
  const username = hasUserInfo ? userInfo._source.username : '#'
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        p={3}
        borderRadius={'10'}
        boxShadow={'0 0 1px'}
        w={'100%'}
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
            name={`${displayName}`}
            date={post._source.publishedAt}
            id={post._source.authorID}
            username={username}
          />
          <Heading marginTop="1">
            <NextLink href={`/u/${post._source.slug}`} passHref>
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {post._source.title}
              </Link>
            </NextLink>
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
