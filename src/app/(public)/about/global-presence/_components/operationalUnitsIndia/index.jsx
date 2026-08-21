"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { OutlineButtonLink, OutlineButton } from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Tooltip from "@/components/ui/Tooltip";
import ProductModal from "@/components/modals/productmodal";
import HTMLRender from "@/components/ui/HTMLRender";

const toArray = (value) => {
  if (!value) return [];

  const arr = Array.isArray(value) ? value : [value];

  return arr
    .flatMap((item) =>
      String(item)
        .replace(/<[^>]*>/g, "")
        .split(/\n+/)
    )
    .map((item) => item.trim())
    .filter(Boolean);
};

const OperationalUnitsIndia = ({ operationalUnits = [] }) => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (unit) => {
    setSelectedProduct(unit);
    setModelOpen(true);
  };

  return (
    <section id="operational-units">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2>
            Operational <span>Units</span>
          </h2>

          <h3 id="operational-units-india" className="flex gap-2">
            India
            <Tooltip message="Find nearest office" />
          </h3>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={false}
            loop={operationalUnits.length > 2}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1520: { slidesPerView: 3 },
            }}
            className={`${commonStyles.operationalUnitsSwiper} mt-6`}
          >
            {operationalUnits.map((unit, index) => (
              <SwiperSlide key={unit?.id || index}>
                <div
                  className={`${commonStyles.officeBox} bg-white py-5 px-[40px] lg:px-[50px] lg:py-[30px] shadow-md border border-[#00000029] rounded-[12px] h-full`}
                >
                  <h4 className="text-sm md:text-lg font-semibold text-[#00418e] mb-2">
                    {unit?.title}
                  </h4>

                  <div className="!text-[#00418e] whitespace-pre-line mb-3 leading-relaxed">
                     <HTMLRender htmlString={unit?.address} />
                    {/* {toArray(unit?.address).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))} */}
                  </div>

                  <div className="mt-3 flex gap-4 justify-between items-center">
                    {unit?.map_link && unit?.map_link !== "/" && (
                      <OutlineButtonLink
                        goto={unit.map_link}
                        title="Google Map"
                        className="mt-4"
                        action={"external"}
                      />
                    )}

                    {unit?.description && (
                      <OutlineButton
                        action={() => openModal(unit)}
                        title="Know More"
                        className="mt-4"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {isModelOpen && selectedProduct && (
        <ProductModal
          isOpen={isModelOpen}
          action={() => setModelOpen(false)}
          product={{
            ...selectedProduct,
            label: selectedProduct?.title,
            mapLink: selectedProduct?.map_link,
          }}
          isViewDetails={false}
        />
      )}
    </section>
  );
};

export default OperationalUnitsIndia;