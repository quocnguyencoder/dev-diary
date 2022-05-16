import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import BlogList from '@/components/BlogList'
import FollowingList from '@/components/FollowingList'
import NavList from '@/components/NavList'
import TagList from '@/components/TagList'
import { HomeContext } from '@/contexts/HomeContext'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'
import { getLatestPosts } from '@/services/posts'
import { getUsersInfoByIDList } from '@/services/users'
interface Props {
  latestPosts: Post[]
  userList: User[]
}

const Home = ({ latestPosts, userList }: Props) => {
  return (
    <HomeContext.Provider value={{ latestPosts }}>
      <Container maxW="85vw" p={'1em 0'} display="flex" gap={2}>
        <VStack
          w="20%"
          pt={4}
          align="left"
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
        >
          <NavList />
          <FollowingList userList={userList} />
          <TagList />
        </VStack>

        <Box flex={1}>
          <Heading as="h1" mb={1}>
            Latest
          </Heading>
          <BlogList postList={latestPosts} userList={userList} />
        </Box>
        <Box
          bgColor="yellow"
          w="25%"
          h="10vh"
          display={{ base: 'none', md: 'block' }}
        ></Box>
      </Container>
    </HomeContext.Provider>
  )
}

export default Home

export async function getServerSideProps() {
  let latestPosts: Post[]
  let idList: string[] = []
  let userList: User[] = []
  try {
    latestPosts = await getLatestPosts()
    idList = latestPosts.map((post) => post._source.authorID)
    userList = await getUsersInfoByIDList(idList)
  } catch {
    latestPosts = []
  }
  return {
    props: {
      latestPosts,
      userList,
    },
  }
}
