import { IconButton, Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useCallback, useLayoutEffect, useState } from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'
import { Post } from '@/interfaces/Post'

interface Props {
  postID: string
}

const InteractButtons = ({ postID }: Props) => {
  const { data: session, status } = useSession()
  const [likedList, setLikedList] = useState<string[]>([])

  const handleActionPost = async (action: string) => {
    if (status === 'authenticated') {
      const res = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({ postID: postID, action: action }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 200) {
        // wait 1 seconds for data to fully be uploaded on the server
        setTimeout(() => {
          getAmountOfLike()
        }, 1000)
      } else {
        alert('Something went wrong')
      }
    } else {
      alert('Please login to comment')
    }
  }

  const getAmountOfLike = useCallback(async () => {
    const data_likedList = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ postID: postID }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const postData = (await data_likedList.json()) as Post
    setLikedList(postData._source.liked)
  }, [postID])

  useLayoutEffect(() => {
    getAmountOfLike()
  }, [getAmountOfLike])

  const liked =
    session && likedList.indexOf(session.id as string) >= 0 ? true : false

  return (
    <VStack position={'sticky'} top={10} pt={20}>
      <IconButton
        aria-label="Hearts"
        _hover={{ color: 'red', bg: 'pink' }}
        icon={<MdFavoriteBorder size="50%" />}
        color={liked ? 'red' : 'inherit'}
        bg={liked ? 'pink' : 'gray.400'}
        isRound
        onClick={() => handleActionPost('like')}
      />
      <Text as="b" fontSize="sm">
        {likedList.length}
      </Text>
      <IconButton
        aria-label="Save post"
        _hover={{ color: 'blue', bg: '#ccffee' }}
        icon={<FaRegBookmark size="50%" />}
        bg="gray.400"
        isRound
        onClick={() => handleActionPost('save')}
      />
    </VStack>
  )
}

export default InteractButtons
