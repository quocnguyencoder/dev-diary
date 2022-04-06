import type { NextPage } from 'next'
import ArticleList from '../components/BlogList'
import SmallWithSocial from '../components/Footer'
import WithAction from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <>
      <WithAction />
      <ArticleList />
      <SmallWithSocial />
    </>
  )
}

export default Home
