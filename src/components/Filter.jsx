import React, { useRef } from "react";
import FilterButtons from "./FilterButtons";

export default function Filter({ sideNavOpen }) {
  const scrollRef = useRef();

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
        sideNavOpen ? "md:ml-[250px] md:w-[calc(100%-250px)]" : "md:w-full md:ml-0"
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
        <FilterButtons text="All" />
        <FilterButtons text="Gaming" />
        <FilterButtons text="Valorant" />
        <FilterButtons text="Live" />
        <FilterButtons text="Music" />
        <FilterButtons text="Education" />
        <FilterButtons text="BGMI" />
        <FilterButtons text="Travel" />
        <FilterButtons text="Extra1" />
        <FilterButtons text="Extra2" />
        <FilterButtons text="Extra3" />
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
