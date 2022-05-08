import {
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import NextChakraLink from './NextChakraLink'
import generateAvatar from '@/helpers/generateAvatar'
interface BlogAuthorProps {
  date: string
  name: string
  id: string
  username: string
}

export const BlogAuthor: React.FC<BlogAuthorProps> = ({
  date,
  name,
  id,
  username,
}: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={generateAvatar(id)}
        alt={`Avatar of ${name}`}
      />
      <VStack alignItems={'left'} spacing="-0.5">
        <Text fontWeight="600">
          <NextChakraLink
            href={`/u/${username}`}
            text={name}
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          />
        </Text>
        <Text fontSize="xs">{`${moment(date).format('LL')} (${moment(
          date,
          'YYYY-MM-DDTHH:mm:ssZ',
        ).fromNow()})`}</Text>
      </VStack>
    </HStack>
  )
}

export default BlogAuthor
