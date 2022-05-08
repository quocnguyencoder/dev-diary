import { Box, Container, useColorModeValue, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import BlogContent from '@/components/BlogContent'
import Comment from '@/components/Comment'
import InteractButtons from '@/components/InteractButtons'
import RelatedPosts from '@/components/RelatedPosts'
import UserInfoCard from '@/components/UserInfoCard'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'
import { getPostBySlug, queryPostsBySameAuthor } from '@/services/posts'
import { getUserByUserID } from '@/services/users'
import NextChakraLink from '@/components/NextChakraLink'

interface Props {
  postContent: Post
  author: User
  postList: Post[]
}

const PostPage = ({ postContent, author, postList }: Props) => {
  return (
    <Container maxW="7xl" pt="3" pb="3" display="flex" gap={3}>
      {/* Left-side contents */}
      <VStack display={{ base: 'none', md: 'flex' }}>
        <InteractButtons postID={postContent._id} />
      </VStack>
      {/* Middle contents */}
      <VStack
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        borderRadius={'10'}
        boxShadow={'0 0 1px'}
        alignItems="left"
        flex={1}
      >
        <BlogContent postContent={postContent} author={author} />
        <Comment postID={postContent._id} />
      </VStack>
      {/* Right-side contents */}
      <Box w="28%" display={{ base: 'none', md: 'block' }}>
        <VStack position={'sticky'} top={0}>
          <UserInfoCard authorInfo={author} />
          <RelatedPosts
            heading={
              <>
                More from{' '}
                <NextChakraLink
                  href={`/u/${author._source.username}`}
                  text={author._source.displayName}
                  color={useColorModeValue('blue.600', 'blue.400')}
                />
              </>
            }
            postList={postList}
          />
        </VStack>
      </Box>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  let postContent = {} as Post
  let author = {} as User
  let postList = [] as Post[]
  try {
    // slug -> username => data
    postContent = await getPostBySlug(`${slug}`)
    author = await getUserByUserID(postContent._source.authorID)
    postList = await queryPostsBySameAuthor(
      author._source.posts.filter((post) => post !== postContent._id),
    )
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      // will be passed to the page component as props
      postContent,
      author,
      postList,
    },
  }
}

export default PostPage
