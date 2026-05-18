// "use client";
// //comment
// import React, { useState } from "react";
// import Select from "react-select";
// import style from "./style.module.css";

// // Year options
// const years = [
//   { value: "2026", label: "All" },
//   { value: "2025", label: "FY 2025-26" },
//   { value: "2024", label: "FY 2024-25" },
//   { value: "2023", label: "FY 2023-24" },
//   { value: "2022", label: "FY 2022-23" },
//   { value: "2021", label: "FY 2021-22" },
//   { value: "2020", label: "FY 2020-21" },
//   { value: "2019", label: "FY 2019-20" },
// ];

// const DropdownSelect = () => {
//   const [selectedYear, setSelectedYear] = useState(null);

//   return (
//     <>
//       <section>
//         {/* Select Year */}
//         <div className="flex-1">
//           <Select
//             options={years}
//             value={selectedYear}
//             onChange={setSelectedYear}
//             placeholder="Select Year"
//             className={`react-select-container ${style.searchYear}`}
//             classNamePrefix="react-select"
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// export default DropdownSelect;





"use client";

import React from "react";
import Select from "react-select";
import style from "./style.module.css";

const DropdownSelect = ({ options, value, onChange }) => {
  return (
    <section>
      <div className="flex-1">
        <Select
          options={options}
          value={value}
          onChange={onChange}
          placeholder="Select Year"
          className={`react-select-container ${style.searchYear}`}
          classNamePrefix="react-select"
        />
      </div>
    </section>
  );
};

export default DropdownSelect;
