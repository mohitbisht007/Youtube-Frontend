import { useSelector } from "react-redux";
import SignInButton from "./SignInButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilterButtons from "./FilterButtons";
const token = localStorage.getItem("token");

export default function Header() {
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuth } = useSelector((state) => state.auth);

  const [profileClicked, setProfileClikced] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    setProfileClikced(false);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5050/api/getUser", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setUserData(response.data.user);
    };

    getData();
  }, []);

  return (
    <nav className="h-[80px] flex justify-between p-2 fixed top-0 w-full z-30 bg-white">
      <div className="logo text-[#FF0033] text-[30px] flex items-center">
        <i class="fa-solid fa-bars text-[20px] mx-3 text-black"></i>
        <i className="fa-brands fa-youtube"></i>
        <p className="text-black text-[22px] font-bold tracking-tighter">
          Youtube
        </p>
      </div>
      <div>
        <input
          className="border-1 w-[550px] rounded-tl-full rounded-bl-full h-[40px] px-5"
          type="text"
          placeholder="Search"
        />
        <button className="border-1 w-[60px] rounded-tr-full rounded-br-full h-[40px] bg-[#F8F8F8] cursor-pointer hover:bg-[#cdcdcd]">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="bg-[#dfdede] rounded-full h-[40px] w-[40px] ml-2">
          {" "}
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
      <div>
        {isAuth ? (
          <div className="flex gap-5">
            <Link to="/upload">
              <FilterButtons text="+ Create" />
            </Link>
            <img
              className="rounded-full border-1 h-[40px] w-[40px]"
              src={user.avatar}
              onClick={() => setProfileClikced(!profileClicked)}
            />
          </div>
        ) : (
          <Link to="/login">
            <SignInButton />
          </Link>
        )}
      </div>

      {profileClicked && (
        <div className="fixed right-20 top-10 z-50 w-[300px] h-[90vh] shadow-xl border border-[#e7e7e7] p-4 bg-white rounded">
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
                <Link className="text-blue-500" to={`/channel/${userData.channel.channelHandle}`}>
                  View Your Channel
                </Link>
              </div>
            </div>
          )}
          <div className="p-3 flex justify-center items-center">
            <button className="p-2 bg-amber-200" onClick={handleLogOut}>Sign Out</button>
          </div>
        </div>
      )}
    </nav>
  );
}
