import { useState } from "react";
import api from "../helpers/axiosInterceptor";
import { login } from "../redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasAccount, setHasAccount] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [popup, setPopup] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endPoint = hasAccount
      ? "/api/login"
      : "/api/signup";
    const payload = hasAccount
      ? { email: userData.email, password: userData.password }
      : userData;

    try {
      const res = await api.post(endPoint, payload);
      const { token, user } = res.data;

      console.log(res.data)
      if (hasAccount) {
        dispatch(login({ token, user }));
        navigate("/");
      } else {
        setHasAccount(true);
      }
     
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      setPopup({ type: "error", message });
    }
  };

  const handleOnChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#FF0033]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {popup && (
          <Popup
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup(null)}
          />
        )}
        <div className="flex flex-col items-center mb-6">
          <i className="fa-brands fa-youtube text-5xl text-[#FF0033] mb-2"></i>
          <h1 className="font-bold text-2xl text-gray-900 mb-1">
            Welcome to <span className="text-[#FF0033]">YouTube</span>
          </h1>
          <h2 className="text-gray-500 text-sm">
            Login to watch, share, and create.
          </h2>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {!hasAccount && (
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition"
                placeholder="Enter your username"
                value={userData.username}
                onChange={handleOnChange}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0033] transition"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleOnChange}
            />
          </div>

          <div>
            {hasAccount ? (
              <p>
                Don't have an Account{" "}
                <span
                  onClick={() => setHasAccount(false)}
                  className="text-[#FF0033] font-bold cursor-pointer"
                >
                  Create One
                </span>
              </p>
            ) : (
              <p>
                Already Has An Account{" "}
                <span
                  onClick={() => setHasAccount(true)}
                  className="text-[#FF0033] font-bold cursor-pointer"
                >
                  Log In
                </span>
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-2 cursor-pointer bg-[#FF0033] text-white font-bold py-2 rounded-lg shadow hover:bg-[#e6002c] transition"
          >
            {hasAccount ? "Log In" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
