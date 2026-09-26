import React from "react";
import HeroSection from "@/components/common/heroSection";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import { buildMetadataForPathname } from "@/utils/seo";

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
          title: "UNGC Commitment",
          banner: "/images/blog/blogBanner.jpg",
        }}
      />

      {/* ── Introduction ─────────────────────────────────────────────── */}
      <section id="introduction" className="scroll-mt-24">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-8`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading("UNGC Commitment")}</h2>`,
              }}
            />
            <p>
              Electrosteel has been a participant of the United Nations Global
              Compact (UNGC) since FY 2023–24, reaffirming its commitment to the
              Ten Principles covering Human Rights, Labour, Environment and
              Anti-Corruption. Sustainability is embedded in our purpose of{" "}
              <strong>
                “Carrying Life to People, Safe Drinking Water for All.”
              </strong>{" "}
              Through responsible manufacturing, ethical governance and
              transparent reporting via our annual Communication on Progress
              (CoP), we create long-term value for stakeholders while
              contributing to the UN Sustainable Development Goals (SDGs).
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Sustainability Focus ─────────────────────────────────── */}
      <section id="sustainability-focus" className="scroll-mt-24 bg-[#f5f5f5]">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} mb-6`}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<h2>${formatHeading("Our Sustainability Focus")}</h2>`,
              }}
            />
          </div>

          <ul className="space-y-4 pb-2">
            <ChecklistItem>
              Human Rights, Labour, Environment and Ethical Business Practices
            </ChecklistItem>
            <ChecklistItem>
              Annual Communication on Progress (CoP) under UNGC
            </ChecklistItem>
            <ChecklistItem>
              Responsible manufacturing and resource efficiency
            </ChecklistItem>
            <ChecklistItem>
              Climate action and energy efficiency
            </ChecklistItem>
            <ChecklistItem>
              Safe workplaces and employee well-being
            </ChecklistItem>
            <ChecklistItem>
              Water stewardship and resilient infrastructure
            </ChecklistItem>
            <ChecklistItem>
              Strong governance and stakeholder partnerships
            </ChecklistItem>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
