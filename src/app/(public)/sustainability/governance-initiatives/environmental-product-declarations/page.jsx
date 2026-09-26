import React from "react";
import HeroSection from "@/components/common/heroSection";
import { OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";
import { getEpdPublications } from "@/services/epd.api";

export async function generateMetadata() {
  return buildMetadataForPathname(
    "/sustainability/governance-initiatives/environmental-product-declarations"
  );
}

// ── Same formatHeading helper used on the Career and EcoVadis pages
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

// ── Checklist item — identical to Career and EcoVadis pages
const ChecklistItem = ({ children }) => (
  <li className="flex items-start gap-2">
    <Image
      src="/images/tickblue.png"
      alt="Check"
      width={25}
      height={25}
      className="mt-0.5 flex-shrink-0"
    />
    <span className="text-[14px] md:text-[18px] text-[#545454] leading-relaxed">
      {children}
    </span>
  </li>
);

export default async function Page() {
  // Fetch dynamic EPD documents from the backend
  const { data, error } = await getEpdPublications();

  // Use API data if it's an array and has items.
  const apiData = Array.isArray(data) && data.length > 0 ? data : [];

  // Parse tab-1 (Introduction)
  const tab1 = apiData.find(item => item.category === "epd_publications-tab-1");
  const tab1Paragraphs = tab1?.description 
    ? tab1.description.split("\n\n").filter(p => p.trim() !== "")
    : [];

  // Parse tab-2 (Commitments & PDFs)
  // There might be multiple objects for tab-2 if they added multiple PDFs/Rows
  const tab2Items = apiData.filter(item => item.category === "epd_publications-tab-2");
  
  // Combine all bullets from all tab2 items
  const tab2Bullets = tab2Items.reduce((acc, item) => {
    if (item.table_data2 && Array.isArray(item.table_data2)) {
      return [...acc, ...item.table_data2];
    }
    return acc;
  }, []);

  // Combine all PDF cards from tab2 items' table_data3
  const pdfCards = tab2Items.reduce((acc, item) => {
    if (item.table_data3 && Array.isArray(item.table_data3)) {
      return [...acc, ...item.table_data3];
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
          title: "Environmental Product Declarations (EPDs)",
          banner: "/images/blog/blogBanner.jpg",
        }}
      />

      {/* ── Introduction ─────────────────────────────────────────────── */}
      <section id="introduction" className="scroll-mt-24">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-8`}>
            {tab1?.title && (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<h2>${formatHeading(tab1.title)}</h2>`,
                }}
              />
            )}
            
            {tab1Paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitment Bullets ───────────────────────────────────────── */}
      {tab2Items.length > 0 && (
        <section id="commitment" className="scroll-mt-24 bg-[#f5f5f5]">
          <div className={cstyles.containerLg}>
            <div className={`${cstyles.sectionContent} mb-6`}>
              {tab2Items[0]?.title && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<h2>${formatHeading(tab2Items[0].title)}</h2>`,
                  }}
                />
              )}
            </div>

            {tab2Bullets.length > 0 && (
              <ul className="space-y-4 pb-2">
                {tab2Bullets.map((bullet, index) => (
                  <ChecklistItem key={index}>
                    <span dangerouslySetInnerHTML={{ __html: bullet }} />
                  </ChecklistItem>
                ))}
              </ul>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-8">
              {pdfCards.length > 0 ? (
                pdfCards.map((doc, index) => {
                  const title = doc.title || "EPD Document";
                  const downloadLink = doc.download_link;

                  return (
                    <article
                      key={doc.id || index}
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
                  <p>Failed to load EPD publications. Please try again later.</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
