import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { usePastLaunchesListQuery } from '../../spacex-graphql.service';

const dateFormat : Intl.DateTimeFormatOptions = {
  minute: 'numeric',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  weekday: 'short',
  hour: 'numeric',
}

const Home: NextPage = () => {
  const {data, loading, error} = usePastLaunchesListQuery({variables: {limit: 10}})

  return (
      <>
        <Head>
          <title>Launches List - SpaceX API Displayer by Elyas Al-Amri</title>
        </Head>
        <p className="text-center text-4xl underline py-2">Launches</p>
        <hr className="my-1"/>
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          {loading && <p className="text-center text-4xl text-gray-600 pb-10">loading...</p>}
          {error && <p className="text-center text-4xl pb-10">An error occurred :(</p>}
          {!loading && data?.launchesPast?.map(launch => (launch &&
              <a key={launch.id} href={"/launches/" + launch.id} className="block w-full p-2 rounded shadow-md bg-white">
                <p>ID: {launch.id}</p>
                <p>Mission Name: {launch.mission_name}</p>
                <p>Rocket Name: {launch.rocket?.rocket_name}</p>
                <p>Launch Date: {new Date(launch.launch_date_utc)
                    .toLocaleDateString("en-US", dateFormat)}</p>
                <img src={launch.links?.mission_patch_small ?? ""} alt="Mission Logo"
                     className="mt-4 mb-2 mx-auto"/>
              </a>
            ))}
        </div>

        <Link href="/">
          <a className="block bg-black text-white text-center max-w-max px-8 py-1 mx-auto mt-4 mb-2
           rounded-md ring ring-yellow-600 shadow-lg ">Back</a>
        </Link>

      </>
  )
}

export default Home
