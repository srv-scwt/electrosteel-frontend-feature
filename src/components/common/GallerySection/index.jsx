"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styles from "./style.module.css";
import commonStyles from "@/app/common.module.css";
import { createImageSourceURL, createVideoSourceURL } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";

const GallerySection = ({ contentHidden = false, imageData = [], data }) => {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const mediaItems = Array.isArray(imageData) ? imageData : [];
  const hasMultipleSlides = mediaItems.length > 1;

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  const syncActiveVideo = (swiper) => {
    const activeIndex = swiper?.realIndex ?? 0;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (mediaItems[index]?.type === "video" && index === activeIndex) {
        swiper?.autoplay?.stop();
        const playPromise = video.play();
        if (playPromise?.catch) playPromise.catch(() => {});
        return;
      }

      video.pause();
      video.currentTime = 0;
    });

    if (mediaItems[activeIndex]?.type !== "video") {
      swiper?.autoplay?.start();
    }
  };

  const handleVideoEnded = () => {
    swiperRef.current?.slideNext();
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
            <button
              type="button"
              onClick={prevSlide}
              className={styles.actionBtn}
              aria-label="Previous slide"
              disabled={!hasMultipleSlides}
            >
              <IoChevronBack />
            </button>

            {/* Swiper */}

            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              rewind={hasMultipleSlides}
              speed={900} // smoother fade speed
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              allowTouchMove={hasMultipleSlides}
              watchOverflow
              autoplay={
                hasMultipleSlides
                  ? {
                      delay: 2500,
                      disableOnInteraction: false,
                    }
                  : false
              }
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                requestAnimationFrame(() => syncActiveVideo(swiper));
              }}
              onSlideChange={syncActiveVideo}
              className="overflow-hidden w-[100%] h-[100%]"
            >
              {mediaItems.map((item, index) => (
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
                        ref={(node) => {
                          videoRefs.current[index] = node;
                        }}
                        src={createVideoSourceURL(item?.path)}
                        className="w-[100%] h-[100%] object-fit object-center"
                        muted
                        playsInline
                        preload="metadata"
                        controls={false}
                        onEnded={handleVideoEnded}
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Button */}
            <button
              type="button"
              onClick={nextSlide}
              className={`${styles.actionBtn} ${styles.actionBtn2}`}
              aria-label="Next slide"
              disabled={!hasMultipleSlides}
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
