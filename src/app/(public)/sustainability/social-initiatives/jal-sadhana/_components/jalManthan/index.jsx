"use client"
import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import { Autoplay, EffectFade, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

const JalManthan = ({ data = [] }) => {
  return (
    <section id="jal-manthan" className={`${styles.spacingX} relative w-full overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/gif/jalsamansevak.gif"
          alt="background"
          fill
          className="object-fill"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#298ED3] opacity-90 -z-10" />

      {/* Content */}
      <div className={styles.containerLg}>
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
              <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-12 items-center text-white">
                {/* Left Section */}
                <div className={`${styles.sectionContentTitle} ${styles.sectionContent} ${cstyles.customUlListing} ${cstyles.customUlListingWhite} ${styles.Listing}`}>
                  <HTMLRender htmlString={`<h3>${slides?.title ?? ""}</h3>`} className={`${styles.sectionContentTitle} ${styles.sectionContent} ${cstyles.customUlListing} ${cstyles.customUlListingWhite} ${styles.Listing} w-full`} />
                  <HTMLRender htmlString={slides?.description ?? ""} className={`${styles.sectionContentTitle} ${styles.sectionContent} ${cstyles.customUlListing} ${cstyles.customUlListingWhite} ${styles.Listing} w-full`}  />
                  <div className={styles.sectionLink}>
                    <OutlineButtonLink goto={slides?.link ?? '#'} title={"Explore Jal Manthan"} className={`!text-white`} />
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex justify-center">
                  <div className={`relative w-[100%] h-[450px] ${styles.jalImage}`}>
                    <Image
                      src={createImageSourceURL(slides?.image)}
                      alt={slides?.title}
                      fill
                      className="rounded-[12px] w-[100%] h-[100%] object-contain"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>))}
        </Swiper>
      </div>
    </section>
  );
};

export default JalManthan;
