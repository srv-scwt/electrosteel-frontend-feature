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
import { createImageSourceURL, formatDate } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";
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
            {Array.isArray(cardData) && cardData?.map((post, index) => (
              <SwiperSlide key={index} className={`pb-[10px] ${styles.cardSlide}`}>
                <div key={post.id} className={`${styles.socialCardWrapper} ${styles.socialCardWrapper1} shadow-xl`}>
                  <div className={styles.socialCardImage}>
                    <Image
                      src={createImageSourceURL(post?.image)}
                      alt={post?.title}
                      fill
                      className="w-full h-full absolute object-cover"
                    />
                  </div>
                  <div className={styles.sectionContent}>
                    <span>{formatDate(post?.date)}</span>
                    <HTMLRender htmlString={`<h3>
                      ${post?.description.length >= 80
                        ? `${post?.description.slice(0, 80)}...`
                        : post?.description
                      }
                    </h3>`} />
                    <div className={styles.cardLink}>
                      <OutlineButtonLink goto={`newsroom/blog/${post.slug}` ?? '#'} title={"Read More"} />
                    </div>
                  </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
        <div className={`${cstyles.containerLg} pb-0! w-full flex items-center justify-center`}>
          <OutlineButtonLink goto={"/"} title={"load more"} iconActive={true} className={"flex items-center !justify-center"} />
        </div>
      </div>
    </section>
  );
}
