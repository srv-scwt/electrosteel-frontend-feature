"use client";

import React, { useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { CiSearch } from "react-icons/ci";
import Container90 from "@/components/common/Container90";


// Month options
const months = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
];

// Year options (static dropdown)
const years = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
];

const BlogFilter = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [search, setSearch] = useState("");

    return (
        <>
        <section>
            <Container90>
                <h4 className={`${styles.shortByText} uppercase font-medium text-[14px] text-[#004AA1] mb-[16px] mt-[26px]`}>Short By</h4>
                <div className={`${styles.fliterWrapper} w-full flex flex-col md:flex-row gap-[16px] justify-between`}>
                    {/* Select Month */}
                    <div className="flex-1">
                        <Select
                            options={months}
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            placeholder="Select Month"
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Select Year */}
                    <div className="flex-1">
                        <Select
                            options={years}
                            value={selectedYear}
                            onChange={setSelectedYear}
                            placeholder="Select Year"
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Search Box */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by Keywords"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-[12px] pl-4 pr-[40px] py-2 focus:outline-none min-h-[56px] rounded-none border-[2px] font-bold uppercase"
                        />
                        <CiSearch className="absolute right-3 top-3 text-gray-500 text-[30px]" />
                    </div>
                </div>
                <h4 className={`${styles.showResult} uppercase font-medium text-[14px] text-[#004AA1] mb-[26px] mt-[16px]`}>Showing results for: <span className="text-[#545454]">All Months |  All Years  |</span> Keywords: <span className="text-[#545454]">Not Mentioned</span></h4>
            </Container90>
        </section>
        </>
        
    );
};

export default BlogFilter;

