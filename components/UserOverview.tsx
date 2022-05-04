import {
  Avatar,
  Button,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import { RiCake2Line, RiMapPinLine, RiTwitterFill } from 'react-icons/ri'
import UserInfoWithIcon from '@/components/UserInfoWithIcon'
import generateAvatar from '@/helpers/generateAvatar'
import { User } from '@/interfaces/User'

interface Props {
  userInfo: User
}

const UserOverview = ({ userInfo }: Props) => {
  const { data: session } = useSession()
  const isCurrentUser = session && session.id === userInfo._id

  const backgroundColor = useColorModeValue('whiteAlpha.900', 'gray.700')
  return (
    <VStack
      bg={backgroundColor}
      p={3}
      borderRadius={'10'}
      boxShadow={'0 0 1px'}
      mt={12}
      pb={7}
    >
      <HStack w="100%" justifyContent={'space-between'} mt={-6}>
        <Button visibility={'hidden'}>None display</Button>
        <Avatar
          size={'xl'}
          border={`6px solid #fff`}
          src={generateAvatar(`${userInfo._id}`)}
        />

        {isCurrentUser ? (
          <Button colorScheme="teal">Edit Profile</Button>
        ) : (
          <Button colorScheme="teal">Follow</Button>
        )}
      </HStack>
      <Text fontSize="3xl" fontWeight="bold">
        {userInfo._source.displayName}
      </Text>
      <Text maxWidth="70%" textAlign="center">
        Obsessed with low-code and automation, responsible for 2.8 million
        downloads at NuGet, and plays 5 musical instruments if you extort me
      </Text>
      <HStack>
        <UserInfoWithIcon
          icon={<Icon as={RiMapPinLine} boxSize="1.5em" />}
          text="Nha Trang, Vietnam"
        />
        <UserInfoWithIcon
          icon={<Icon as={RiCake2Line} boxSize="1.5em" />}
          text={`Joined on ${moment(userInfo._source.joinedDate).format('LL')}`}
        />
        <UserInfoWithIcon
          icon={<Icon as={FiMail} boxSize="1.5em" />}
          text={`quocnguyen612k@gmail.com`}
        />
        <UserInfoWithIcon
          icon={<Icon as={BsGithub} boxSize="1.5em" />}
          text=""
        />
        <UserInfoWithIcon
          icon={<Icon as={RiTwitterFill} boxSize="1.5em" />}
          text=""
        />
      </HStack>
    </VStack>
  )
}

export default UserOverview
