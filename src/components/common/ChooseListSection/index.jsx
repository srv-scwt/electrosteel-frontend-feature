import React from "react";
import styles from "./style.module.css";
import cstyle from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

const ChooseListSection = ({ data }) => {
  const backgroundImage = createImageSourceURL(data?.image, "/images/product-details/background-img.jpg");

  return (
    <div
      id="appications"
      className={styles.backgroundImg}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
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
