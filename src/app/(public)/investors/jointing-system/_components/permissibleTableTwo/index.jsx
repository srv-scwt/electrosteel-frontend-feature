"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import commonStyles from "./style.module.css";

const PermissibleTableTwo = () => {
    const permissibleData = {
        columns: ["DN (mm)", "Maximum Allowable Operating Pressure (Bar)", "Deflection Angle (Degree)"],
        rows: [
            ["80", "64", "5"],
            ["100", "64", "5"],
            ["125", "64", "5"],
            ["150", "55", "5"],
            ["200", "44", "4"],
            ["250", "39", "4"],
            ["300", "37", "4"],
            ["350", "32", "3"],
            ["400", "30", "3"],
            ["450", "30", "3"],
            ["500", "30", "3"],
            ["600", "27", "2"],
            ["700", "25", "2"],
            ["800", "16", "2"],
            ["900", "16", "2"],
            ["1000", "16", "2"],
        ],
    };

    return (
        <section>
            <div className={`${styles.containerLg} !pt-0`}>
                <div className={styles.sectionContent}>
                    <h2>
                        <span>Permissible Deflection at Socket and Spigot Joints</span>
                    </h2>

                    <p className="mb-6">
                        Where it is necessary to deflect the pipeline from a straight line, either in the vertical or horizontal plane, to avoid obstructions etc., deflection at joint should not exceed the following:
                    </p>

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

export default PermissibleTableTwo;
