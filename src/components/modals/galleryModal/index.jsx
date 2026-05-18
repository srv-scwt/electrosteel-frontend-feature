"use client";

import React from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export default function GalleryModal({ open, onClose, item }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm
        z-[9999] overflow-y-auto animate-fadeIn
      "
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          fixed top-5 right-5 z-[100]
          bg-white/95 hover:bg-white 
          text-gray-800 p-3 rounded-full shadow-lg
          transition-all duration-300
        "
      >
        <FiX size={20} />
      </button>

      {/* MAIN WRAPPER */}
      <div className="w-full min-h-screen bg-white pt-6 pb-12 px-4 sm:px-6 md:px-10 lg:px-16">

        {/* IMAGE SECTION - FULLY RESPONSIVE */}
        <div className="w-full flex justify-center mb-10">
          <div className="
            relative w-full 
            h-[60vh] 
            lg:h-[80vh] 
          ">
            <Image
              src={item?.img}
              alt={item?.title}
              fill
              priority
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-6">
            {item?.title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-[17px] leading-relaxed tracking-wide">
            {item?.description}
          </p>
        </div>

      </div>
    </div>
  );
}
