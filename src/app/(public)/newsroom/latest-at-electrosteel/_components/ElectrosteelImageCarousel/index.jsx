'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { useRef } from 'react';
import styles from "@/app/common.module.css"

import 'swiper/css';
import { createImageSourceURL } from '@/utils';

export default function ElectrosteelImageCarousel({images}) {
  const swiperRef = useRef(null);

  return (
    <section>
      <div className={styles.containerLg}>
      <div className="relative w-full flex items-center gap-3">
      {/* Prev Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="bg-yellow-400 hover:bg-yellow-500 transition
                   p-3 rounded-md shadow-md"
        aria-label="Previous slide"
      >
        <GoArrowLeft size={22} />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full h-[450px] overflow-hidden"
      >
        {Array.isArray(images) && images?.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex items-center justify-center bg-white">
              <Image
                src={createImageSourceURL(src)}
                alt={`Electrosteel slide ${index + 1}`}
                width={1200}
                height={600}
                className="w-full h-full object-contain"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="bg-yellow-400 hover:bg-yellow-500 transition
                   p-3 rounded-md shadow-md"
        aria-label="Next slide"
      >
        <GoArrowRight size={22} />
      </button>
      </div>
      </div>
    </section>
  );
}
