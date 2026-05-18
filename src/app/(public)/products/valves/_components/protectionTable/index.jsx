"use client";
import React, { useState } from "react";
import CommonModal from "@/components/modals/commonModal";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css"
import { OutlineButton } from "@/components/ui/Button";
const CommonTableInternal = ({ className, data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "" });

  if (!data) return null;

  const { table } = data;
  const { columns, rows } = table;

  const headerCell =
    "text-left md:p-4 sm:p-3 p-2 bg-[#00418e] text-white border border-white sticky top-0";
  const cell = "text-left md:p-4 sm:p-3 p-2 border border-gray-200 align-top";

  const handleMoreClick = (row) => {
    setModalContent({
      title: row.name,
      description: row.detailed || row.guiding, // Use detailed if provided
    });
    setOpenModal(true);
  };

  return (
    <>
      <div className={`mt-8 sm:mt-[40px] md:mt-[60px] first:mt-0 ${className}`}>
        <div className="overflow-x-auto rounded-[12px] border border-gray-200 shadow-sm">
          <table className="table-auto w-full sm:text-sm text-xs font-[montserrat] text-[#545454]">
            {/* Header */}
            <thead className="sticky top-0 z-10">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={headerCell}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* 1st column: Name */}
                  <td className={cell}>{row.name}</td>

                  {/* 2nd column: Guiding + MORE button */}
                  <td className={cell}>
                    <div className="flex flex-col gap-2">
                      <p>{row.guiding}</p>
                      <OutlineButton 
                      title={"More"}
                      action={() => handleMoreClick(row)}
                      />
                    </div>
                  </td>

                  {/* 3rd column: Certification */}
                  <td className={cell}>{row.certification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <CommonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={modalContent.title}
      >
        <div className={`${styles.customUlListing} ${styles.sectionContent}`}>

        <HTMLRender htmlString={`<p>${modalContent.description}</p>`} />
        </div>
        {/* <div className="space-y-4">
          <p>{modalContent.description}</p>
        </div> */}
      </CommonModal>
    </>
  );
};

export default CommonTableInternal;
