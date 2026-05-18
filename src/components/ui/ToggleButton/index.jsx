"use client";
import React, { useState } from "react";

const ToggleButton = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full max-w-[300px]">
      <span className="font-medium text-sm sm:text-base md:text-lg text-gray-800 whitespace-nowrap">
        {label}
      </span>

      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative cursor-pointer flex-shrink-0 w-14 h-7 rounded-full border-2 border-[#00418E] transition-colors duration-300 ${
          isOn ? "bg-[#00418E]" : "bg-white"
        }`}
        aria-pressed={isOn}
      >
        {/* ON Label */}
        <span
          className={`absolute left-1 top-1/2 -translate-y-1/2 text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] font-semibold transition-colors duration-300 ${
            isOn ? "text-white/50" : "text-[#00418E]"
          }`}
        >
          ON
        </span>

        {/* OFF Label */}
        <span
          className={`absolute right-1 top-1/2 -translate-y-1/2 text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] font-semibold transition-colors duration-300 ${
            isOn ? "text-white" : "text-[#00418E]"
          }`}
        >
          OFF
        </span>

        {/* Toggle Circle */}
        <span
          className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn
              ? "translate-x-[26px] sm:translate-x-[28px] md:translate-x-[28px] bg-white"
              : "translate-x-0 bg-[#00418E]"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;
