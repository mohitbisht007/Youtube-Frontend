import { useEffect, useState } from "react";
import thumbnail from "../assets/thumbnail.jpg";
import FilterButtons from "../components/FilterButtons";
import RecommendedVideo from "../components/RecommendedVideo";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/Slices/videoSlices";
import { Link } from "react-router-dom";
import api from "../helpers/axiosInterceptor";
import { likeVideo, dislikeVideo } from "../redux/Slices/userSlice";
const token = localStorage.getItem('token')

import {
  subscribeChannel,
  unSubscribeChannel,
} from "../redux/Slices/userSlice";

export default function VideoPage() {
  const [video, setVideo] = useState({});
  const [showMore, setShowMore] = useState(false);
  const { videos, loading, error } = useSelector((state) => state.videos);
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("")
  
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (videos.length > 0) {
      // when videos already in store
      const selectedVideo = videos.find((v) => v._id === id);
      setVideo(selectedVideo || {});
    } else {
      dispatch(fetchVideos());
    }
  }, [id, videos, dispatch]);

  const videoLiked = user?.likedVideos?.includes(id);

  const handleSubscribe = async () => {
    if (user.subscriptions.includes(video.channel._id)) {
      dispatch(unSubscribeChannel(video.channel._id));
      setVideo((prev) => ({
        ...prev,
        channel: {
          ...prev.channel,
          subscribers: prev.channel.subscribers - 1,
        },
      }));
    } else {
      dispatch(subscribeChannel(video.channel._id));
      setVideo((prev) => ({
        ...prev,
        channel: {
          ...prev.channel,
          subscribers: prev.channel.subscribers + 1,
        },
      }));
    }
  };

  const handleLike = () => {
    if (videoLiked) {
      // dislike
      dispatch(dislikeVideo(id));
      setVideo((prev) => ({ ...prev, likes: prev.likes - 1 }));
    } else {
      // like
      dispatch(likeVideo(id));
      setVideo((prev) => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleComment = async(e) => {
    e.preventDefault()
    const res = await api.put(`http://localhost:5050/api/comment/${video._id}`,
      {comment: comment},
      {headers: {Authorization: `JWY ${token}`, "Content-Type": "application/json"}, },
    )

    const newComment = await res.data.comment
    setVideo((prev) => ({
      ...prev,
      comments: [...prev.comments, {text: newComment}]
    }))

    setComment("")
  }

  console.log(user)

  if (!video || !video._id) {
    return <h2 className="pt-[90px] text-center">Loading video...</h2>;
  }

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
        <h1 className="font-bold text-xl md:text-2xl mb-2 px-2">
          {video?.title}
        </h1>
        {/* Channel & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 mb-4 gap-4">
          <div className="flex items-center gap-3">
            <Link to={`/channel/${video.channel.channelHandle}`}>
              <img
                className="rounded-full border h-12 w-12 object-cover bg-gray-200"
                src={video?.channel?.channelAvatar}
                alt={video?.channel?.channelName}
              />
            </Link>
            <div>
              <Link to={`/channel/${video.channel.channelHandle}`}>
                <p className="font-semibold text-gray-900">
                  {video?.channel?.channelName}
                </p>
              </Link>
              <p className="text-xs text-gray-500">
                {video?.channel?.subscribers} subscribers
              </p>
            </div>
            <button
              onClick={handleSubscribe}
              className="ml-2 cursor-pointer bg-black text-white px-4 py-1 rounded-md font-semibold shadow hover:bg-gray-800 transition"
            >
              {user?.subscriptions?.includes(video.channel._id)
                ? "Unsubscribe"
                : "Subscribe"}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 cursor-pointer bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
            >
              {videoLiked ? (
                <i className="fa-solid fa-thumbs-up"></i>
              ) : (
                <i className="fa-regular fa-thumbs-up"></i>
              )}{" "}
              {video?.likes}
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
              Share
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
              Download
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
              Thanks
            </button>
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
            <p
              className={`${
                showMore ? "" : "line-clamp-3"
              } text-gray-700 transition-all duration-200`}
            >
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
          {/* Comment Input */}
          <form className="flex items-start gap-3 mb-6" onSubmit={handleComment}>
            <img
              className="w-10 h-10 rounded-full object-cover border"
              src={user?.avatar || "/default-avatar.png"}
              alt="User Avatar"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border-b border-gray-300 focus:border-gray-500 focus:outline-none pb-2 text-sm"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="submit"
                  className="px-4 py-1 text-sm font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Comment
                </button>
              </div>
            </div>
          </form>

          {/* Comments Count */}
          <h2 className="font-bold text-lg mb-4">
            {video?.comments?.length || 0} Comments
          </h2>

          {/* Comment List */}
          {video?.comments?.map((comment) => <Comments key={comment._id} comment={comment?.text}/>)}
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
