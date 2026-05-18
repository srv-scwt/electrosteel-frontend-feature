"use client";

import HeroSection from "@/components/common/heroSection";
import { OutlineButton } from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";
import styles from "@/app/common.module.css";

const data = {
  financialYears: [
    {
      year: "FY 2025 - 26",
      results: [
        {
          fileName: "Documents",
          filelink: "/filelinks/financial-results-june-2025.pdf",
        },
        {
          fileName: "Documents",
          filelink: "/filelinks/financial-results-sept-2025.pdf",
        },
      ],
    },
  ],
};

const Page = () => {
  const [selectedYear, setSelectedYear] = useState(data.financialYears[0]);

  const currentData = data.financialYears.find(
    (y) => y.year === selectedYear.year
  );

  return (
    <>
      <HeroSection
        data={{
          title: "Policy",
          banner: `/images/board/policies_banner_large.jpg`,
        }}
      />

      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          
          {currentData?.results?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between md:items-center gap-5 mt-[26px] pb-4"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src="/images/icons/pdf.png"
                  width={30}
                  height={30}
                  alt="pdf"
                  className="object-contain"
                />
                <p className="text-gray-700">{item.fileName}</p>
              </div>

              <OutlineButton goto={item.filelink} title="Download" />
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Page;