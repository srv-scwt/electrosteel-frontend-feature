import React from "react";
import styles from './style.module.css'
import Image from "next/image";
import { OutlineButtonLink } from "@/components/ui/Button";

const SlideHorizontal = ({data}) => {
  return (
    <div className={styles.testimonialsCardWrapper}>
      <div className="grid grid-cols-2">
        <div className={styles.sectionCardContent}>
          <span>{data?.date ?? ""}</span>
          <h3>{data?.title ?? ""}</h3>
          <div className={styles.cardLink}>
            <OutlineButtonLink goto={"/"} title={"read more"} />
          </div>
        </div>
        <div className="">
          <div className={styles.testimonialsCardImage}>
            <Image
              src={data?.img ?? ""}
              alt={data?.title ?? ""}
              fill
              className="absolute h-[100%] w-[100%] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideHorizontal;
