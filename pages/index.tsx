import { Container, Heading } from '@chakra-ui/react'
import React from 'react'
import BlogList from '@/components/BlogList'
import { HomeContext } from '@/contexts/HomeContext'
import { Post } from '@/interfaces/Post'
import { getLatestPosts } from '@/services/posts'
interface Props {
  latestPosts: Post[]
}

const Home = ({ latestPosts }: Props) => {
  return (
    <HomeContext.Provider value={{ latestPosts }}>
      <Container maxW="container.md" pt="3" pb="3">
        <Heading as="h1" mb={1}>
          Latest
        </Heading>
        <BlogList postsList={latestPosts} />
      </Container>
    </HomeContext.Provider>
  )
}

export default Home

export async function getStaticProps() {
  // const res = await fetch('http://localhost:3000/api/posts')
  // const latestPosts = (await res.json()) as Post[]
  let latestPosts: Post[]
  try {
    latestPosts = await getLatestPosts()
  } catch {
    latestPosts = []
  }
  return {
    props: {
      latestPosts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 hour
    revalidate: 60, // In seconds
  }
}
