"use client";
import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import { ButtonLink } from "@/components/ui/Button";
import { createVideoSourceURL } from "@/utils";

export default function VideoWaterSection({ waterSectionData }) {
  const dropWaterSectionData = waterSectionData?.[0];
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        src={createVideoSourceURL(dropWaterSectionData?.video)}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#004AA175]" />
      <div className="max-w-[1920px] m-auto">
        <div className={styles.containerLg}>
          <div className="relative flex flex-col xl:flex-row z-10 text-white">
            {/* Left Content */}
            <div
              className={`${styles.sectionContentTitle} ${styles.sectionContent}`}
            >
              <h2>{dropWaterSectionData?.title ?? ""}</h2>
              <h3>{dropWaterSectionData?.sub_title ?? ""}</h3>
              <p>{dropWaterSectionData?.description ?? ""}</p>
              <div className="flex-1">
                <ButtonLink goto={"/"} title={"view more"} />
              </div>
            </div>

            {/* Right Content */}
            <div className={`flex items-start justify-end ${styles.videoDropBanner}`}>
              <div className={`relative top-0 flex justify-start items-start ${styles.dropGifImage}`}>
                <Image
                  src={"/images/gif/waterdrop.gif"}
                  fill
                  alt="drop"
                  className="absolute w-[100%] h-[100%] object-cover object-right"
                />
              </div>
              <div className={`relatives ${styles.twoLeaves}`}>
                <Image
                  src={"/images/leavetwo.png"}
                  fill
                  className="absolute w-[100%] h-[100%] object-contain object-right"
                  alt="leaves"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
