"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ImageContentSquareCard from "@/components/common/card/ImageContentSquareCard";
import { createImageSourceURL } from "@/utils";

export default function CardSlider({ items, defaultTitle }) {
  if (!items || items.length === 0) return null;

  // Render normal grid if 2 or fewer items
  if (items.length <= 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {items.map((item) => (
          <div key={item.id}>
            <ImageContentSquareCard
              content={item?.description || ""}
              image={createImageSourceURL(item?.image)}
              imageAlt={item?.title || defaultTitle || "image"}
            />
          </div>
        ))}
      </div>
    );
  }

  // Render Swiper if more than 2 items
  return (
    <div className="mt-4 w-full">
      <Swiper
        modules={[Autoplay, A11y, Pagination]}
        slidesPerView={2}
        spaceBetween={16} // equivalent to gap-4
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        }}
        className="w-full !pb-12" // padding for pagination dots
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            <ImageContentSquareCard
              content={item?.description || ""}
              image={createImageSourceURL(item?.image)}
              imageAlt={item?.title || defaultTitle || "image"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
