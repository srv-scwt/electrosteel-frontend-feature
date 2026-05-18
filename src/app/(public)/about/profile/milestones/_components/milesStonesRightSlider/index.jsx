"use client";

import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MilesStonesRightSlider = () => {
  // Example image data (you can replace or expand)
  const slides = [
    {
      img: "/images/corporateProfileImg.jpg",
      caption: "View of the Factory in the 60s",
    },
    {
      img: "/images/corporateProfileImg.jpg",
      caption: "Modern facility upgrade view",
    },
    {
      img: "/images/corporateProfileImg.jpg",
      caption: "Factory expansion phase",
    },
  ];

  return (
    <>
    <div className="milesStonesRight relative h-80 lg:h-full overflow-hidden shadow-md">
            {/* Swiper Slider */}
            <Swiper
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next2",
                prevEl: ".swiper-button-prev2",
              }}
              modules={[Navigation]}
              className="mySwiper3 h-full"
            >
              {slides.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-80 lg:h-full">
                    <Image
                      src={item.img}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <p className="absolute !text-sm bottom-0 left-1/2 -translate-x-1/2 !text-white text-sm bg-[#00418E] pl-4 pr-[135px] py-4">
                      {item.caption}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <div className="absolute bottom-4 right-4 flex gap-3 z-10">
              <button className="swiper-button-prev2 bg-white/70 hover:bg-white text-xs text-black font-semibold py-1 px-3 cursor-pointer rounded">
                Prev
              </button>
              <button className="swiper-button-next2 bg-white/70 hover:bg-white text-xs text-black font-semibold py-1 px-3 cursor-pointer rounded">
                Next
              </button>
            </div>
          </div>
    </>
  );
};

export default MilesStonesRightSlider;
