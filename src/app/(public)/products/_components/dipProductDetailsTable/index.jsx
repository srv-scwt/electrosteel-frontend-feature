"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import style from "./style.module.css";
import Image from "next/image";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { OutlineButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
import CommonTable from "@/components/common/CommonTable";
import { createImageSourceURL } from "@/utils";


const DipProductDetails = ({ tableData, data, tableExtraData }) => {
  const [open, setOpen] = useState(true);
  return (
    <section id={"product-details"} className="bg-white">
      <div className={`${styles.containerLg} !pt-0`}>
        <div className={styles.sectionContent}>
          <div className="">
            <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
            <HTMLRender htmlString={`<p>${data?.description ?? data?.desc}</p>`} />
            {/* <HTMLRender htmlString={`<p>${data?.productCode}</p>`} /> */}
            <HTMLRender htmlString={`<h3>${data?.dimensionTitle}</h3>`} />
          </div>
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden rounded-xl">
            <Image
              src={createImageSourceURL(data?.dimensionImage ?? "/images/product-details/product-details-img.png")}
              alt={data?.dimensionTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 100vw,
               100vw"
              priority
            />
          </div>
          <div className="py-4">
            <HTMLRender htmlString={`<h4>${data?.tableData?.title}</h4>`} />
          </div>
          <div className={`${style.tableWrapper} rounded-[16px] shadow-sm`}>
            <div className="w-full flex justify-end items-end px-10 py-2 bg-[#00418e]">
              <div className={`flex gap-[90px] ${style.tableTopTitle}`}>
                {tableExtraData?.headerTop?.map((item, index) => {
                  return (
                    <HTMLRender
                      key={index}
                      htmlString={`<p>${item}</p>`}
                    />
                  );
                })}
              </div>
            </div>
            <CommonTable
              className={"!mt-0"}
              borderRadiusClass="!rounded-t-[0px] rounded-b-[16px]"
              key={tableData?.title}
              columns={tableData?.columns}
              rows={tableData?.rows}
            />
          </div>
          <HTMLRender htmlString={`<p><strong>${tableExtraData?.tableFooter}</strong></p>`} />
          <div className="w-full flex justify-center mt-5">
            <OutlineButtonLink goto="/faq" title="FAQ" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DipProductDetails;
