import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import HTMLRender from "@/components/ui/HTMLRender";


const TestPerformed = ({ data }) => {
  return (
    <>
      <section id={"TestPerformed"} className="!pt-0">
        <div className={`${styles.containerLg} !pt-0`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing} mb-6`}>
            <HTMLRender htmlString={data?.title} />
          </div>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <CommonTable
              key={data?.title}
              columns={data?.columns}
              rows={data?.rows}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TestPerformed;
