import React from "react";
import HeroSection from "@/components/common/heroSection";
import cstyles from "@/app/common.module.css";
import Image from "next/image";
import { buildMetadataForPathname } from "@/utils/seo";
import { getEcovadisData } from "@/services/ecovadis.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

export async function generateMetadata() {
  return buildMetadataForPathname(
    "/sustainability/governance-initiatives/ecovadis-commitment"
  );
}

// ── Shared helper: make the last half of words blue (same pattern as Career page)
const formatHeading = (text) => {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  const numBlueWords = Math.floor(words.length / 2);
  if (words.length <= 1) return `<span>${text}</span>`;
  const splitIndex = words.length - numBlueWords;
  return `${words.slice(0, splitIndex).join(" ")} <span>${words
    .slice(splitIndex)
    .join(" ")}</span>`;
};

// ── Checklist row — identical markup to Career page Checklist component
const ChecklistItem = ({ htmlContent }) => (
  <li className="flex items-start gap-2">
    <Image
      src="/images/tickblue.png"
      alt="Check Icon"
      width={25}
      height={25}
      className="mt-0.5 flex-shrink-0"
    />
    <span 
      className="text-[14px] md:text-[18px] text-[#545454] leading-relaxed [&_strong]:font-semibold"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  </li>
);

export default async function Page() {
  const { data, error } = await getEcovadisData();
  
  if (error || !data || data.length === 0) {
    return <SomethingWentWrong />;
  }

  // The API returns an array of section objects grouped by "category"
  const tab1 = data.find(item => item.category === "ecovedis-tab-1");
  const tab2 = data.find(item => item.category === "ecovedis-tab-2");
  const tab3 = data.find(item => item.category === "ecovedis-tab-3");

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <HeroSection
        data={{
          title: "Ecovadis Commitment",
          banner: "/images/blog/blogBanner.jpg",
        }}
      />

      {/* ── Introduction ─────────────────────────────────────────────── */}
      {tab1 && (
        <section id="introduction" className="scroll-mt-24">
          <div className={cstyles.containerLg}>
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              <div className={`${cstyles.sectionContent} w-full md:w-5/12`}>
                <div dangerouslySetInnerHTML={{ __html: tab1.description }} />
              </div>
              {tab1.image && (
                <div className="w-full md:w-7/12 flex justify-center md:justify-end">
                  <img
                    src={tab1.image}
                    alt="EcoVadis Certificate"
                    className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-auto object-contain drop-shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 1 : Environmental & Sustainability Initiatives ─────── */}
      {tab2 && (
        <section id="sustainability-initiatives" className="scroll-mt-24 bg-[#f5f5f5]">
          <div className={`${cstyles.containerLg}`}>
            <div className={`${cstyles.sectionContent} mb-6`}>
              {tab2.title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab2.title)}</h2>`,
                  }}
                />
              )}
              {tab2.description && (
                <div dangerouslySetInnerHTML={{ __html: tab2.description }} />
              )}
            </div>

            {tab2.table_data2 && tab2.table_data2.length > 0 && (
              <ul className="space-y-4 pb-2">
                {tab2.table_data2.map((item, index) => (
                  <ChecklistItem key={index} htmlContent={item} />
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── Section 2 : Best Practices ────────────────────────────────── */}
      {tab3 && (
        <section id="best-practices" className="scroll-mt-24">
          <div className={`${cstyles.containerLg} !pt-0`}>
            <div className={`${cstyles.sectionContent} mb-6 pt-[clamp(32px,4vw,96px)]`}>
              {tab3.title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab3.title)}</h2>`,
                  }}
                />
              )}
              {tab3.description && (
                <div dangerouslySetInnerHTML={{ __html: tab3.description }} />
              )}
            </div>

            {tab3.table_data2 && tab3.table_data2.length > 0 && (
              <ul className="space-y-4">
                {tab3.table_data2.map((item, index) => (
                  <ChecklistItem key={index} htmlContent={item} />
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </>
  );
}
