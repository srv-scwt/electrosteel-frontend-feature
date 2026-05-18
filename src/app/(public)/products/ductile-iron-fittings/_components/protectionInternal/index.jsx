"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import style from './style.module.css';

const committees = [
  {
    rows: [
      { name: "Cement Mortar Lining", guiding: "Fittings are supplied with manually applied Cement Lining.", certification: "ISO 4179BS EN 545" },
      { name: "Ceramic Epoxy", guiding: "Ceramic Epoxy Lining offers very high chemical and abrasion resistance and is normally used for waste water conveyance.", certification: "-" },
      { name: "Fusion Bonded Epoxy Lining", guiding: "DI Fittings with FBE coating also come with FBE Lining.", certification: "BS EN 14901" },
      { name: "Polyurethane Lining", guiding: "Electrosteel offers fittings with internal Polyurethane lining for internal protection in case aggressive fluid conveyance.", certification: "BS EN 15655" },
    ],
  },
];

const InternalProtection = () => {
  const columns = ["NAME OF PROTECTION", "GUIDING STANDARDS & BROCHURE", "CERTIFICATION"];

  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2 className="!w-full text-center">Protection <span>System - Internal</span></h2>
          <div className={style.tableBorder}>
            {committees.map((committee,index) => (
              <CommonTable
                key={`${committee.title}-${index}`}
                title={committee.title}
                columns={columns}
                rows={committee.rows.map((r) => [
                  r.name,
                  r.guiding,
                  r.certification,
                ])} // convert each object to array here
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalProtection;
