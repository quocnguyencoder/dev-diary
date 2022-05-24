import { Button, HStack, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { isSuccess, updatedPostContent } from '@/helpers/fetchData'
import { Post } from '@/interfaces/Post'

interface EditPostProps {
  postContent: Post
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditPost: React.FC<EditPostProps> = ({
  postContent,
  setEdit,
}: EditPostProps) => {
  const [content, setContent] = useState<string>(postContent._source.content)

  const handleUpdatePost = async () => {
    const result = await updatedPostContent(
      postContent._id,
      postContent._source.authorID,
      content,
      'Update',
    )
    if (isSuccess(result, 200)) {
      alert('Updated successfully')
      postContent._source.content = content
      setEdit(false)
    } else {
      alert('Something went wrong')
    }
  }
  return (
    <>
      <Textarea
        size="lg"
        resize="none"
        borderRadius={10}
        borderWidth={'thin'}
        borderColor="lightGray"
        height={'20vh'}
        defaultValue={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <HStack>
        <Button
          flex={1}
          colorScheme="green"
          size="md"
          onClick={handleUpdatePost}
        >
          Save update
        </Button>
        <Button
          flex={1}
          colorScheme="red"
          size="md"
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      </HStack>
    </>
  )
}

export default EditPost
