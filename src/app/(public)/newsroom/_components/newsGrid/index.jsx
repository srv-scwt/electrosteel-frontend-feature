

"use client";

import Image from "next/image";
import FancyboxWrapper from "@/components/common/fancyBoxNews";
import styles from "@/app/common.module.css";
import { createImageSourceURL } from "@/utils";

const title = "News";

export default function NewsGrid({ sectionId, data = [] }) {
  if (!data?.length) return null;

  return (
    <section id={sectionId}>
      <div className={styles.containerLg}>
        <FancyboxWrapper>
          <div className={styles.sectionContent}>
            <h2>
              <span>{title}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.isArray(data) && data?.map((item, index) => {
              const imgSrc = createImageSourceURL(item?.image);

              if (!imgSrc) return null;

              return (
                <a
                  key={item?.id || index}
                  href={imgSrc}
                  data-fancybox="news"
                  data-caption={item?.title || ""}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                >
                  <div className="relative h-60">
                    <Image
                      src={imgSrc}
                      alt={item?.title || "News image"}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <div className={`${styles.sectionContent} w-full`}>
                      <h3 className="text-white">{item?.title || ""}</h3>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </FancyboxWrapper>
      </div>
    </section>
  );
}
