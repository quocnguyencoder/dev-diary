import { SearchIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const SearchBar = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const querySearchTerm = router.query.q

  useEffect(() => {
    querySearchTerm !== undefined && setSearchTerm(querySearchTerm as string)
  }, [querySearchTerm])

  return (
    <InputGroup w="30vw" display={{ base: 'none', md: 'block', lg: 'block' }}>
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        focusBorderColor={useColorModeValue('teal.500', 'teal.300')}
      />
      <InputRightElement>
        <IconButton
          variant="ghost"
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={() =>
            router.push(`/search?q=${searchTerm}`, undefined, {
              shallow: false,
            })
          }
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchBar
