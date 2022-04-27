import { Button } from '@chakra-ui/react'
import React from 'react'
import { SearchFilterBy, SearchSortBy } from '@/types/search'

interface Props {
  option: SearchSortBy | SearchFilterBy
  isSelected: boolean
  action: (option: SearchSortBy | SearchFilterBy) => void
}

const OptionButton = ({ option, isSelected, action }: Props) => {
  return (
    <Button
      variant={'ghost'}
      fontWeight={isSelected ? 'bold' : 'default'}
      onClick={() => action(option)}
      _hover={{
        color: 'teal.500',
      }}
    >
      {option}
    </Button>
  )
}

export default OptionButton
