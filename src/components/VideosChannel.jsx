import React from 'react'
import VideoCard from './VideoCard'

export default function VideosChannel() {
  return (
    <div>
      <div>
        <button>Latest</button>
        <button>Popular</button>
        <button>Oldest</button>
      </div>

      <div className='flex'>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
      </div>
    </div>
  )
}
