import SideText from "./SideText";
import SignInButton from "./SignInButton";
import { Link } from "react-router-dom";

export default function SideNav({ open, onClose }) {
  return (
    <div
      className={`fixed top-20 left-0 h-[calc(100vh-80px)] overflow-y-auto w-[250px] z-50 bg-white shadow-lg transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
        onClick={onClose}
        aria-label="Close SideNav"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="p-2 text-[20px] flex flex-col border-b">
        <Link to="/">
          <SideText icon={<i className="fa-solid fa-house"></i>} text="Home" />
        </Link>
        <SideText icon={<i className="fa-solid fa-video"></i>} text="Shorts" />
        <SideText icon={<i className="fa-solid fa-hand-holding-dollar"></i>} text="Subscription" />
      </div>

      <div className="p-2 text-[20px] flex flex-col border-b">
        <SideText icon={<i className="fa-solid fa-user"></i>} text="You" />
        <SideText icon={<i className="fa-solid fa-clock-rotate-left"></i>} text="History" />
      </div>

      {/* Conditional rendering for user Signin */}
      <div className="p-2 text-[20px] flex flex-col border-b">
        <SideText icon={<i className="fa-solid fa-user"></i>} text="Sign in to Like Videos" />
        <SignInButton />
      </div>

      <div className="p-2 text-[20px] flex flex-col border-b">
        <h3 className="text-[18px] mb-[10px]">Explore</h3>
        <SideText icon={<i className="fa-solid fa-cart-shopping"></i>} text="Shopping" />
        <SideText icon={<i className="fa-solid fa-music"></i>} text="Music" />
        <SideText icon={<i className="fa-solid fa-video"></i>} text="Movies" />
        <SideText icon={<i className="fa-solid fa-bolt"></i>} text="Live" />
        <SideText icon={<i className="fa-solid fa-headset"></i>} text="Gaming" />
        <SideText icon={<i className="fa-solid fa-newspaper"></i>} text="News" />
        <SideText icon={<i className="fa-solid fa-medal"></i>} text="Sports" />
        <SideText icon={<i className="fa-solid fa-book-open-reader"></i>} text="Courses" />
        <SideText icon={<i className="fa-solid fa-book-open-reader"></i>} text="Fashion" />
        <SideText icon={<i className="fa-solid fa-podcast"></i>} text="Podcast" />
      </div>
    </div>
  );
}