export default function VideoCard({ videoDetail }) {
  console.log(videoDetail);
  return (
    <div className="mb-5 w-[100%]">
      <img
        width={"100%"}
        src={videoDetail?.thumbnail}
        alt=""
        className="rounded-md"
      />
      <div className="flex gap-3">
        <div className="flex">
          <img className="rounded-full border-1 h-[40px] w-[40px]" />
        </div>
        {/* <p>{videoDetail.channel.channelName}</p> */}
        <div>
          <p className="font-bold">{videoDetail?.title}</p>
          <div className="flex gap-3">
            <p>{videoDetail?.views} Views</p>
            <p>4 months Old</p>
          </div>
        </div>
      </div>
    </div>
  );
}
