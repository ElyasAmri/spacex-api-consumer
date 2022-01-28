import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { usePastLaunchesListQuery } from '../../spacex-graphql.service'
import { useRouter } from 'next/router'

const perPage = 15
const maxPage = 7

const dateFormat : Intl.DateTimeFormatOptions = {
  minute: 'numeric',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  weekday: 'short',
  hour: 'numeric',
}

const LaunchesList = (props : { page? : string }) => {

  const page = (props.page ? Number.parseInt(props.page) - 1 : 0)

  const options = {
    variables: {
      limit: perPage,
      offset: page * perPage,
    }
  }

  const {data, loading, error} = usePastLaunchesListQuery(options)

  return (
      <>
        <Head>
          <title>Launches List - SpaceX API Displayer by Elyas Al-Amri</title>
        </Head>
        <p className="text-center text-4xl underline py-2">Launches</p>
        <hr className="my-1"/>
        {error && <p className="text-center text-4xl pb-10">An error occurred :(</p>}
        {loading && <p className="text-center text-4xl text-gray-600 pb-10">loading...</p>}
        <div className="flex-1 grid grid-cols-1 gap-2 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading && data?.launchesPast?.map(launch => (launch &&
              <a key={launch.id} href={"/launches/" + launch.id} className="block w-full p-2 rounded shadow-md bg-white">
                <img src={launch.links?.mission_patch_small ?? ""} alt="Mission Logo"
                     className="mt-4 mb-2 mx-auto"/>
                {/*<p>ID: {launch.id}</p>*/}
                <p>Mission Name: {launch.mission_name}</p>
                <p>Rocket Name: {launch.rocket?.rocket_name}</p>
                <p>Launch Date: {new Date(launch.launch_date_utc)
                    .toLocaleDateString("en-US", dateFormat)}</p>
              </a>
            ))}
        </div>

        <div className="flex mx-auto space-x-4 mt-4 mb-2">
          {page != 0 &&
            <Link href={{href: '/launches', query: {page: page-1}}}>
              <a className="block bg-blue-600 text-white text-center max-w-max px-8 py-1
           rounded-md ring ring-gray-400 shadow-lg">
                {'<<'} Previous
              </a>
            </Link>
          }
          {page != maxPage &&
            <Link href={{href: '/launches', query: {page: page + 1}}}>
              <a className="block bg-blue-600 text-white text-center max-w-max px-8 py-1
             rounded-md ring ring-gray-400 shadow-lg">
              Next {'>>'}
              </a>
            </Link>
          }
        </div>
        <div className="flex mx-auto mb-2 space-x-4">
          {Array(7).fill(0).map((_,i) => (
              <Link key={i} href={{href: '/launches', query: {page: i+1}}}>
                <a className="block bg-blue-600 text-white text-center max-w-max
                 rounded-md ring ring-gray-400 shadow-lg px-2">
                  {i+1}
                </a>
              </Link>
          ))}
        </div>
        <Link href="/">
          <a className="block bg-black text-white text-center max-w-max mx-auto px-32 py-1
           rounded-md ring ring-yellow-600 shadow-lg">Back</a>
        </Link>
      </>
  )
}

const Page : NextPage = () => {
  const {query} = useRouter()
  return <LaunchesList page={query.page as string | undefined}/>
}

export default Page
