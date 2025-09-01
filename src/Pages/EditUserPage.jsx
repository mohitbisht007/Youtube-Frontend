import { useState } from "react";
import api from "../helpers/axiosInterceptor";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/Slices/userSlice";

export default function EditUserPage() {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.username || "");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [popup, setPopup] = useState(null);

  // Check username availability
  const checkUsername = async () => {
    if (username === user?.username) {
      setUsernameAvailable(null);
      return;
    }
    try {
      const res = await api.post("/api/check-username", { username });
      console.log(res)
      setUsernameAvailable(res.data.available);
    } catch {
      setUsernameAvailable(false);
    }
  };

  // Handle user update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (username !== user?.username && usernameAvailable) {
        payload.username = username;
      }
      if (newPassword && currentPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }
      const res = await api.put("/api/edit-user", payload, {
        headers: { Authorization: `JWT ${token}` },
      });
      setPopup({ type: "success", message: res.data.message });
      if (res.data.user) {
        dispatch(login({ token, user: res.data.user }));
      }
    } catch (error) {
      setPopup({
        type: "error",
        message: error?.response?.data?.message || "Update failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <form
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Edit Profile
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
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameAvailable(null);
            }}
            onBlur={checkUsername}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          {usernameAvailable === false && (
            <span className="text-xs text-red-500">Username not available</span>
          )}
          {usernameAvailable === true && (
            <span className="text-xs text-green-500">Username available</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
          disabled={
            (username !== user?.username && usernameAvailable === false) ||
            (newPassword && !currentPassword)
          }
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}