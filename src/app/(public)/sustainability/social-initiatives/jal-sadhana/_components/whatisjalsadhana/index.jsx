"use client";
import Image from "next/image";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

export default function WhatisJalSadhana({ label, data = [], rotateImage = null }) {
  return (
    <section id="overview" className="relative">
      {/* White overlay */}
      <div className="absolute inset-0 bg-white opacity-70 z-0"></div>

      <div className={`${styles.spacingX} ${styles.containerLg} relative z-10`}>
        <div className={`${styles.sectionContent} flex-1`}>
          <HTMLRender htmlString={`<h2>${label?.title}</h2>`} />
          <HTMLRender htmlString={`${label?.description}`} />
        </div>
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center ${styles.jalSadhanaProperties}`}
        >
          {Array.isArray(data) && data?.map((items, index) => (
            <div key={index} className={styles.sectionContentCard}>
              <div className="relative w-[65px] h-[65px]">
                <Image
                  src={createImageSourceURL(items?.img)}
                  fill
                  className="absolute object-contain !w-[100%] !h-[100%]"
                  alt={`icons-${index}`}
                />
              </div>
              <HTMLRender htmlString={`<h3>${items?.title}</h3>`} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.earthRoundContainer} relative z-10`}>
        <div className={styles.earthRoundWrapper}>
          <div className={styles.earthRound}>
            <Image
              src={rotateImage || "/images/earthround.png"}
              fill
              className="absolute w-[100%] h-[100%]"
              alt="earth"
            />
          </div>
        </div>
      </div>

      <div className={`${styles.waves} relative z-10`}>
        <div className={styles.wavesImage}>
          <Image
            src={"/images/dighawaves.gif"}
            alt="digha waves"
            fill
            className="w-[100%] h-[100%] object-fill object-center"
          />
        </div>
      </div>
    </section>
  );
}
