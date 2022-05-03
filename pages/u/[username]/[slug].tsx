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
import { getPostBySlug } from '@/services/posts'
import { getUserByUserID } from '@/services/users'

interface Props {
  postContent: Post
  author: User
}

const PostPage = ({ postContent, author }: Props) => {
  // const markdown = `# Hello, this is a sample post\n
  // **Welcome to DevDiary**\n\n
  // _This is a sentence written in italic._\n\n
  // This is a normal sentence.\n\n
  // **This is an ordered list:**
  // 1. Ordered list item 1
  // 2. Ordered list item 2\n
  // **This is an unordered list:**
  // - Unordered list item 1
  // - Unordered list item 2\n\n
  // **This is a link:** [Duck Duck Go](https://duckduckgo.com).\n
  // **This is an image:** ![duck](https://mdg.imgix.net/assets/images/tux.png?auto=format&fit=clip&q=40&w=100)\n
  // * This is a paragraph:\n
  //   > With a blockquote\n
  // * This is a code block:\n
  //   \`\`\` console.log(hello, world); \`\`\`\n
  // * This is a single-line code:\n
  //   \`\`\` const a = 1; \`\`\`
  // * **To do**: styling code block with syntax highlight
  // `

  return (
    <div style={{ display: 'flex' }}>
      <Interact />
      <Container maxW="3xl" pt="3" pb="3" style={{ marginLeft: '11%' }}>
        <VStack
          bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
          borderRadius={'10'}
          boxShadow={'0 0 1px'}
          alignItems="left"
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
      </Container>
      <RelatedPost authorInfo={author} postID={postContent._id} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  // slug -> username =>data
  let postContent: Post
  let author: User
  try {
    postContent = await getPostBySlug(`${slug}`)
    author = await getUserByUserID(postContent._source.authorID)
  } catch (err) {
    postContent = {} as Post
    author = {} as User
  }
  return {
    props: {
      postContent, // will be passed to the page component as props
      author,
    },
  }
}

export default PostPage
