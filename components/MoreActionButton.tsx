import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

interface ActionProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const MoreActionButton: React.FC<ActionProps> = ({ setEdit }: ActionProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreHorizontal />}
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      />
      <MenuList>
        <MenuItem onClick={() => setEdit(true)} icon={<AiTwotoneEdit />}>
          Edit post
        </MenuItem>
        <MenuItem color="red" icon={<MdDelete />}>
          Delete post
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MoreActionButton
