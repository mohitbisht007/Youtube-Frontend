import SideText from "./SideText";
import SignInButton from "./SignInButton";

export default function SideNav() {
  return (
    <div className="h-[100vh] p-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 fixed w-[250px] z-100 top-20">
      <div className="p-2 text-[20px] flex flex-col border-b-1">
        <SideText icon={<i class="fa-solid fa-house"></i>} text="Home"/>
        <SideText icon={<i class="fa-solid fa-video"></i>} text="Shorts"/>
        <SideText icon={<i class="fa-solid fa-hand-holding-dollar"></i>} text="Subscription"/>
      </div>

      <div className="p-2 text-[20px] flex flex-col border-b-1">
        <SideText icon={<i class="fa-solid fa-user"></i>} text="You"/>
        <SideText icon={<i class="fa-solid fa-clock-rotate-left"></i>} text="History"/>
      </div>

      {/* //conditional rendering for user Signin */}

      <div className="p-2 text-[20px] flex flex-col border-b-1">
        <SideText icon={<i class="fa-solid fa-user"></i>} text="Sign in to Like Videos"/>
        <SignInButton/>
      </div>

      <div className="p-2 text-[20px] flex flex-col border-b-1">
        <h3 className="text-[18px] mb-[10px]">Explore</h3>
        <SideText icon={<i class="fa-solid fa-cart-shopping"></i>} text="Shopping"/>
        <SideText icon={<i class="fa-solid fa-music"></i>} text="Music"/>
        <SideText icon={<i class="fa-solid fa-video"></i>} text="Movies"/>
        <SideText icon={<i class="fa-solid fa-bolt"></i>} text="Live"/>
        <SideText icon={<i class="fa-solid fa-headset"></i>} text="Gaming"/>
        <SideText icon={<i class="fa-solid fa-newspaper"></i>} text="News"/>
        <SideText icon={<i class="fa-solid fa-medal"></i>} text="Sports"/>
        <SideText icon={<i class="fa-solid fa-book-open-reader"></i>} text="Courses"/>
        <SideText icon={<i class="fa-solid fa-book-open-reader"></i>} text="Fashion"/>
        <SideText icon={<i class="fa-solid fa-podcast"></i>} text="Podcast"/>
        
      </div>
    </div>
  );
}
