"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import GridTwoSection from "@/components/common/GridTwoSection";
import HTMLRender from "@/components/ui/HTMLRender";
import PSystemCommonModal from "@/components/modals/pSystemCommonModal";
import { OutlineButton } from "@/components/ui/Button";
import {
  overviewIntroData,
  iso14001Data,
  iso50001Data,
  epdData,
  griData,
  credentialsTableData,
} from "../environment.data";

const CredentialCard = ({ title, desc, onKnowMore }) => (
  <article
    className="
      w-full h-full lg:min-h-[238px]
      rounded-[32px]
      bg-[#004AA1] p-6 xl:p-8
      shadow-[0px_4px_10px_0px_#00000026]
      transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl
    "
  >
    <div className="flex h-full flex-col">
      <h3
        className="
          max-w-[95%]
          !my-0 mb-4
          text-white font-bold uppercase
          text-[16px] leading-[1.35]
          sm:text-[22px]
          xl:!text-[28px]
        "
      >
        {title}
      </h3>
      <div className="mt-4 text-[14px] sm:text-[16px] leading-[1.4] text-[#9cc0f0]">
        {desc}
      </div>
      <div className="mt-auto pt-6 flex justify-end">
        <OutlineButton 
          title="Know More" 
          action={onKnowMore}
          className="!text-[#9cc0f0] hover:!text-white"
        />
      </div>
    </div>
  </article>
);

const OverviewTab = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const handleKnowMore = (row) => {
    const title = row[0];
    let contentData = null;

    if (title === "ISO 14001") {
      contentData = iso14001Data;
    } else if (title === "ISO 50001") {
      contentData = iso50001Data;
    } else if (title === "EPD") {
      contentData = epdData;
    } else if (title === "GRI") {
      contentData = griData;
    }

    if (contentData) {
      setModalContent([
        {
          label: `<h3 class="text-[#00418e]">${contentData.title}</h3>`,
          description: contentData.description,
          image: contentData.image,
        },
      ]);
      setOpenModal(true);
    }
  };

  return (
    <>
      {/* Intro */}
      <div className="pb-8">
        <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}>
          <HTMLRender htmlString={`<h2>${overviewIntroData.title}</h2>`} />
        </div>
        <div className={`${styles.sectionContent}`}>
          <div dangerouslySetInnerHTML={{ __html: overviewIntroData.description }} />
        </div>
      </div>

      <div className="py-8">
        {/* Environmental Credentials Cards — Moved to 2nd position */}
        <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} mb-6`}>
          <HTMLRender htmlString={`<h3>${credentialsTableData.title}</h3>`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
          {credentialsTableData.rows.map((row, index) => (
            <CredentialCard
              key={index}
              title={row[0]}
              desc={row[1]}
              onKnowMore={() => handleKnowMore(row)}
            />
          ))}
        </div>
      </div>


      <PSystemCommonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        modalData={modalContent}
      />
    </>
  );
};

export default OverviewTab;
