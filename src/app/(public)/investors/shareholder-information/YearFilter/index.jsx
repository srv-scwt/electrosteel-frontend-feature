"use client";

import React, { useState } from "react";
import Select from "react-select";
import style from './style.module.css';

// Month options
const years = [
    { value: "FY 2025-26", label: "FY 2025-26" },
    { value: "FY 2024-25", label: "FY 2024-25" },
    { value: "FY 2023-24", label: "FY 2023-24" },
    { value: "FY 2022-23", label: "FY 2022-23" },
    { value: "FY 2021-22", label: "FY 2021-22" },
    { value: "FY 2020-21", label: "FY 2020-21" },
    { value: "FY 2019-20", label: "FY 2019-20" },
    { value: "FY 2018-19", label: "FY 2018-19" },
    { value: "FY 2017-18", label: "FY 2017-18" },
    { value: "FY 2016-17", label: "FY 2016-17" },
    { value: "FY 2015-16", label: "FY 2015-16" },
    { value: "FY 2014-15", label: "FY 2014-15" },
    { value: "FY 2013-14", label: "FY 2013-14" },
    { value: "FY 2012-13", label: "FY 2012-13" },
    { value: "FY 2011-12", label: "FY 2011-12" },
    { value: "FY 2010-11", label: "FY 2010-11" },
    { value: "FY 2009-10", label: "FY 2009-10" },
];

const YearFilter = () => {
    const [selectedYear, setSelectedYear] = useState(null);

    return (
        <>
        <section>
                
                    {/* Select Month */}
                    <div className="flex-1">
                        <Select
                            options={years}
                            value={selectedYear}
                            onChange={setSelectedYear}
                            placeholder="FY 2025-26"
                            className={`react-select-container ${style.searchYear}`}
                            classNamePrefix="react-select"
                        />
                    </div>
        </section>
        </>
        
    );
};

export default YearFilter;