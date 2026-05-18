"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL, createVideoSourceURL } from "../../../../../utils";

export default function ElectroSteelSection({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white">
      <div className={`${cstyles.containerLg}`}>
        <div
          className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 items-start ${styles.electroSteelGrid}`}
        >
          <div className={styles.electroSteelContent}>
            <div
              className={`${styles.sectionContentTitle} ${styles.sectionContent}`}
            >
              <HTMLRender htmlString={`<h3>${data?.title ?? ""}</h3>` ?? ""} />
              <HTMLRender htmlString={`<p>${data?.sub_title ?? ""}</p>` ?? ""} />
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${styles.sectionContent}`}>
              {/* <HTMLRender htmlString={data?.box_data1 ?? ""} />
              <HTMLRender htmlString={data?.box_data2 ?? ""} /> */}
              <div dangerouslySetInnerHTML={{ __html: data?.box_data1 }} />
              <div dangerouslySetInnerHTML={{ __html: data?.box_data2 }} />
            </div>
            <div className="pt-4 pb-8">
              <OutlineButtonLink
                goto={data?.button_link ?? "#"}
                title={"read more"}
              />
            </div>
          </div>

          <div
            className={`relative ${styles.electrosteelVideo} rounded-[12px]`}
          >
            {!isPlaying ? (
              <div className="flex justify-end">
                <Image
                  src={createImageSourceURL(data?.image)}
                  alt="Strength Video"
                  width={800}
                  height={507}
                  className="object-fill object-center"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className={`absolute inset-0 flex items-center justify-center ${styles.playingButton}`}
                >
                  <Image
                    src="/images/play.png"
                    alt="Play"
                    width={60}
                    height={60}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                </button>
              </div>
            ) : (
              <video
                src={createVideoSourceURL(data?.video)}
                className="w-full h-full object-cover"
                autoPlay
                controls
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
