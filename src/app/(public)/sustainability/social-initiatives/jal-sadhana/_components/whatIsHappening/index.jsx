"use client";
import Image from "next/image";
import styles from './style.module.css'
import { OutlineButtonLink } from "@/components/ui/Button";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
const socialPosts = [
  {
    id: 1,
    date: "10th April, 2025",
    title:
      "Rivers carve cities, culture and life itself, in Portugal. And connecting across them...",
    img: "/images/waterheros/f1.png",
  },
  {
    id: 2,
    date: "21st February, 2025",
    title:
      "#ElectrosteelCastingsLtd is privileged to have partnered the #KeralaWaterAuthority",
    img: "/images/waterheros/f3.png",
  },
  {
    id: 3,
    date: "14th February, 2025",
    title:
      "#ElectrosteelCastingsLtd is proud to announce Manish Kumar of #Electrosteel",
    img: "/images/waterheros/f2.png",
  },
  {
    id: 3,
    date: "14th February, 2025",
    title:
      "#ElectrosteelCastingsLtd is proud to announce Manish Kumar of #Electrosteel",
    img: "/images/waterheros/f4.png",
  },
  {
    id: 3,
    date: "14th February, 2025",
    title:
      "#ElectrosteelCastingsLtd is proud to announce Manish Kumar of #Electrosteel",
    img: "/images/waterheros/f4.png",
  },
  {
    id: 3,
    date: "14th February, 2025",
    title:
      "#ElectrosteelCastingsLtd is proud to announce Manish Kumar of #Electrosteel",
    img: "/images/waterheros/f4.png",
  },
  {
    id: 3,
    date: "14th February, 2025",
    title:
      "#ElectrosteelCastingsLtd is proud to announce Manish Kumar of #Electrosteel",
    img: "/images/waterheros/f4.png",
  },
];

export default function WhatIsHappeing() {
  return (
    <section className="">
      <div className={styles.containerLg}>
        <div className={styles.sectionContentTitle}>
          <h2><span>What is happening</span></h2>
          <h3>Pellentesque habitant morbi tristique</h3>
          <p>Suspendisse lacinia interdum diam, in semper erat egestas nec. Aenean fermentum tellus tortor, non sagittis eros venenatis sit amet.</p>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> */}
           <Swiper
            modules={[Autoplay, A11y, Pagination]}
            slidesPerView={4}
            spaceBetween={40}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={1000}
                  pagination={{ clickable: true , dynamicBullets : true }}
            observer={true}
            observeParents={true}
            breakpoints={{
              1300: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
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
          {socialPosts.map((post , index) => (
             <SwiperSlide key={index}>
            <div className={styles.socialCardWrapper}>
              <div className={styles.socialCardImage}>
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="w-full h-full absolute object-cover"
                />
              </div>
              <div className={styles.sectionContent}>
                <span>{post.date}</span>
                <h4>{post.title}</h4>
                <div className={styles.cardLink}>
                  <OutlineButtonLink goto={"/"} title={"read more"} />
                </div>
              </div>
            </div>
            </SwiperSlide>
          ))}
          </Swiper>
        {/* </div> */}
          <div className={`${styles.cardLinkMain} flex justify-center`}>
                  <OutlineButtonLink goto={"/"} title={"View All News & Events"} />
                </div>
      </div>
    </section>
  );
}
