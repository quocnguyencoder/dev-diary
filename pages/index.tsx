import { Box, Container, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import FollowingList from '@/components/FollowingList'
import NavList from '@/components/NavList'
import NewsFeedSection from '@/components/NewsFeedSection'
import TagList from '@/components/TagList'
import { User } from '@/interfaces/User'
import { getUserByUserID, getUsersInfoByIDList } from '@/services/users'
interface Props {
  userInfo: User
  followings: User[]
}

const Home = ({ userInfo, followings }: Props) => {
  const { data: session } = useSession()
  return (
    <Container maxW="85vw" p={'1em 0'} display="flex" gap={2}>
      <VStack
        w="20%"
        pt={4}
        align="left"
        spacing={4}
        display={{ base: 'none', md: 'flex' }}
      >
        <NavList />
        {session && userInfo._id && (
          <>
            <FollowingList userList={followings} />
            <TagList tags={userInfo._source.tags} />
          </>
        )}
      </VStack>

      <Box flex={1}>
        <NewsFeedSection userInfo={userInfo} />
      </Box>
      <Box
        bgColor="yellow"
        w="25%"
        h="10vh"
        display={{ base: 'none', md: 'block' }}
      ></Box>
    </Container>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  let userInfo = {} as User
  let followings = [] as User[]
  if (session) {
    try {
      userInfo = await getUserByUserID(session.id as string)
      followings = await getUsersInfoByIDList(userInfo._source.followings)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    props: {
      userInfo,
      followings,
    },
  }
}
