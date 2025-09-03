import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";

// Make sure Font Awesome CSS is loaded in your index.html or main layout

export default function Popup({
  type = "success",
  message,
  onClose,
  link,
  linkText = "Go",
  timing,
}) {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (timing) {
      const timer = setTimeout(() => {
        onClose();
      }, timing);
      return () => clearTimeout(timer);
    }
  }, [onClose, timing]);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      onClose();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`relative flex flex-col items-center gap-3 px-9 py-9 rounded-2xl shadow-2xl w-[90vw] max-w-sm animate-popup
          ${
            isSuccess
              ? "bg-gradient-to-br from-green-400 to-green-500"
              : "bg-gradient-to-br from-rose-400 to-rose-500"
          }
        `}
        style={{ transition: "box-shadow 0.2s" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white"
        >
          <i className="fa fa-times w-5 h-5 text-xl" />
        </button>

        {/* Icon */}
        <div className="mb-2">
          {isSuccess ? (
            <i className="fa fa-check-circle text-white text-4xl drop-shadow" />
          ) : (
            <i className="fa fa-exclamation-circle text-white text-4xl drop-shadow" />
          )}
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-white mb-1 drop-shadow">
          {isSuccess ? "Success" : "Error"}
        </h2>
        <p className="text-base text-white/90 text-center mb-2">{message}</p>

        {/* Link Button (move outside flex flow, but inside modal card) */}
        {link && (
          <Link
            to={link}
            className="absolute bottom-2 right-4 inline-flex items-center gap-1 px-3 py-1 text-xs bg-white text-green-700 font-semibold rounded shadow hover:bg-green-50 transition"
            style={{ fontSize: "0.95rem" }}
          >
            <i className="fa fa-link w-4 h-4" />
            {linkText}
          </Link>
        )}
      </div>
      {/* Animation */}
      <style>
        {`
          .animate-popup {
            animation: popupScale 0.25s cubic-bezier(.4,2,.3,1) both;
          }
          @keyframes popupScale {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
