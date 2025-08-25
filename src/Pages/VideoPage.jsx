import React, { useEffect, useState } from "react";
import thumbnail from "../assets/thumbnail.jpg";
import FilterButtons from "../components/FilterButtons";
import RecommendedVideo from "../components/RecommendedVideo";
import api from "../helpers/axiosInterceptor";
import { useParams } from "react-router-dom";

export default function VideoPage() {
  const [video, setVideo] = useState({});
  const [showMore, setShowMore] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      const res = await api.get("http://localhost:5050/api/allVideos");
      const data = res.data.allVideos.find((v) => v._id === id);
      setVideo(data);
    };
    getVideo();
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-[90px] px-0 md:px-6 flex flex-col md:flex-row gap-8">
      {/* Main Video Section */}
      <div className="w-full md:w-[70%] p-2 mx-auto">
        {/* Video Player */}
        <div className="relative pb-[56.25%] h-0 mb-4 md:rounded-xl overflow-hidden shadow">
          <iframe
            className="absolute top-0 left-0 w-full h-full md:rounded-xl"
            src={video?.videoURL}
            title={video?.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        {/* Video Title */}
        <h1 className="font-bold text-xl md:text-2xl mb-2 px-2">{video?.title}</h1>
        {/* Channel & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 mb-4 gap-4">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full border h-12 w-12 object-cover bg-gray-200"
              src={video?.channel?.avatar}
              alt={video?.channel?.channelName}
            />
            <div>
              <p className="font-semibold text-gray-900">{video?.channel?.channelName}</p>
              <p className="text-xs text-gray-500">{video?.channel?.subscribers} subscribers</p>
            </div>
            <button className="ml-2 bg-black text-white px-4 py-1 rounded-md font-semibold shadow hover:bg-gray-800 transition">
              Join
            </button>
            <FilterButtons text="Subscribe" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
              {video?.like} <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">Share</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">Download</button>
            <button className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">Thanks</button>
          </div>
        </div>
        {/* Video Description */}
        <div className="w-full bg-white rounded-md p-4 shadow mb-6">
          <div className="flex gap-6 text-sm text-gray-600 mb-2">
            <span>{video?.views} views</span>
            <span>{video?.uploadDate || "Upload Date"}</span>
            <span>#Hashtags</span>
          </div>
          <div>
            <p className={`${showMore ? "" : "line-clamp-3"} text-gray-700 transition-all duration-200`}>
              {video?.description}
            </p>
            {video?.description && video?.description.length > 0 && (
              <button
                className="text-blue-600 mt-2 text-sm font-semibold focus:outline-none"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
        {/* Comments */}
        <div className="w-full bg-white rounded-md p-4 shadow">
          <h2 className="font-bold text-lg mb-4">175 Comments</h2>
          {/* Example comment */}
          <div className="flex gap-3 mb-4">
            <img
              className="rounded-full border h-10 w-10 object-cover bg-gray-200"
              src="/default-avatar.png"
              alt="User"
            />
            <div>
              <p className="font-semibold">@username</p>
              <p className="text-gray-700">Comment</p>
              <div className="flex gap-2 mt-1">
                <button className="text-gray-500 hover:text-blue-500">Like</button>
                <button className="text-gray-500 hover:text-red-500">Dislike</button>
              </div>
            </div>
          </div>
          {/* Add more comments here */}
        </div>
      </div>
      {/* Recommended Videos Sidebar */}
      <aside className="w-full md:w-[30%] md:sticky md:top-[90px] h-fit px-2">
        <div className="flex gap-2 mb-4 flex-wrap">
          <FilterButtons text="All" />
          <FilterButtons text="Gaming" />
          <FilterButtons text="Music" />
          <FilterButtons text="Live" />
        </div>
        <div className="flex flex-col gap-4">
          {[...Array(8)].map((_, i) => (
            <RecommendedVideo thumbnail={thumbnail} key={i} />
          ))}
        </div>
      </aside>
    </div>
  );
}