import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import theme from '../styles/theme'
import AppBar from '@/components/AppBar'
import SmallFooterWithSocial from '@/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DefaultSeo
        defaultTitle="DevDiary - Share your dev stories"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://dev-diary-nu.vercel.app',
          site_name: 'Dev Diary',
        }}
        twitter={{
          handle: '@quocnguyencoder',
          site: '@quocnguyencoder',
          cardType: 'summary_large_image',
        }}
      />
      <ChakraProvider theme={theme}>
        <AppBar />
        <Component {...pageProps} />
        <SmallFooterWithSocial />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
