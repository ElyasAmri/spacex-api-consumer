import {useRouter} from 'next/router';
import {useLaunchDetailsQuery} from '../../spacex-graphql.service'
import Head from 'next/head';

function LaunchDetail({id}: {id: string}) {
  const {data, loading, error} = useLaunchDetailsQuery({variables: {id}})

  return (
      <>
        <Head>
          <title>{id} Details - SpaceX API Displayer by Elyas Al-Amri</title>
        </Head>
        <p className="text-center text-4xl py-2 underline">
          {loading ? "..." : data?.launch?.mission_name}
        </p>
        <hr className="my-1"/>
        <div className="">
          {loading && <p className="text-center text-4xl text-gray-600 pb-10">loading...</p>}
          {error && <p className="text-center text-4xl text-gray-600 pb-10">An error occurred :(</p>}
          {!loading &&
            <>
              <p className="mb-5 text-justify">{data?.launch?.details ?? "No description" }</p>
              <div className="space-y-2">
                {!data?.launch?.links?.flickr_images?.length ? <p className="text-center py-40 border">No Images</p> :
                    data.launch.links.flickr_images.map(img => (
                    <img className="rounded" key={img} src={img ?? ""} alt="Mission Image"/>
                ))}
              </div>
            </>
          }
        </div>
      </>
  )
}

function Page() {
  const router = useRouter()
  const id = router.query._id as string

  if (id) {
    return <LaunchDetail id={id}/>
  }

  return <p>Loading</p>
}

export default Page
