import type { NextPage } from 'next'
import Head from 'next/head'
import { usePastLaunchesListQuery } from '../../spacex-graphql.service';

const Home: NextPage = () => {
  const {data, loading, error} = usePastLaunchesListQuery({variables: {limit: 10}})
  return (
      <>
        <Head>
          <title>Launches List - SpaceX API Displayer by Elyas Al-Amri</title>
        </Head>
        <p className="text-center text-4xl underline py-2">Launches</p>
        <hr className="my-1"/>
        {error && <p>An error occurred :(</p>}
        {loading && <p>loading...</p>}
        <div>
          {!loading && data?.launchesPast?.map(launch => ( launch &&
              <div key={launch.id}>
                <p>P</p>
                <p>{launch.id}</p>
                <p>{launch.mission_name}</p>
                <p>{launch.rocket?.rocket_name}</p>
                <p>{launch.launch_date_utc}</p>
                <img src={launch.links?.mission_patch_small ?? ""} alt="Flickr Image"/>
                <div>
                  {launch.links?.flickr_images?.map(img => (
                      <img key={img} src={img ?? ""} alt="Flickr Image"/>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </>
  )
}

export default Home
