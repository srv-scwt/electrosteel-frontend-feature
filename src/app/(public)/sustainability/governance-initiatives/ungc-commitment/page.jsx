import React from "react";
import HeroSection from "@/components/common/heroSection";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";
import { getUngcData } from "@/services/ungc.api";

export async function generateMetadata() {
  return buildMetadataForPathname(
    "/sustainability/governance-initiatives/ungc-commitment"
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

// ── Checklist item
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
  const { data } = await getUngcData();
  const apiData = Array.isArray(data) && data.length > 0 ? data : [];

  // Parse tabs safely from the API response
  const tab1 = apiData.find((item) => item.category?.includes("tab-1"));
  const tab2 = apiData.find((item) => item.category?.includes("tab-2"));
  const tab3 = apiData.find((item) => item.category?.includes("tab-3"));
  const tab4 = apiData.find((item) => item.category?.includes("tab-4"));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection
        data={{
          title: "UNGC Commitment", 
          banner: "/images/blog/blogBanner.jpg",
        }}
      />

      {/* ── Section 1: Introduction ──────────────────────────────────── */}
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

              {tab1.description && (
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: tab1.description.trim().startsWith("<p")
                      ? tab1.description
                      : `<p>${tab1.description.replace(/\n\n/g, "</p><p>")}</p>`,
                  }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 2: Our Sustainability Focus ──────────────────────── */}
      {tab2 && (
        <section id="sustainability-focus" className="scroll-mt-24 bg-[#f5f5f5]">
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
                    __html: tab2.description.trim().startsWith("<p")
                      ? tab2.description
                      : `<p>${tab2.description}</p>`,
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

      {/* ── Section 3: SDGs ──────────────────────────────────────────── */}
      {tab3 && tab3.table_data2 && Array.isArray(tab3.table_data2) && tab3.table_data2.length > 0 && (
        <section id="sdgs" className="scroll-mt-24">
          <div className={cstyles.containerLg}>
            <div className={`${cstyles.sectionContent} mb-8`}>
              {tab3.title ? (
                 <div dangerouslySetInnerHTML={{ __html: `<h2>${formatHeading(tab3.title)}</h2>` }} />
              ) : (
                 <div dangerouslySetInnerHTML={{ __html: `<h2>${formatHeading("Sustainable Development Goals (SDGs)")}</h2>` }} />
              )}
              
              {tab3.description && (
                <div
                  className="mb-8"
                  dangerouslySetInnerHTML={{
                    __html: tab3.description.trim().startsWith("<p")
                      ? tab3.description
                      : `<p>${tab3.description}</p>`,
                  }}
                />
              )}

              {/* Polished SDG Grid matching existing design patterns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                {tab3.table_data2.map((sdg, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center bg-[#004AA1] text-white p-4 sm:p-6 rounded-[24px] shadow-[0px_4px_10px_0px_#00000026] hover:scale-[1.02] transition-transform duration-300"
                  >
                    <span 
                      className="uppercase text-[20px] sm:text-[24px] xl:text-[28px] text-center"
                      style={{ fontFamily: "var(--font-bebas-neue)" }}
                    >
                      {sdg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 4: UNGC Callout / Communication on Progress ──────── */}
      {tab4 && (
        <section id="ungc-callout" className="scroll-mt-24 relative w-full overflow-hidden py-6 lg:py-8">
          {/* Background Image */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="/images/sustainability/environment_initiatives/sustainability-emission.webp"
              alt="UNGC Callout Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#004aa1] opacity-80 -z-10" />

          <div className={cstyles.containerLg}>
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 relative z-10">
              {tab4.image && (
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  <img
                    src={tab4.image}
                    alt="UN Global Compact"
                    className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] h-auto object-contain"
                  />
                </div>
              )}
              
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                {tab4.title && (
                  <div className={`${cstyles.sectionContent} mb-4 [&_h2]:!text-white [&_span]:!text-white`}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<h2>${formatHeading(tab4.title)}</h2>`,
                      }}
                    />
                  </div>
                )}
                {tab4.description && (
                  <div
                    className={`${cstyles.sectionParaH2Type} text-white opacity-95 [&_p]:!text-[18px] md:[&_p]:!text-[22px] lg:[&_p]:!text-[26px] xl:[&_p]:!text-[30px] [&_p]:!leading-[1.6]`}
                    dangerouslySetInnerHTML={{
                      __html: tab4.description.trim().startsWith("<p")
                        ? tab4.description
                        : `<p>${tab4.description}</p>`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
