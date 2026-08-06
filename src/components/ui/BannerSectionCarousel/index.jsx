"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FancyboxWrapper from "@/components/common/FancyBox";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./style.module.css";
import { createImageSourceURL } from "@/utils";

const BannerSectionCarousel = ({ images }) => {
  return (
    <FancyboxWrapper
      options={{ Thumbs: false, Toolbar: { display: ["close"] } }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        className={styles.bannerSectionSwiper}
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index}>
            <Link target="_blank" rel="noopener noreferrer" href={createImageSourceURL(item?.img)}>
              <div className="relative w-full h-64 md:h-80 lg:h-full">
                <Image
                  src={createImageSourceURL(item?.img)}
                  alt={item?.title || `Image ${index + 1}`}
                  fill
                  className="object-cover !relative"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </FancyboxWrapper>
  );
};

export default BannerSectionCarousel;
