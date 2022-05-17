import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { validatedLogin } from '@/helpers/validated'
import { UserSource } from '@/interfaces/User'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validate, setValidate] = useState<boolean>(false)
  const router = useRouter()

  const handleSignUp = async () => {
    // TODO: make data validate function
    if (validatedLogin(username, password)) {
      const userData: UserSource = {
        username: username,
        password: password,
        email: '',
        avatar: '',
        displayName: `${firstName} ${lastName}`,
        posts: [],
        followings: [],
        followers: [],
        bio: '',
        work: '',
        education: '',
        joinedDate: moment().toISOString(),
        savedPosts: [],
        comments: [],
        tags: [],
      }
      const sendData = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ data: userData }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await sendData
      if (response.status === 201) {
        //alert(response.body)
        router.push('/login')
      } else {
        //console.log(response.status)
        alert('Sign up failed, please try again')
      }
    } else {
      setValidate(true)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                isInvalid={validate}
                errorBorderColor="red.300"
                onChange={(e) => setUsername(e.target.value)}
              />
              {validate && (
                <p style={{ color: 'red' }}>
                  Must be 8-15 characters and must start with a letter, only
                  letters and numbers.
                </p>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  isInvalid={validate}
                  errorBorderColor="red.300"
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {validate && (
                <p style={{ color: 'red' }}>
                  Must be 8-20 characters long (contain at least one lower-case
                  letter, number. Not contain a colon (:), an ampersand (&), a
                  period (.), a tilde (~), or a space).
                </p>
              )}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => handleSignUp()}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} href="/">
                  Log in
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignUp
