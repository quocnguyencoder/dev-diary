import { useColorModeValue, VStack } from '@chakra-ui/react'
import CommentBlock from './CommentBlock'
import { Comment } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'
interface Props {
  commentList: Comment[]
  commentator: User[]
}

const CommentList = ({ commentList, commentator }: Props) => {
  return (
    <VStack
      bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      borderBottomRadius={'10'}
      boxShadow={'0 0 1px'}
      align="left"
    >
      <VStack w="100%" p="1% 5% 3% 5%" gap="1em" align="left">
        {commentList.map((comment) => {
          const userInfo = commentator.filter(
            (user) => comment._source.commentatorID === user._id,
          )[0]
          return (
            <CommentBlock
              key={`commentator-${comment._id}`}
              userInfo={userInfo}
              comment={comment}
            />
          )
        })}
      </VStack>
    </VStack>
  )
}

export default CommentList
