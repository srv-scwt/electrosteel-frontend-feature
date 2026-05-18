import React from "react";
import styles from "./style.module.css";
import cstyle from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const ChooseListSection = ({ data }) => {
  return (
    <div
      id="appications"
      className={`${styles.backgroundImg} bg-[url('/images/product-details/background-img.jpg')]`}
    >
      <div className={styles.container}>
        <div className={`${cstyle.sectionContent} ${styles.title}`}>
          <HTMLRender htmlString={data?.title} />
        </div>
        <div
          className={`${cstyle.sectionContent} ${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.textwhite}`}
        >
          <HTMLRender htmlString={data?.description} />
        </div>
      </div>
    </div>
  );
};

export default ChooseListSection;
