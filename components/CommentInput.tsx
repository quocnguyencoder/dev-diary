import { Button, Flex, Image, Textarea } from '@chakra-ui/react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { isSuccess, uploadComment } from '@/helpers/fetchData'
import generateAvatar from '@/helpers/generateAvatar'
import { CommentSource } from '@/interfaces/Comment'

interface Props {
  postID: string
  updateFunction: () => void
}

const CommentInput = ({ postID, updateFunction }: Props) => {
  const { data: session, status } = useSession()
  const [commentInput, setCommentInput] = useState('')
  const handleUploadComment = async () => {
    if (status === 'authenticated') {
      const commentInfo: CommentSource = {
        commentatorID: `${session.id}`,
        content: commentInput,
        postID: postID,
        commentAt: moment().toISOString(),
        likes: [],
        reply: [],
      }
      const response = await uploadComment(commentInfo)
      if (isSuccess(response, 201)) {
        // wait 1 seconds for data to fully be uploaded on the server
        setTimeout(() => {
          setCommentInput('')
          updateFunction()
        }, 1000)
      } else {
        alert('Something went wrong')
      }
    } else {
      alert('Please login to comment')
    }
  }
  return (
    <>
      <Flex gap={2}>
        <Image
          borderRadius="full"
          boxSize="40px"
          src={
            session ? generateAvatar(session.id as string) : generateAvatar('')
          }
          alt={`Avatar of commentator`}
        />
        <Textarea
          variant="unstyled"
          size="lg"
          resize="none"
          borderWidth={'thin'}
          borderColor="lightGray"
          borderRadius={10}
          paddingLeft="1%"
          _focus={{ borderColor: '#2B6CB0' }}
          placeholder="Add to discussion"
          height={'20vh'}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
      </Flex>
      <Button
        colorScheme="blue"
        size="md"
        isDisabled={status == 'unauthenticated' ? true : false}
        onClick={() => handleUploadComment()}
      >
        Submit
      </Button>
    </>
  )
}

export default CommentInput
