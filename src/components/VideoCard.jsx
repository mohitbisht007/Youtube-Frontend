import thumbnail from "../assets/thumbnail.jpg";

export default function VideoCard() {
  return (
    <div className="mb-5 w-[100%]">
      <img width={"430px"} src={thumbnail} alt="" className="rounded-md" />
      <div>
        <div className="flex">
          <img
            className="rounded-full border-1 h-[40px] w-[40px]"
            src=""
            alt=""
          />
          <p>How to Start Coding in College</p>
        </div>
        <p>Channel Name</p>
        <div className="flex">
            <p>Views</p>
            <p>4 months Old</p>
        </div>
      </div>
    </div>
  );
}
