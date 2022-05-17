import { VStack } from '@chakra-ui/react'
import CommentBlock from './CommentBlock'
import { Comment } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'
interface Props {
  commentList: Comment[]
  userList: User[]
  updateFunction: () => void
}

const CommentList = ({ commentList, userList, updateFunction }: Props) => {
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
              updateFunction={updateFunction}
            />
          )
        )
      })}
    </VStack>
  )
}

export default CommentList
