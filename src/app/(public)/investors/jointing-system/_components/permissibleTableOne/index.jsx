"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTable from "@/components/common/CommonTable";
import commonStyles from "./style.module.css";

const PermissibleTableOne = () => {
    const permissibleData = {
        columns: ["DN (mm)", "Max Deviation Angle"],
        rows: [
            ["80 - 150", "5°"],
            ["200 - 300", "4°"],
            ["350 - 600", "3°"],
            ["200 - 300", "2°"],
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
                        Where it is necessary to deflect the pipeline from a straight line,
                        either in the vertical or horizontal plane, to avoid obstructions
                        etc., deflection at joint should not exceed the following:
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

export default PermissibleTableOne;
