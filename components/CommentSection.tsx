import { Heading, useColorModeValue, VStack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import {
  getCommentUsersInfo,
  getPostComments,
  isSuccess,
} from '@/helpers/fetchData'
import { Comment } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'

interface Props {
  postID: string
}

const CommentSection = ({ postID }: Props) => {
  const [commentList, setCommentList] = useState<Comment[]>([])
  const [userList, setUserList] = useState<User[]>([])

  const getAllCommentsData = useCallback(async () => {
    const getCommentsResponse = await getPostComments(postID)
    let error = true
    if (isSuccess(getCommentsResponse, 200)) {
      const commentsData = (await getCommentsResponse.json()) as Comment[]
      const commentUserIDs = commentsData.map(
        (comment) => comment._source.commentatorID,
      )
      const filteredUserIDs = Array.from(new Set(commentUserIDs))
      const getUsersInfoResponse = await getCommentUsersInfo(filteredUserIDs)
      if (isSuccess(getUsersInfoResponse, 200)) {
        const usersData = (await getUsersInfoResponse.json()) as User[]
        error = false
        setCommentList(commentsData)
        setUserList(usersData)
      }
    }
    error && alert('Something went wrong')
  }, [postID])

  useEffect(() => {
    getAllCommentsData()
  }, [getAllCommentsData])

  return (
    <>
      <VStack w="100%" p="1% 5% 3% 5%" gap="1em" align="left">
        <Heading
          fontSize="2xl"
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          Discussion ({commentList.length})
        </Heading>
        <CommentInput postID={postID} updateFunction={getAllCommentsData} />
        {commentList.length > 0 && (
          <CommentList commentList={commentList} userList={userList} />
        )}
      </VStack>
    </>
  )
}

export default CommentSection
