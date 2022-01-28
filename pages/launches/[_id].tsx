import {useRouter} from 'next/router'
import {useLaunchDetailsQuery} from '../../spacex-graphql.service'
import Head from 'next/head'

function LaunchDetail({id}: {id: string}) {
  const options = {variables: {id}}

  const {data, loading, error} = useLaunchDetailsQuery(options)

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
              <p className="mb-5 mt-2 text-justify">{data?.launch?.details ?? "No description" }</p>
              <div className="space-y-2">
                {!data?.launch?.links?.flickr_images?.length
                    ? <p className="text-center py-40 border rounded bg-gray-200">No Images</p>
                    : data.launch.links.flickr_images.map(img => (
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

  return (
      <>
        {id ? <LaunchDetail id={id}/> : <p>Loading...</p>}
        <button onClick={router.back} className="block bg-black text-white text-center max-w-max
         px-8 py-1 mx-auto mt-4 mb-2 rounded-md ring ring-yellow-600 shadow-lg">
          Back
        </button>
      </>
  )
}

export default Page
