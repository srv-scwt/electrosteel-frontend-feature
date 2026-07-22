"use client";
import styles from "@/app/common.module.css";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";


const TechnologyMantra = ({ data, images = [] }) => {
  return (
    <section id={"techisMantra"} className="">
      <div className={`${styles.containerLg}`}>
        <div className={`${styles.sectionContent} ${styles.customUlListing} mb-6`}>
          <HTMLRender htmlString={data?.title} />
        </div>

   <div className="w-full">
      <Swiper
        modules={[Autoplay, A11y, Pagination]}
        slidesPerView={3.5}
        spaceBetween={40}
        loop={true}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
              pagination={{ clickable: true , dynamicBullets : true }}
        observer={true}
        observeParents={true}
        breakpoints={{
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {Array.isArray(images) && images?.map((item, index) => (
          <SwiperSlide key={index} className="pb-10">
            <div className="relative h-[260px] w-full rounded-md bg-white">
              <Image
                src={createImageSourceURL(item?.img)}
                alt={item?.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


        <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
          <HTMLRender htmlString={`<p>${data?.description}</p>`} />
        </div>
      </div>
    </section>
  );
};

export default TechnologyMantra;
