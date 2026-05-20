"use client";
import Image from "next/image";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitleWithButton from "@/components/ui/sectionTitleWithButton";

export default function SocialSection({ data }) {
  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <SectionTitleWithButton
          title={" <h2>ELECTROSTEEL ON <span>SOCIAL</span></h2>"}
          buttonActive={false}
          titleCenter={true}
        />

        <div >
          <Swiper
            modules={[Autoplay, A11y, Pagination]}
            slidesPerView={3}
            spaceBetween={40}
            loop={true}
            autoHeight={true}
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
            {Array.isArray(data) && data?.map((post, index) => (
              <SwiperSlide key={index}>
                <div key={post?.id} className={`shadow-xl ${styles.socialCardWrapper}`}>
                  <div className={styles.socialCardImage}>
                    <Image
                      src={post?.full_picture}
                      alt={post?.title}
                      fill
                      className="w-full h-full absolute object-cover"
                    />
                  </div>
                  <div className={styles.sectionContent}>
                    <span>{post?.date}</span>
                    <h3>
                      {post?.message.length >= 100
                        ? `${post?.message.slice(0, 100)}...`
                        : post?.message
                      }
                    </h3>
                    <div className={styles.cardLink}>
                      <OutlineButtonLink goto={post?.permalink_url ?? "/"} title={"Read More"} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
