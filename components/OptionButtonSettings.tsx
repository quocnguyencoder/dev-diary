import { Button } from '@chakra-ui/react'
import { ActionBy } from '@/types/settings'

interface Props {
  option: ActionBy
  isSelected: boolean
  action: (option: ActionBy) => void
}

const OptionButtonSettings = ({ option, isSelected, action }: Props) => {
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

export default OptionButtonSettings
