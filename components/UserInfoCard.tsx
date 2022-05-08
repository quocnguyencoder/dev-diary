import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import InfoListItem from './InfoListItem'
import NextChakraLink from './NextChakraLink'
import generateAvatar from '@/helpers/generateAvatar'
import { User } from '@/interfaces/User'

interface Props {
  authorInfo: User
}

const UserInfoCard = ({ authorInfo }: Props) => {
  return (
    <VStack
      bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      spacing="1"
      alignItems="left"
      borderRadius={'10'}
    >
      {/* User image and display name as link */}
      <HStack
        justifyContent={'start'}
        w="100%"
        borderRadius={'10'}
        bgGradient="linear(to-b, blue.400 50%, transparent 50%)"
      >
        <Image
          borderRadius="full"
          boxSize="3.3rem"
          m={'0.9em 0.1em 0.4em 0.9em'}
          src={generateAvatar(authorInfo._id)}
          alt={`Avatar of ${authorInfo._source.displayName}`}
        />
        <Heading size="md" pt={9}>
          <NextChakraLink
            href={`/u/${authorInfo._source.username}`}
            text={authorInfo._source.displayName}
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          />
        </Heading>
      </HStack>
      <VStack spacing={3} p="0.1em 0.9em 0.9em 0.9em">
        <Button w="100%" colorScheme={'teal'}>
          Follow
        </Button>
        <Text fontSize="md">
          Looking to get into development? As a full-stack developer I guide you
          on this journey and give you bite sized tips every single day
        </Text>
        <Flex flexDirection={'column'} justifyContent={'start'} w="100%">
          <InfoListItem heading="Location" text="Ho Chi Minh, Viet Nam" />
          <InfoListItem
            heading="Work"
            text="Solution Architect at Daily Dev Tips"
          />

          <InfoListItem
            heading="Joined"
            text={moment(authorInfo._source.joinedDate).format('LL')}
          />
        </Flex>
      </VStack>
    </VStack>
  )
}

export default UserInfoCard
