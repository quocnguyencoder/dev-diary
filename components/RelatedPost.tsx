import { Heading, Link, useColorModeValue, VStack } from '@chakra-ui/react'
import BlogTags from './BlogTags'
import StickyUserInfo from './StickyUserInfo'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  authorInfo: User
  postList: Post[]
}

const RelatedPost = ({ authorInfo, postList }: Props) => {
  return (
    <VStack alignItems="left" w="28%">
      <StickyUserInfo authorInfo={authorInfo} />
      <VStack
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        pt="1%"
        pb="1%"
        alignItems="left"
        spacing="1"
        borderRadius={'10'}
      >
        <Heading size="md" margin="auto">
          Same Author
        </Heading>
        {postList.map((post) => (
          <Link
            href={`/u/${post._source.slug}`}
            key={post._id}
            _hover={{ color: '#909DDA' }}
            p={2}
          >
            <VStack alignItems="left" boxShadow={'0px -0.25px #888'} p="2%">
              <Heading as="h6" size="sm">
                {post._source.title}
              </Heading>
              <BlogTags tags={post._source.tags} />
            </VStack>
          </Link>
        ))}
      </VStack>
    </VStack>
  )
}

export default RelatedPost
