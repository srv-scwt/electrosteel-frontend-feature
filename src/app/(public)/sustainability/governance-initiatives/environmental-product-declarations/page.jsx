import React from "react";
import HeroSection from "@/components/common/heroSection";
import { OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";

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

// ── Static EPD document list
// Files are served from /images/EPD_file/ (public folder)
const EPD_DOCUMENTS = [
  {
    id: "epd-0020876",
    title: "EPD — Ductile Iron Pipes & Fittings (C25 Pressure Class)",
    src: "/images/EPD_file/EPD document_EPD-IES-0020876_002_en.pdf",
  },
  {
    id: "epd-0020877",
    title: "EPD — Ductile Iron Pipes & Fittings (C30 Pressure Class)",
    src: "/images/EPD_file/EPD document_EPD-IES-0020877_002_en.pdf",
  },
  {
    id: "epd-0020878",
    title: "EPD — Ductile Iron Pipes & Fittings (C40 Pressure Class)",
    src: "/images/EPD_file/EPD document_EPD-IES-0020878_002_en.pdf",
  },
];

const Page = () => {
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
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading(
                  "Driving Transparency through Verified Environmental Performance"
                )}</h2>`,
              }}
            />
            <p>
              At Electrosteel Castings, sustainability extends beyond responsible
              manufacturing to transparent disclosure of our environmental
              performance. As part of this commitment, the company published
              three independently verified Environmental Product Declarations
              (EPDs) for its primary products — Ductile Iron Pipes and Fittings
              — covering the C25, C30 and C40 pressure classes. These EPDs have
              been developed in accordance with ISO 14025:2006 and EN
              15804:2012+A2:2019/AC:2021, under The International EPD&reg;
              System, following a comprehensive third-party verified Life Cycle
              Assessment (LCA).
            </p>
            <p>
              An EPD is a globally recognized environmental disclosure that
              provides objective, science-based information on a product&apos;s
              environmental footprint throughout its life cycle. By publishing
              verified EPDs, Electrosteel enables customers, consultants,
              infrastructure developers and other stakeholders to make informed
              and transparent procurement decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Commitment Bullets ───────────────────────────────────────── */}
      <section id="commitment" className="scroll-mt-24 bg-[#f5f5f5]">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-6`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading(
                  "EPD initiative reinforces Electrosteel's commitment to"
                )}</h2>`,
              }}
            />
          </div>

          <ul className="space-y-4 pb-2">
            <ChecklistItem>
              <span>
                <strong>Global market readiness</strong>, including support for
                evolving sustainability requirements such as the EU Carbon Border
                Adjustment Mechanism (CBAM).
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                <strong>Internationally recognized environmental standards</strong>,
                ensuring credible, transparent and comparable product information.
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                <strong>Data-driven decarbonization</strong>, by leveraging life
                cycle assessment to identify opportunities for reducing
                environmental impacts across our products and operations.
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                <strong>Robust ESG and BRSR reporting</strong>, strengthening
                sustainability disclosures through independently verified
                environmental data.
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                <strong>Enhanced stakeholder confidence</strong>, enabling
                customers, investors and project developers to evaluate the
                environmental performance of our products with greater
                transparency.
              </span>
            </ChecklistItem>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-8">
            {EPD_DOCUMENTS.map((doc) => (
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
      </section>
    </>
  );
};

export default Page;
