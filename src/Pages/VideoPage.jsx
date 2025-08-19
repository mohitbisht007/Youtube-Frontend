import React, { useEffect } from "react";
import thumbnail from "../assets/thumbnail.jpg";
import Filter from "../components/Filter";
import FilterButtons from "../components/FilterButtons";
import RecommendedVideo from "../components/RecommendedVideo";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function VideoPage() {
  const [video, setVideo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getVideo = async () => {
      const res = await axios.get("http://localhost:5050/api/allVideos");
      const data = await res.data.allVideos.filter((video) => video._id === id);
      setVideo(data[0]);
    };

    getVideo();
  }, []);

  console.log(video)

  return (
    <div className="w-[90%] m-auto flex justify-center p-4">
      <div className="w-[70%]">
        <div>
          <div
            style={{ position: "relative", paddingTop: "56.25%", height: 0 }}
          >
            <iframe
              className="rounded-md"
              src={video.videoURL}
              title="YouTube video player"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <p>
            {video.title}
          </p>
          <div className="flex justify-between">
            <div className="flex">
              <img
                className="rounded-full border-1 h-[40px] w-[40px]"
                src=""
                alt=""
              />
              <div>
                <p>{video?.channel?.channelName}</p>
                <p>{video?.channel?.subscribers} Subscribers</p>
              </div>
              <button>Join</button>
              <button>Subscribe</button>
            </div>
            <div className="flex">
              <button>{video.like}</button>
              <button>Share</button>
              <button>Download</button>
              <button>Thanks</button>
            </div>
          </div>

          <div className="w-full bg-[#F2F2F2] rounded-md p-2">
            <div className="flex">
              <p>Views</p>
              <p>Upload Date</p>
              <p>#Hastags</p>
            </div>
            <div>
              <p>{video.description}</p>
            </div>
          </div>
        </div>

        <div className="">
          <h2>175 Comments</h2>

          <div className="flex">
            <img
              className="rounded-full border-1 h-[40px] w-[40px]"
              src=""
              alt=""
            />
            <div>
              <p>@username</p>
              <p>Comment</p>
              <div>
                <button>Like</button>
                <button>Dislike</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[30%] p-4">
        <div className="flex">
          <FilterButtons text="All" />
          <FilterButtons text="All" />
          <FilterButtons text="All" />
          <FilterButtons text="All" />
        </div>

        <div className="flex flex-col gap-4">
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
          <RecommendedVideo thumbnail={thumbnail} />
        </div>
      </div>
    </div>
  );
}
