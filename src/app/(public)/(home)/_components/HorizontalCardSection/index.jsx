"use client";
import Image from "next/image";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css"
import { OutlineButtonLink } from "@/components/ui/Button";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitleWithButton from "@/components/ui/sectionTitleWithButton";
import { createImageSourceURL } from "@/utils";
// import HTMLRender from "@/components/ui/HTMLRender";

export default function HorizontalCardSection({ cardData = [] }) {
  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <SectionTitleWithButton
          title={" <h2>EVERYTHING ABOUT THE <span>BUSINESS WORLD</span> IN ONE PLACE.</h2>"}
          buttonActive={false}
          titleCenter={true}
        />

        <div >
          <Swiper
            modules={[Autoplay, A11y, Pagination]}
            slidesPerView={3}
            spaceBetween={40}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={1000}
            pagination={{ clickable: true, dynamicBullets: true }}
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
            {Array.isArray(cardData) && cardData?.map((post, index) => {
              const imageSrc = createImageSourceURL(
                post?.full_picture,
                "/images/blog/card/img1.png"
              );
              const message = post?.message ?? "";

              return (
                <SwiperSlide key={index} className={`pb-[10px] ${styles.cardSlide}`}>
                  <div key={post.id} className={`${styles.socialCardWrapper} ${styles.socialCardWrapper1} shadow-xl`}>
                    <div className={styles.socialCardImage}>
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        aria-hidden="true"
                        className={styles.socialCardImageBg}
                      />
                      <div className={styles.socialCardImageOverlay} />
                      <Image
                        src={imageSrc}
                        alt={post?.title || "Business post"}
                        fill
                        className={styles.socialCardImageMain}
                      />
                    </div>
                    <div className={styles.sectionContent}>
                      <span>{post?.date}</span>
                      <h3>
                        {message.length >= 120
                          ? `${message.slice(0, 120)}...`
                          : message
                        }
                      </h3>
                      <div className={styles.cardLink}>
                        <OutlineButtonLink goto={post?.permalink_url ?? '#'} title={"Read More"} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={`${cstyles.containerLg} pb-0! w-full flex items-center justify-center`}>
          <OutlineButtonLink goto={"/"} title={"load more"} iconActive={true} className={"flex items-center !justify-center"} />
        </div>
      </div>
    </section>
  );
}
