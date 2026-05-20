"use client";
import Container90 from "@/components/common/Container90";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import React from "react";
import styles from "./style.module.css";
import commonStyles from "@/app/common.module.css";
import { createImageSourceURL, createVideoSourceURL } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";

const GallerySection = ({ contentHidden = false, imageData = [], data }) => {
  const swiperRef = useRef(null);
  const videoRef = useRef(null);

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();
  
  const handleVideoPlay = () => {
    swiperRef.current?.autoplay.stop(); // Stop autoplay during video
  };

  const handleVideoEnded = () => {
    swiperRef.current?.slideNext(); // Move to next slide
    swiperRef.current?.autoplay.start(); // Resume autoplay
  };

  return (
    <section className=" w-full">
      <div className={`${commonStyles.containerLg} py-0!`}>
        <div
          className={`grid ${!contentHidden ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} ${styles.gridContainer}`}
        >
          {/* CAROUSEL SECTION */}
          <div className="flex items-center w-[100%] gap-3">
            {/* Left Button */}
            <button onClick={prevSlide} className={styles.actionBtn}>
              <IoChevronBack />
            </button>

            {/* Swiper */}

            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              loop
              speed={900} // smoother fade speed
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="overflow-hidden w-[100%] h-[100%]"
            >
              {Array.isArray(imageData) && imageData?.map((item, index) => (
                <SwiperSlide key={index}>
                  {item.type === "image" ? (
                    <div className={styles.carouselContainer}>
                      <Image
                        src={createImageSourceURL(item?.path)}
                        // src={item?.path}
                        width={800}
                        height={450}
                        alt=""
                        className="w-[100%] h-[100%] object-contain object-center"
                      />
                    </div>
                  ) : (
                    <div className={styles.carouselContainer}>
                      <video
                        ref={videoRef}
                        src={createVideoSourceURL(item?.path)}
                        className="w-[100%] h-[100%] object-fit object-center"
                        autoPlay
                        muted
                        controls={false}
                        onPlay={handleVideoPlay}
                        onEnded={handleVideoEnded}
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              className={`${styles.actionBtn} ${styles.actionBtn2}`}
            >
              <IoChevronForward />
            </button>
          </div>

          {/* TEXT SECTION */}
          {!contentHidden && (
            <div className="text-gray-700 leading-relaxed">
              <div className={styles.sectionContent}>
                <HTMLRender htmlString={`<p>${data?.slider_contet}</p>`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
