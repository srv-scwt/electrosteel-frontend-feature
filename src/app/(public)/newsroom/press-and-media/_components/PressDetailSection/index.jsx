"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import style from "@/app/common.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Autoplay, A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { createImageSourceURL } from "@/utils";
import IframeEmbed from "@/components/common/IframeEmbed";
import HTMLRender from "@/components/ui/HTMLRender";

const fallbackImage = "/images/board/policies_banner_large.jpg";

export default function PressDetailSection({ data }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;

    swiperInstance.params.navigation.prevEl = prevRef.current;
    swiperInstance.params.navigation.nextEl = nextRef.current;

    swiperInstance.navigation.destroy();
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance]);

  if (!data) return null;

  const images =
    data.images && data.images.length > 0
      ? data.images
      : data.image
        ? [data.image]
        : [];

  return (
    <div className={style.containerLg}>
      {/* MEDIA */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative w-full">
          {data?.type === "image" && (
            <div className="slider-container relative w-full">
              {images.length > 0 ? (
                <Swiper
                  modules={[Autoplay, A11y, Navigation]}
                  navigation={{
                    nextEl: nextRef.current,
                    prevEl: prevRef.current,
                  }}
                  onSwiper={setSwiperInstance}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  spaceBetween={0}
                  loop={images.length > 1}
                >
                  {Array.isArray(images) && images?.map((img, index) => {
                    const imageSrc =
                      typeof img === "string"
                        ? img
                        : img?.src || img?.image || fallbackImage;

                    const imageAlt =
                      typeof img === "object" && img?.alt
                        ? img.alt
                        : data.title || "Press image";

                    return (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                          <Image
                            src={createImageSourceURL(imageSrc || fallbackImage)}
                            alt={imageAlt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                  <Image
                    src={fallbackImage}
                    alt="Fallback image"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <div
                    ref={prevRef}
                    className="swiper-button-prev h-10 w-10 rounded-full bg-[#fdd307] transition-all flex items-center justify-center p-2 hover:bg-[#efc805]"
                  >
                    <FaChevronLeft size={16} style={{ color: "#004aa1" }} />
                  </div>

                  <div
                    ref={nextRef}
                    className="swiper-button-next h-10 w-10 rounded-full bg-[#fdd307] transition-all flex items-center justify-center p-2 hover:bg-[#efc805]"
                  >
                    <FaChevronRight size={16} style={{ color: "#004aa1" }} />
                  </div>
                </>
              )}
            </div>
          )}

          {data?.type === "video" && (
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
              {data?.link ? (
                <IframeEmbed
                  videoLink={data?.link}
                  title={data?.title || "Video"}
                  className="w-full h-full rounded-[10px]"
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-contain bg-black"
                  src={data?.videoUrl || data?.link}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className={style.sectionContent}>
        <span className="text-sm text-blue-700">{data?.subtitle}</span>
        <h2>{data?.title}</h2>
        <HTMLRender htmlString={data?.editor_description} />
        {/* <p>{data?.editor_description}</p> */}
      </div>
       <div className="w-full flex justify-center mb-8">
        <div className="relative w-full">
          {data?.type === "video" && images && (
            <div className="slider-container relative w-full">
              {images.length > 0 ? (
                <Swiper
                  modules={[Autoplay, A11y, Navigation]}
                  navigation={{
                    nextEl: nextRef.current,
                    prevEl: prevRef.current,
                  }}
                  onSwiper={setSwiperInstance}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
                  spaceBetween={0}
                  loop={images.length > 1}
                >
                  {Array.isArray(images) && images?.map((img, index) => {
                    const imageSrc =
                      typeof img === "string"
                        ? img
                        : img?.src || img?.image || fallbackImage;

                    const imageAlt =
                      typeof img === "object" && img?.alt
                        ? img.alt
                        : data.title || "Press image";

                    return (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                          <Image
                            src={createImageSourceURL(imageSrc || fallbackImage)}
                            alt={imageAlt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                  <Image
                    src={fallbackImage}
                    alt="Fallback image"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <div
                    ref={prevRef}
                    className="swiper-button-prev h-10 w-10 rounded-full bg-[#fdd307] transition-all flex items-center justify-center p-2 hover:bg-[#efc805]"
                  >
                    <FaChevronLeft size={16} style={{ color: "#004aa1" }} />
                  </div>

                  <div
                    ref={nextRef}
                    className="swiper-button-next h-10 w-10 rounded-full bg-[#fdd307] transition-all flex items-center justify-center p-2 hover:bg-[#efc805]"
                  >
                    <FaChevronRight size={16} style={{ color: "#004aa1" }} />
                  </div>
                </>
              )}
            </div>
          )}
          </div>
          </div>
    </div>
  );
}

PressDetailSection.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    images: PropTypes.array,
    videoUrl: PropTypes.string,
    link: PropTypes.string,
  }),
};
