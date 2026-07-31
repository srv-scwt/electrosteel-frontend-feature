"use client";

import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { OutlineButtonLink } from "@/components/ui/Button";
import styles from "./style.module.css";
import cstyle from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function ManufacturingFacilities({ data, facilities = [] }) {
  console.log(data);
  
  return (
    <section className={`relative ${styles.spacingTop} ${styles.spacingBottom}`}>
      <div className="absolute inset-0 z-10 bg-[#F5F5F5] opacity-[38%] pointer-events-none"></div>

      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/map-bg.png"
          alt="Map Background"
          fill
          className="object-cover"
        />
      </div>

      <div className={styles.containerLg}>
        <div className="relative top-0 z-20">
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={`<h2>${data?.title ?? ""}</h2>`} />
            <HTMLRender htmlString={`<p>${data?.description ?? ""}</p>`} />
          </div>

          <div className={styles.sectionBtn}>
            <OutlineButtonLink goto={data?.link} title={"read more"} />
          </div>
        </div>
      </div>

      <div className={`snap-x snap-mandatory relative z-20 ${styles.carousel}`}>
        <Swiper
          modules={[Autoplay, A11y]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true  }}
          speed={3000}
          
        >
          {Array.isArray(facilities) &&
            facilities.map((f, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="snap-start flex-shrink-0 w-screen justify-between flex flex-col relative z-20">
                    <div className="h-90 xs:h-80 sm:h-70  lg:h-40">
                      <div
                        className={`${styles.containerLg} ${styles.carouselItem} flex flex-col lg:flex-row`}
                      >
                        <div
                          className={`${styles.sectionContent} ${cstyle.customUlListing}`}
                        >
                          <h4>{f?.title ?? ""}</h4>
                          <HTMLRender htmlString={f?.features ?? ""} />
                        </div>

                        <div
                          className={`${styles.sectionContent} ${styles.carouselItemRight} flex-1`}
                        >
                          <HTMLRender htmlString={f?.description ?? ""} />
                        </div>
                      </div>
                    </div>

                   <div className={`${styles.roadContainer}`}>
  <div className="flex items-end justify-center px-4">
    <div className={`flex-shrink-0 ${styles.flagContainer}`}>
      <Image
        src="/images/roadFlag1.png"
        alt="flag"
        width={150}
        height={150}
        className="object-contain"
      />
    </div>

    <div className={`flex items-start gap-3 bg-white shadow-lg ${styles.addressCard}`}>
      <div
        className={`flex flex-col gap-2 ${styles.sectionContentAddress} ${styles.bubble}`}
      >
        <HTMLRender htmlString={f?.address ?? ""} />

        <ul>
          <li>
            <p className="flex gap-1 items-center">
              <FaPhone size={20} color="#000000" />
              {f?.phone ?? ""}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div
    className={`bottom-0 relative left-0 w-full flex justify-center ${styles.roadContainer}`}
  >
    <Image
      src={
        facilities.length - 1 === index
          ? "/images/carv_road2.png"
          : index === 0
            ? "/images/carv_road.png"
            : "/images/line_road.png"
      }
      alt="Road"
      width={2400}
      height={187}
      className="object-fill object-bottom"
    />

    <div
      style={{
        left:
          facilities.length === 1
            ? "10%"
            : `${30 + (index / (facilities.length - 1)) * (70 - 50)}%`,
      }}
      className={`absolute top-[20%] ${styles.imageTruck}`}
    >
      <Image
        src="/images/truckGIF3.gif"
        alt="truck"
        fill
        priority
        className="object-fit rotate-y-[-180deg] w-[60%] h-[60%]"
      />
    </div>
  </div>
</div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
}
