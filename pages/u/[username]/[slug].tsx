/* eslint-disable react/no-children-prop */
import {
  Container,
  Heading,
  Image,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { GetServerSideProps } from 'next'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BlogAuthor from '@/components/BlogAuthor'
import BlogTags from '@/components/BlogTags'
import Comment from '@/components/Comment'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'
import { getPostBySlug } from '@/services/posts'
import { getUsersInfoByIDList } from '@/services/users'

interface Props {
  postContent: Post
  userInfo: User
}

const PostPage = ({ postContent, userInfo }: Props) => {
  return (
    <Container maxW="3xl" pt="3" pb="3">
      <VStack
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        borderRadius={'10'}
        boxShadow={'0 0 1px'}
        align="left"
      >
        <Image
          w="100%"
          maxHeight="40vh"
          objectFit="cover"
          borderRadius={'10px 10px 0 0'}
          src={postContent._source.coverImg}
          alt="cover image"
        />
        <VStack w="100%" p="1% 5% 3% 5%" gap="1em" align="left">
          <BlogAuthor
            name={userInfo._source.displayName}
            date={postContent._source.publishedAt}
            id={postContent._source.authorID}
            username={userInfo._source.displayName}
          />
          <Heading as="h2" size="3xl">
            {postContent._source.title}
          </Heading>
          <BlogTags tags={postContent._source.tags} />

          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={postContent._source.content}
            remarkPlugins={[remarkGfm]}
            skipHtml
          />
        </VStack>
      </VStack>
      <Comment postID={postContent._id} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  // slug -> username =>data
  let postContent: Post
  let userInfo: User
  try {
    postContent = await getPostBySlug(`${slug}`)
    const usersInfo = await getUsersInfoByIDList([postContent._source.authorID])
    userInfo = usersInfo[0]
  } catch (err) {
    postContent = {} as Post
    userInfo = {} as User
  }
  return {
    props: {
      postContent, // will be passed to the page component as props
      userInfo,
    },
  }
}

export default PostPage
