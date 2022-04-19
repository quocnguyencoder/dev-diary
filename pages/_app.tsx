import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../styles/theme'
import AppBar from '@/components/AppBar'
import SmallFooterWithSocial from '@/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <Component {...pageProps} />
      <SmallFooterWithSocial />
    </ChakraProvider>
  )
}

export default MyApp
