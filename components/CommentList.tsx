import { VStack } from '@chakra-ui/react'
import CommentBlock from './CommentBlock'
import { Comment } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'
interface Props {
  commentList: Comment[]
  userList: User[]
}

const CommentList = ({ commentList, userList }: Props) => {
  return (
    <VStack align="left">
      {commentList.map((comment) => {
        const userInfo = userList.find(
          (user) => comment._source.commentatorID === user._id,
        )
        return (
          userInfo && (
            <CommentBlock
              key={`cmt-${comment._id}`}
              userInfo={userInfo}
              comment={comment}
            />
          )
        )
      })}
    </VStack>
  )
}

export default CommentList
