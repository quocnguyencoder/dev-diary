import { IconButton, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'

interface Props {
  postID: string
}

const Interact = ({ postID }: Props) => {
  const handleSavedPost = () => {
    fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify({ postID: postID, action: 'save' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const handleLikePost = () => {
    fetch(`/api/users`, {
      method: 'POST',
      body: JSON.stringify({ postID: postID, action: 'like' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // const handleRemoveSavedPost = () => {
  //   fetch(`/api/users`, {
  //     method: 'POST',
  //     body: JSON.stringify({ postID: postID, action: 'remove' }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  // }

  return (
    <VStack pl={7} pr={5}>
      <IconButton
        aria-label="Hearts"
        _hover={{ color: 'red', bg: 'pink' }}
        icon={<MdFavoriteBorder size="50%" />}
        isRound
        onClick={handleLikePost}
      />
      <IconButton
        aria-label="Save post"
        _hover={{ color: 'blue', bg: '#ccffee' }}
        icon={<FaRegBookmark size="50%" />}
        isRound
        onClick={handleSavedPost}
      />
    </VStack>
  )
}

export default Interact
