import { HStack } from '@chakra-ui/react'
import OptionButton from './OptionButton'
import { SearchSortBy, sortByOptions } from '@/types/search'

interface Props {
  sortBy: SearchSortBy
  setSortBy: (value: SearchSortBy) => void
}

const SortOptions = ({ sortBy, setSortBy }: Props) => {
  const handleClick = (option: SearchSortBy) => {
    setSortBy(option)
  }
  return (
    <HStack spacing={4}>
      {sortByOptions.map((option) => (
        <OptionButton
          key={option}
          option={option}
          isSelected={sortBy === option}
          action={handleClick}
        />
      ))}
    </HStack>
  )
}

export default SortOptions
