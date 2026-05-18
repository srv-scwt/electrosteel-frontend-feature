"use client";
import Breadcrumb from "@/components/common/breadcrumbs";
import Image from "next/image";
import styles from "./style.module.css";
import { createImageSourceURL } from "@/utils";

function resolveHeroImageSource(data) {
  const source = data?.image || data?.banner || "";

  if (!source) {
    return "/images/board/policies_banner_large.jpg";
  }

  const normalizedSource = source.replaceAll("\\", "/");

  if (
    normalizedSource.startsWith("/") ||
    normalizedSource.startsWith("http://") ||
    normalizedSource.startsWith("https://") ||
    normalizedSource.startsWith("data:")
  ) {
    return normalizedSource;
  }

  return createImageSourceURL(normalizedSource);
}

export default function HeroSection({data , objectPosition="object-center"}) {
  const imageSource = resolveHeroImageSource(data);

  return (
    <section className={`relative w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[480px] ${styles.container}`}>
      {/* Background Image */}
      <Image
        src={imageSource}
        alt={data?.title || "Hero Section"}
        fill
        priority
        className={`${data?.imageFit ?? "object-cover"} ${objectPosition} `}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 bg-black ${data?.opacity ?? "opacity-10"}`} />

      {/* Content Block (white with angle) */}
      <div className="absolute bottom-[-2px] left-0 w-full flex items-end">
        <div className={`relative bg-white w-full md:w-[55%] lg:w-[45%] ${styles.angledSection}`}>
          {/* angled cut */}
          <div className="absolute top-0 right-[-79px] h-full w-20 bg-white hidden md:block [clip-path:polygon(0_0,100%_100%,0_100%)]"></div>

          <div className={styles.sectionContent}>
            <h1>{data?.title ?? "COMPANY PROFILE"}</h1>
            <Breadcrumb />
          </div>
        </div>
      </div>
    </section>
  );
}
