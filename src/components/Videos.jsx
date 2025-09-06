import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import Loader from "./Loader";

export default function Videos({ sideNavOpen, videos, loading}) {

  if(loading) return <Loader/>
  
  return (
    <div className="relative mt-20">
      <div
      />
      <div
        className={`transition-all duration-300 pt-6 min-h-screen
          ${sideNavOpen ? "md:ml-[250px] md:w-[calc(100%-250px)]" : "w-full ml-0"}
        `}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2 md:px-6 gap-5">
          {videos?.map(video => (
            <Link to={`/watch/${video._id}`} key={video._id}>
              <VideoCard videoDetail={video} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}