import api from "../helpers/axiosInterceptor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
import Popup from "../components/Popup";
import { login } from "../redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";

export default function CreateChannelPage() {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false)

  const [channelInput, setChannelInput] = useState({
    channelName: "",
    channelHandle: "",
  });

  const handleOnChange = (e) => {
    setChannelInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const [channelImage, setChannelImage] = useState(null);

  const handleImageChange = (e) => {
    setChannelImage(e.target.files[0]);
  };

  const dispatch = useDispatch();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("channelName", channelInput.channelName);
    formData.append("channelHandle", channelInput.channelHandle);

    if (channelImage) {
      formData.append("channelAvatar", channelImage);
    }

    const res = await api.post(
      "/api/createChannel",
      formData,
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const message = res?.data?.message;
    setPopup({ type: "success", message });

    // Refetch user to get updated channel info
    const userRes = await api.get("/api/getUser", {
      headers: { Authorization: `JWT ${token}` },
    });
    if (userRes.data.user) {
      dispatch(login({ token, user: userRes.data.user }));
    }

    const channelHandle = res.data.channel.channelHandle;
    setTimeout(() => {
      navigate(`/channel/${channelHandle}`);
    }, 2000);
    
  } catch (error) {
    const message = error?.response?.data?.message;
    setPopup({ type: "error", message });
  }

  setLoading(false);
};

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      {loading && <Loader/>}
      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Channel
        </h2>

        {/* Channel Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Name
          </label>
          <input
            type="text"
            name="channelName"
            value={channelInput.channelName}
            onChange={handleOnChange}
            placeholder="Enter channel name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Channel Handle */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Handle
          </label>
          <input
            type="text"
            name="channelHandle"
            value={channelInput.channelHandle}
            onChange={handleOnChange}
            placeholder="@yourhandle"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Channel Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}
