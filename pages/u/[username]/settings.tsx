import { Container, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'
import EditProfile from '@/components/EditProfile'
import OptionButtonSettings from '@/components/OptionButtonSettings'
import { User } from '@/interfaces/User'
import { checkUserExists, getUserByUsername } from '@/services/users'
interface Props {
  user: User
  userExists: boolean
}

const Settings = ({ user, userExists }: Props) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleClick = (option: string) => {
    if (option === 'Profile') {
      router.push(`/u/${user._source.username}`)
    } else {
      router.push(`/`)
    }
  }

  useLayoutEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (session) {
      user._id !== (session.id as string) && router.push('/')
    }
  })

  return userExists ? (
    <Container maxW="container.lg" pt="3" pb="3" minH="82vh">
      <HStack justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold" isTruncated>
          Settings for @{user._source.username}
        </Text>
      </HStack>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={'flex-start'} w={'25%'}>
          <OptionButtonSettings
            option="Profile"
            isSelected={true}
            action={handleClick}
          />
          <OptionButtonSettings
            option="Account"
            isSelected={true}
            action={handleClick}
          />
        </VStack>
        <EditProfile userInfo={user._source} />
      </Stack>
    </Container>
  ) : (
    <></>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query

  let user = {} as User
  const userExists = await checkUserExists(`${username}`)
  try {
    // slug -> username => data
    user = await getUserByUsername(`${username}`)
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      // will be passed to the page component as props
      userExists,
      user,
    },
  }
}

export default Settings
