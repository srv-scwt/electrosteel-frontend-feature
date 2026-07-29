import React from "react";
import styles from "@/app/common.module.css";
import PaintFacilitiesCard from "@/components/common/card/PaintFacilitiesCard";
import HTMLRender from "@/components/ui/HTMLRender";
import Image from "next/image";


const CurrentManufacture = ({ data, paints = [] }) => {
  return (
    <>
      <section id={"current-manufacturing-facilities"} className="!pt-0">
        <div className={`${styles.containerLg} !pt-0`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-8 md:mb-12 items-start">
            <div className={`lg:col-span-6 xl:col-span-5 ${styles.sectionContent} ${styles.customUlListing}`}>
              <HTMLRender htmlString={data?.title} />
              <p className="pr-0 lg:pr-12 xl:pr-16 leading-relaxed">{data?.description}</p>
            </div>
            <div className="lg:col-span-6 xl:col-span-7 relative w-full h-64 lg:h-full min-h-[250px] lg:min-h-[350px] rounded-2xl overflow-hidden shadow-sm">
              <Image 
                src={data?.image || "/images/paints/banner.jpeg"} 
                alt="Manufacturing Excellence" 
                fill 
                className="object-cover object-center" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {Array.isArray(paints) && paints?.map((item, index) => {
              const iconMapping = [1, 5, 2, 6, 3, 7, 4, 8];
              const mappedIconId = iconMapping[index] || (index + 1);
              const cardData = {
                ...item,
                iconPath: `/images/paints/manufacturing_exellence/${mappedIconId}.png`
              };
              return (
                <PaintFacilitiesCard key={item?.title} data={cardData} isDifferent={index % 4 === 1 || index % 4 === 2} isLeft={false} />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentManufacture;
