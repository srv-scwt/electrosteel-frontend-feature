"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import PSystemCommonModal from "@/components/modals/pSystemCommonModal";
import HTMLRender from "@/components/ui/HTMLRender";
import { OutlineButton } from "@/components/ui/Button";
import { safetyData } from "../safety.data";

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

const SafetyCredentialsCards = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  // Use only ISO 45001 and SA 8000 as per user requirements
  const cards = safetyData.credentialsTable.rows.filter(
    (row) => row[0] === "ISO 45001" || row[0] === "SA 8000"
  );

  const handleKnowMore = (row) => {
    const title = row[0];
    let mappedData = null;

    if (title === "ISO 45001") {
      mappedData = {
        label: `<h2 class="text-[#004aa1]">CERTIFICATION</h2>
                <h3 class="text-[#00418e]">${safetyData.certification.title}</h3>`,
        description: safetyData.certification.description,
        image: safetyData.certification.image,
      };
    } else if (title === "SA 8000") {
      mappedData = {
        label: `<h2 class="text-[#004aa1]">SAFETY CULTURE</h2>
                <h3 class="text-[#00418e]">${safetyData.socialAccountability.title}</h3>`,
        description: safetyData.socialAccountability.description,
        image: safetyData.socialAccountability.image,
      };
    }

    if (mappedData) {
      setModalContent([mappedData]);
      setOpenModal(true);
    }
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className={styles.containerLg}>
          <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} mb-6`}>
            <HTMLRender htmlString={`<h2>${safetyData.credentialsTable.title}</h2>`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
            {cards.map((row, index) => (
              <CredentialCard
                key={index}
                title={row[0]}
                desc={row[1]}
                onKnowMore={() => handleKnowMore(row)}
              />
            ))}
          </div>
        </div>
      </section>

      <PSystemCommonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        modalData={modalContent}
      />
    </>
  );
};

export default SafetyCredentialsCards;
