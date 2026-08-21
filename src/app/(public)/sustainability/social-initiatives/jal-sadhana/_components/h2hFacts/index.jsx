"use client";
import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import slidesData from "./s.data";
import { Autoplay, EffectFade, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const H2HFacts = () => {
  return (
    <section
      className={`${styles.sectionH20H} ${styles.spacingX} relative w-full overflow-hidden`}
    >
      <div className={styles.containerLg}>
        <Swiper
          modules={[Autoplay, EffectFade, A11y, Pagination]}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1000}
          pagination={{clickable: true}}
          className={` py-[80px]`}
        >
          {slidesData?.map((slides, index) => (
            <SwiperSlide key={index}>
              <div className={`relative grid grid-cols-1 xl:grid-cols-2 items-start ${styles.slidesWrapper}`}>
                <div className={`relative ${styles.imageWrapper}`}>
                  <Image
                    src={slides?.image ?? "/images/waterheros/h20hfacts.png"}
                    alt="H20H Facts"
                    fill
                    className="absolute w-100 h-100 object-contain object-center"
                  />
                </div>
                <div className={`${styles.sectionContent} ${styles.sectionSpacingY}`}>
                  <HTMLRender htmlString={slides?.title ?? ""} />
                  <HTMLRender htmlString={slides?.content ?? ""} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default H2HFacts;
