"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/common.module.css";

const RewardsTab = () => {
  const [activeSection, setActiveSection] = useState("rewards-and-recognitions");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["rewards-and-recognitions", "pragati", "pratibha-pride"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if element is near the top of the viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-[70px] lg:top-[90px] z-40 bg-white/95 backdrop-blur-md py-4 border-b border-gray-200 mb-8 w-full">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <button
          onClick={() => scrollToSection("rewards-and-recognitions")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeSection === "rewards-and-recognitions"
              ? "bg-[#003366] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Rewards & Recognition
        </button>
        <button
          onClick={() => scrollToSection("pragati")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeSection === "pragati"
              ? "bg-[#003366] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pragati
        </button>
        <button
          onClick={() => scrollToSection("pratibha-pride")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeSection === "pratibha-pride"
              ? "bg-[#003366] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pratibha & Pride
        </button>
      </div>
    </div>
  );
};

export default RewardsTab;
