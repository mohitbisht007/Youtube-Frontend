import SignInButton from "./SignInButton";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="h-[80px] flex justify-between p-2 fixed top-0 w-full z-100 bg-white">
      <div className="logo text-[#FF0033] text-[30px] flex items-center">
        <i class="fa-solid fa-bars text-[20px] mx-3 text-black"></i>
        <i className="fa-brands fa-youtube"></i>
        <p className="text-black text-[22px] font-bold tracking-tighter">Youtube</p>
      </div>
      <div>
        <input className="border-1 w-[550px] rounded-tl-full rounded-bl-full h-[40px] px-5" type="text" placeholder="Search" />
        <button className="border-1 w-[60px] rounded-tr-full rounded-br-full h-[40px] bg-[#F8F8F8] cursor-pointer hover:bg-[#cdcdcd]">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="bg-[#dfdede] rounded-full h-[40px] w-[40px] ml-2"> <i className="fa-solid fa-microphone"></i></button>
      </div>
      <div>
        <Link to="/login"><SignInButton/></Link>
      </div>
    </nav>
  );
}
