import { useParams } from "react-router-dom";
import HomeChannel from "../components/HomeChannel";
import FilterButtons from "../components/FilterButtons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel } from "../redux/Slices/channelSlice";
import { subscribeChannel, unSubscribeChannel } from "../redux/Slices/userSlice";

export default function ChannelPage() {
  const { channelHandle } = useParams();
  const dispatch = useDispatch();
  const { channel, error, loading } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.user);
  console.log(channel);

  useEffect(() => {
    dispatch(fetchChannel(channelHandle));
  }, [channelHandle, dispatch]);

  const handleSubscribe = async () => {
    if (user.subscriptions.includes(channel?._id)) {
      dispatch(unSubscribeChannel(channel?._id));
    } else {
      dispatch(subscribeChannel(channel?._id));
    }
    await dispatch(fetchChannel(channelHandle))
  };

  if (loading) {
    return <h2>Loading....</h2>;
  }

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
            src={channel?.channelAvatar || "/default-avatar.png"}
            alt="Channel Avatar"
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-4 border-white rounded-full shadow-lg object-cover bg-gray-200"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {channel?.channelName}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-2">
            {channel?.channelHandle} &middot;
            <span className="ml-2">{channel?.subscribers} subscribers</span>
            <span className="ml-2">{channel?.totalVideos} videos</span>
          </p>
          <p className="text-gray-500 mb-3">Channel Description</p>
          {user?.id === channel?.channelOwner ? (
            <div className="flex gap-3 flex-wrap">
              <FilterButtons text="Customise Channel" />
              <FilterButtons text="Edit Videos" />
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="ml-2 cursor-pointer bg-black text-white px-4 py-1 rounded-md font-semibold shadow hover:bg-gray-800 transition"
            >
              {user?.subscriptions?.includes(channel?._id)
                ? "Unsubscribe"
                : "Subscribe"}
            </button>
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
        <HomeChannel channelData={channel} />
      </div>
    </div>
  );
}
