"use client";

import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

const PipeArtPostSection = () => {
  // === Data Array ===
  const pipeArtItems = [
    {
      title: "TRUST",
      img: "/images/pipe-art/trust_thumb1.jpg",
      link: "/",
    },
    {
      title: "INNOVATION",
      img: "/images/pipe-art/innovation_cart_thumb.jpg",
      link: "/",
    },
    {
      title: "RESPONSIBILITY",
      img: "/images/pipe-art/responsible_thumb.jpg",
      link: "/",
    },
    {
      title: "PURITY",
      img: "/images/pipe-art/purity_thumb.jpg",
      link: "/",
    },
    {
      title: "EXPANDING BOUNDARIES",
      img: "/images/pipe-art/expanding_thumb.jpg",
      link: "/",
    },
    {
      title: "INSPIRATION",
      img: "/images/pipe-art/inspiration_canvas_thumb.jpg",
      link: "/",
    },
  ];

  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 xl:gap-12 items-start">
            {pipeArtItems.map((item, index) => (
              <div
                key={index}
                className="bg-white px-4 py-[40px] shadow-md text-center"
              >
                <div className="relative w-full h-[132px] mb-[20px]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="!w-full mb-3">{item.title}</h3>
                <ButtonLink
                  goto={item.link}
                  className="mx-auto"
                  title="Know more"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipeArtPostSection;
