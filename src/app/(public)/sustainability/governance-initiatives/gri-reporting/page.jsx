import React from "react";
import HeroSection from "@/components/common/heroSection";
import { OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";
import { getGriReportingData } from "@/services/gri-reporting.api";

export async function generateMetadata() {
  return buildMetadataForPathname(
    "/sustainability/governance-initiatives/gri-reporting"
  );
}

// ── Same formatHeading helper used on the Career and EPD pages
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

export default async function Page() {
  // Fetch dynamic GRI documents from the backend
  const { data, error } = await getGriReportingData();

  // Use API data if it's an array and has items.
  const apiData = Array.isArray(data) && data.length > 0 ? data : [];

  // Parse tab-1 (Introduction) - fallback to first item if category name is wrong
  const tab1 = apiData.find(item => item.category?.includes("tab-1")) || apiData[0];

  // Parse tab-2 (Why GRI Reporting Matters & PDFs)
  let tab2Items = apiData.filter(item => item.category?.includes("tab-2"));
  if (tab2Items.length === 0 && apiData.length > 1) {
    tab2Items = [apiData[1]];
  }
  
  // Combine all PDF cards from ALL items' table_data3 array (ensuring download_link exists)
  const pdfCards = apiData.reduce((acc, item) => {
    if (item.table_data3 && Array.isArray(item.table_data3)) {
      const validPdfs = item.table_data3.filter(pdf => pdf.download_link);
      return [...acc, ...validPdfs];
    }
    return acc;
  }, []);

  // If there's an error and no data, show error state in the cards section
  const hasError = !!error && apiData.length === 0;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection
        data={{
          title: "GRI Reporting",
          banner: "/images/blog/blogBanner.jpg",
        }}
      />

      {/* ── Introduction ─────────────────────────────────────────────── */}
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

      {/* ── Section 2: Why GRI Reporting Matters ─────────────────────── */}
      {tab2Items.length > 0 && (
        <section id="why-gri-matters" className="scroll-mt-24 bg-[#f5f5f5]">
          <div className={cstyles.containerLg}>
            <div className={`${cstyles.sectionContent} mb-6`}>
              {tab2Items[0].title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab2Items[0].title)}</h2>`,
                  }}
                />
              )}
              
              {tab2Items[0].description && (
                <div 
                  className="pb-4" 
                  dangerouslySetInnerHTML={{ 
                    __html: tab2Items[0].description.trim().startsWith('<p') 
                      ? tab2Items[0].description 
                      : `<p>${tab2Items[0].description}</p>` 
                  }} 
                />
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-8">
              {pdfCards.length > 0 ? (
                pdfCards.map((doc, index) => {
                  const title = doc.title;
                  const downloadLink = doc.download_link;

                  return (
                    <article
                      key={index}
                      className="w-full h-full lg:h-[238px] rounded-[32px] bg-[#004AA1] p-6 shadow-[0px_4px_10px_0px_#00000026]"
                    >
                      <div className="flex h-full flex-col">
                        <h3
                          className="max-w-[95%] !my-0 text-white uppercase text-[20px] leading-[1.3] sm:text-[24px] xl:!text-[28px]"
                          style={{ fontFamily: "var(--font-bebas-neue)" }}
                        >
                          {title}
                        </h3>

                        <div className="mt-auto pt-6">
                          <div className="flex items-end justify-between gap-3">
                            <div className="w-[calc(100%-46px)] sm:w-[calc(100%-58px)] xl:w-[calc(100%-67px)]">
                              <OutlineButtonLink
                                goto={downloadLink}
                                action="_blank"
                                title="Download"
                                className="!text-white !text-xs sm:!text-sm whitespace-nowrap"
                              />
                            </div>
                            <div className="flex h-[30px] w-[30px] items-center justify-center xl:h-[39px] xl:w-[39px]">
                              <Image
                                src="/images/icons/pdf.png"
                                alt="PDF"
                                width={39}
                                height={39}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : hasError ? (
                <div className="col-span-full py-8 text-center text-red-500">
                  <p>Failed to load GRI Reporting data. Please try again later.</p>
                </div>
              ) : null}
            </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
