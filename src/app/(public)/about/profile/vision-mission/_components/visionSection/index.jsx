"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";

export default function VisionSection() {
  return (
    <section className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2>
             Our <span>Vision</span>
            </h2>
            <p>
              To match and supersede world-class standards, in both service and product delivery, by remaining committed to customer satisfaction; to expand horizons and push boundaries, both in our existing and future endeavours, so as to provide continuous growth, profit and prosperity to all our internal and external stakeholders.</p>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-[300px]  overflow-hidden shadow-md">
            <Image
              src="/images/corporateProfileImg.jpg"
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
