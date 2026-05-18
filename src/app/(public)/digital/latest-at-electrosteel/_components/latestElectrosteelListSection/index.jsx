"use client";

import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import FancyboxWrapper from "@/components/common/FancyBox";
import { ButtonLink } from "@/components/ui/Button";
import commonStyles from "./style.module.css";

// Event Data
const events = [
  {
    id: 1,
    title: "Electrosteel participated at CII's Water Innovation Summit - 2024",
    date: "12th & 13th November, 2024",
    description: `The 10th Water Innovation Summit "Viksit Bharat @2024, Water Partnerships for Sustainable and Inclusive Growth" 
    was held recently at New Delhi on 12-13th November. In this summit, leaders from Electrosteel shared their vision on Viksit Bharat 2047 
    and discussed the role of water and Electrosteel's contribution in the journey towards a developed India by 2047.
    The event was organised by CII Water Institute to bring together stakeholders to discuss and deliberate on diverse water-related issues.
    Electrosteel is a Platinum member of the CII Water Institute and sponsored a special session named as Leader's Vision on Viksit Bharat 2047 @ Water.
    We organised a guest presentation by Mr. Agam Mathur, Retd. Chief Engineer of PHED Rajasthan. Mr. Atindra Narayan Dey (AVP-Technical Services) 
    was one of the panellists in this session. The session had a very lively discussion to showcase good practices in the sector, 
    which will move us towards a developed India.`,
    images: [
      "/images/electrosteel-slider/slider1.png",
      "/images/electrosteel-slider/slider2.jpg",
      "/images/electrosteel-slider/slider3.jpg",
    ],
  },
  {
    id: 2,
    title: "Electrosteel awarded for Sustainable Practices at National Water Summit",
    date: "8th October, 2024",
    description: `Electrosteel was recognized for its leadership in sustainable water management and innovative practices 
    during the National Water Summit held in Mumbai. Our team highlighted success stories in circular economy and water reuse.`,
    images: [
      "/images/electrosteel-slider/slider2.jpg",
      "/images/electrosteel-slider/slider3.jpg",
      "/images/electrosteel-slider/slider1.png",
    ],
  },
  {
    id: 3,
    title: "Electrosteel hosts training workshop on smart water networks",
    date: "25th September, 2024",
    description: `A one-day technical workshop on smart water distribution systems was hosted by Electrosteel to promote innovation 
    and sustainable infrastructure. The event featured experts from across the country sharing advanced techniques and tools.`,
    images: [
      "/images/electrosteel-slider/slider3.jpg",
      "/images/electrosteel-slider/slider1.png",
      "/images/electrosteel-slider/slider2.jpg",
    ],
  },
];

const LatestElectrosteelListing = () => {
  return (
    <section>
      <div className={styles.containerLg}>
        {events.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 p-5 bg-white shadow-lg border border-gray-100 mt-4 first:mt-0 items-center"
          >
            {/* Left Content */}
            <div className={styles.sectionContent}>
              <h3>{event.title}</h3>
              <p className="!text-sm mb-4">{event.date}</p>
              <p className="text-[#545454] leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Right Swiper Slider with Fancybox */}
            <div className="relative w-full h-full lg:h-full overflow-hidden shadow-md">
              <FancyboxWrapper options={{ Thumbs: false, Toolbar: { display: ["close"] } }}>
                <Swiper
                  modules={[Navigation]}
                  navigation={true}
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                  className={commonStyles.electrosteelSwiper}
                >
                  {event.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <a
                        href={img}
                        data-fancybox={`gallery-${event.id}`} // each event separate group
                        // data-caption={`${event.title} - Image ${index + 1}`}
                      >
                        <div className="relative w-full h-64 md:h-80 lg:h-full">
                          <Image
                            src={img}
                            alt={`${event.title} - ${index + 1}`}
                            fill
                            className="object-cover !relative"
                          />
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </FancyboxWrapper>
            </div>
          </div>
        ))}

        <ButtonLink goto={"/"} title={"Next"} className="ml-auto mt-5" />
      </div>
    </section>
  );
};

export default LatestElectrosteelListing;
