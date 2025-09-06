import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../helpers/axiosInterceptor";
import { fetchChannel } from "../redux/Slices/channelSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditVideosPage() {
  const { channelHandle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channel, loading } = useSelector((state) => state.channel);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    dispatch(fetchChannel(channelHandle));
  }, [channelHandle, dispatch]);

  const handleEdit = (videoId) => {
    navigate(`/edit-video/${videoId}`);
  };

  const handleDelete = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await api.delete(`/api/video/${videoId}`);
      dispatch(fetchChannel(channelHandle)); // Refresh channel videos
    }
  };

  if (loading || !channel) return <div className="pt-20 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pt-24">
      <h2 className="text-2xl font-bold mb-6">Edit Your Videos</h2>
      <div className="grid gap-6">
        {channel?.videos && channel?.videos.length > 0 ? (
          channel?.videos.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">{video.title}</div>
                  <div className="text-gray-500 text-sm">{video.description}</div>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === video._id ? null : video._id)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <span className="text-2xl">⋮</span>
                </button>
                {menuOpen === video._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleEdit(video._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                      onClick={() => handleDelete(video._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No videos found.</div>
        )}
      </div>
    </div>
  );
}