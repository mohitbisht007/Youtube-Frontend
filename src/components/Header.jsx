import { useSelector } from "react-redux";
import SignInButton from "./SignInButton";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../helpers/axiosInterceptor";
import FilterButtons from "./FilterButtons";
const token = localStorage.getItem("token");

export default function Header({ onHamburgerClick }) {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.auth);
  const [profileClicked, setProfileClikced] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation()

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    setProfileClikced(false);
  };

  useEffect(() => {
    setProfileClikced(false)
  }, [location.pathname]);


  useEffect(() => {
    const getData = async () => {
      const response = await api.get("http://localhost:5050/api/getUser", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setUserData(response.data.user);
    };
    getData();
  }, []);

  // Mobile search submit handler (replace with your search logic)
  const handleSearch = (e) => {
    e.preventDefault();
    // Do search logic here
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
        <div className="fixed right-4 top-16 z-50 w-[300px] h-[90vh] shadow-xl border border-[#e7e7e7] p-4 bg-white rounded">
          {!userData.channel ? (
            <div>
              <Link to="/create-channel">
                <button>Create Channel</button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-5 border-b-2 p-2">
              <img
                className="rounded-full border-1 h-[40px] w-[40px]"
                src={user.avatar}
              />
              <div>
                <p>{userData.channel.channelName}</p>
                <p>{userData.channel.channelHandle}</p>
                <Link
                  className="text-blue-500"
                  to={`/channel/${userData.channel.channelHandle}`}
                >
                  View Your Channel
                </Link>
              </div>
            </div>
          )}
          <div className="p-3 flex justify-center items-center">
            <button className="p-2 bg-amber-200" onClick={handleLogOut}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
