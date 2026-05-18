"use client";

import Image from "next/image";
import React from "react";
import { OutlineButtonLink } from "@/components/ui/Button";
import styles from "./style.module.css";
import cStyle from "@/app/common.module.css";
import { createImageSourceURL } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";

const ProductDetailsSection = ({ sectionID, label, products = [], jointingSystemLink }) => {
  
  return (
     <section id={sectionID} className="bg-[#F5F5F5] py-8 md:py-0">
      <div className={cStyle.containerLg}>
        {/* Heading */}
        <div className={cStyle.sectionContent}>
          
          <HTMLRender htmlString={`<h2>${label?.title}</h2>`} />
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(products) && products?.map((product, index) => (
            <div
              key={index}
              className={`
                ${styles.productBoxContainer}
                flex flex-col items-start gap-6
                border-b border-gray-200
                lg:border-b-0
                lg:border-r
                last:border-r-0
              `}
            >
              {/* Icon */}
              <div className={styles.productIcon}>
                <Image
                  src={createImageSourceURL(product?.image)}
                  alt={product?.title}
                  width={180}
                  height={180}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className={styles.sectionContent}>
                <h4>{product?.title}</h4>
                <HTMLRender htmlString={`<p>${product?.description}</p>`} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-10">
          <OutlineButtonLink
            goto={jointingSystemLink}
            title="Download"
            className="font-700"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSection;
