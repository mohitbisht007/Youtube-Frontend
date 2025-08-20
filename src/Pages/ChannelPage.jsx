import { useParams } from "react-router-dom";
import Header from "../components/Header";
import HomeChannel from "../components/HomeChannel";
import SideNav from "../components/SideNav";
import FilterButtons from "../components/FilterButtons";
import VideosChannel from "../components/VideosChannel";
import axios from "axios";
import { useEffect, useState } from "react";
const user = JSON.parse(localStorage.getItem("user"));

export default function ChannelPage() {
  console.log(user);
  const [data, setData] = useState({});

  const { channelHandle } = useParams();

  useEffect(() => {
    const getData = async () => {
      const channelData = await axios.get(
        `http://localhost:5050/api/channel/${channelHandle}`
      );
      setData(channelData.data.channelData);
    };

    getData();
  }, []);
  console.log(data);

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
            <h2>{data.channelName}</h2>
            <p>
              {data.channelHandle} <span>{data.subscribers} subscribers </span>{" "}
              <span>{data.totalVideos} videos</span>
            </p>
            <p>Channel Description</p>
            {user.id === data.channelOwner ? (
              <div>
                <FilterButtons text="Customise Channel" />
                <FilterButtons text="Edit Videos" />
              </div>
            ) : (
              <div>
                <button className="bg-[#000] text-white py-1 px-3 rounded-md">
                  Subscribe
                </button>
                <FilterButtons text="Join" />
              </div>
            )}
          </div>
        </div>

        <div>
          <button>Home</button>
          <button>Videos</button>
          <button>Playlists</button>
          <button>Post</button>
        </div>

        <div>
          <HomeChannel channelData={data} />
          <h2>Video Card</h2>
          {/* <VideosChannel /> */}
        </div>
      </div>
    </div>
  );
}
