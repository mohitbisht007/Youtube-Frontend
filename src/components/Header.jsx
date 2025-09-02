import { useSelector } from "react-redux";
import SignInButton from "./SignInButton";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../helpers/axiosInterceptor";
import FilterButtons from "./FilterButtons";
const token = localStorage.getItem("token");
import { login } from "../redux/Slices/userSlice";

export default function Header({ onHamburgerClick, searchValue, setSearchValue }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuth } = useSelector((state) => state.user); // get user Data from my userSlice
  const [profileClicked, setProfileClikced] = useState(false); // used to toggle profile div
  const [mobileSearch, setMobileSearch] = useState(false); // changed search bar according to width
  const location = useLocation();

  console.log(user)


  //handleLogout to dispacth my logout reducer
  const handleLogOut = () => {
    dispatch(logout());
    window.location.href = "/"
    setProfileClikced(false);
  }; 

  // by default on page load profile div should be false
  useEffect(() => {
    setProfileClikced(false);
  }, [location.pathname]);

  // fetching logged in user to get channelData
  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/api/getUser", {
        headers: { Authorization: `JWT ${token}` },
      });
      dispatch(login({ token, user: response.data.user }));
    };
    if (token && isAuth) {
      getData();
    }
  }, [isAuth, token, dispatch]);

  // Mobile search submit handler (replace with your search logic)
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/")
    setMobileSearch(false);
  };

  return (
    <nav className="h-[80px] flex items-center justify-between px-4 fixed top-0 w-full z-30 bg-white">
      {/* Mobile search overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white flex items-center px-4 z-50 transition-all ${
          mobileSearch ? "flex" : "hidden"
        } sm:hidden`}
      >
        <button
          className="mr-3 text-xl text-gray-700"
          onClick={() => setMobileSearch(false)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <form className="flex-1 flex" onSubmit={handleSearch}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-[#F8F8F8] rounded-full"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      {/* Main header content */}
      <div
        className={`flex items-center justify-between gap-3 w-full ${
          mobileSearch ? "invisible" : ""
        }`}
      >
        <div className="flex items-center">
          <i
            className="fa-solid fa-bars text-[24px] text-black cursor-pointer"
            onClick={onHamburgerClick}
          />
          <Link to="/" className="flex items-center gap-1">
            <i className="fa-brands fa-youtube text-3xl text-[#FF0033]"></i>
            <span className="text-xl font-bold text-gray-900 tracking-tight sm:inline">
              YouTube
            </span>
          </Link>
        </div>

        {/* Mobile: show search icon only */}
        <button
          className="sm:hidden ml-auto"
          onClick={() => setMobileSearch(true)}
        >
          <i className="fa-solid fa-magnifying-glass text-[22px] text-black"></i>
        </button>
        {/* Desktop/tablet: show input, create, profile */}
        <div className="hidden w-[50%] justify-center m-auto sm:flex items-center">
          <input
            className="border-1 w-[70%] rounded-tl-full rounded-bl-full h-[40px] px-5"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="border-1 w-[60px] rounded-tr-full rounded-br-full h-[40px] bg-[#F8F8F8] cursor-pointer hover:bg-[#cdcdcd]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button className="bg-[#dfdede] rounded-full h-[40px] w-[40px] ml-2">
            <i className="fa-solid fa-microphone"></i>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {isAuth ? (
            <>
              <Link to="/upload">
                <FilterButtons text="+ Create" />
              </Link>
              <img
                className="rounded-full border-1 h-[40px] w-[40px]"
                src={user.avatar}
                onClick={() => setProfileClikced(!profileClicked)}
              />
            </>
          ) : (
            <Link to="/login">
              <SignInButton />
            </Link>
          )}
        </div>
      </div>

      {/* Profile dropdown unchanged */}
      {profileClicked && (
        <div className="fixed right-4 top-16 z-50 w-80 shadow-2xl border border-gray-200 rounded-xl bg-white overflow-hidden">
          {/* User Info Section */}
          {!user?.channel ? (
            <div className="flex flex-col items-center gap-3 py-6 px-4">
              <p className="text-gray-700 font-medium">No channel yet</p>
              <Link to="/create-channel">
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold shadow-md">
                  + Create Channel
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
              <img
                className="rounded-full h-12 w-12 object-cover border"
                src={user.avatar}
                alt="User Avatar"
              />
              <div className="flex flex-col">
                <p className="text-gray-900 font-semibold">
                  {user.channel.channelName}
                </p>
                <p className="text-gray-500 text-sm">
                  {user.channel.channelHandle}
                </p>
                <Link
                  className="text-blue-600 text-sm mt-1 hover:underline"
                  to={`/channel/${user.channel.channelHandle}`}
                >
                  View Your Channel
                </Link>
              </div>
            </div>
          )}

          {/* Menu Options */}
          <div className="flex flex-col py-2">
            <Link
              to="/edit-user"
              className="px-4 py-3 hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-3"
            >
              <i className="fa-solid fa-gear text-gray-500"></i>
              Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-200">
            <button
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
              onClick={handleLogOut}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
