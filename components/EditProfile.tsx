import {
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { editUserProfile, isSuccess } from '@/helpers/fetchData'
import { UserSource } from '@/interfaces/User'

interface Props {
  userInfo: UserSource
}

const EditProfile = ({ userInfo }: Props) => {
  const [profile, setProfile] = useState({
    displayName: userInfo.displayName,
    email: userInfo.email,
    bio: userInfo.bio,
    work: userInfo.work,
    education: userInfo.education,
  })

  const handleEdit = (property: string, value: string) =>
    setProfile({ ...profile, [property]: value })

  const handleSubmit = async () => {
    const response = await editUserProfile(profile)
    if (isSuccess(response, 200)) {
      alert('Update profile success')
    } else {
      alert('Something went wrong')
    }
  }

  return (
    <VStack flex={1}>
      <VStack
        w="100%"
        p="1% 5% 3% 5%"
        gap="1em"
        align="left"
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        borderRadius={'10'}
      >
        <Heading as="h2" size="xl">
          User
        </Heading>
        <Text>Display name</Text>
        <Input
          placeholder="Display name"
          size="md"
          defaultValue={`${userInfo.displayName}`}
          onChange={(e) => handleEdit('displayName', e.target.value)}
        />
        <Text>Email</Text>
        <Input
          placeholder="Email"
          size="md"
          defaultValue={`${userInfo.email}`}
          onChange={(e) => handleEdit('email', e.target.value)}
        />
        <Text>Biography</Text>
        <Textarea
          placeholder="Biography"
          size="md"
          variant="unstyled"
          resize="none"
          borderWidth={'thin'}
          paddingLeft="2%"
          _focus={{ borderColor: '#3182CE' }}
          defaultValue={`${userInfo.bio}`}
          onChange={(e) => handleEdit('bio', e.target.value)}
        />
      </VStack>
      <VStack
        w="100%"
        p="1% 5% 3% 5%"
        gap="1em"
        align="left"
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        borderRadius={'10'}
      >
        <Heading as="h2" size="xl">
          Work
        </Heading>
        <Text>Work</Text>
        <Input
          placeholder="Work"
          size="md"
          defaultValue={`${userInfo.work}`}
          onChange={(e) => handleEdit('work', e.target.value)}
        />
        <Text>Education</Text>
        <Input
          placeholder="Education"
          size="md"
          defaultValue={`${userInfo.education}`}
          onChange={(e) => handleEdit('education', e.target.value)}
        />
      </VStack>
      <VStack
        w="100%"
        p="3% 3% 3% 3%"
        gap="1em"
        align="left"
        bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
        borderRadius={'10'}
      >
        <Button colorScheme="blue" size="md" onClick={handleSubmit}>
          Save Profile Information
        </Button>
      </VStack>
    </VStack>
  )
}

export default EditProfile
