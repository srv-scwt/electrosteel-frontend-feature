import React from "react";
import styles from "@/app/common.module.css";
import PaintFacilitiesCard from "@/components/common/card/PaintFacilitiesCard";
import HTMLRender from "@/components/ui/HTMLRender";


const CurrentManufacture = ({ data, paints = [] }) => {
  return (
    <>
      <section id={"current-manufacturing-facilities"} className="!pt-0">
        <div className={`${styles.containerLg} !pt-0`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing} mb-8 md:mb-12`}>
            <HTMLRender htmlString={data?.title} />
            <p>{data?.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {Array.isArray(paints) && paints?.map((item, index) => (
              <PaintFacilitiesCard key={item?.title} data={item} isDifferent={index % 4 === 1 || index % 4 === 2} isLeft={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentManufacture;
