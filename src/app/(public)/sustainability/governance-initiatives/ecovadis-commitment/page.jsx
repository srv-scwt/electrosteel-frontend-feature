import React from "react";
import HeroSection from "@/components/common/heroSection";
import cstyles from "@/app/common.module.css";
import Image from "next/image";
import { buildMetadataForPathname } from "@/utils/seo";

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
const ChecklistItem = ({ children }) => (
  <li className="flex items-start gap-2">
    <Image
      src="/images/tickblue.png"
      alt="Check Icon"
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
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <HeroSection
        data={{
          title: "Ecovadis Commitment",
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
                  "EcoVadis 2025 Committed Badge"
                )}</h2>`,
              }}
            />
            <p>
              <strong>
                Electrosteel Castings has won the EcoVadis 2025 Committed Badge
                for the year 2025.
              </strong>
            </p>
            <p>
              It reflects a &quot;Good&quot; performance according to the EcoVadis
              evaluation methodology. EcoVadis is the global benchmark for
              assessing Corporate Social and Environmental Responsibility (CSR).
              The organization analyzes 21 criteria across four main themes:
              Environment, Social and Human Rights, Ethics, and Sustainable
              Purchases. Each rating is based on concrete evidence of performance
              and the implementation of a continuous improvement strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 1 : Environmental & Sustainability Initiatives ─────── */}
      <section id="sustainability-initiatives" className="scroll-mt-24 bg-[#f5f5f5]">
        <div className={`${cstyles.containerLg}`}>
          <div className={`${cstyles.sectionContent} mb-6`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading(
                  "Environmental and Sustainability Performance"
                )}</h2>`,
              }}
            />
            <p>
              For FY 2024–25, Electrosteel Castings demonstrated significant
              progress in strengthening its environmental and sustainability
              performance through initiatives such as:
            </p>
          </div>

          <ul className="space-y-4 pb-2">
            <ChecklistItem>
              Transitioning its furnaces to cleaner Blast Furnace Gas (BFG) to
              improve energy efficiency and reduce emissions.
            </ChecklistItem>
            <ChecklistItem>
              Expanding its 12 MW Waste Heat Recovery System (WHRS) to recover
              waste energy and enhance operational sustainability.
            </ChecklistItem>
            <ChecklistItem>
              Conserving over 1.7 million kilolitres (17 lakh KL) of water
              through the recycling of municipal sewage using advanced treatment
              facilities.
            </ChecklistItem>
            <ChecklistItem>
              Maintaining internationally recognized management systems,
              including ISO 50001 (Energy Management), ISO 14001 (Environmental
              Management), ISO 45001 (Occupational Health &amp; Safety), and SA
              8000 (Social Accountability), supported by regular audits, employee
              awareness programmes, and continuous improvement initiatives.
            </ChecklistItem>
          </ul>
        </div>
      </section>

      {/* ── Section 2 : Best Practices ────────────────────────────────── */}
      <section id="best-practices" className="scroll-mt-24">
        <div className={`${cstyles.containerLg} !pt-0`}>
          <div className={`${cstyles.sectionContent} mb-6 pt-[clamp(32px,4vw,96px)]`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading("Best Practices and Distinctions")}</h2>`,
              }}
            />
            <p>
              The company also distinguishes itself through its best practices
              in the following areas:
            </p>
          </div>

          <ul className="space-y-4">
            <ChecklistItem>
              <span>
                <strong>Social and Human Rights:</strong> Working conditions,
                social dialogue, prevention and training measures.
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                <strong>Ethics:</strong> Assessment of corruption risks,
                information security, and combating anti-competitive practices.
              </span>
            </ChecklistItem>
            <ChecklistItem>
              <span>
                <strong>Sustainable Purchases:</strong> Integration of social
                and environmental clauses for suppliers and analysis of CSR
                risks.
              </span>
            </ChecklistItem>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
