"use client";
import React from "react";
import styles from "@/app/common.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import commonStyles from "./style.module.css";

const toArray = (value) => {
  if (!value) return [];

  const arr = Array.isArray(value) ? value : [value];

  return arr
    .flatMap((item) => String(item).split(/\n+/))
    .map((item) => item.trim())
    .filter(Boolean);
};

const RegisteredAndCorporateOffice = ({ data = [] }) => {
  console.log("RegisteredAndCorporateOffice data:", data);
  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
            {Array.isArray(data) &&
              data.map((office, index) => (
                <div
                  key={index}
                  className={`${commonStyles.officeBox} bg-[#004aa1] p-5 lg:p-[30px] shadow-md border border-[#00000029] my-4 h-full rounded-[12px]`}
                >
                  <h4 className="text-sm md:text-lg font-semibold text-white mb-3 capitalize">
                    {office?.title}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-white">
                    <div className="border-b sm:border-b-0 sm:border-r border-[#7fa0c6] pb-4 sm:pb-0">
                      {toArray(office?.address).map((line, i) => (
                        <div
                          key={i}
                          className="!text-white textWhite"
                          dangerouslySetInnerHTML={{ __html: line }}
                        />
                      ))}
                    </div>

                    <div>
                      {toArray(office?.contact).map((line, i) => (
                        <div
                          key={i}
                          className="!text-white textWhite"
                          dangerouslySetInnerHTML={{ __html: line }}
                        />
                      ))}
                    </div>
                  </div>

                  {office?.mapLink && (
                    <div className="mt-3">
                      <OutlineButtonLink
                        goto={office.mapLink}
                        title="Google Map"
                        className="mt-4 text-white!"
                        action={"external"}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisteredAndCorporateOffice;