import VideoCard from "./VideoCard";
import PostCardChannel from "../components/PostCardChannel";
import { Link } from "react-router-dom";
import FilterButtons from "./FilterButtons";

export default function HomeChannel({ channelData }) {
  return (
    <div>
      {/* <div>
        <img src={thumbnail} alt="" className="w-[300px] rounded-md" />
        <h2>
          I *FAILED* IN EXAM DUE TO YOUTUBE ? NEON MAN QNA #AskNeon | FaceCam |
          100K Special |
        </h2>
        <p>
          Channel Name <span>Views</span> <span>Time</span>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam est
          recusandae ad quibusdam quas, iste tenetur velit ipsam provident
          itaque.
        </p>
      </div> */}

      <div className="mt-4">
        <h2 className="font-bold">For You</h2>
        <div className="flex">
          {channelData?.videos?.map((video) => {
            return (
              <Link to={`/watch/${video._id}`}>
                <VideoCard videoDetail={video} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* <div className="mt-4">
          <h2 className="font-bold">Popular</h2>
          <div className="flex">
            <VideoCard />
            <VideoCard />
            <VideoCard />
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-bold">Videos</h2>
          <div className="flex">
            <VideoCard />
            <VideoCard />
            <VideoCard />
          </div>
        </div> */}

      {/* <div>
          <h2 className="font-bold"> Posts</h2>
          <div className="flex">
            <PostCardChannel />
            <PostCardChannel />
            <PostCardChannel />
          </div>
        </div> */}
    </div>
  );
}
