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
import { getPostBySlug } from '@/services/posts'

interface Props {
  postContent: Post
}

const PostPage = ({ postContent }: Props) => {
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
            name={`Author's name`}
            date={postContent._source.publishedAt}
            id={postContent._source.authorID}
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
  try {
    postContent = await getPostBySlug(`${slug}`)
  } catch (err) {
    postContent = {} as Post
  }
  return {
    props: {
      postContent, // will be passed to the page component as props
    },
  }
}

export default PostPage
