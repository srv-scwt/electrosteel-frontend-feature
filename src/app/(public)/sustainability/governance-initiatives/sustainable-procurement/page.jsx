import React from "react";
import HeroSection from "@/components/common/heroSection";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";

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
    <span className="text-[14px] md:text-[18px] text-[#545454] leading-relaxed">
      {children}
    </span>
  </li>
);

const Page = () => {
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
      <section id="introduction" className="scroll-mt-24">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-8`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading(
                  "Sustainable Purchases and Creating Local, <br/> Indirect and Induced Employment Opportunities"
                )}</h2>`,
              }}
            />
            <div
              className="mt-8 mb-4"
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading("Building responsible partnerships")}</h2>`,
              }}
            />
            <p className="mb-4">
              At Electrosteel Castings Limited, responsible procurement is an
              integral part of our sustainability journey. We work closely with
              suppliers, contractors and business partners to build a resilient,
              transparent and ethical supply chain that creates long-term value
              for all stakeholders.
              Wherever feasible, we encourage local sourcing, supporting MSMEs
              and regional businesses while strengthening local economies and
              supply ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Guaranteeing Responsibility ───────────────────── */}
      <section id="responsibility" className="scroll-mt-24 bg-[#f5f5f5]">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-6`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading(
                  "Our purchases guarantee responsibility"
                )}</h2>`,
              }}
            />
            <p className="mb-6">
              Our procurement practices are guided by Electrosteel&apos;s
              Sustainable Procurement Policy and Supplier Code of Conduct,
              promoting responsible business across our value chain.
            </p>
          </div>

          <ul className="space-y-4 pb-2">
            <ChecklistItem>
              <span>
               Environmental, Health &amp; Safety (EHS){" "}
                requirements are integrated into supplier selection and
                evaluation.
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                Suppliers are expected to uphold{" "}
             
                  human rights, ethical business practices, environmental
                  protection and anti-corruption standards
            
                .
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                We maintain{" "}
              
                  zero tolerance towards child labour, forced labour and
                  discrimination
            
                .
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                Regular assessments and engagement help strengthen supplier
                performance and continuous improvement across the value chain.
                During FY 2024–25,{" "}
               
                  14% of the value chain was assessed with no instances of
                  non-compliance identified.
              
              </span>
            </ChecklistItem>
          </ul>
        </div>
      </section>

      {/* ── Section 3: Creating Shared Value ─────────────────────────── */}
      <section id="shared-value" className="scroll-mt-24">
        <div className={`${cstyles.containerLg}`}>
          <div className={`${cstyles.sectionContent} mb-8`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading("Creating shared value")}</h2>`,
              }}
            />
            <p className="mb-4">
              By strengthening responsible sourcing and increasing local
              procurement, Electrosteel continues to build a sustainable supply
              chain that supports business resilience, regional development and
              responsible industrial growth.
              During FY 2024–25, procurement from local suppliers increased to{" "}
              <strong>72.32%</strong>, reinforcing our commitment to local value
              creation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
