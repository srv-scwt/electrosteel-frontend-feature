"use client";
import Image from "next/image";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css"
import { OutlineButton } from "@/components/ui/Button";
import ProductModal from "@/components/modals/productmodal";
import { useState } from "react";
// import { productModalData } from "./m.data";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

export default function OurProductSection({ data }) {
  const [isModelOpen, setModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (products) => {
    setSelectedProduct(products);
    setModelOpen(true);
  };

  return (
    <section id="ourProductSection" className="bg-[#f9f9f9]">
      <div className={cstyles.containerLg}>
        {/* Heading */}
        <div className={styles.sectionContentTitle}>
          <h2>{data?.title}</h2>
          <h3>
            <HTMLRender htmlString={data?.sub_title} />
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#fff]">
          {Array.isArray(data?.products) && data?.products?.map((product, index) => {
            const isLastCol = (index + 1) % 3 === 0;
            const isLastRow = index >= 6;

            const borderClasses = [
              !isLastCol ? "border-r" : "",
              !isLastRow ? "border-b" : "",
              "border-gray-200",
            ].join(" ");

            return (
              <div
                key={product?.id || index}
                className={`flex flex-row lg:gap-0 md:gap-0 md:flex-col lg:flex-col ${borderClasses} ${styles.productBoxContainer}`}
              >
                <div className={styles.productIcon}>
                  <Image
                    src={createImageSourceURL(product?.icon)}
                    alt={product?.label}
                    width={48}
                    height={48}
                    className="object-contain object-center"
                  />
                </div>

                <div className={styles.sectionContent}>
                  <h4>{product?.label}</h4>
                  <p>{product?.sublabel}</p>
                  <OutlineButton
                    action={() => openModal(product)}
                    title={"view product"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModelOpen && (
        <ProductModal
          isOpen={isModelOpen}
          action={() => setModelOpen(false)}
          product={selectedProduct}
        />
      )}
    </section>
  );
}
