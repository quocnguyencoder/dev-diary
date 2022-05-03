import {
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import BlogTags from './BlogTags'
import generateAvatar from '@/helpers/generateAvatar'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  authorInfo: User
  postList: Post[]
}

const RelatedPost = ({ authorInfo, postList }: Props) => {
  return (
    <VStack alignItems="left" w="25%">
      <VStack
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        spacing="1"
        p="1%"
        alignItems="left"
        borderRadius={'10'}
      >
        <HStack>
          <Image
            borderRadius="full"
            boxSize="55px"
            src={generateAvatar(authorInfo._id)}
            alt={`Avatar of ${authorInfo._source.displayName}`}
          />
          <VStack>
            <Heading size="md">{authorInfo._source.displayName}</Heading>
          </VStack>
        </HStack>
        <Heading padding="1% 0% 0% 2%" as="h6" size="xs">
          JOINED
        </Heading>
        <Text paddingLeft="2%">
          {moment(authorInfo._source.joinedDate).format('LL')}
        </Text>
      </VStack>

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
