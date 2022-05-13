import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextChakraLink from './NextChakraLink'
import SearchBar from './SearchBar'
import generateAvatar from '@/helpers/generateAvatar'

export default function AppBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const { data: session } = useSession()
  const linkColor = useColorModeValue('gray.700', 'whiteAlpha.900')

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        px={{ base: 4, md: 15, lg: 20 }}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
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
            <SearchBar />
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
                      <NextChakraLink
                        href={`/u/${session.username}`}
                        text={
                          <>
                            <Text>{`${session.displayName}`}</Text>
                            <Text>{`@${session.username}`}</Text>
                          </>
                        }
                        color={linkColor}
                      />
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() =>
                        router.push(`/u/${session.username}/settings`)
                      }
                    >
                      Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => signOut()}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <HStack spacing={5} display={{ base: 'none', md: 'block' }}>
                <Button variant="link">
                  <NextChakraLink
                    href="/login"
                    text="Login"
                    color={linkColor}
                  />
                </Button>
                <Button colorScheme="teal" variant="outline">
                  <NextChakraLink
                    href="/signup"
                    text="Create account"
                    color={linkColor}
                  />
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
