import { Box, Container, useColorModeValue, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import BlogContent from '@/components/BlogContent'
import CommentSection from '@/components/CommentSection'
import InteractButtons from '@/components/InteractButtons'
import NextChakraLink from '@/components/NextChakraLink'
import RelatedPosts from '@/components/RelatedPosts'
import UserInfoCard from '@/components/UserInfoCard'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'
import {
  getAuthorRelatedPosts,
  getOthersRelatedPosts,
  getPostBySlug,
} from '@/services/posts'
import { getUserByUserID } from '@/services/users'

interface Props {
  postContent: Post
  author: User
  authorRelatedPosts: Post[]
  othersRelatedPosts: Post[]
}

const PostPage = ({
  postContent,
  author,
  authorRelatedPosts,
  othersRelatedPosts,
}: Props) => {
  const userRelatedPostsLinkColor = useColorModeValue('blue.600', 'blue.400')
  const hasRelatedPosts = (result: Post[]) =>
    result.length !== 0 ? true : false

  return (
    <>
      <NextSeo
        title={`${postContent._source.title} - ${author._source.displayName}`}
        description={postContent._source.description}
        canonical="https://dev-diary-nu.vercel.app/"
        openGraph={{
          url: `https://dev-diary-nu.vercel.app/u/${postContent._source.slug}`,
          title: `${postContent._source.title} - ${author._source.displayName}`,
          description: `${postContent._source.description}`,
          images: [
            {
              url: `${postContent._source.coverImg}`,
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
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
          flex={1}
        >
          <BlogContent postContent={postContent} author={author} />
          <CommentSection postID={postContent._id} />
        </VStack>
        {/* Right-side contents */}
        <Box w="28%" display={{ base: 'none', md: 'block' }}>
          <VStack>
            <UserInfoCard authorInfo={author} />
            {hasRelatedPosts(authorRelatedPosts) && (
              <RelatedPosts
                heading={
                  <>
                    More from{' '}
                    <NextChakraLink
                      href={`/u/${author._source.username}`}
                      text={author._source.displayName}
                      color={userRelatedPostsLinkColor}
                    />
                  </>
                }
                postList={authorRelatedPosts}
              />
            )}
            {hasRelatedPosts(othersRelatedPosts) && (
              <RelatedPosts
                heading={'Maybe you like'}
                postList={othersRelatedPosts}
              />
            )}
          </VStack>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query

  let postContent = {} as Post
  let author = {} as User
  let authorRelatedPosts = [] as Post[]
  let othersRelatedPosts = [] as Post[]

  try {
    // slug -> username => data
    postContent = await getPostBySlug(`${slug}`)
    author = await getUserByUserID(postContent._source.authorID)
    authorRelatedPosts = await getAuthorRelatedPosts(postContent)
    othersRelatedPosts = await getOthersRelatedPosts(postContent)
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      // will be passed to the page component as props
      postContent,
      author,
      authorRelatedPosts,
      othersRelatedPosts,
    },
  }
}

export default PostPage
