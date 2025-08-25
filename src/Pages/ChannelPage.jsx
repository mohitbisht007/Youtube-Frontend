import { useParams } from "react-router-dom";
import Header from "../components/Header";
import HomeChannel from "../components/HomeChannel";
import SideNav from "../components/SideNav";
import FilterButtons from "../components/FilterButtons";
import VideosChannel from "../components/VideosChannel";
import api from "../helpers/axiosInterceptor";
import { useEffect, useState } from "react";
const user = JSON.parse(localStorage.getItem("user"));

export default function ChannelPage() {
  const [data, setData] = useState({});
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const { channelHandle } = useParams();

  useEffect(() => {
    const getData = async () => {
      const channelData = await api.get(
        `http://localhost:5050/api/channel/${channelHandle}`
      );
      setData(channelData.data.channelData);
    };
    getData();
  }, []);

  return (
    <div className="pt-[90px] max-w-[1200px] m-auto">
        {/* Channel Banner */}
        <div className="w-full">
          <img
            src="https://yt3.googleusercontent.com/CwTYHrgBOjrqtjBPEotEmiXco7WzngxoRK21mHZoN0s3Zg0b_PtqUOEjEiqZof9WJPSQOTwAvA=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            alt="Channel Banner"
            className="w-full h-[180px] md:h-[220px] object-cover md:rounded-xl shadow"
          />
        </div>

        {/* Channel Info */}
        <div className="w-full flex flex-col md:flex-row gap-6 items-center md:items-start mt-[20px]">
          <div>
            <img
              src={data.avatar || "/default-avatar.png"}
              alt="Channel Avatar"
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-4 border-white rounded-full shadow-lg object-cover bg-gray-200"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {data.channelName}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-2">
              {data.channelHandle} &middot;
              <span className="ml-2">{data.subscribers} subscribers</span>
              <span className="ml-2">{data.totalVideos} videos</span>
            </p>
            <p className="text-gray-500 mb-3">Channel Description</p>
            {user?.id === data.channelOwner ? (
              <div className="flex gap-3 flex-wrap">
                <FilterButtons text="Customise Channel" />
                <FilterButtons text="Edit Videos" />
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <button className="bg-black text-white py-1 px-4 rounded-md font-semibold shadow hover:bg-gray-800 transition">
                  Subscribe
                </button>
                <FilterButtons text="Join" />
              </div>
            )}
          </div>
        </div>

        {/* Channel Tabs */}
        <div className="w-full m-auto mt-8 px-4 flex gap-4 border-b">
          <button className="py-2 px-4 font-semibold text-gray-700 hover:border-b-2 hover:border-gray-300">
            Videos
          </button>
        </div>

        {/* Channel Content */}
        <div className="w-full m-auto px-4 py-8">
          <HomeChannel channelData={data} />
          <h2 className="text-xl font-bold mb-4 mt-8">Videos</h2>
          {/* <VideosChannel /> */}
        </div>
    </div>
  );
}
