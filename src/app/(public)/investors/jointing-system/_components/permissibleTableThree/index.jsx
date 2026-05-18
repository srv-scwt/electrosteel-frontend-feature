"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import commonStyles from "./style.module.css";

const PermissibleTableThree = () => {
    const permissibleData = {
        columns: ["DN (mm)", "Maximum Angular joint Deflection (in degree)", "Maximum Allowable Operating Pressure (Bar)"],
        rows: [
            ["80-125", "5", "64"],
            ["150", "5", "55"],
            ["200", "4", "44"],
            ["250", "4", "39"],
            ["300", "4", "37"],
            ["350", "3", "32"],
            ["400-700", "3", "30"],
            ["800-1000", "3", "25"],
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

export default PermissibleTableThree;
