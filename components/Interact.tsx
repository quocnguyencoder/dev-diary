import { IconButton, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'

const Interact = () => {
  return (
    <VStack
      style={{
        position: 'fixed',
        marginTop: '12px',
        left: '7%',
      }}
    >
      <IconButton
        aria-label="Hearts"
        _hover={{ color: 'red', bg: 'pink' }}
        icon={<MdFavoriteBorder size="50%" />}
        isRound
      />
      <IconButton
        aria-label="Save post"
        _hover={{ color: 'blue', bg: '#ccffee' }}
        icon={<FaRegBookmark size="50%" />}
        isRound
      />
    </VStack>
  )
}

export default Interact
