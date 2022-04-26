import { SearchIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'

const SearchBar = () => {
  return (
    <InputGroup w="30vw" display={{ base: 'none', md: 'block', lg: 'block' }}>
      <Input
        type="search"
        placeholder="Search..."
        focusBorderColor={useColorModeValue('teal.500', 'teal.300')}
      />
      <InputRightElement>
        <IconButton
          variant="unstyled"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchBar
