import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
const LifeOfEClPeople = ({ data }) => {
   if (!data) return null;
  return (
    <section id="life-at-ecl" className={`${styles.containerLg} pb-0!` }>
      <div id="employee-engagement" className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}>
        <h2>{data?.title}</h2>
        <HTMLRender htmlString={`<h3>${data?.subtitle}</h3>`} />
      </div>
      <div  className={styles.sectionContent}>
        <p>{data?.description}</p>
      </div>
    </section>
  );
};

export default LifeOfEClPeople;
