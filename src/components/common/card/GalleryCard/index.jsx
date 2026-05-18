"use client";

import React from "react";
import Image from "next/image";
import { FiImage } from "react-icons/fi";

export default function GalleryCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      className="
        group cursor-pointer rounded-xl overflow-hidden
        bg-white shadow-md hover:shadow-xl 
        transition-all duration-300
      "
    >
      <div className="relative w-full h-56 overflow-hidden">

        {/* Image */}
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="
            object-cover transition-transform duration-500 
            group-hover:scale-110
          "
        />

        {/* Gradient */}
        <div
          className="
            absolute inset-0 bg-gradient-to-t 
            from-black/90 via-black/40 to-transparent
          "
        />

        {/* SMALL ICON — TOP RIGHT */}
        <div
          className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 
            opacity-0 group-hover:opacity-100
            transition-all duration-300
          "
        >
          <div
            className="
              bg-white/85 p-4 rounded-full shadow 
              backdrop-blur-md
            "
          >
            <FiImage size={20} className="text-black" />
          </div>
        </div>

        {/* Title + Description + View More */}
        <div
          className="
            absolute bottom-0 left-4 right-4 z-20
            flex flex-col transition-all duration-500
            group-hover:bottom-6
          "
        >
          {/* Title */}
          <h3
            className="
              text-white text-xl font-semibold mb-5
              transition-all duration-300
              group-hover:text-lg
            "
          >
            {item.title}
          </h3>

          {/* Description */}
          {/* <p
            className="
              text-white text-sm leading-snug mt-2
              opacity-0 group-hover:opacity-100 
              translate-y-3 group-hover:translate-y-0
              transition-all duration-500
            "
          >
            {item.description}
          </p> */}

          {/* View More CTA */}
          {/* <p
            className="
              text-white text-[13px] mt-3 tracking-wide
              opacity-0 group-hover:opacity-100
              translate-y-3 group-hover:translate-y-0
              transition-all duration-500
            "
          >
            View More →
          </p> */}
        </div>

      </div>
    </div>
  );
}
