import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { MdFavorite } from 'react-icons/md'
import { likeComment } from '@/helpers/fetchData'
import generateAvatar from '@/helpers/generateAvatar'
import { Comment } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'

interface Props {
  comment: Comment
  userInfo: User
  updateFunction: () => void
}

const CommentBlock = ({ userInfo, comment, updateFunction }: Props) => {
  const { data: session, status } = useSession()
  const handleLike = async () => {
    if (status === 'authenticated') {
      likeComment(comment._id, 'likeComment')
      // wait 1 seconds for data to fully be uploaded on the server
      setTimeout(() => {
        updateFunction()
      }, 1000)
    } else {
      alert('Please login to like comment')
    }
  }

  const hadLiked = () => {
    if (session && comment._source.likes.includes(session.id as string)) {
      return true
    }
    return false
  }

  const likeOrLikes = (length: number) => {
    if (length < 2) return 'like'
    return 'likes'
  }

  return userInfo ? (
    <Flex style={{ gap: '2%' }} marginTop={{ base: '1', sm: '5' }}>
      <Image
        borderRadius="full"
        boxSize="40px"
        src={generateAvatar(userInfo._id)}
        alt={`Avatar of commentator`}
      />
      <VStack w="100%">
        <Box
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
          p={3}
          w="100%"
          borderRadius={'10'}
          boxShadow={'0 0 1px'}
        >
          <Flex style={{ gap: '2%' }}>
            <Text as="b" fontSize="md">
              {userInfo._source.displayName}
            </Text>
            <Text as="p" fontSize="sm">
              {moment(comment._source.commentAt).format('MMM DD')}
            </Text>
          </Flex>
          <Box
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}
            gap={'1'}
          >
            <Text as="p" marginTop="2" fontSize="lg">
              {comment._source.content}
            </Text>
          </Box>
        </Box>
        <Button
          marginTop="1%"
          alignSelf="flex-start"
          leftIcon={<MdFavorite />}
          variant="solid"
          w="15%"
          color={hadLiked() ? 'red' : 'inherit'}
          bg={hadLiked() ? 'pink' : 'gray.400'}
          onClick={handleLike}
        >
          {comment._source.likes.length}{' '}
          {likeOrLikes(comment._source.likes.length)}
        </Button>
      </VStack>
    </Flex>
  ) : (
    <></>
  )
}

export default CommentBlock
