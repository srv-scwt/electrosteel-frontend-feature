"use client";

import React, { useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import { CiSearch } from "react-icons/ci";
import { generateYearAndMonthOptions, monthNames } from "@/utils/dropdownOption";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";

const title = "Short By";

const BlogFilter = ({ data, searchParams }) => {
  const appendQueryParam = useAppendQueryParam();
  const yearMonthArr = generateYearAndMonthOptions(data);
  const getParamValue = (value) => (Array.isArray(value) ? value[0] : value) || "";
  const selectedMonthParam = getParamValue(searchParams?.month);
  const selectedYearParam = getParamValue(searchParams?.year);
  const searchByParam = getParamValue(searchParams?.search_by);

  const fallbackMonthOption = selectedMonthParam
    ? {
        label: monthNames[Number(selectedMonthParam) - 1] || selectedMonthParam,
        value: selectedMonthParam,
      }
    : null;
  const fallbackYearOption = selectedYearParam
    ? {
        label: selectedYearParam,
        value: selectedYearParam,
      }
    : null;

  const [search, setSearch] = useState(searchByParam);

  // Re-sync the input when the URL param changes underneath us (back/forward
  // navigation, or a cleared filter). Both are strings, so this compares by value
  // and settles in a single render instead of cascading through an effect.
  const [previousSearchParam, setPreviousSearchParam] = useState(searchByParam);

  if (previousSearchParam !== searchByParam) {
    setPreviousSearchParam(searchByParam);
    setSearch(searchByParam);
  }

  const selectedMonth =
    yearMonthArr?.months?.find(
      (item) => String(item?.value) === selectedMonthParam
    ) || fallbackMonthOption;
  const selectedYear =
    yearMonthArr?.years?.find((item) => item?.value === selectedYearParam) ||
    fallbackYearOption;

  const handleMonthChange = (option) => {
    appendQueryParam("month", option?.value ? String(option.value) : "");
  };

  const handleYearChange = (option) => {
    appendQueryParam("year", option?.value || "");
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearch(nextValue);
    appendQueryParam("search_by", nextValue);
  };

  return (
    <section className={`py-0! ${cstyles.containerLg}`}>
      <h4
        className={`${styles.shortByText} uppercase font-medium text-[14px] text-[#004AA1] mb-[16px] mt-[26px]`}
      >
        {title}
      </h4>

      <div
        className={`${styles.fliterWrapper} w-full flex flex-col md:flex-row gap-[16px] justify-between`}
      >
        <div className="flex-1">
          <Select
            options={yearMonthArr?.months}
            value={selectedMonth}
            onChange={handleMonthChange}
            placeholder="Select Month"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="flex-1">
          <Select
            options={yearMonthArr?.years}
            value={selectedYear}
            onChange={handleYearChange}
            placeholder="Select Year"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by Keywords"
            value={search}
            onChange={handleSearchChange}
            className="w-full border-gray-300 pl-4 pr-[40px] py-2 focus:outline-none min-h-[56px] rounded-none border-[2px] font-bold uppercase"
          />
          <CiSearch className="absolute right-3 top-3 text-gray-500 text-[30px]" />
        </div>
      </div>

      <h4
        className={`${styles.showResult} uppercase font-medium text-[14px] text-[#004AA1] mb-[26px] mt-[16px]`}
      >
        Showing results for:{" "}
        <span className="text-[#545454]">
          {selectedMonth?.label || "All Months"} |{" "}
          {selectedYear?.label || "All Years"} |
        </span>{" "}
        Keywords:{" "}
        <span className="text-[#545454]">{search || "Not Mentioned"}</span>
      </h4>
    </section>
  );
};

export default BlogFilter;
