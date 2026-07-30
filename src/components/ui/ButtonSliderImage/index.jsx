"use client";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "@/app/common.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Autoplay, A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Ensure Navigation CSS is imported

import { createImageSourceURL } from "@/utils";

// Default fallback image
const fallbackImage = "/images/board/policies_banner_large.jpg";

const ButtonSliderImage = ({ images, title, imageTitle, imageClassName, objectFit = "cover" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Parse a concrete px height from imageClassName e.g. "h-[450px]" → 450
  // Falls back to undefined so Swiper uses its natural height in other contexts
  const parsedHeight = (() => {
    if (!imageClassName) return undefined;
    const match = imageClassName.match(/h-\[(\d+)px\]/);
    return match ? parseInt(match[1], 10) : undefined;
  })();

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) {
      return;
    }

    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;
    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance]);

  // If we have a concrete height, apply it directly to every Swiper layer
  const heightStyle = parsedHeight ? { height: `${parsedHeight}px` } : {};
  const containerClass = parsedHeight ? "slider-container relative w-full" : "slider-container relative h-full";

  return (
    <div className={containerClass} style={heightStyle}>
      <Swiper
        modules={[Autoplay, A11y, Navigation]} // Removed EffectFade module
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
        spaceBetween={0}
        loop={true}
        direction="horizontal"
        className="w-full"
        style={heightStyle}
      >
        {images && images.length > 0 ? (
          images.map((image, index) => {
            const rawSrc = typeof image === "string" ? image : (image?.src || image?.image || image?.url);
            const validSrc = rawSrc ? createImageSourceURL(rawSrc, fallbackImage) : fallbackImage;
            const validAlt = image?.alt || "Slide image";
            const heightClass = imageClassName || "h-[300px] sm:h-[400px] md:h-[500px]";

            return (
              <SwiperSlide key={index} style={heightStyle}>
                <div className={`w-full ${heightClass} relative bg-white`} style={heightStyle}>
                  <Image
                    src={validSrc}
                    alt={validAlt}
                    layout="fill" // Make the image take full space of its parent
                    objectFit={objectFit} // Use the dynamic prop
                    className={`object-${objectFit} object-center`}
                    onError={(e) => (e.target.srcset = fallbackImage)} // Fallback on error (Next.js Image uses srcset)
                  />
                </div>
                {title && (
                  <div
                    className={`${styles.sectionContent} w-full bg-[#fdd307] py-3 px-5 text-start`}
                  >
                    <h2 className="m-0! w-full!">{title ?? imageTitle[index]}</h2>
                  </div>
                )}
              </SwiperSlide>
            );
          })
        ) : (
          <div className="no-images">No images available</div>
        )}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div
        ref={prevRef}
        className="swiper-button-prev h-10 w-10 transform -translate-x-6 rounded-full bg-[#fdd307] transition-all flex items-center justify-center p-2 swiper-button-custom hover:bg-[#efc805] sm:h-4 sm:w-4 sm:p-3"
      >
        <FaChevronLeft size={16} style={{ color: "#004aa1" }} />
      </div>
      <div
        ref={nextRef}
        className="swiper-button-next relative transform translate-x-6 h-10 w-10 rounded-full bg-[#fdd307] transition-all flex items-center justify-center p-2 swiper-button-custom hover:bg-[#efc805] sm:h-4 sm:w-4 sm:p-3"
      >
        <FaChevronRight size={16} style={{ color: "#004aa1" }} />
      </div>
    </div>
  );
};

// Type validation using PropTypes
ButtonSliderImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default ButtonSliderImage;
