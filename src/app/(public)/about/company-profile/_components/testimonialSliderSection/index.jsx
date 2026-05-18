"use client";
import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const TestimonialSliderSection = () => {
  // Example testimonials (you can add more later)
  const testimonials =
  {
    id: 1,
    img: "/images/late-ghanshyam-kejriwal.jpg",
    quote:
      "What is a foundation made of? Not just bricks, mortar or steel. It is made of solid values. That is what our founder Shri Ghanshyam Kejriwal, fondly called “Bada Saab”, taught us. Leading from the front, Bada Saab dared to transform a small unit into a huge conglomerate. His vision and dedication put us on a global platform and made us a true Indian multi-national.",
    name: "Late Mr. Ghanshyam Kejriwal",
  };
  // {
  //   id: 2,
  //   img: "/images/late-ghanshyam-kejriwal.jpg",
  //   quote:
  //     "His leadership was a beacon of strength and inspiration for the entire team. He showed us that with perseverance and vision, anything is achievable.",
  //   name: "Another Person",
  // },


  return (
    // <section className="bg-[#f9f9f9]">
    //   <div className={styles.containerLg}>
    //     <div className={styles.sectionContent}>
    //       {/* <h2>Testimonials</h2> */}

    //       {/* ✅ Swiper Wrapper */}
    //       <Swiper
    //         modules={[Navigation, Pagination, Autoplay]}
    //         spaceBetween={30}
    //         slidesPerView={1}
    //               pagination={{ clickable: true , dynamicBullets : true }}
    //         autoplay={{ delay: 4000, disableOnInteraction: false }}
    //         className="testimonialSliderWrapper relative !pb-[40px]"
    //       >
    //         {testimonials.map((item) => (
    //           <SwiperSlide key={item.id}>
    //             <div className="flex flex-col md:flex-row gap-4 items-center">
    //               {/* Left image */}
    //               <div className="testomonialLeft relative">
    //                 <Image
    //                   src={item.img}
    //                   alt={item.name}
    //                   fill
    //                   className="object-cover !relative !min-w-[210px] !h-[284px]"
    //                 />
    //               </div>

    //               {/* Right content */}
    //               <div className="testimonilaRight">
    //                 <div className="flex justify-start mb-2">
    //                   <ImQuotesLeft className="text-2xl text-gray-300" />
    //                 </div>
    //                 <p>{item.quote}</p>
    //                 <div className="flex justify-end mt-2">
    //                   <ImQuotesRight className="text-2xl text-gray-300" />
    //                 </div>
    //                 <p>
    //                   <b>{item.name}</b>
    //                 </p>
    //               </div>
    //             </div>
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>
    //     </div>
    //   </div>
    // </section>
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Left image */}
            <div className="min-w-[280px] text-center">
              <div className="testomonialLeft relative h-[284px] mb-3">
                <Image
                  src={testimonials.img}
                  alt={testimonials.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p>
                <b>{testimonials.name}</b>
              </p>
            </div>

            {/* Right content */}
            <div className="testimonilaRight">
              {/* <div className="flex justify-start mb-2">
                <ImQuotesLeft className="text-2xl text-gray-300" />
              </div> */}

              <p>{testimonials.quote}</p>

              {/* <div className="flex justify-end mt-2">
                <ImQuotesRight className="text-2xl text-gray-300" />
              </div> */}

              {/* <p>
                <b>{testimonials.name}</b>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default TestimonialSliderSection;
