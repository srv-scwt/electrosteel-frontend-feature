"use client";
import Image from "next/image";
import styles from "./style.module.css";
import { ButtonLink, OutlineButtonLink } from "@/components/ui/Button";
import newsData from "./m.data";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function JalSadhanaBlog() {
  return (
    <section className="bg-white">
      <div className={styles.containerLg}>
        <div className={`flex gap-2 ${styles.sectionTopTitleGap}`}>
          <div className={`${styles.sectionContentTitle} flex-1`}>
            <h2 className="!text-[#108F6E]">Jal Sadhana Blog</h2>
          </div>
          <div className={styles.buttonLink}>
            <ButtonLink
              goto={"/"}
              title={"learn more"}
              className={"btn-green btn-white"}
            />
          </div>
        </div>
          <Swiper
            modules={[Autoplay, A11y, Pagination]}
            slidesPerView={3}
            spaceBetween={40}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={1000}
                  pagination={{ clickable: true , dynamicBullets : true }}
            observer={true}
            observeParents={true}
            breakpoints={{
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 1.8,
                spaceBetween: 30,
              },
              576: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
          >
            {newsData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.testimonialsCardWrapper}>
                  <div className="grid grid-cols-2">
                    <div className={styles.sectionCardContent}>
                      <span>{item.date}</span>
                      <h3>{item.title}</h3>
                      <div className={styles.cardLink}>
                        <OutlineButtonLink goto={"/"} title={"read more"} />
                      </div>
                    </div>
                    <div className="">
                      <div className={styles.testimonialsCardImage}>
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="absolute h-[100%] w-[100%] object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </section>
  );
}
