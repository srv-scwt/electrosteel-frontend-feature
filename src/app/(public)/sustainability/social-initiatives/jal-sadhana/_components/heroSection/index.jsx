"use client";
import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import { ButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL, createVideoSourceURL } from "@/utils";

export default function HeroSection({ data }) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        src={createVideoSourceURL(data?.video_link)}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "#004AA175" }} />
      <div className={styles.containerLg}>
        <div className="relative z-10 grid grid-cols-12 gap-8 text-white">
          {/* Left Content */}
          <div
            className={`${styles.sectionContentTitle} ${styles.sectionContent} col-span-12 xl:col-span-8`}
          >
            <HTMLRender htmlString={`<h1>${data?.title}</h1>`} />
            <HTMLRender htmlString={`<p>${data?.description}</p>`} />
            
            <div className="">
              <ButtonLink
                goto={data?.url ?? "#"}
                title={"view more"}
                className={"btn-green btn-white"}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex items-start justify-end col-span-12 xl:col-span-4">
            <div className={`relative ${styles.dropGifImage}`}>
              <Image
                src={createImageSourceURL(data?.image)}
                fill
                alt="drop"
                className="absolute w-[100%] h-[100%] object-cover object-right"
              />
            </div>
            <div className={`relatives ${styles.twoLeaves}`}>
              <Image
                src={"/images/leavetwo.png"}
                fill
                className="absolute w-[100%] h-[100%] object-contain object-left-top"
                alt="leaves"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
