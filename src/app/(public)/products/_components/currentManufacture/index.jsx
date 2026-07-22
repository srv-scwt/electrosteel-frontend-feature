import React from "react";
import styles from "@/app/common.module.css";
import PaintFacilitiesCard from "@/components/common/card/PaintFacilitiesCard";
import HTMLRender from "@/components/ui/HTMLRender";


const CurrentManufacture = ({ data, paints = [] }) => {
  return (
    <>
      <section id={"current-manufacturing-facilities"} className="!pt-0">
        <div className={`${styles.containerLg} !pt-0`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing} mb-6`}>
            <HTMLRender htmlString={data?.title} />
            <p>{data?.description}</p>
          </div>
          <div className="my-6 space-y-6">
            {Array.isArray(paints) && paints?.map((item, index) => (
              <PaintFacilitiesCard key={item?.title} data={item} isDifferent={index % 2 ? true : false} isLeft={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentManufacture;
