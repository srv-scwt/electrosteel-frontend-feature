import React from "react";
import styles from "@/app/common.module.css";
import style from "./style.module.css";
import Image from "next/image";
import CommonTable from "@/components/common/CommonTable";
import { createImageSourceURL } from "@/utils";

const BoltedRestrainedJoints = ({ data, className = "", label , title , roundedCLass , CommonTableClass }) => {
  console.log(data);
  
  return (
    <section className="bg-white !py-0">
      <div className={`${styles.containerLg} !py-0`}>
        <div className={styles.sectionContent}>
          <div className="w-full mb-6 h-[300px] md:h-[400px] lg:h-[425px] xl:h-[425px] xxl:h-[480px] relative overflow-hidden rounded-xl">
            <Image
              src={createImageSourceURL(label?.image)}
              alt={data?.tableMaintitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw,(max-width: 1200px) 100vw,100vw"
              priority
            />
          </div>
         <div className={`${style.tableWrapper} ${className}`}>
            {(data?.tableMaintitle ?? title) && (
              <div
                className={`${styles.sectionContent} !rounded-t-[16px] w-full text-center text-white bg-[#00418e]`}
              >
                <h4 className="!w-full !m-0 p-6">{data?.tableMaintitle ?? title}</h4>
              </div>
            )}
            
            <CommonTable
              className={`${data?.tableClass} ${CommonTableClass}`}
              key={"boltearasd"}
              title={""}
              columns={data?.columns}
              borderRadiusClass={roundedCLass ? `rounded-[16px] ${roundedCLass}` : "rounded-[16px] rounded-t-[0px]"}
              rows={data?.rows}
            />
          
            <br />
            <p>
              # To use this system for other class of pipes, the manufacturer
              may be contacted
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoltedRestrainedJoints;
