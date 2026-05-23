"use client";

import React, { useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import Image from "next/image";
import { createImageSourceURL } from "@/utils";

const FAQItem = ({
  itemKey,
  serialNumber,
  title,
  content,
  content2,
  imgUrl,
  tableTitle,
  tableData,
  tableColumns,
  tableRows,
  isOpen,
  onToggle,
}) => {
  const contentId = useId();

  return (
    <div
      className={`overflow-hidden rounded-[16px] md:rounded-[16px] border bg-white transition-all duration-300 ${
        isOpen
          ? "border-[#0B4DA2] shadow-[0_24px_60px_-32px_rgba(11,77,162,0.45)]"
          : "border-[#FACC15] shadow-[0_18px_48px_-32px_rgba(11,77,162,0.15)] hover:border-[#0B4DA2]"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isOpen ? "bg-[#0B4DA2] text-white" : "bg-white text-[#0B4DA2]"
        }`}
      >
        <button
          type="button"
          onClick={() => onToggle(itemKey)}
          className="flex w-full items-center gap-2 sm:gap-3 md:gap-4 px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-4 text-left cursor-pointer"
        >
          <span
            className={`flex-shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 
items-center justify-center rounded-xl md:rounded-2xl 
text-base sm:text-lg md:text-xl font-bold tracking-wide ${
              isOpen
                ? "border-[#FACC15] bg-[#FACC15] text-[#0B4DA2]"
                : "bg-[#0B4DA2] text-white"
            }`}
          >
            {String(serialNumber).padStart(2, "0")}
          </span>

          <span className="flex-1 min-w-0">
            <h4 className="text-[12px] leading-[1.35] sm:text-sm md:text-base lg:text-lg font-semibold break-words pr-1">
              {title}
            </h4>
          </span>

          <span className="flex-shrink-0 flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#FACC15] bg-[#FACC15] text-[#0B4DA2]">
            <FiChevronDown
              style={{ strokeWidth: 4 }}
              className={`text-sm sm:text-base transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          id={contentId}
          className="border-t border-[#E5E7EB] bg-white px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5"
        >
          {content && (
            <div className="text-sm md:text-base leading-7 [&_p]:mb-4 [&_ul]:mt-4 [&_ul]:mb-3 [&_li]:mb-1">
              <HTMLRender htmlString={content} />
            </div>
          )}

          {content2 && (
            <div className="text-sm md:text-base leading-7 [&_p]:mb-4 [&_ul]:mt-4 [&_ul]:mb-3 [&_li]:mb-1">
              <HTMLRender htmlString={content2} />
            </div>
          )}

          {imgUrl && (
            <div className="my-4 md:my-6">
              <Image
                src={imgUrl}
                alt={title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg object-contain"
              />
            </div>
          )}

          {Array.isArray(tableColumns) &&
            Array.isArray(tableRows) &&
            tableColumns.length > 0 &&
            tableRows.length > 0 && (
              <CommonTable
                className="!mt-3"
                title={tableTitle}
                columns={tableColumns}
                rows={tableRows}
              />
            )}
        </div>
      )}
    </div>
  );
};

const FAQAccordion = ({ data }) => {
  const [openItem, setOpenItem] = useState(null);

  if (!Array.isArray(data) || data.length === 0) return null;

  let serialCounter = 1;

  const handleToggle = (itemKey) => {
    setOpenItem((prev) => (prev === itemKey ? null : itemKey));
  };

  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
        {data?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8 md:mb-10">
            {section?.sectionName && (
              <h2 className="mb-4 md:mb-6 text-xl sm:text-2xl font-semibold text-[#0B4DA2]">
                {section.sectionName}
              </h2>
            )}

            <div className="space-y-3 md:space-y-4">
              {section?.data?.map((item, index) => {
                const currentSerial = serialCounter++;
                const itemKey = `${sectionIndex}-${item.id || index}`;

                return (
                  <FAQItem
                    key={itemKey}
                    itemKey={itemKey}
                    serialNumber={currentSerial}
                    title={item?.subtitle}
                    // content={item.description}
                    content2={item.description}
                    imgUrl={createImageSourceURL(item?.image)}
                    tableTitle={item?.tableData?.title}
                    tableColumns={item?.tableData?.columns}
                    tableRows={item?.tableData?.rows}
                    isOpen={openItem === itemKey}
                    onToggle={handleToggle}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;
