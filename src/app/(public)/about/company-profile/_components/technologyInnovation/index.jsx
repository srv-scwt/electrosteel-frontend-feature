"use client";
import { ButtonLink, OutlineButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import styles from "./style.module.css"
import { createVideoSourceURL } from "../../../../../../utils";

export default function TechnologyInnovation({ data }) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden max-w-[1920px] m-auto">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 top-[-60px] w-[100%] h-[150%] object-cover"
      >
        <source 
        // src="/videos/innovationVideo.mp4" 
        src={createVideoSourceURL(data?.video ?? "/videos/innovationVideo.mp4")}
        type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#004AA1] opacity-30" />

      {/* Content */}
      <div className="relative z-10 ">
        <div className={styles.containerLg}>
          <div className={styles.sectionContent}>
            <h2>{data?.title ?? ""}</h2>
            <p>{data?.description ?? ""}</p>
          <div className="mt-6">
            <ButtonLink title={"view more"} goto={data?.buttonLink ?? "#"} />
          </div>
            </div>
        </div>
      </div>
    </section>
  );
}
