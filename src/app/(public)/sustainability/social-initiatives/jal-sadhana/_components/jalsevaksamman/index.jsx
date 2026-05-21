import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

const JalSevakSanam = ({ data }) => {
  console.log(data);
  
  return (
    <section id="jal-sevak-samman" className={`${styles.spacingX} relative w-full overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/gif/jalsamansevak.gif"
          alt="background"
          fill
          className="object-fill"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#298ED3] opacity-90 -z-10" />

      {/* Content */}
      <div className={styles.containerLg}>
        <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-12 items-center text-white">
          {/* Left Section */}
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
            <HTMLRender htmlString={`<p>${data?.description}</p>`} />
            <div className={styles.sectionLink}>
              <OutlineButtonLink goto={data?.link ?? "#"} title={"Know More"} className={`!text-white`} />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex justify-center">
            <div className={`relative w-[100%] h-[450px] ${styles.jalImage}`}>
              <Image
                src={createImageSourceURL(data?.image)}
                alt="Jal Sevak Sanam"
                fill
                className="rounded-[12px] w-[100%] h-[100%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JalSevakSanam;
