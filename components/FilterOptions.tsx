import { VStack } from '@chakra-ui/react'
import OptionButton from './OptionButton'
import { filterByOptions, SearchFilterBy } from '@/types/search'

interface Props {
  filterBy: SearchFilterBy
  setFilterBy: (value: SearchFilterBy) => void
}

const FilterOptions = ({ filterBy, setFilterBy }: Props) => {
  const handleClick = (option: SearchFilterBy) => {
    setFilterBy(option)
  }
  return (
    <VStack alignItems={'flex-start'} w={'25%'}>
      {filterByOptions.map((option) => (
        <OptionButton
          key={option}
          option={option}
          isSelected={filterBy === option}
          action={handleClick}
        />
      ))}
    </VStack>
  )
}

export default FilterOptions
