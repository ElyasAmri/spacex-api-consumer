import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import Head from 'next/head'

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
})

const MyApp = ({Component, pageProps}: AppProps) => (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <ApolloProvider client={client}>
        <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-[#181818] dark:text-white">

          <nav className="py-4 w-full bg-white dark:bg-black shadow-md dark:border-b-2">
            <p className="text-center text-4xl font-bold">
              SpaceX API Displayer
            </p>
          </nav>

          <main className="w-full flex-1 p-2 flex flex-col">
            <Component {...pageProps}/>
          </main>

          <hr className="mx-2 my-1"/>

          <footer className="w-full py-2 bg-white dark:bg-black">
            <p className="text-center font-bold">Made by Elyas A. Al-Amri</p>
          </footer>
        </div>
      </ApolloProvider>
    </>
)

export default MyApp
