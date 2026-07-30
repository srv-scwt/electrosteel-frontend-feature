"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { createImageSourceURL } from "@/utils";

const AUTOPLAY_DELAY = 4000;

/** Minimal self-contained carousel */
const SimpleCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  useEffect(() => {
    const id = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [next]);

  if (total === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      {/* Slides */}
      {images.map((img, i) => {
        const rawSrc = typeof img === "string" ? img : (img?.src || img?.image || img?.url || "");
        const src = createImageSourceURL(rawSrc) || rawSrc;
        const alt = img?.alt || "Slide image";
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <Image
              src={src}
              alt={alt}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="object-cover object-top"
            />
          </div>
        );
      })}

      {/* Prev button */}
      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-[#fdd307] hover:bg-[#efc805] flex items-center justify-center shadow-md transition-colors"
        >
          <FaChevronLeft size={14} style={{ color: "#004aa1" }} />
        </button>
      )}

      {/* Next button */}
      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-[#fdd307] hover:bg-[#efc805] flex items-center justify-center shadow-md transition-colors"
        >
          <FaChevronRight size={14} style={{ color: "#004aa1" }} />
        </button>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#004aa1]" : "bg-white/70"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SingleImage = ({ image, altImage }) => (
  <div className="relative w-full h-full bg-gray-100">
    <Image
      src={image}
      alt={altImage ?? "img"}
      layout="fill"
      objectFit="cover"
      objectPosition="top"
      className="object-cover object-top"
    />
  </div>
);

const ImageContentSquareCard = ({ image, images, content, altImage }) => {
  const hasImages = images && images.length > 0;

  return (
    <div className="relative bg-[#fdd307] overflow-hidden h-auto lg:h-[350px]">
      <div className="flex flex-col lg:flex-row h-full">
        
        {/* Image Column */}
        <div className="relative w-full lg:w-[60%] h-[250px] lg:h-full flex-shrink-0">
          {hasImages ? (
            <SimpleCarousel images={images} />
          ) : (
            <SingleImage image={image} altImage={altImage} />
          )}
        </div>

        {/* Text Column */}
        <div className={`w-full lg:w-[40%] ${styles.sectionCardContent} ${styles.sectionContent} ${styles.paddingF} h-[300px] lg:h-full overflow-y-auto min-h-0`}>
          <p className="my-auto">{content}</p>
        </div>

      </div>
    </div>
  );
};

export default ImageContentSquareCard;
