import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'

const theme = extendTheme({
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.200', 'gray.800')(props),
        lineHeight: 'base',
      },
    }),
  },
})

export default theme
