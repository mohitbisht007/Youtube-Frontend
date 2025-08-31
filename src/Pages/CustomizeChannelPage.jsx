import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../helpers/axiosInterceptor";
import { fetchChannel } from "../redux/Slices/channelSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function CustomizeChannelPage() {
  const { channelHandle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channel, loading } = useSelector((state) => state.channel);

  const [form, setForm] = useState({
    channelName: "",
    channelDescription: "",
    channelAvatar: null,
  });
  const [preview, setPreview] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    dispatch(fetchChannel(channelHandle));
  }, [channelHandle, dispatch]);

  useEffect(() => {
    if (channel) {
      setForm({
        channelName: channel.channelName || "",
        channelDescription: channel.channelDescription || "",
        channelAvatar: null,
      });
      setPreview(channel.channelAvatar || null);
    }
  }, [channel]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({
      ...prev,
      channelAvatar: file,
    }));
    setPreview(file ? URL.createObjectURL(file) : channel.channelAvatar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("channelName", form.channelName);
      formData.append("channelDescription", form.channelDescription);
      if (form.channelAvatar) {
        formData.append("channelAvatar", form.channelAvatar);
      }
      await api.put(
        `http://localhost:5050/api/channel/${channelHandle}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPopup({ type: "success", message: "Channel updated successfully!" });
      dispatch(fetchChannel(channelHandle));
      setTimeout(() => {
        navigate(`/channel/${channelHandle}`);
      }, 1500);
    } catch (error) {
      setPopup({
        type: "error",
        message: error?.response?.data?.message || "Update failed",
      });
    }
  };

  if (loading || !channel) return <div className="pt-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <form
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Customize Your Channel
        </h2>
        {popup && (
          <div
            className={`mb-4 px-4 py-2 rounded ${
              popup.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {popup.message}
          </div>
        )}
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview || "/default-avatar.png"}
            alt="Channel Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Name
          </label>
          <input
            type="text"
            name="channelName"
            value={form.channelName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Description
          </label>
          <textarea
            name="channelDescription"
            value={form.channelDescription}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}