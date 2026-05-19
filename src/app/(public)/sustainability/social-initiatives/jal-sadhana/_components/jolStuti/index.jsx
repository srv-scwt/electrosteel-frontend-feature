"use client";
import Image from "next/image";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import { Autoplay, EffectFade, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

export default function JolStuti({ data = [] }) {
  return (
    <section id="jal-stuti" className="bg-white">
      <div className={`${styles.containerLg}`}>
        <Swiper
          modules={[Autoplay, EffectFade, A11y, Pagination]}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1000}
          pagination={{ clickable: true, dynamicBullets: true }}
          className={`pb-[200px]`}
        >
          {Array.isArray(data) && data?.map((slides, index) => (
            <SwiperSlide key={index} className="pb-[30px]">
              <div
                className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 items-start ${styles.electroSteelGrid} gap-8`}
              >
                {/* Right Side: Video Thumbnail / Video */}
                <div className="flex justify-center">
                  <div
                    className={`relative w-[100%] h-[300px] md:h-[400px] lg:h-[450px] ${styles.jalImage}`}
                  >
                    <Image
                      src={createImageSourceURL(slides?.image)}
                      alt={slides?.title ?? "Jal Stuti"}
                      fill
                      className="rounded-[12px] w-[100%] h-[100%] object-contain"
                    />
                  </div>
                </div>

                {/* Left Content */}
                <div className={styles.electroSteelContent}>
                  <div className={`${styles.sectionContentTitle} ${styles.sectionContent}`}>
                    <HTMLRender htmlString={`<h3>${slides?.title ?? ""}</h3>`} className={`${styles.sectionContentTitle} ${styles.sectionContent} w-full`} />
                    <HTMLRender htmlString={slides?.description ?? ""} className={`${styles.sectionContentTitle} ${styles.sectionContent} w-full`} />
                  </div>
                  <div>
                    <OutlineButtonLink goto={slides?.link ?? "#"} title={"Explore Jal Stuti"} />
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
