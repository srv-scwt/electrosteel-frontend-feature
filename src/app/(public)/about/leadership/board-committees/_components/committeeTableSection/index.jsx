"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";


const CommitteesTable = ({ data }) => {
  const columns = ["S. No.", "Name of the Director", "Category", "Position"];

  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {Array.isArray(data) && data.map((committee) => (
           <CommonTable
              key={committee.title}
              title={committee.title}
              columns={columns}
              rows={committee.rows.map((r) => [
                r.no,
                r.name,
                r.category,
                r.position,
              ])} // convert each object to array here
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitteesTable;
