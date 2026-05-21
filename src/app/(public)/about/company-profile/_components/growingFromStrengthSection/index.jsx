"use client";
import Image from "next/image";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "../../../../../../utils";

export default function GrowingFromStrengthSection({ data }) {
  const strengthData = data?.[0];
  return (
    <section id="#growing-from-strength" className="">
      <div className={`${styles.containerLg} pb-0!`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={`<h2>${strengthData?.title ?? ""}</h2>`} />
            <p>{strengthData?.description ?? ""}</p>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-[380px]  overflow-hidden shadow-md">
            <Image
              // src={createImageSourceURL("uploads\\file-1777274398204-680927144.png")}
              src={createImageSourceURL(strengthData?.image)}
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
