"use client";
import Breadcrumb from "@/components/common/breadcrumbs";
import styles from "./style.module.css";

export default function HeroSectionVideo({
  data,
  objectPosition = "object-center",
}) {
  return (
    <section
      className={`relative w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[480px] ${styles.container}`}
    >
      <video
        src={data.video}
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black ${data?.opacity ?? "opacity-10"}`}
      />

      {/* Content Block (white with angle) */}
      <div className="absolute bottom-[-2px] left-0 w-full flex items-end">
        <div
          className={`relative bg-white w-full md:w-[55%] lg:w-[45%] ${styles.angledSection}`}
        >
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
