import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  heading: string
  text: string
}

const InfoListItem = ({ heading, text }: Props) => {
  return (
    <Box pb={3}>
      <Heading textTransform={'uppercase'} as="h6" size="xs">
        {heading}
      </Heading>
      <Text fontSize={'sx'}>{text}</Text>
    </Box>
  )
}

export default InfoListItem
