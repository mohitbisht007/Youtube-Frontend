export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="flex flex-col items-center">
        {/* Play icon with spin and pulse */}
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-30"></span>
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg">
            <i className="fa fa-play text-red-500 text-3xl animate-spin-slow" />
          </div>
        </div>
        <span className="mt-6 text-lg font-semibold text-gray-700 tracking-wide">
          Loading videos...
        </span>
      </div>
      {/* Custom spin animation */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 1.2s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}