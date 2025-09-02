
export default function Comments({comment, username, imgUrl}) {
  return (
    <div className="flex gap-3 mb-4">
      <img
        className="rounded-full border h-10 w-10 object-cover bg-gray-200"
        src={imgUrl}
        alt="User"
      />
      <div>
        <p className="font-semibold">@{username}</p>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
}
