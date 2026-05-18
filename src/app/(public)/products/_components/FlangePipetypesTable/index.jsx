"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import style from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

const FlangePipeTable = ({ data, tableHeaders, tableData }) => {
  const [open, setOpen] = useState(true);
  return (
    <section className="bg-white" id="cardName">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div>
            <HTMLRender htmlString={`<p>${data?.tableLabel}</p>`} />
          </div>
          <div className={`${style.tableWrapper} rounded-[16px] shadow-sm mt-3`}>
            <table
              cellPadding="10"
              border="1"
              className="w-full text-left min-w-[800px] md:min-w-[1000px] lg:min-w-0 border-collapse"
            >
              <thead>
                <tr>
                  <th
                    className=" p-4 md:p-6 text-white bg-[#00418e] md:text-base"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? (
                      <IoChevronDown size={18} />
                    ) : (
                      <IoChevronForward size={18} />
                    )}
                  </th>
                  {Array.isArray(tableHeaders?.headerTop) && tableHeaders?.headerTop?.map((th, i) => (
                    <th
                      key={i}
                      className=" p-4 md:p-6 text-white bg-[#00418e] md:text-base"
                    >
                      {th?.label}
                    </th>
                  ))}
                </tr>
              </thead>
              {open && (
                <tbody>
                  {Array.isArray(tableData) && tableData?.map((item, index) => (
                    <tr
                      key={index}
                      className={` ${index % 2 === 0 ? "bg-[#c7d7ef]" : ""}`}
                    >
                      <td className=" py-3 px-4 md:py-4 md:px-6"></td>
                      <td className=" py-3 px-4 md:py-4 md:px-6">
                        <HTMLRender htmlString={item?.dn} />{" "}
                      </td>
                      <td className=" py-3 px-4 md:py-4 md:px-6">
                        {item?.externalDia}
                      </td>
                      <td className=" py-3 px-4 md:py-4 md:px-6">
                        {item?.toleranceDE}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <HTMLRender htmlString={`<p>${data?.tableNote}</p>`} />
        </div>
      </div>
    </section>
  );
};

export default FlangePipeTable;
