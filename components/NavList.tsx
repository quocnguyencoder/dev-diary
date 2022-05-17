import { List, ListIcon, ListItem, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaHashtag } from 'react-icons/fa'
import {
  FcBookmark,
  FcCollaboration,
  FcHome,
  FcLike,
  FcRating,
} from 'react-icons/fc'

const NavList = () => {
  const hoverColor = useColorModeValue('teal.300', 'teal.600')
  const navItems = [
    {
      name: 'Home',
      icon: FcHome,
      href: '/',
    },
    {
      name: 'Reading List',
      icon: FcBookmark,
      href: '/',
    },
    {
      name: 'Tags',
      icon: FaHashtag,
      href: '/',
    },
    {
      name: 'Sponsor',
      icon: FcLike,
      href: '/',
    },
    {
      name: 'About',
      icon: FcRating,
      href: '/',
    },
    {
      name: 'Contact',
      icon: FcCollaboration,
      href: '/',
    },
  ]
  return (
    <List>
      {navItems.map((item) => (
        <ListItem
          as={'button'}
          key={`${item.name}`}
          w={'100%'}
          p={2}
          borderRadius={'5px'}
          textAlign="left"
          _hover={{ backgroundColor: hoverColor }}
        >
          <ListIcon as={item.icon} fontSize="xl" />
          {item.name}
        </ListItem>
      ))}
    </List>
  )
}

export default NavList
