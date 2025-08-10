import React from "react";
import FilterButtons from "./FilterButtons";

export default function Filter() {
  return (
    <div className="flex ml-[15%] w-[85%] gap-3 py-2 px-5 z-20 bg-white fixed top-20">
      <FilterButtons text="All" />
      <FilterButtons text="Gaming" />
      <FilterButtons text="Valorant" />
      <FilterButtons text="Live" />
      <FilterButtons text="Music" />
      <FilterButtons text="Education" />
      <FilterButtons text="BGMI" />
      <FilterButtons text="Travel" />
    </div>
  );
}
