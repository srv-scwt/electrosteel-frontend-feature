import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const AdvantagesOfFlange = ({ data , sectionID }) => {
  return (
    <>
      <section id={sectionID}>
        <div className={styles.containerLg}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <HTMLRender htmlString={data?.title} />
            <HTMLRender htmlString={data?.desc} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvantagesOfFlange;
