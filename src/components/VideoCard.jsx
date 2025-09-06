export default function VideoCard({ videoDetail, channelAvatar }) {
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
        <img
          src={videoDetail?.channel?.channelAvatar || channelAvatar}
          alt="channel avatar"
          className="h-12 w-12 rounded-full border object-cover mt-1"
        />

        <div>
          <p className="font-bold">{videoDetail?.title}</p>
          <p className="text-sm text-gray-800">
            {videoDetail?.channel?.channelName}
          </p>
          <div className="flex gap-3 text-sm text-gray-600">
            <p>{videoDetail?.views} Views</p>
            <p>
              {videoDetail?.createdAt
                ? new Date(videoDetail?.createdAt).toLocaleDateString()
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}