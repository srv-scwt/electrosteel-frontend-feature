"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import PSystemCommonModal from "@/components/modals/pSystemCommonModal";
import HTMLRender from "@/components/ui/HTMLRender";
import { OutlineButton } from "@/components/ui/Button";
import { createImageSourceURL } from "@/utils";

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
      <div
        className="mt-4 text-[14px] sm:text-[16px] leading-[1.4] text-[#9cc0f0]"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
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

// banner_title arrives as two concatenated tags, e.g. "<h2>CERTIFICATION</h2> <h3>...</h3>",
// missing the label/subtitle colour classes the design needs — reapply them here.
function buildModalLabel(bannerTitle) {
  const label = bannerTitle?.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1]?.trim() ?? "";
  const subtitle = bannerTitle?.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1]?.trim() ?? "";
  return `<h2 class="text-[#004aa1]">${label}</h2><h3 class="text-[#00418e]">${subtitle}</h3>`;
}

const SafetyCredentialsCards = ({ title, cards = [] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const handleKnowMore = (item) => {
    setModalContent([
      {
        label: buildModalLabel(item?.banner_title),
        description: item?.editor_description,
        image: createImageSourceURL(item?.banner_image),
      },
    ]);
    setOpenModal(true);
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className={styles.containerLg}>
          <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} mb-6`}>
            <HTMLRender htmlString={`<h2>${title}</h2>`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
            {cards.map((item, index) => (
              <CredentialCard
                key={item?.id ?? index}
                title={item?.title}
                desc={item?.description}
                onKnowMore={() => handleKnowMore(item)}
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
