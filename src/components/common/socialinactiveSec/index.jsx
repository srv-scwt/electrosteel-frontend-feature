import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const SocialInactiveSection = ({ id = "", data }) => {

  return (
    <section id={id} className={`${styles.containerLg} pb-0!`}>
      {/* Render only if title OR subtitle exists */}
      <div
        className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
      >
        <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />

        {data?.subtitle && <HTMLRender htmlString={`<h3>${data?.subtitle}</h3>`} />}
      </div>

      {data?.description && (
        <div className={styles.sectionContent}>
          <HTMLRender htmlString={`<p>${data?.description}</p>`} />
        </div>
      )}
    </section>
  );
};

export default SocialInactiveSection;
