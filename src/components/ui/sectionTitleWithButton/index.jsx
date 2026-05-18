import HTMLRender from "@/components/ui/HTMLRender";
import React from "react";
import styles from "./style.module.css";
import { ButtonLink } from "@/components/ui/Button";

const SectionTitleWithButton = ({ title , buttonActive = true , rightParaActive , titleCenter }) => {
  return (
    <div className={`flex gap-2 ${styles.sectionTopTitleGap} items-center `}>
      <div className={`${styles.sectionContentTitle} flex-1`}>
        <HTMLRender htmlString={title ?? ""} className={`${titleCenter ? styles.titleCenter : ""}`}/>
      </div>
      {buttonActive && (
        <div className={styles.buttonLink}>
        <ButtonLink goto={"/"} title={"view more"} />
      </div>
      ) }
     {rightParaActive && (
       <div className={`${styles.sectionContentPara}`}>
        <p>Discover more of the best in business, conference, social, and more with our curated video collections</p>
      </div>
     )}
      
    </div>
  );
};

export default SectionTitleWithButton;
