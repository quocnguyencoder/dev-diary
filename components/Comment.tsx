import {
  Button,
  Flex,
  Image,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useLayoutEffect, useState } from 'react'
import CommentList from './CommentList'
import generateAvatar from '@/helpers/generateAvatar'
import { Comment, CommentSource } from '@/interfaces/Comment'
import { User } from '@/interfaces/User'

interface Props {
  postID: string
}

const Comment = ({ postID }: Props) => {
  const { data: session, status } = useSession()
  const [content, setContent] = useState('')
  const [commentList, setCommentList] = useState<Comment[]>([])
  const [commentator, setCommentator] = useState<User[]>([])
  const [reload, setReload] = useState(false)

  useLayoutEffect(() => {
    async function fetchComment() {
      const fetchComment = await fetch(`/api/comment?postID=${postID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (fetchComment.status === 200) {
        const data = (await fetchComment.json()) as Comment[]
        setCommentList(data)

        //remove duplicate commentatorID
        const commentObject = data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (temp) =>
                temp._source.commentatorID === value._source.commentatorID,
            ),
        )

        const commentatorIDArr = commentObject.map(
          (comment) => comment._source.commentatorID,
        )
        const commentatorData = await fetch(`/api/comment`, {
          method: 'POST',
          body: JSON.stringify({ array: commentatorIDArr }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setCommentator((await commentatorData.json()) as User[])
      } else {
        alert('Something went wrong')
      }
    }
    fetchComment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  const handleComment = async () => {
    if (session) {
      const commentInfo: CommentSource = {
        commentatorID: `${session.id}`,
        content: content,
        postID: postID,
        commentAt: moment().toISOString(),
        likes: [],
        reply: [],
      }
      const sendData = await fetch('/api/comment', {
        method: 'PUT',
        body: JSON.stringify({ data: commentInfo }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await sendData
      if (response.status !== 201) {
        alert('Something went wrong')
      } else {
        setContent('')
        setReload(!reload)
      }
    }
  }

  return (
    <>
      <VStack
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        boxShadow={'0 0 1px'}
        align="left"
      >
        <VStack w="100%" p="1% 5% 3% 5%" gap="1em" align="left">
          <Text
            as="b"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            Discussion ({commentList.length})
          </Text>
          <Flex style={{ gap: '2%' }}>
            <Image
              borderRadius="full"
              boxSize="40px"
              src={session ? generateAvatar(session.id as string) : undefined}
              alt={`Avatar of commentator`}
            />
            <Textarea
              variant="unstyled"
              size="lg"
              resize="none"
              borderWidth="2px 2px 2px 2px"
              borderColor="lightGray"
              borderRadius={10}
              paddingLeft="1%"
              _focus={{ borderColor: '#2B6CB0' }}
              placeholder="Add to discussion"
              height={'20vh'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Flex>
          <Button
            colorScheme="blue"
            size="md"
            isDisabled={status == 'unauthenticated' ? true : false}
            onClick={() => handleComment()}
          >
            Submit
          </Button>
        </VStack>
      </VStack>
      <CommentList commentList={commentList} commentator={commentator} />
    </>
  )
}

export default Comment
