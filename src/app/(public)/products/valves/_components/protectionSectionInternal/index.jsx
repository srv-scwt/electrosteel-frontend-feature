"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTableInternal from "../protectionTable";
import style from './style.module.css';
import HTMLRender from "@/components/ui/HTMLRender";
import CommonTableMore from "@/components/common/CommonTableMore";

const ProtectionSystemSectionInternal = ({ data, sectionID, className }) => {
  if (!data) return null;

  return (
    <section id={sectionID}>
      <div className={`${styles.containerLg} ${className}`}>
        {/* Section Title */}
        <div className="mb-8 text-center">
          <HTMLRender
            htmlString={data?.title}
            className={`${styles.sectionContent} text-center`}
          />
        </div>
        <div>
          <div className={style.tableBorder}>
            <CommonTableMore data={data} />
          </div>
          </div>
      </div>
    </section>
  );
};

export default ProtectionSystemSectionInternal;
