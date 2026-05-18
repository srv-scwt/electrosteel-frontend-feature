"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";


// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BlogDetailsSlider = ({ slides }) => {
  return (
    <div className="blog-details-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
              pagination={{ clickable: true , dynamicBullets : true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] md:h-[760px]">
              <img
                src={slide.img}
                alt={slide.alt || `Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogDetailsSlider;
