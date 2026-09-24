import React from "react";
import HeroSection from "@/components/common/heroSection";
import { OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";

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

// ── Static GRI document list
// Files are served from /images/GRI_pdf/ (public folder)
const GRI_DOCUMENTS = [
  {
    id: "gri-sr-2023-24",
    title: "GRI Sustainability Report 2023-24",
    src: "/images/GRI_pdf/GRI_SR_2023_24.pdf",
  },
];

const Page = () => {
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
      <section id="introduction" className="scroll-mt-24">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-8`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading(
                  "Electrosteel’s GRI-Aligned Sustainability Initiative"
                )}</h2>`,
              }}
            />
            <p>
              Electrosteel Castings has strengthened its sustainability journey
              by developing a GRI-aligned Sustainability Report for FY 2023–24.
              The report provides a structured view of the company’s
              sustainability priorities and its economic, environmental and
              social impacts, reflecting a commitment to greater transparency
              and responsible business practices.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Why GRI Reporting Matters ─────────────────────── */}
      <section id="why-gri-matters" className="scroll-mt-24 bg-[#f5f5f5]">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-6`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading("Why GRI Reporting Matters")}</h2>`,
              }}
            />
            <p className="pb-4">
              GRI provides a globally recognised framework for communicating an
              organisation’s sustainability impacts in a consistent, credible
              and comparable manner. It helps companies identify material issues,
              improve accountability, engage stakeholders and integrate
              sustainability considerations into business decision-making.
              For Electrosteel, adopting a GRI-aligned approach is therefore an
              important step towards measuring progress, building stakeholder
              confidence and demonstrating its continued commitment to sustainable
              and responsible growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-8">
              {GRI_DOCUMENTS.map((doc) => (
                <article
                  key={doc.id}
                  className="w-full h-full lg:h-[238px] rounded-[32px] bg-[#004AA1] p-6 shadow-[0px_4px_10px_0px_#00000026]"
                >
                  <div className="flex h-full flex-col">
                    <h3
                      className="max-w-[95%] !my-0 text-white uppercase text-[20px] leading-[1.3] sm:text-[24px] xl:!text-[28px]"
                      style={{ fontFamily: "var(--font-bebas-neue)" }}
                    >
                      {doc.title}
                    </h3>

                    <div className="mt-auto pt-6">
                      <div className="flex items-end justify-between gap-3">
                        <div className="w-[calc(100%-46px)] sm:w-[calc(100%-58px)] xl:w-[calc(100%-67px)]">
                          <OutlineButtonLink
                            goto={doc.src}
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
