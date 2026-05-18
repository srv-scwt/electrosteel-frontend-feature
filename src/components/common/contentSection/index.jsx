"use client";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";


const ContentSection = ({data , sectionID=""}) => {
  return (
    <section id={sectionID} className="">
      <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <HTMLRender htmlString={data?.title} />
            <HTMLRender htmlString={data?.description} />
          </div>
        </div>
    </section>
  );
};

export default ContentSection;
