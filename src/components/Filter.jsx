import React, { useRef } from "react";
import FilterButtons from "./FilterButtons";
import { useState } from "react";

export default function Filter({ sideNavOpen, setFilter, videos }) {
  const scrollRef = useRef();

  const [activeFilter, setActiveFilter] = useState("All");

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`sticky top-[80px] z-20 bg-white md:px-6 px-2 flex items-center ${
        sideNavOpen
          ? "md:ml-[250px] md:w-[calc(100%-250px)]"
          : "md:w-full md:ml-0"
      }`}
    >
      <button
        className=" bg-gray-100 rounded-full text-lg"
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-3 py-2 px-2 md:px-5 overflow-x-auto scrollbar-hide w-full"
        style={{ scrollBehavior: "smooth" }}
      >
        <FilterButtons
          text="All"
          isActive={activeFilter === "All"}
          onClick={() => {
            setActiveFilter("All");
            setFilter("All");
          }}
        />
        {videos.map((video, idx) => (
          <FilterButtons
            key={idx}
            text={video.category}
            isActive={activeFilter === video.category}
            onClick={() => {
              setActiveFilter(video.category);
              setFilter(video.category);
            }}
          />
        ))}
      </div>
      {/* Scroll right button, only if overflow */}
      <button
        className=" bg-gray-100 rounded-full text-lg"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
