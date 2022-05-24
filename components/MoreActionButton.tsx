import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiTwotoneEdit } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { isSuccess } from '@/helpers/fetchData'

interface ActionProps {
  postID: string
  authorID: string
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const MoreActionButton: React.FC<ActionProps> = ({
  postID,
  authorID,
  setEdit,
}: ActionProps) => {
  const router = useRouter()
  const deletePost = async () => {
    const result = await fetch(`/api/posts`, {
      method: 'DELETE',
      body: JSON.stringify({
        postID: postID,
        authorID: authorID,
        action: 'Delete',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    isSuccess(result, 200) ? router.push('/') : alert('Something went wrong')
  }
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
        <MenuItem color="red" icon={<MdDelete />} onClick={deletePost}>
          Delete post
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MoreActionButton
