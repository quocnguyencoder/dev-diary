import {
  Box,
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
import { User } from '@/interfaces/User'

interface Props {
  userList: User[]
}

const UserList = ({ userList }: Props) => {
  const resultColor = useColorModeValue('whiteAlpha.900', 'gray.700')
  const linkColor = useColorModeValue('gray.700', 'whiteAlpha.900')
  return (
    <VStack flex={1}>
      {userList.map((user) => (
        <Box
          key={user._id}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
          bg={resultColor}
          p={5}
          borderRadius={'10'}
          boxShadow={'0 0 1px'}
          w={'100%'}
        >
          <HStack spacing="2" display="flex" alignItems="center">
            <Image
              borderRadius="full"
              boxSize="40px"
              src={generateAvatar(user._id)}
              alt={`Avatar of ${user._source.username}`}
            />
            <VStack alignItems={'left'} spacing="-0.5">
              <Text fontWeight="600">
                <NextChakraLink
                  href={`/u/${user._source.username}`}
                  text={`${user._source.displayName} - ${user._source.username}`}
                  color={linkColor}
                />
              </Text>
              <Text fontSize="xs">{`Joined at ${moment(
                user._source.joinedDate,
              ).format('LL')}`}</Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}

export default UserList
