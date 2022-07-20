import {
  Button,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiConversation } from 'react-icons/bi'
import BlogAuthor from './BlogAuthor'
import BlogTags from './BlogTags'
import NextChakraLink from './NextChakraLink'
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
  const likes = post._source.liked.length
  const comments = post._source.comments.length
  return (
    <VStack
      bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      p={'1% 3%'}
      align={'left'}
      borderRadius={'10'}
      boxShadow={'0 0 1px'}
      w={'100%'}
      spacing={'0'}
    >
      <BlogAuthor
        name={`${displayName}`}
        date={post._source.publishedAt}
        id={post._source.authorID}
        username={username}
        postID={post._id}
        setEdit={undefined}
      />
      <VStack align={'left'} p={'0 7%'}>
        <Heading as="h2" fontSize={{ base: 'xl', md: '3xl' }}>
          <NextChakraLink
            href={`/u/${post._source.slug}`}
            text={post._source.title}
            color={useColorModeValue('gray.900', 'whiteAlpha.900')}
          />
        </Heading>
        <BlogTags tags={post._source.tags} />
        <Text
          as="p"
          color={useColorModeValue('gray.900', 'gray.200')}
          fontSize="lg"
        >
          {post._source.description}
        </Text>
        <HStack spacing={4}>
          <Button
            leftIcon={<AiOutlineHeart fontSize="1.5em" />}
            variant="unstyled"
            fontWeight="normal"
            display={'flex'}
          >
            {`${likes} ${likes > 1 ? 'Reactions' : 'Reaction'}`}
          </Button>
          <Button
            leftIcon={<BiConversation fontSize="1.5em" />}
            variant="unstyled"
            fontWeight="normal"
            display={'flex'}
          >
            {`${comments} ${comments > 1 ? 'Comments' : 'Comment'}`}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default BlogItem
