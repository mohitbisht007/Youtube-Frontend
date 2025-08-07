import thumbnail from "../assets/thumbnail.jpg";

export default function PostCardChannel() {
  return (
    <div className="border-1 w-[400px] p-4 rounded-md">
      <div className="flex">
        <div>
          <img src={thumbnail} alt="" className="w-[20px] h-[20px] rounded-full"/> <span>Time</span>
          <p>Post Description</p>
        </div>
        <div>
          <img src={thumbnail} alt="" className="w-[100px]" />
        </div>
      </div>

      <div className="flex">
        <div>
          <button>Like</button> <button>DisLike</button>
        </div>

        <div>
          <button>Share</button>
          <button>Comments</button>
        </div>
      </div>
    </div>
  );
}
