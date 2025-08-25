import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

export default function HomeChannel({ channelData }) {
  return (
    <div className="mt-4">
      <h2 className="font-bold mb-4">For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {channelData?.videos?.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id}>
            <VideoCard videoDetail={video} />
          </Link>
        ))}
      </div>
    </div>
  );
}