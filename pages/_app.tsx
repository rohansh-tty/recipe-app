import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <title>Receipe App</title>
  </Head>
  return <Component {...pageProps} />
}

export default MyApp
