import { Box, Container, VStack } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import FollowingList from '@/components/FollowingList'
import NavList from '@/components/NavList'
import NewsFeedSection from '@/components/NewsFeedSection'
import TagList from '@/components/TagList'
import { User } from '@/interfaces/User'
import { getUserByUserID, getUsersInfoByIDList } from '@/services/users'
interface Props {
  userInfo: User
  followings: User[]
  status: number
}

const Home = ({ userInfo, followings, status }: Props) => {
  const { data: session } = useSession()
  return (
    <Container maxW="85vw" p={'1em 0'} display="flex" gap={2}>
      <NextSeo
        title="DevDiary - Share your dev stories"
        description="Technical blog webapp"
        canonical="https://dev-diary-nu.vercel.app/"
        openGraph={{
          url: 'https://dev-diary-nu.vercel.app',
          title: 'DevDiary - Share your dev stories',
          description: 'Technical blog webapp',
          images: [
            {
              url: 'https://dev-diary-nu.vercel.app/icon-500x500.png',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
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
        {status !== 500 && <NewsFeedSection userInfo={userInfo} />}
      </Box>
      <Box
        bgColor="yellow"
        w="25%"
        h="10vh"
        display={{ base: 'none', md: 'block' }}
        visibility="hidden"
      ></Box>
    </Container>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  let userInfo = {} as User
  let followings = [] as User[]
  let status = 200
  if (session) {
    try {
      userInfo = await getUserByUserID(session.id as string)
      followings = await getUsersInfoByIDList(userInfo._source.followings)
    } catch (err) {
      console.error(err)
      status = 500
    }
  }

  return {
    props: {
      userInfo,
      followings,
      status,
    },
  }
}
