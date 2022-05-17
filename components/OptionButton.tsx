import { Button } from '@chakra-ui/react'

interface Props {
  option: string
  isSelected: boolean
  action: (option: string) => void
}

const OptionButton = ({ option, isSelected, action }: Props) => {
  return (
    <Button
      variant={'unstyled'}
      fontWeight={isSelected ? 'bold' : 'default'}
      onClick={() => action(option)}
      _hover={{
        color: 'teal.500',
      }}
      _focus={{ outline: 0 }}
    >
      {option}
    </Button>
  )
}

export default OptionButton
