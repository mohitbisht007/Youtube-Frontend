import React from "react";
import { Link } from "react-router-dom";

export default function RecommendedVideo({ video }) {

const handleClick = () => {
    window.location.href = `/watch/${video._id}`;
  };
  
  return (
    <Link
      onClick={handleClick}
      className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-[120px] h-[70px] object-cover rounded-md flex-shrink-0"
      />
      <div className="flex flex-col justify-between flex-1">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-gray-600 mb-1">
          {video.channel?.channelName}
        </p>
        <div className="flex gap-2 text-xs text-gray-500">
          <span>{video.views} views</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}