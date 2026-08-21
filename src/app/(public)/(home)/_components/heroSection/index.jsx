"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./style.css";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import styles from "./style.module.css";
import { ButtonLink } from "@/components/ui/Button";
import CountUp from "react-countup";
import {
  createImageSourceURL,
  createVideoSourceURL,
  parseCapacity,
  stripHtmlTags,
} from "@/utils";

export default function HeroSection({ slides, miniStats }) {
  const [current, setCurrent] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides?.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides?.length - 1 ? 0 : prev + 1));
    }, 12000);

    return () => clearInterval(interval);
  }, [slides?.length]);

  // Handle mute/unmute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <div className="relative w-full max-w-[1920px] m-auto overflow-hidden">
        {/* Slides */}
        {Array.isArray(slides) ? (
          slides?.map((slide, index) => (
            <div
              key={slide?.id}
              className={`absolute inset-0 w-full transition-opacity duration-700 ${
                index === current
                  ? "opacity-100 relative z-20"
                  : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Background: Image or Video */}
              {slide?.type === "video" ? (
                // <video
                //   ref={videoRef}
                //   src={createVideoSourceURL(slide?.src)}
                //   autoPlay
                //   muted={isMuted}
                //   loop
                //   playsInline
                //   className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
                // />
                <video
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
                >
                  <source
                    src={createVideoSourceURL(slide?.src)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={createImageSourceURL(slide?.src)}
                  alt={stripHtmlTags(slide?.src)}
                  fill
                  className="absolute inset-0 object-contain object-center z-0"
                />
              )}

              {/* Overlay */}

              {/* Content Section */}
              <div
                className={`relative z-30 heroSectionWrapper ${styles.heroSectionWrapper}`}
              >
                {/* <Container> */}
                <div className={`${styles.heroContainer}`}>
                  <div className="flex justify-between items-start">
                    <div className={`sectionContent ${styles.sectionContent}`}>
                      <h1>
                        {slide?.title ?? ""} <br />
                        <span>{slide?.highlight ?? ""}</span>
                      </h1>
                      <ButtonLink goto={slide?.url} title={"view more"} />
                    </div>

                    {/* Controller */}
                    <div className="hidden md:flex lg:flex actionBtn flex-col gap-3">
                      <button
                        onClick={prevSlide}
                        className="bg-yellow-400 text-black hover:bg-yellow-500 transition"
                      >
                        <GoArrowLeft />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="bg-yellow-400 text-black hover:bg-yellow-500 transition"
                      >
                        <GoArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <div className="relative bg-white">
        <div
          className={`${styles.slotsContainerBox} absolute bottom-[-16px] w-full h-auto z-50`}
        >
          <div className={"relative"}>
            <div
              className={`${slides?.[current].type !== "video" ? styles.bgArrowHeroCut : styles.bgArrowHeroCutFull}`}
            ></div>
            <div className={styles.bgArrowContainer}>
              <div
                className={`${styles.slotsBox4Wrapper} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4`}
              >
                {miniStats?.map((items, index) => {
                  // const capacityData = parseCapacity(items?.statsCount);
                  const capacityData = parseCapacity(items?.statsCount);

                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`${styles.bgCutArrowIcon} relative`}>
                        <Image
                          src={createVideoSourceURL(items?.cardImage)}
                          alt={""}
                          fill
                          className="absolute w-full h-full object-contain object-center"
                        />
                      </div>
                      <div className="flex flex-col bgWhiteContent">
                        {/* <p>{items?.statsCount ?? ""}+</p> */}
                        <p>
                          <CountUp
                            start={0}
                            end={capacityData?.count}
                            duration={3}
                            separator=","
                          />
                          {capacityData?.unit && capacityData?.unit}
                        </p>
                        <p>{items?.title ?? ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
