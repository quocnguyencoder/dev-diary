import {
  Avatar,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import React from 'react'
import MoreActionButton from './MoreActionButton'
import NextChakraLink from './NextChakraLink'
import * as ROUTES from '@/constants/routes'
import generateAvatar from '@/helpers/generateAvatar'

interface BlogAuthorProps {
  date: string
  name: string
  id: string
  username: string
  postID: string
  setEdit: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

export const BlogAuthor: React.FC<BlogAuthorProps> = ({
  date,
  name,
  id,
  username,
  postID,
  setEdit,
}: BlogAuthorProps) => {
  const { data: session } = useSession()
  const owner = () => (session && session.id === id ? true : false)

  return (
    <HStack mt="2" spacing="2" display="flex" align="center">
      <Avatar maxW="40px" maxH="40px" name={name} src={generateAvatar(id)} />
      <VStack align={'left'} spacing="-0.5" w="100%">
        <Text fontWeight="600">
          <NextChakraLink
            href={ROUTES.USER_PROFILE(username)}
            text={name}
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          />
        </Text>
        <Text fontSize="xs">{`${moment(date).format('LL')} (${moment(
          date,
          'YYYY-MM-DDTHH:mm:ssZ',
        ).fromNow()})`}</Text>
      </VStack>
      {setEdit && owner() && (
        <MoreActionButton postID={postID} authorID={id} setEdit={setEdit} />
      )}
    </HStack>
  )
}

export default BlogAuthor
