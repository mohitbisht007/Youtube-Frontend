import React from 'react'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'

export default function Videos() {
  return (
    <div className='ml-[250px] mt-[150px] grid grid-cols-3 px-3 gap-2'>
        <Link to="/watch"><VideoCard/></Link>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
    </div>
  )
}
