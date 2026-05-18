"use client";
import Breadcrumb from "@/components/common/breadcrumbs";
import Image from "next/image";
import styles from "./style.module.css";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[480px]">
      {/* Background Image */}
      <Image
        src={"/images/hero_banner.png"}
        alt={"Hero Section"}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10" />

      {/* Content Block (white with angle) */}
      <div className="absolute bottom-[-2px] left-0 w-full flex items-end">
        <div className={`relative bg-white w-full md:w-[55%] lg:w-[45%] ${styles.angledSection}`}>
          {/* angled cut */}
          <div className="absolute top-0 right-[-79px] h-full w-20 bg-white hidden md:block [clip-path:polygon(0_0,100%_100%,0_100%)]"></div>

          <div className={styles.sectionContent}>
            <h1>COMPANY PROFILE</h1>
            <Breadcrumb />
          </div>
        </div>
      </div>
    </section>
  );
}
