import PaintApprovalsCard from "@/components/common/card/PaintApprovalsCard";
import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const ComprehensiveProducts = ({ data, productCategories =[] }) => {
  return (
    <>
      <section id={"product-range"}>
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing} mb-6`}>
            <HTMLRender htmlString={data?.title} />
            {data?.description && <HTMLRender htmlString={data?.description} />}
          </div>
          <div className="my-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {Array.isArray(productCategories) && productCategories?.map((item, index) => (
              <div key={item?.title} className="h-full">
                <PaintApprovalsCard
                  data={item}
                  isLeft={index % 2 ? true : false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ComprehensiveProducts;
