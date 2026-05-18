"use client";
import React from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TwentyFiveYearsGloriousSection = () => {
  // Image data — add as many as you like
  const sliderImages = [
    "/images/corporateProfileImg.jpg",
    "/images/electrosteel-slider/slider1.png",
    "/images/electrosteel-slider/slider2.jpg",
    "/images/electrosteel-slider/slider3.jpg",
  ];

  return (
    <section className="bg-[url(/images/careers/years_bg.jpg)] bg-cover bg-no-repeat bg-center">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-center">
          {/* Left Content: Swiper Slider */}
          <div className="relative w-full h-64 md:h-80 lg:h-[450px] overflow-hidden shadow-md">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              spaceBetween={10}
              className={commonStyles.twentyFiveYearsSwiper}
            >
              {sliderImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-64 md:h-80 lg:h-[450px]">
                    <Image
                      src={img}
                      alt={`Electrosteel 25 years slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/*  Right Content */}
          <div className={`${styles.sectionContent} text-white`}>
            <h2 className="!text-white">
              25 Glorious Years with Electrosteel
            </h2>
            <p className="mb-3 !text-white">
              Congratulations to 170+ employees who reached the “25 Years of
              Service” milestone.
            </p>
            <p className="!text-white">We deeply value your incredible dedication and loyalty.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwentyFiveYearsGloriousSection;
