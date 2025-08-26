export default function VideoCard({ videoDetail }) {
  return (
    <div className="mb-5 w-full">
      <div className="w-full aspect-video h-full rounded-md overflow-hidden">
        <img
          src={videoDetail?.thumbnail}
          alt={videoDetail?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-3 mt-2">
        <div className="flex">
          <img className="rounded-full border-1 h-[40px] w-[40px]" />
        </div>
        <div>
          <p className="font-bold">{videoDetail?.title}</p>
          <div className="flex gap-3 text-sm text-gray-600">
            <p>{videoDetail?.views} Views</p>
            <p>4 months Old</p>
          </div>
        </div>
      </div>
    </div>
  );
}