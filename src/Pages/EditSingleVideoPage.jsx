import { useEffect, useState } from "react";
import api from "../helpers/axiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";

export default function EditSingleVideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.get(`/api/video/${videoId}`).then((res) => {
      setVideo(res.data.video);
      setForm({
        title: res.data.video.title,
        description: res.data.video.description,
      });
    });
  }, [videoId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/video/${videoId}/edit`, form);
      setPopup({ type: "success", message: "Video updated!" });
      setTimeout(() => {
        navigate(-1); // Go back to edit videos page
      }, 1200);
    } catch (error) {
      setPopup({
        type: "error",
        message: error?.response?.data?.message || "Update failed",
      });
    }
  };

  if (!video) return <div className="pt-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <form
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Edit Video
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
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
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