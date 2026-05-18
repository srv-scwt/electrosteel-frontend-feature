"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import Image from "next/image";
import VideoModal from "@/components/modals/VideoModel";
import { ButtonLink } from "@/components/ui/Button";

const videoList = [
    {
        id: 1,
        title: "ECL Corporate AV | Small Version",
        description:
            "Electrosteel, a premier supplier of water infrastructure and pipeline solutions with nearly 70 years of experience and a presence in over 114 countries, is thrilled to unveil our latest Corporate Video!",
        thumbnail: "/images/digital/video-thumbs1.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },
    {
        id: 2,
        title: "Electrosteel CSR Impact Video",
        description:
            "Our CSR initiatives are driving real change in communities through education, healthcare, and sustainability.",
        thumbnail: "/images/digital/video-thumbs2.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },

    {
        id: 3,
        title: "Electrosteel's Annual Food Fest: A Celebration of Gratitude and Togetherness",
        description:
            (
                <>
                <p>In keeping with the commitment to the 'Art of Giving', #Electrosteel's senior management hosted a delightful food fest for all employees, 'Khake Zaroor Jaana'.</p> <p>Khake Zaroor Jaana loosely translates to "Do Please Eat Before You Go" in English. This phrase is commonly used in a hospitable context in India, and reflects a cultural emphasis on hospitality.</p>
<p>Serving smiles and building bonds, Khake Zaroor Jaana is all about coming together, sharing a meal, and celebrating the family that we are at Electrosteel.</p>
                </>
                
            ),
        thumbnail: "/images/digital/video-thumbs3.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },

    {
        id: 4,
        title: "Remembering Electrosteel Legend | A Candid Conversation with Late. Shri Asim Sarkar",
        description:
            (
                <>
                <p>Electrosteel Castings Ltd is delighted to present a candid conversation with the legendary Lt. Shri Asim Sarkar, one of the pillars behind Electrosteel's Ductile Iron Pipes journey.</p>
<p>From indigenous innovation to timeless values, he shares insights, reflections, and a message for future generations. When you stand on the shoulders of giants, you see farther!</p>
                </>
                
            ),
        thumbnail: "/images/digital/video-thumbs4.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },

    {
        id: 5,
        title: "Electrosteel Jal Sevak Samman 2.0 Celebrating Water Warriors | Throwback",
        description:
            "Throwback to Electrosteel Castings Ltd Jal Sevak Samman Awards 2.0! Join us as we relive the moments, the magic, the achievements. Here's to the innovation, the passion and the efforts that went in.",
        thumbnail: "/images/digital/video-thumbs5.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },
    {
        id: 6,
        title: "Electrosteel's Electropur DI Pipes|Revolutionizing South African Water",
        description:
            "Electrosteel Castings Ltd is proud to introduce the Paarl Pipeline Project from the historic town of Paarl, South Africa. This groundbreaking initiative marks the beginning of a transformative phase in the region's water infrastructure, starting with the crucial upgrade and replacement of the bulk water pipeline between Ysterbrug and Victoria Pump Station. At the heart of this project is Electrosteel's revolutionary Electropur technology. Engineered for superior durability, Electropur offers long-lasting performance with high resistance to abrasion, chemicals, and fluid friction loss, making it ideal for water and wastewater management in diverse pH conditions. As we introduce this cutting-edge technology to Paarl, we lay the foundation for a sustainable and efficient water future in the region. Stay tuned as we continue to innovate and deliver excellence in every phase of the Paarl Pipeline Project.",
        thumbnail: "/images/digital/video-thumbs6.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },
    {
        id: 7,
        title: "78th Independence Day Celebrations at Electrosteel",
        description:
            "Proudly rooted in India, with a legacy that spans the globe - Electrosteel Castings Ltd has been at the forefront of innovation and excellence. This Independence Day, we celebrate our unwavering commitment to building a stronger, self-reliant India. From pioneering the 'Make in India' philosophy to leaving our mark in 110+ countries, our journey is a testament to India's relentless spirit of progress. Happy 78th Independence Day!",
        thumbnail: "/images/digital/video-thumbs7.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },
    {
        id: 8,
        title: "Corporate AV | Electrosteel",
        description:
            "Electrosteel a leading provider of water infrastructure and pipeline solutions to 110+ countries and with nearly 7 decades of experience, is proud to present our latest Corporate Video!",
        thumbnail: "/images/digital/video-thumbs8.png",
        // videoUrl: "https://www.youtube.com/watch?v=rIMA-dYEHrs&t=1s",
    },
];

const VideoListingSection = () => {
    const [openVideo, setOpenVideo] = useState(false);

    const handleVideoModelOpen = () => {
        setOpenVideo((prev) => !prev);
    };

    return (
        <>
            <section>
                <div className={styles.containerLg}>
                    {videoList.map((video) => (
                        <div
                            key={video.id}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-center border border-gray-200 md:rounded-[20px] rounded-[12px] md:p-[30px] p-3 shadow-md mt-5 first:mt-0"
                        >
                            {/* Thumbnail */}
                            <div
                                className="relative w-full h-64 md:h-80 overflow-hidden cursor-pointer group"
                                onClick={handleVideoModelOpen}
                            >
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover !w-full transition-transform duration-300 group-hover:scale-105"
                                />
                                <Image
                                    src="/images/icons/video-icon.png"
                                    alt="Play Icon"
                                    fill
                                    className={`${commonStyles.yIcon} absolute object-contain !w-[51px] !h-[37px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:scale-110 transition-transform duration-300`}
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            </div>

                            {/* Details */}
                            <div className={styles.sectionContent}>
                                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{video.description}</p>
                            </div>
                        </div>
                    ))}
                    <ButtonLink goto={"/"} title={"Next"} className="ml-auto mt-5" />
                    
                </div>
            </section>
            {openVideo && (
                <VideoModal
                    isModelOpen={openVideo}
                    onClose={handleVideoModelOpen}
                    title={videoList.title}
                />
            )}

        </>

    );
};

export default VideoListingSection;
