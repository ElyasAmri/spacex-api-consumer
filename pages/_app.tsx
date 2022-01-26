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
          <div className="flex flex-col w-full min-h-screen bg-gray-100">

            <nav className="py-4 w-full bg-white shadow-md">
              <p className="text-center text-4xl font-bold">SpaceX API Displayer</p>
            </nav>

            <main className="w-full flex-1 px-2 flex flex-col py-2">
              <Component {...pageProps}/>
            </main>

            <hr className="mx-2 my-1"/>

            <footer className="w-full py-2 bg-white">
              <p className="text-center">Made by Elyas A. Al-Amri</p>
            </footer>
          </div>
        </ApolloProvider>
      </>
  )
}

export default MyApp
