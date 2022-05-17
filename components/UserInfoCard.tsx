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
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import InfoListItem from './InfoListItem'
import NextChakraLink from './NextChakraLink'
import generateAvatar from '@/helpers/generateAvatar'
import { User } from '@/interfaces/User'

interface Props {
  authorInfo: User
}

const UserInfoCard = ({ authorInfo }: Props) => {
  const [followings, setFollowings] = useState<string[]>([])
  const { data: session, status } = useSession()

  const handleFollowAuthor = async () => {
    if (status === 'authenticated') {
      const res = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({ authorID: authorInfo._id, action: 'follow' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 200) {
        // wait 1 seconds for data to fully be uploaded on the server
        setTimeout(() => {
          getDataUser()
        }, 1000)
      } else {
        alert('Something went wrong')
      }
    } else {
      alert(`Please login to ${action} ${authorInfo._source.displayName}`)
    }
  }

  const getUserData = useCallback(async () => {
    if (session) {
      const userFollowings = await fetch(`/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const user = (await userFollowings.json()) as User
      setFollowings(user._source.followings)
    }
  }, [session])


  useEffect(() => {
    getDataUser()
  }, [getDataUser])


  const isFollowing =
    session && followings.indexOf(authorInfo._id) >= 0 ? true : false

  return (
    <VStack
      bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      spacing="1"
      alignItems="left"
      borderRadius={'10'}
      w="100%"
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
        <Button
          onClick={() => handleFollowAuthor()}
          w="100%"
          colorScheme={isFollowing ? 'gray' : 'teal'}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
        <Text fontSize="md">{authorInfo._source.bio}</Text>
        <Flex flexDirection={'column'} justifyContent={'start'} w="100%">
          <InfoListItem heading="Location" text="Ho Chi Minh, Viet Nam" />
          <InfoListItem heading="Work" text={authorInfo._source.work} />
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
