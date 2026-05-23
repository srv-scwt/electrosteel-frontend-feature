"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./style.module.css";
import commonStyles from "@/app/common.module.css";
import { createImageSourceURL, createVideoSourceURL } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";

const GallerySection = ({ contentHidden = false, imageData = [], data , padding="py-0!" , imageCSS = "object-contain object-center"}) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const videoRefs = useRef([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const mediaItems = Array.isArray(imageData) ? imageData : [];
  const hasMultipleSlides = mediaItems.length > 1;
  const sliderContent =
    typeof data?.slider_contet === "string" ? data.slider_contet : "";
  const hasSliderContent =
    !contentHidden &&
    sliderContent
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .trim().length > 0;
  const mediaHeightClass = hasSliderContent
    ? "h-[50vh] md:h-[55vh] lg:h-[60vh]"
    : "h-[50vh] md:h-[60vh] lg:h-[70vh]";

  useEffect(() => {
    if (
      !swiperInstance ||
      !hasMultipleSlides ||
      !prevRef.current ||
      !nextRef.current
    ) {
      return;
    }

    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;

    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [hasMultipleSlides, swiperInstance]);

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
      <div className={`${commonStyles.containerLg} ${padding}`}>
        <div
          className={`grid ${hasSliderContent ? styles.gridSplit : styles.gridFull} ${styles.gridContainer}`}
        >
          {/* CAROUSEL SECTION */}
          <div
            className={`w-[100%] ${styles.carouselColumn} ${
              hasSliderContent ? styles.carouselColumnSplit : styles.carouselColumnFull
            }`}
          >
            <div className="slider-container relative w-full">
              <Swiper
                modules={[Autoplay, A11y, Navigation]}
                navigation={
                  hasMultipleSlides
                    ? {
                        nextEl: nextRef.current,
                        prevEl: prevRef.current,
                      }
                    : false
                }
                rewind={hasMultipleSlides}
                speed={1000}
                slidesPerView={1}
                allowTouchMove={hasMultipleSlides}
                watchOverflow
                spaceBetween={0}
                autoplay={
                  hasMultipleSlides
                    ? {
                        delay: 4000,
                        disableOnInteraction: false,
                      }
                    : false
                }
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setSwiperInstance(swiper);
                  requestAnimationFrame(() => syncActiveVideo(swiper));
                }}
                onSlideChange={syncActiveVideo}
                className={`overflow-hidden w-[100%] h-[100%] ${styles.swiperSurface}`}
              >
                {mediaItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    {item.type === "image" ? (
                      <div className={`relative w-full ${mediaHeightClass}`}>
                        <Image
                          src={createImageSourceURL(item?.path)}
                          fill
                          alt=""
                          className={imageCSS}
                          sizes="100vw"
                        />
                      </div>
                    ) : (
                      <div className={`relative w-full ${mediaHeightClass}`}>
                        <video
                          ref={(node) => {
                            videoRefs.current[index] = node;
                          }}
                          src={createVideoSourceURL(item?.path)}
                          className="w-[100%] h-[100%] object-contain object-center bg-black"
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

              {hasMultipleSlides && (
                <>
                  <button
                    ref={prevRef}
                    type="button"
                    className="swiper-button-prev h-10 w-10 rounded-full bg-[#fdd307] p-2 transition-all hover:bg-[#efc805] flex items-center justify-center"
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft size={16} style={{ color: "#004aa1" }} />
                  </button>

                  <button
                    ref={nextRef}
                    type="button"
                    className="swiper-button-next h-10 w-10 rounded-full bg-[#fdd307] p-2 transition-all hover:bg-[#efc805] flex items-center justify-center"
                    aria-label="Next slide"
                  >
                    <FaChevronRight size={16} style={{ color: "#004aa1" }} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* TEXT SECTION */}
          {hasSliderContent && (
            <div className={`${styles.textColumn} text-gray-700 leading-relaxed`}>
              <div className={commonStyles.sectionContent}>
                <HTMLRender htmlString={sliderContent} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
