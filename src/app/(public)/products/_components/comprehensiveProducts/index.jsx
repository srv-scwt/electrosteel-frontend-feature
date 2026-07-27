import PaintApprovalsCard from "@/components/common/card/PaintApprovalsCard";
import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

import ProductCategoryCard from "@/components/common/card/ProductCategoryCard";

const ComprehensiveProducts = ({ data, productCategories =[], isDarkSection = false }) => {
  return (
    <>
      <section id={"product-range"} className={isDarkSection ? "bg-[#003366] text-white" : ""}>
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing} ${isDarkSection ? "[&_h2]:text-white [&_h2_span]:text-white [&_p]:text-gray-200" : ""}`}>
            <HTMLRender htmlString={data?.title} />
            {data?.description && <HTMLRender htmlString={data?.description} />}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {Array.isArray(productCategories) && productCategories?.map((item, index) => (
              <div key={item?.title} className="h-full">
                {item.image ? (
                  <ProductCategoryCard data={item} />
                ) : (
                  <PaintApprovalsCard
                    data={item}
                    isLeft={index % 2 ? true : false}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ComprehensiveProducts;
