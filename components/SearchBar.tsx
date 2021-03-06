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

  const gotoSearch = () =>
    router.push(`/search?q=${searchTerm}`, undefined, {
      shallow: false,
    })

  const handleKeyboardSearch = (key: string) => {
    key === 'Enter' && gotoSearch()
  }

  return (
    <InputGroup w="30vw" display={{ base: 'none', md: 'block', lg: 'block' }}>
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={(e) => handleKeyboardSearch(e.key)}
        focusBorderColor={useColorModeValue('teal.500', 'teal.300')}
      />
      <InputRightElement>
        <IconButton
          variant="ghost"
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={() => gotoSearch()}
          _focus={{ outline: 0 }}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchBar
