import { Container, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogList from '@/components/BlogList'
import FilterOptions from '@/components/FilterOptions'
import SortOptions from '@/components/SortOptions'
import { Post } from '@/interfaces/Post'
import { SearchResult } from '@/interfaces/SearchResult'
import { User } from '@/interfaces/User'
import { SearchFilterBy, SearchSortBy } from '@/types/search'

const Search = () => {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<SearchSortBy>('Most Relevant')
  const [filterBy, setFilterBy] = useState<SearchFilterBy>('Posts')
  const [results, setResults] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const { data: session } = useSession()

  const searchTerm = router.query.q
  const isEmptySearch = searchTerm === undefined || searchTerm === ''
  const hasResults = results.length !== 0

  useEffect(() => {
    const getResults = async () => {
      const filterID =
        session && filterBy === 'My posts only'
          ? `${session.id}`
          : filterBy !== 'Tags'
          ? '*'
          : filterBy
      const orderBy =
        sortBy === 'Newest' ? 'desc' : sortBy === 'Oldest' ? 'asc' : ''
      const response = await fetch(
        `/api/posts?q=${searchTerm}&filter=${filterID}&order=${orderBy}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const res = await response
      if (res.status === 200) {
        const data = (await res.json()) as SearchResult
        setResults(data.results)
        setUsers(data.userList)
      } else {
        alert('Error')
      }
    }
    searchTerm !== undefined && getResults()
  }, [searchTerm, filterBy, session, sortBy])

  return (
    <Container maxW="container.lg" pt="3" pb="3" minH="82vh">
      <HStack justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold" isTruncated>
          {isEmptySearch
            ? 'Search results'
            : `Search results for ${router.query.q}`}
        </Text>
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </HStack>
      <Stack direction={['column', 'row']}>
        <FilterOptions filterBy={filterBy} setFilterBy={setFilterBy} />

        {hasResults ? (
          <BlogList postList={results} userList={users} />
        ) : (
          <VStack flex={1}>
            <VStack p={3} borderRadius={'10'} boxShadow={'0 0 1px'} w={'100%'}>
              <Text>No results match that query</Text>
            </VStack>
          </VStack>
        )}
      </Stack>
    </Container>
  )
}

export default Search
