import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { MdFavorite } from 'react-icons/md'
import generateAvatar from '@/helpers/generateAvatar'
import { Comment } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'

interface Props {
  comment: Comment
  userInfo: User
}

const CommentBlock = ({ userInfo, comment }: Props) => {
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
        >
          {comment._source.likes.length} likes
        </Button>
      </VStack>
    </Flex>
  ) : (
    <></>
  )
}

export default CommentBlock
