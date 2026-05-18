"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import style from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

const FlangedJointsTable = ({
  data,
  tableHeaders,
  tableData,
  borderRadiusClass = "rounded-[16px]",
}) => {
  const [open, setOpen] = useState(true);

  const isSectionRow = (item) =>
    item?.externalDia === "-" && item?.toleranceDE === "-";

  return (
    <section className="bg-white" id="cardName">
      <div className={`${styles.containerLg} !py-0`}>
        <div className={styles.sectionContent}>
          <div className={style.tableWrapper}>
            <div className={`overflow-x-auto !shadow-sm ${borderRadiusClass}`}>
              <table
                cellPadding="10"
                border="1"
                className="w-full text-left min-w-[800px] md:min-w-[1000px] lg:min-w-0 border-collapse"
              >
                <thead>
                  <tr>
                    <th
                      onClick={() => setOpen(!open)}
                      className="text-center cursor-pointer bg-[#00418e] text-white md:text-base"
                    >
                      <div className="flex items-center justify-center">
                        {open ? (
                          <IoChevronDown size={18} />
                        ) : (
                          <IoChevronForward size={18} />
                        )}
                      </div>
                    </th>

                    {Array.isArray(tableHeaders?.headerTop) &&
                      tableHeaders.headerTop.map((th, i) => (
                        <th
                          key={i}
                          className="p-4 md:p-6 bg-[#00418e] text-white md:text-base"
                        >
                          {th?.label}
                        </th>
                      ))}
                  </tr>
                </thead>

                {open && (
                  <tbody>
                    {Array.isArray(tableData) &&
                      tableData.map((item, index) => {
                        const sectionRow = isSectionRow(item);

                        if (sectionRow) {
                          return (
                            <tr key={`section-${index}`}>
                              <th className="py-3 px-4 md:py-4 md:px-6 bg-[#c7d7ef]"></th>
                              <th
                                className="py-3 px-4 md:py-4 md:px-6 bg-[#c7d7ef]"
                                colSpan={tableHeaders?.headerTop?.length || 3}
                              >
                                <HTMLRender htmlString={item?.dn || ""} />
                              </th>
                            </tr>
                          );
                        }

                        return (
                          <tr key={`row-${index}`}>
                            <td className="py-3 px-4 md:py-4 md:px-6"></td>

                            <td className="py-3 px-4 md:py-4 md:px-6">
                              <HTMLRender htmlString={item?.dn || ""} />
                            </td>

                            <td className="py-3 px-4 md:py-4 md:px-6">
                              <HTMLRender htmlString={item?.externalDia || ""} />
                            </td>

                            <td className="py-3 px-4 md:py-4 md:px-6">
                              <HTMLRender
                                htmlString={(item?.toleranceDE || "").replace(
                                  /\n/g,
                                  "<br />"
                                )}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlangedJointsTable;