import {
  Avatar,
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import NextChakraLink from './NextChakraLink'
import * as ROUTES from '@/constants/routes'
import generateAvatar from '@/helpers/generateAvatar'
import { User } from '@/interfaces/User'

interface Props {
  userList: User[]
}

const FollowingList = ({ userList }: Props) => {
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900')
  return (
    <Box>
      <Heading size="md" mb={2}>
        Following
      </Heading>
      <List spacing={2} overflow={'auto'} maxH={'20vh'}>
        {userList.map((user) => (
          <ListItem key={user._id}>
            <NextChakraLink
              text={
                <Flex alignItems={'center'} gap={1}>
                  <Avatar
                    size={'sm'}
                    name={user._source.displayName}
                    src={generateAvatar(user._id)}
                  />
                  <Text fontWeight={500}>{user._source.displayName}</Text>
                </Flex>
              }
              href={ROUTES.USER_PROFILE(user._source.username)}
              color={linkColor}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default FollowingList
