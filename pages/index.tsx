import { Client } from '@elastic/elasticsearch'
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
  const client = new Client({
    node: 'https://50.19.132.192:9200',
    auth: {
      username: 'elastic',
      password: 'JjpQZ7CpJxUL*+Gy=f_o',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
  const getData = async () => {
    const result = await client.search<Document>({
      index: 'posts',
      query: {
        match_all: {},
      },
    })
    return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
  }
  // const res = await fetch('http://localhost:3000/api/posts')
  // const latestPosts = (await res.json()) as Post[]
  const latestPosts = await getData()
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
