import { useState } from "react";
import api from "../helpers/axiosInterceptor";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
import Popup from "../components/Popup";

export default function UploadVideoPage() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null)

  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    videoURL: "",
    category: "",
  });

  const handleChange = (e) => {
    setVideoDetails({ ...videoDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
      "http://localhost:5050/api/uploads",
      {
        title: videoDetails.title,
        description: videoDetails.description,
        videoURL: videoDetails.videoURL,
        category: videoDetails.category,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = "Video Succesfully Uploaded"
    setPopup({type: "success", message})
    setTimeout(() => {
      navigate("/")
    }, 3000)
    } catch (error) {
      const message = error?.response?.data?.message
      setPopup({type: "error", message})
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-[#FF0033] py-10">
      {popup && (
                <Popup
                  type={popup.type}
                  message={popup.message}
                  onClose={() => setPopup(null)}
                />
              )}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <i className="fa-brands fa-youtube text-5xl text-[#FF0033] mb-2"></i>
          <h1 className="font-bold text-2xl text-gray-900 mb-1">
            Upload Video
          </h1>
          <p className="text-gray-500 text-sm">
            Share your content with the world!
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={videoDetails.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition"
              placeholder="Enter video title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={videoDetails.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition"
              placeholder="Describe your video"
              rows={4}
              required
            />
          </div>
          <div>
            <label
              htmlFor="videoURL"
              className="block text-gray-700 font-semibold mb-1"
            >
              Video URL
            </label>
            <input
              type="url"
              id="videoURL"
              name="videoURL"
              value={videoDetails.videoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition"
              placeholder="Paste your video URL"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold mb-1"
            >
              Video Category
            </label>
            <select
              id="category"
              name="category"
              value={videoDetails.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition bg-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Gaming">Gaming</option>
              <option value="Music">Music</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Sports">Sports</option>
              <option value="Podcast">Podcast</option>
               <option value="News">News</option>
              <option value="Movies">Movies</option>
              <option value="Technology">Technology</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-2 bg-[#FF0033] text-white font-bold py-2 rounded-lg shadow hover:bg-[#e6002c] transition"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
