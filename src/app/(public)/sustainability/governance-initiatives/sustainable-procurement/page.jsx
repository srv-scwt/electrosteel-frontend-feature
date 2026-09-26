import React from "react";
import HeroSection from "@/components/common/heroSection";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";
import { getSustainableProcurementData } from "@/services/sustainable-procurement.api";

export async function generateMetadata() {
  return buildMetadataForPathname(
    "/sustainability/governance-initiatives/sustainable-procurement"
  );
}

// ── Same formatHeading helper used on the other Governance Initiatives pages
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

// ── Checklist item — identical to Career, EcoVadis and EPD pages
const ChecklistItem = ({ children }) => (
  <li className="flex items-start gap-2">
    <Image
      src="/images/tickblue.png"
      alt="Check"
      width={25}
      height={25}
      className="mt-0.5 flex-shrink-0"
    />
    <span className="text-[14px] md:text-[18px] text-[#545454] leading-relaxed [&_strong]:font-semibold">
      {children}
    </span>
  </li>
);

export default async function Page() {
  const { data, error } = await getSustainableProcurementData();
  const apiData = Array.isArray(data) && data.length > 0 ? data : [];

  // Safely extract tabs based on 'tab-1', 'tab-2', 'tab-3' in the category string
  const tab1 = apiData.find(item => item.category?.includes("tab-1"));
  const tab2 = apiData.find(item => item.category?.includes("tab-2"));
  const tab3 = apiData.find(item => item.category?.includes("tab-3"));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection
        data={{
          title: "Sustainable Procurement",
          banner: "/images/blog/blogBanner.jpg",
        }}
      />

      {/* ── Section 1: Introduction & Partnerships ───────────────────── */}
      {tab1 && (
        <section id="introduction" className="scroll-mt-24">
          <div className={cstyles.containerLg}>
            <div className={`${cstyles.sectionContent} mb-8`}>
              {tab1.title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab1.title)}</h2>`,
                  }}
                />
              )}
              
              {tab1.subtitle && tab1.subtitle !== tab1.title && (
                <div
                  className="mt-8 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab1.subtitle)}</h2>`,
                  }}
                />
              )}
              
              {tab1.description && (
                <div 
                  className="mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: tab1.description.trim().startsWith('<p') 
                      ? tab1.description 
                      : `<p>${tab1.description.replace(/\n\n/g, '</p><p>')}</p>` 
                  }} 
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 2: Guaranteeing Responsibility ───────────────────── */}
      {tab2 && (
        <section id="responsibility" className="scroll-mt-24 bg-[#f5f5f5]">
          <div className={cstyles.containerLg}>
            <div className={`${cstyles.sectionContent} mb-6`}>
              {tab2.title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab2.title)}</h2>`,
                  }}
                />
              )}
              
              {tab2.description && (
                <div 
                  className="mb-6"
                  dangerouslySetInnerHTML={{ 
                    __html: tab2.description.trim().startsWith('<p') 
                      ? tab2.description 
                      : `<p>${tab2.description}</p>` 
                  }} 
                />
              )}
            </div>

            {tab2.table_data2 && Array.isArray(tab2.table_data2) && tab2.table_data2.length > 0 && (
              <ul className="space-y-4 pb-2">
                {tab2.table_data2.map((bullet, idx) => (
                  <ChecklistItem key={idx}>
                    <span dangerouslySetInnerHTML={{ __html: bullet }} />
                  </ChecklistItem>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── Section 3: Creating Shared Value ─────────────────────────── */}
      {tab3 && (
        <section id="shared-value" className="scroll-mt-24">
          <div className={`${cstyles.containerLg}`}>
            <div className={`${cstyles.sectionContent} mb-8`}>
              {tab3.title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab3.title)}</h2>`,
                  }}
                />
              )}
              
              {tab3.description && (
                <div 
                  className="mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: tab3.description.trim().startsWith('<p') 
                      ? tab3.description 
                      : `<p>${tab3.description}</p>` 
                  }} 
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
