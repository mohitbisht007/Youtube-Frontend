import React from 'react'

export default function FilterButtons({ text, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`py-1 px-3 cursor-pointer rounded-md ${isActive ? "bg-black text-white" : "bg-[#F2F2F2] text-black"}`}
    >
      {text}
    </button>
  );
}