"use client";
import React, { useState } from "react";
import PSystemCommonModal from "@/components/modals/pSystemCommonModal";
import {
  Button,
  OutlineButton,
  OutlineButtonLink,
} from "@/components/ui/Button";
import { createImageSourceURL } from "@/utils";

const CommonTableMore = ({ className, data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  if (!data) return null;

  const { table } = data;
  const { columns, rows } = table;

  const headerCell =
    "text-left md:p-4 sm:p-3 p-2 bg-[#00418e] text-white border border-white sticky top-0";
  const cell = "text-left md:p-4 sm:p-3 p-2 border border-gray-200 align-top";

  const handleMoreClick = (row) => {
    setModalData(row?.modal || []);
    setOpenModal(true);
  };

  return (
    <>
      <div className={`mt-8 sm:mt-[40px] md:mt-[60px] first:mt-0 ${className}`}>
        <div className="overflow-x-auto rounded-[12px] border border-gray-200 shadow-sm">
          <table className="table-auto w-full sm:text-sm text-xs font-[montserrat] text-[#545454]">
            <thead className="sticky top-0 z-10">
              <tr>
                {Array.isArray(columns) && columns?.map((col, idx) => (
                  <th key={idx} className={headerCell}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
              {Array.isArray(rows) && rows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className={cell}>{row?.name}</td>

                  <td className={cell}>
                    <div className="flex flex-col gap-2">
                      <p>{row?.guiding}</p>

                      {row?.modal && row?.modal?.length > 0 ? (
                        <OutlineButton
                          action={() => handleMoreClick(row)}
                          title={"MORE "}
                        />
                      ) : row?.download ? (
                        <OutlineButtonLink
                          goto={createImageSourceURL(row?.download)}
                          title={"DOWNLOAD"}
                          className={""}
                          action={"_blank"}
                        />
                      ) : null}
                    </div>
                  </td>

                  <td className={cell}>{row?.certification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PSystemCommonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        modalData={modalData}
      />
    </>
  );
};

export default CommonTableMore;
