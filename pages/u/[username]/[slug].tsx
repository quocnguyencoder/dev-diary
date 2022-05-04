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
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BlogAuthor from '@/components/BlogAuthor'
import BlogTags from '@/components/BlogTags'
import Comment from '@/components/Comment'
import Interact from '@/components/Interact'
import RelatedPost from '@/components/RelatedPost'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'
import { getPostBySlug, queryPostsBySameAuthor } from '@/services/posts'
import { getUserByUserID } from '@/services/users'

interface Props {
  postContent: Post
  author: User
  postList: Post[]
}

const PostPage = ({ postContent, author, postList }: Props) => {
  return (
    <Container maxW="8xl" pt="3" pb="3" display="flex" gap={3}>
      <Interact postID={postContent._id} />
      <VStack
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        borderRadius={'10'}
        boxShadow={'0 0 1px'}
        alignItems="left"
        flex={1}
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
            name={author._source.displayName}
            date={postContent._source.publishedAt}
            id={postContent._source.authorID}
            username={author._source.username}
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
        <Comment postID={postContent._id} />
      </VStack>
      <RelatedPost authorInfo={author} postList={postList} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  // slug -> username =>data
  let postContent: Post

  let author: User
  let postList: Post[]
  try {
    postContent = await getPostBySlug(`${slug}`)
    author = await getUserByUserID(postContent._source.authorID)
    postList = await queryPostsBySameAuthor(
      author._source.posts.filter((post) => post !== postContent._id),
    )
  } catch (err) {
    postContent = {} as Post
    author = {} as User
    postList = [] as Post[]
  }

  return {
    props: {
      postContent, // will be passed to the page component as props
      author,
      postList,
    },
  }
}

export default PostPage
