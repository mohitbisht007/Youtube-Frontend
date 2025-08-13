import { useParams } from "react-router-dom";
import Header from "../components/Header";
import HomeChannel from "../components/HomeChannel";
import SideNav from "../components/SideNav";
import VideosChannel from "../components/VideosChannel";

export default function ChannelPage() {

  const channelHandle = useParams()
  console.log(channelHandle)

  return (
    <div>
      <Header />
      <SideNav />
      <div className="ml-[250px]">
        <img
          src="https://yt3.googleusercontent.com/CwTYHrgBOjrqtjBPEotEmiXco7WzngxoRK21mHZoN0s3Zg0b_PtqUOEjEiqZof9WJPSQOTwAvA=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          alt=""
          className="w-[90%] m-auto h-[200px] mt-[90px] rounded-lg "
        />

        <div className="flex">
          <div>
            <img
              src=""
              alt=""
              className="w-[150px] h-[150px] border-2 rounded-full"
            />
          </div>

          <div>
            <h2>Channel Name</h2>
            <p>
              @Channel name <span>2.4M subscribers </span>{" "}
              <span>•1.8K videos</span>
            </p>
            <p>Channel Description</p>
            <div>
              <button>Subscribe</button>
              <button>Join</button>
            </div>
          </div>
        </div>

        <div>
          <button>Home</button>
          <button>Videos</button>
          <button>Playlists</button>
          <button>Post</button>
        </div>

        <div>
          {/* <HomeChannel /> */}
          <h2>Video Card</h2>
          {/* <VideosChannel /> */}
        </div>
      </div>
    </div>
  );
}
