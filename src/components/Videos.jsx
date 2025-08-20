import axios from 'axios'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Videos() {

  const [allVideos, setAllVideos] = useState([])

  useEffect(() => {
    const getVideos = async() => {
      const res = await axios.get("http://localhost:5050/api/allVideos")
      setAllVideos(res.data.allVideos)
    }

    getVideos()
  }, [])


  return (
    <div className='ml-[250px] mt-[150px] grid grid-cols-3 px-3 gap-5'>
        {allVideos.map(video => {
          return <Link to = {`/watch/${video._id}`} key={video._id}><VideoCard videoDetail = {video}/></Link>
        })}
    </div>
  )
}
