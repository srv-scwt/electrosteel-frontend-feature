"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";

/**
 * Reusable CommonTab component
 * Works as Tabs (desktop) + Accordion (mobile)
 * Accepts `tabsData` prop from parent component
 */
const CommonTab = ({ tabsData, tabListClassName = "", tabContentClassName = "" }) => {
  const [activeTab, setActiveTab] = useState(tabsData?.[0]?.id || null);
  const [openAccordion, setOpenAccordion] = useState(tabsData?.[0]?.id || null);

  // Toggle accordion for mobile
  const toggleAccordion = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.customTabWrapper}>
      {/* --- Desktop Tabs --- */}
      <ul className={`hidden md:flex ${styles.commonTab} ${tabListClassName}`}>
        {tabsData.map((tab) => (
          <li
            key={tab.id}
            className={activeTab === tab.id ? styles.active : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            <button type="button" className={styles.tabEachLink}>
              {tab.icon && (
                <Image
                  src={tab.icon}
                  alt={tab.title}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              )}
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      {/* --- Desktop Tab Content --- */}
      <div
        className={`hidden md:block ${styles.commonTabContent} bg-white p-5 md:pt-[30px] rounded-md lg:rounded-[12px] ${tabContentClassName}`}
      >
        {tabsData.find((t) => t.id === activeTab)?.content}
      </div>

      {/* --- Mobile Accordion --- */}
      <div className="md:hidden space-y-4">
        {tabsData.map((tab) => (
          <div key={tab.id} className="border border-gray-200 rounded-md shadow-sm">
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 bg-white font-medium text-left"
              onClick={() => toggleAccordion(tab.id)}
            >
              <span className="flex items-center gap-2">
                {tab.icon && (
                  <Image
                    src={tab.icon}
                    alt={tab.title}
                    width={32}
                    height={32}
                    className={`${styles.tabIcon} object-contain p-[5px] bg-[#00418e]`}
                  />
                )}
                {tab.title}
              </span>
              <span
                className={`transition-transform duration-300 ${
                  openAccordion === tab.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Accordion content */}
            {openAccordion === tab.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {tab.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonTab;
