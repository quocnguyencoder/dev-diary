import { Container, Heading } from '@chakra-ui/react'
import React from 'react'
import BlogList from '@/components/BlogList'
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
      <Container maxW="container.md" pt="3" pb="3">
        <Heading as="h1" mb={1}>
          Latest
        </Heading>
        <BlogList postList={latestPosts} userList={userList} />
      </Container>
    </HomeContext.Provider>
  )
}

export default Home

export async function getStaticProps() {
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 hour
    revalidate: 60, // In seconds
  }
}
