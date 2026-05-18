"use client";
import React from "react";
import { useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

const CommonTable = ({borderRadiusClass = "rounded-[16px]", className, title, columns = [], rows = [] }) => {
  const [open, setOpen] = useState(true);

  const headerCell =
    "text-left md:p-4 sm:p-3 p-2 bg-[#00418e] text-white sticky top-0";
  const cell = "text-left md:p-4 sm:p-3 p-2  font-medium";

  return (
    <div className={`mt-8 sm:mt-[40px] md:mt-[60px] first:mt-0 ${className}`}>
      {title && (
        <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
      )}

       <div className={`overflow-x-auto shadow-sm ${borderRadiusClass}`}>
        <table className="table-auto w-full sm:text-sm text-xs font-[montserrat] text-[#545454]">
          <thead className="sticky top-0 z-10">
            <tr>
              {/* Accordion Toggle Button */}
              <th className="px-3 py-2 w-10 cursor-pointer !bg-[#00418e]" onClick={() => setOpen(!open)}>
                {open ? (
                  <IoChevronDown size={18} color="white" />
                ) : (
                  <IoChevronForward size={18} color="white" />
                )}
              </th>

              {/* Render Columns */}
              {columns.map((col, index) => (
                <th key={index} className={headerCell}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Accordion Body */}
          <tbody
            className={`transition-all duration-300 overflow-hidden ${open ? "opacity-100" : "opacity-0 hidden"
              } [&>tr:nth-child(even)]:bg-gray-50 `}
          >
            {rows.length > 0 ? (
              rows.map((r, rowIndex) => (
                <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-[#c7d7ef]" : ""}`}>
                  {/* Empty cell under toggle column */}
                  <td className={cell}></td>

                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className={cell}>
                      {r[colIndex]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;
