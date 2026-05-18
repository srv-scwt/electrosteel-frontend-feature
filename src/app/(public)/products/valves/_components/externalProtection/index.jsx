"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import style from './style.module.css';

const committees = [
  {
    rows: [
      { name: "Zinc Rich Paint and Finishing Layer of Bituminous Paint or Liquid Epoxy", guiding: "A metallic Zinc Rich paint coating (with 85% Zinc mass in dry film) is applied on the fittings surface.", certification: "ISO: 8179 (Part-2), EN 545" },
      { name: "Fusion Bonded Epoxy Coating", guiding: "A state-of-the-art automated facility has been created to coat DI Fittings with powdered epoxy by fusion bonding process as per BS EN 14901.", certification: "BS EN 14901" },
      { name: "Polyurethane Coating", guiding: "Electrosteel offers fittings with external Polyurethane coating for corrosion protection in highly aggressive soil.", certification: "BS EN 15189" },
      { name: "Polyethylene Sleeving", guiding: "Polyethylene encasement is found to be very effective for protection of Ductile Iron Fittings.", certification: "ISO 8180 / AWWA C 105" },
    ],
  },
];

const ExternalProtection = () => {
  const columns = ["NAME OF PROTECTION", "DESCRIPTION", "GUIDING STANDARD"];

  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2 className="!w-full text-center">Protection <span>System - External</span></h2>
          <div className={style.tableBorder}>
            {committees.map((committee , index) => (
              <CommonTable
                key={`${committee.title}srv${index}`}
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

export default ExternalProtection;
