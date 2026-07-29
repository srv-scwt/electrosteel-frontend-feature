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
          <div className="block w-full mb-6 lg:mb-8 relative flow-root">
            <Image 
              src="/images/paints/s-b-i-2.png" 
              alt="Manufacturing Excellence" 
              width={800}
              height={800}
              style={{
                shapeOutside: `url('/images/paints/s-b-i-2.png')`,
                shapeMargin: '5rem',
              }}
              className="float-none lg:float-right w-full lg:w-[55%] xl:w-[60%] h-auto mb-4 lg:mb-0 lg:ml-8 object-contain object-right-top" 
            />
            <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
              <HTMLRender htmlString={data?.title} />
              <p className="pr-0 leading-relaxed text-justify">{data?.description}</p>
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
