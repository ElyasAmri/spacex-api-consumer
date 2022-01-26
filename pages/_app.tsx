import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Head from 'next/head'

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <ApolloProvider client={client}>
          <div className="flex flex-col w-screen min-h-screen">

            <nav className="py-4 w-full bg-red-600">
              <p className="text-center text-4xl font-bold">SpaceX API Displayer</p>
            </nav>

            <hr className="mx-2 my-1"/>

            <main className="w-100 flex-1 px-2">
              <Component {...pageProps}/>
            </main>

            <hr className="mx-2 my-1"/>

            <footer className="w-full py-2">
              <p className="text-center">Made by Elyas A. Al-Amri</p>
            </footer>
          </div>
        </ApolloProvider>
      </>
  )
}

export default MyApp
