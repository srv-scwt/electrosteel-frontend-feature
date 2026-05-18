"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import style from './style.module.css';
import HTMLRender from "@/components/ui/HTMLRender";
import CommonTableMore from "@/components/common/CommonTableMore";


const ProtectionSystemSection = ({ data, sectionID, className }) => {
  return (
    <section id={sectionID}>
      <div className={`${styles.containerLg} ${className}`}>
        <div>
          <HTMLRender htmlString={data?.title} className={`${styles.sectionContent} text-center`} />
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

export default ProtectionSystemSection;
