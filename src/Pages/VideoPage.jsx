import React from "react";
import thumbnail from "../assets/thumbnail.jpg";
import Filter from "../components/Filter";
import FilterButtons from "../components/FilterButtons";
import RecommendedVideo from "../components/RecommendedVideo";

export default function VideoPage() {
  return (
    <div className="w-[90%] m-auto flex justify-center p-4">
      <div className="w-[70%]">
        <div>
          <img src={thumbnail} className="w-[100%]" alt="" />
          <p>
            Angry Maruti Driver Attack*d on Toyota Fortuner 🤦‍♂️ Attempt to
            Murd*er Registered after Road Rage
          </p>
          <div className="flex justify-between">
            <div className="flex">
              <img
                className="rounded-full border-1 h-[40px] w-[40px]"
                src=""
                alt=""
              />
              <div>
                <p>Channel Name</p>
                <p>Subscribers</p>
              </div>
              <button>Join</button>
              <button>Subscribe</button>
            </div>
            <div className="flex">
              <button>Like</button>
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
              <p>Description</p>
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
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
          <RecommendedVideo thumbnail={thumbnail}/>
        </div>
      </div>
    </div>
  );
}
