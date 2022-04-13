import AppBar from '@/components/AppBar'
import BlogList from '@/components/BlogList'
import SmallFooterWithSocial from '@/components/Footer'
import { HomeContext } from '@/contexts/HomeContext'
import { Post } from '@/interfaces/Post'

interface Props {
  latestPosts: Post[]
}

const Home = ({ latestPosts }: Props) => {
  return (
    <HomeContext.Provider value={{ latestPosts }}>
      <AppBar />
      <BlogList />
      <SmallFooterWithSocial />
    </HomeContext.Provider>
  )
}

export default Home

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/posts')
  const latestPosts = (await res.json()) as Post[]

  return {
    props: {
      latestPosts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 600, // In seconds
  }
}
