import React from "react";

export default function RecommendedVideo({thumbnail}) {
  return (
    <div className="flex">
      <img src={thumbnail} alt="" className="w-[180px] rounded-md" />
      <div>
        <p>Angry Maruti Driver Attack*d on Toyota Fortuner 🤦‍♂️</p>
        <p>Channel Name</p>
        <div className="flex">
          <p>Views</p>
          <p>Upload Date</p>
        </div>
      </div>
    </div>
  );
}
