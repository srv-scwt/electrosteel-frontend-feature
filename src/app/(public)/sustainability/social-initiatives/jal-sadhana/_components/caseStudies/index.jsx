"use client";
import Image from "next/image";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { createImageSourceURL } from "@/utils";

const CaseStudies = ({ data = [] }) => {
  return (
    <div>
      <div className={styles.containerLg}>
        <div className={`flex gap-2 ${styles.sectionTopTitleGap}`}>
          <div
            className={`${styles.sectionContentTitle} ${styles.sectionContentTitlemain} flex-1`}
          >
            <h2>
              Case <span>studies</span>
            </h2>
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
            {Array.isArray(data) && data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.testimonialsCardWrappers}>
                  <div className="grid grid-cols-1">
                    <div className="">
                      <div className={styles.caseStudyCard}>
                        <Image
                          src={createImageSourceURL(item?.image)}
                          alt={item?.title}
                          fill
                          className="absolute h-[100%] w-[100%] object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className={styles.sectionCardContent}>
                      <h3>{item?.title}</h3>
                      <div className={styles.cardLink}>
                        <OutlineButtonLink
                          goto={item?.link ?? "#"}
                          title={"read more"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </div>
  )
}

export default CaseStudies;