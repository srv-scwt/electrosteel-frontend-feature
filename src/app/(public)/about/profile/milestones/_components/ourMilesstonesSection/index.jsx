"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import MilesStonesRightSlider from "../milesStonesRightSlider";

const OurMilesstonesSection = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const milestones = [
        { year: "2022", text: "Srikalahasthi Pipes Limited is merged into Electrosteel Castings Limited" },
        { year: "2020", text: "Expansion of Captive Power Plant at Haldia with Waste Heat Recovery Boiler" },
        {
            year: "2019",
            text: (
                <ul className="list_bullet text-left list-disc pl-4">
                    <li>A state-of-the-art Ferro Alloy Plant was set up at Haldia</li>
                    <li>6th March - celebrating 25 years of pioneering DI Pipes in India </li>
                </ul>
            )
        },
        { year: "2017", text: "Launch of the EmpWin App &ndash; a platform where employees can connect, share and learn" },
        { year: "2014", text: "A new DI Fittings &amp; Accessories Plant was established for mass production, with a modern casting and finishing facility" },
        { year: "2012", text: "A new pipe finishing facility was established at Bansberia near Kolkata with a state-of-the-art DI pipe coating and lining arrangement" },
        { year: "2011", text: "Tied up US$ 200 mn through ECB" },
        {
            year: "2008", text: "Tied up US$ 77.50 mn through ECB, commissioned 360,000 TPA sinter plant at Khardah and commissioned a 75,000 TPA coke oven battery at Haldia"
        },
        { year: "2007", text: "Implemented SAP ERP System at the 1000 sq. ft. state-of-the-art Data Centre &ndash; thereby connecting all manufacturing plants and sales offices across India and supporting 350 user base to enable supply chain of the Company" },
        {
            year: "2006", text: (
                <ul className="list_bullet text-left list-disc pl-4">
                    <li>Dl Pipes manufacturing capacity was scaled from 2,00,000 TPA to 2,50,000 TPA</li>
                    <li>Coke Oven Plant was commissioned at Haldia</li>
                    <li>A 12 MW Power Plant and 30,000 TPA second Kiln Sponge Iron Plant was commissioned at Haldia</li>
                    <li>Mini Blast Furnace capacity was increased from 2,00,000 TPA to 2,35,000 TPA</li>
                    <li>Stampcharging System was installed in the Coke Oven Plant at Haldia, which enhanced operational efficiency</li>
                </ul>
            )
        },
        {
            year: "2005", text: (
                <ul className="list_bullet text-left list-disc pl-4">
                    <li>Electrosteel raised USD 40 Million through the issue of Global Depository Receipts (GDRs) in October 2005 and
                        became the first Indian Company to be listed on Professional Securities Market (PSM) of the London Stock Exchange
                        (LSE) in addition to being the first Company to issue GDRs on the PSM</li>
                    <li>Accorded Three Star Export House by the JDGFT, Ministry of Commerce and Industry of the Government of India</li>
                </ul>
            )
        },
        {
            year: "2003", text: (
                <ul className="list_bullet text-left list-disc pl-4">
                    <li>Dl Pipes manufacturing capacity was scaled from 1,50,000 TPA to 200,000 TPA</li>
                    <li>The Company also received BSI Kitemark license for Dl Fittings at Khardah works, West Bengal.</li>
                </ul>
            )
        },
        { year: "2002", text: "The Company acquired 46% stake in Lanco Industries Limited (Now ECL-SW) in March 2002, which is involved in manufacturing of DI Pipes, Pig Iron, Cement and Castings" },
        {
            year: "2001", text:
                (
                    <ul className="list_bullet text-left list-disc pl-4">
                        <li>Dl Pipes manufacturing capacity was scaled from 120,000 TPA to 150,000 TPA</li>
                        <li>Mini Blast Furnace capacity was increased from 1,09,000 TPA to 2,00,000 TPA</li>
                    </ul>
                )
        },
        {
            year: "2000", text:
                (
                    <ul className="list_bullet text-left list-disc pl-4">
                        <li>Manufacturing capacity of DI Pipes was increased to 120,000 TPA</li>
                        <li>The Company obtained Kitemark license from British Standard Institute (BSI), UK for Dl fittings manufactured at
                            our facility in Elavur, Chennai as per ISO 2531, BS EN 545, and BS EN 598</li>
                    </ul>
                )
        },
        {
            year: "1999", text:
                (
                    <ul className="list_bullet text-left list-disc pl-4">
                        <li>The Company obtained Kitemark license from British Standard Institute (BSI) for its Dl pipes as per ISO 2531, BS
                            EN 545, BS EN 598</li>
                        <li>The Company commissioned its own mini-blast furnace with matching capacity for better quality control</li>
                    </ul>
                )
        },
        { year: "1996", text: "Accredited with ISO 9002 from Indian Register Quality System - an accredited body of &lsquo;Raad Voor de Certificate of Netherlands&rsquo; for Ductile Iron Pipes" },
        { year: "1995", text: "Setting up of 60000 TPA Ductile Iron Pipe Plant at Khardah near Kolkata, the first ever in India" },
        { year: "1994", text: "Electrosteel Group took over Shakti Pipes of Chennai to enhance the production of Cast Iron Spun Pipes" },
        { year: "1982", text: "Production of Cast Iron Spun Pipes started along with other steel castings" },
        { year: "1959", text: "Electrosteel Castings Ltd. was born" },
        { year: "1955", text: "Electrosteel founded — our humble beginning." },
    ];

    return (
        <section>
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
                        <div
                            className="milesStonesLeft bg-[url('/images/miles_stones/milestones-bg1.jpg')] bg-no-repeat bg-bottom bg-cover h-full p-4 lg:p-[40px] text-center"
                        >
                            <h2 className="text-3xl font-bold mb-3">
                                Our <span className="text-[#ffd700]">Milestones</span>
                            </h2>
                            <p className="mb-5">
                                Discover our history, our progress, our plants, our accredited
                                products, our partnerships and more since 1955, and relive this
                                incredible journey with us.
                            </p>

                            <div className="leftSwiperHolder">
                                {/* Thumbnail / Year Swiper */}
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    navigation={true}
                                    loop={true}
                                    modules={[Navigation, Thumbs, Controller]}
                                    className="mySwiper mb-6"
                                    controller={{ control: mainSwiper }}
                                    breakpoints={{
                                        320: { slidesPerView: 2 },
                                        640: { slidesPerView: 3 },
                                        1199: { slidesPerView: 4 },
                                    }}
                                    // onSlideChange={(swiper) => {
                                    //     const firstVisible = swiper.activeIndex;
                                    //     setActiveIndex(firstVisible);
                                    //     if (mainSwiper) mainSwiper.slideTo(firstVisible);
                                    // }}
                                    // onClick={(swiper) => {
                                    //     const clicked = swiper.clickedIndex;
                                    //     if (clicked !== undefined && clicked !== null) {
                                    //         setActiveIndex(clicked);
                                    //         if (mainSwiper) mainSwiper.slideTo(clicked);
                                    //     }
                                    // }}
                                >
                                    {milestones.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className={`py-3 px-4 cursor-pointer rounded-md text-md font-medium transition 
                          ${activeIndex === index
                                                        ? "bg-white text-black"
                                                        : "bg-[white/10] hover:bg-white/80"
                                                    }`}
                                            >
                                                {item.year}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Content Swiper (Linked to Thumbnails) */}
                                <Swiper
                                    onSwiper={setMainSwiper}
                                    spaceBetween={10}
                                    navigation={false}
                                    loop={true} 
                                    modules={[Navigation, Thumbs, Controller]}
                                    controller={{ control: thumbsSwiper }}
                                    className="mySwiper2"
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                >
                                    {milestones.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="bg-white/80 text-black p-5 rounded-[12px] shadow-md">
                                                <div className={styles.sliderTextContent}>{item.text}</div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        {/* right slider content */}
                        <MilesStonesRightSlider />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurMilesstonesSection;
