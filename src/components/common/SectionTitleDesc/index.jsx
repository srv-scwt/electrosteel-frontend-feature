import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const SectionTitleDesc = ({data}) => {
  return (
    <section>
      <div className={`${styles.containerLg} pb-0!`}>
      <div className={styles.sectionContent}>
        <HTMLRender htmlString={`<h2>${data.title}</h2>`} />
        <HTMLRender htmlString={`${data.description}`} />
      </div>
      </div>
    </section>
  );
};

export default SectionTitleDesc;
