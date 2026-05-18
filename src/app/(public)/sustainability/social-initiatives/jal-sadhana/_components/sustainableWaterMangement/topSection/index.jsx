import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { OutlineButtonLink } from "@/components/ui/Button";
import { createImageSourceURL } from "@/utils";

const TopSection = ({ data }) => {
  return (
    <section
      className={`${styles.spacingX} ${styles.sectionH20H} relative w-full overflow-hidden`}
    >
      <div className={styles.containerLg}>
        <div className="relative grid grid-cols-1 xl:grid-cols-2 items-center text-white">
          <div className={` ${styles.sectionImage} relative`}>
            <Image
              src={createImageSourceURL(data?.image)}
              alt="H20H Facts"
              width={800}
              height={514}
              className=" w-[100%] rounded-[12px] object-cover object-center"
            />
          </div>
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={data?.title} />
            <HTMLRender htmlString={data?.description} />
            <div className={styles.cardLink}>
              <OutlineButtonLink
                goto={"/"}
                title={"read more"}
                className={"btn-white"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
