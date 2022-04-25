import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import generateAvatar from '@/helpers/generateAvatar'

const Links = ['Blog', 'Tags', 'About']

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export default function AppBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={20}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box
              bgColor={useColorModeValue('teal.500', 'teal.300')}
              color={useColorModeValue('white', 'black')}
              p={2}
              borderRadius={14}
              fontWeight={'bold'}
              cursor={'pointer'}
              onClick={() => router.push('/')}
            >
              DevDiary
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button onClick={toggleColorMode} mr={4}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {session ? (
              <>
                <Button
                  variant={'solid'}
                  colorScheme={'teal'}
                  size={'sm'}
                  mr={4}
                  leftIcon={<AddIcon />}
                  onClick={() => router.push('/create-post')}
                >
                  Create Post
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar size={'sm'} src={generateAvatar(`${session.id}`)} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <NextLink href="/" passHref>
                        <Link>
                          <Text>{`${session.displayName}`}</Text>
                          <Text>{`@${session.username}`}</Text>
                        </Link>
                      </NextLink>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => signOut()}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <HStack spacing={5}>
                <Button variant="link">
                  <NextLink href="/login" passHref>
                    <Link>Log in</Link>
                  </NextLink>
                </Button>
                <Button colorScheme="teal" variant="outline">
                  <NextLink href="/signup" passHref>
                    <Link>Create account</Link>
                  </NextLink>
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
