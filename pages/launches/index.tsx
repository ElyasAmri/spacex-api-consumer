import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {usePastLaunchesListQuery} from '../../spacex-graphql.service'
import {useRouter} from 'next/router'

const perPage = 16
const maxPage = 6

const dateFormat: Intl.DateTimeFormatOptions = {
  minute: 'numeric',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  weekday: 'short',
  hour: 'numeric',
}

const LaunchesList = (props: {page?: string}) => {
  const page = (props.page ? Number.parseInt(props.page) : 1)

  const options = {
    variables: {
      limit: perPage,
      offset: (page - 1) * perPage,
    },
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
            <a key={launch.id} href={'/launches/' + launch.id}
               className="flex flex-col w-full p-2 rounded shadow-md bg-white">
              <img src={launch.links?.mission_patch_small ?? ''} alt="Mission Logo"
                   className="mt-4 mb-2 mx-auto"/>
              {/*<p>ID: {launch.id}</p>*/}
              <p className="mt-auto">Mission Name: {launch.mission_name}</p>
              <p>Rocket Name: {launch.rocket?.rocket_name}</p>
              <p>Launch Date: {new Date(launch.launch_date_utc)
                  .toLocaleDateString('en-US', dateFormat)}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-col mx-auto mt-4 mb-2">
          <div className="flex space-x-4">
            {page != 0 &&
              <Link href={{href: '/launches', query: {page: page - 1}}}>
                <a className="block min-w-max bg-blue-600 text-white text-center px-2
                 rounded-md ring ring-gray-400 shadow-lg">
                  {'<<'} Previous
                </a>
              </Link>
            }
            {Array(7).fill(0).map((_, i) => (
                <Link key={i} href={{href: '/launches', query: {page: i + 1}}}>
                  <a className={`block bg-blue-600 text-white text-center max-w-max rounded-md
                   ring ring-gray-400 shadow-lg px-2 ${(i + 1) == page && 'font-bold'}`}>
                    {i + 1}
                  </a>
                </Link>
            ))}
            {page < maxPage &&
              <Link href={{href: '/launches', query: {page: page + 1}}}>
                <a className="block min-w-max bg-blue-600 text-white text-center px-2
             rounded-md ring ring-gray-400 shadow-lg">
                  Next {'>>'}
                </a>
              </Link>
            }
          </div>
          <Link href="/">
            <a className="block bg-black text-white text-center w-full py-1 mt-2
            rounded-md ring ring-yellow-600 shadow-lg">
              Back
            </a>
          </Link>
        </div>
      </>
  )
}

const Page: NextPage = () => {
  const {query} = useRouter()
  return <LaunchesList page={query.page as string | undefined}/>
}

export default Page
