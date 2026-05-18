"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import commonStyles from "./style.module.css";

const PermissibleTableFour = () => {
    const permissibleData = {
        columns: ["DN (mm)", "Deflection Angle (Degree)", "Maximum Allowable Operating Pressure (Bar)"],
        rows: [
            ["80", "5", "23"],
            ["100", "5", "23"],
            ["125", "5", "22"],
            ["150", "5", "18"],
            ["200", "4", "16"],
            ["250", "4", "16"],
            ["300", "4", "16"],
            ["350", "4", "16"],
            ["400", "3", "16"],
            ["450", "2", "13"],
            ["500", "2", "11"],
            ["600", "2", "10"],
        ],
    };

    return (
        <section>
            <div className={`${styles.containerLg} !pt-0`}>
                <div className={styles.sectionContent}>
                    <div className={commonStyles.investorTable}>
                        <CommonTable
                            title={permissibleData.title}
                            columns={permissibleData.columns}
                            rows={permissibleData.rows}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PermissibleTableFour;
