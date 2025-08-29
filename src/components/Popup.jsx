import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export default function Popup({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
      <div
        className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl w-[90vw] max-w-md relative overflow-hidden
          ${isSuccess ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"}
        `}
      >
        {/* Icon */}
        <div className="mt-1">
          {isSuccess ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : (
            <XCircle className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            {isSuccess ? "Success" : "Error"}
          </h2>
          <p className="text-sm text-white/90">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
