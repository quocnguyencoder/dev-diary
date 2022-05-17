import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

interface Props {
  href: string
  text: string | React.ReactNode
  color: string
}

const NextChakraLink = ({ href, text, color }: Props) => {
  return (
    <NextLink href={href} passHref>
      <Link
        textDecoration="none"
        color={color}
        _hover={{ textDecoration: 'none', color: 'teal.400' }}
        _focus={{ outline: 0 }}
      >
        {text}
      </Link>
    </NextLink>
  )
}

export default NextChakraLink
