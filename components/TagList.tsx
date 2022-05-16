import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const TagList = () => {
  const tags = ['next.js', 'javascript', 'web', '.net', 'chrome', 'hello']
  return (
    <Box p={2}>
      <Flex justifyContent="space-between" align="center" mb={2}>
        <Heading size="md">My Tags</Heading>
        <IconButton
          colorScheme="teal"
          aria-label="Add tag"
          variant={'unstyled'}
          icon={<AddIcon />}
        />
      </Flex>

      <VStack overflow={'auto'} maxH={'20vh'} w="95%" align="left" spacing={3}>
        {tags.map((tag, index) => (
          <Button
            variant="unstyled"
            textAlign={'left'}
            fontWeight={'400'}
            key={`${tag}${index}`}
          >{`#${tag}`}</Button>
        ))}
      </VStack>
    </Box>
  )
}

export default TagList
