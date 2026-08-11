import React from "react";
import HeroSection from "@/components/common/heroSection";
import CommonTable from "@/components/common/CommonTable";
import { Check } from "lucide-react";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { getCareersData } from "@/services/career.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { createImageSourceURL } from "@/utils";

// Helper to ensure raw text is wrapped in <p> so `.sectionContent p` CSS applies Montserrat font
const wrapInParagraph = (htmlString) => {
  if (!htmlString) return "";
  const trimmed = htmlString.trim();
  if (trimmed.startsWith("<")) return trimmed;
  return `<p>${trimmed}</p>`;
};

// Reusable Checklist Component
const Checklist = ({ title, description, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-0 mb-6">
      {title && (
        <div className={`${cstyles.sectionContent} mb-6`}>
          <HTMLRender htmlString={title} />
        </div>
      )}
      {description && (
        <div className={`${cstyles.sectionContent} mb-6`}>
          <HTMLRender htmlString={wrapInParagraph(description)} />
        </div>
      )}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <Check size={20} className="text-[#004aa1] mt-1 mr-3 flex-shrink-0" />
            <span className="text-[#333] leading-relaxed">
              <HTMLRender htmlString={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const page = async () => {
  const response = await getCareersData();
  if (!response || !response.success || !response.data) {
    return <SomethingWentWrong />;
  }

  const apiData = response.data;
  const {
    hero,
    buildFuture,
    exploreOpportunity,
    khojTheCampusDrive,
    rolesOfferedUnderKhoj,
  } = apiData;

  const heroData = {
    title: hero?.title,
    banner: createImageSourceURL(hero?.image),
  };

  // Safe mapping of 'Why Join Us' checklist
  const whyJoinUsChecklist = buildFuture?.table_headers?.headerTop?.map(h => h.label) || [];
  
  // Safe mapping of 'What we look for' checklist
  const whatWeLookForChecklist = exploreOpportunity?.table_data?.columns || [];
  
  // Safe mapping of 'What we offer' checklist (skipping the first item which is usually the title row in this CMS structure)
  const whatWeOfferChecklist = exploreOpportunity?.table_data2?.slice(1)?.map(x => x.text) || [];
  
  // Safe mapping of 'The Khoj Journey' checklist
  const khojJourneyChecklist = khojTheCampusDrive?.table_headers?.headerTop?.map(h => h.label) || [];
  const khojJourneyDescription = khojTheCampusDrive?.table_headers?.description;
  
  // Safe mapping of 'Programme highlights' table data
  const programmeHighlightsHeaders = ["Topic", "Description"];
  const programmeHighlightsRows = khojTheCampusDrive?.table_data?.rows || [];

  // Safe mapping for 'Roles Offered' which is stored in khojTheCampusDrive.table_data2
  const rolesOfferedChecklist = khojTheCampusDrive?.table_data2?.slice(1)?.map(x => x.text) 
    || rolesOfferedUnderKhoj?.table_data?.columns 
    || rolesOfferedUnderKhoj?.table_headers?.headerTop?.map(h => h.label) 
    || [];
  const rolesOfferedTitle = khojTheCampusDrive?.table_data2?.[0]?.title || rolesOfferedUnderKhoj?.title || "ROLES OFFERED";

  return (
    <>
      <HeroSection data={heroData} />

      {/* OVERVIEW SECTION */}
      <section id="overview" className="scroll-mt-24">
        <div className={`${cstyles.containerLg}`}>
          {buildFuture && (
            <div className={`${cstyles.sectionContent} ${cstyles.customUlListing} mb-8`}>
              {buildFuture.title && <HTMLRender htmlString={`<h2>${buildFuture.title}</h2>`} />}
              <HTMLRender htmlString={wrapInParagraph(buildFuture.description)} />
            </div>
          )}

          {whyJoinUsChecklist.length > 0 && (
            <Checklist title={`<h3>${buildFuture?.table_data?.title || "WHY JOIN ELECTROSTEEL"}</h3>`} items={whyJoinUsChecklist} />
          )}

          {buildFuture?.table_data2?.[0]?.title && (
            <div className={`${cstyles.sectionContent} mb-6`}>
              <HTMLRender htmlString={`<h3>${buildFuture.table_data2[0].title}</h3>`} />
            </div>
          )}
          {buildFuture?.table_data2?.[0]?.description && (
            <div className={`${cstyles.sectionContent} mb-8`}>
              <HTMLRender htmlString={wrapInParagraph(buildFuture.table_data2[0].description)} />
            </div>
          )}
        </div>
      </section>

      {/* JOIN US SECTION */}
      <section id="join-us" className="scroll-mt-24">
        <div className={`${cstyles.containerLg} !pt-0`}>
          {exploreOpportunity && (
            <div className={`${cstyles.sectionContent} ${cstyles.customUlListing} mb-8`}>
              {exploreOpportunity.title && <HTMLRender htmlString={`<h2>${exploreOpportunity.title}</h2>`} />}
              <HTMLRender htmlString={wrapInParagraph(exploreOpportunity.description)} />
            </div>
          )}
          
          {whatWeLookForChecklist.length > 0 && (
            <Checklist title={`<h3>${exploreOpportunity?.table_data?.title || "WHAT WE LOOK FOR"}</h3>`} items={whatWeLookForChecklist} />
          )}
          {whatWeOfferChecklist.length > 0 && (
            <Checklist title={`<h3>${exploreOpportunity?.table_data2?.[0]?.title || "WHAT WE OFFER"}</h3>`} items={whatWeOfferChecklist} />
          )}
        </div>
      </section>

      {/* KHOJ SECTION */}
      <section id="khoj" className="scroll-mt-24">
        <div className={`${cstyles.containerLg} !pt-0`}>
          
          {khojTheCampusDrive && (
            <div className={`${cstyles.sectionContent} ${cstyles.customUlListing} mb-8`}>
              {khojTheCampusDrive.title && <HTMLRender htmlString={`<h2>${khojTheCampusDrive.title}</h2>`} />}
              <HTMLRender htmlString={wrapInParagraph(khojTheCampusDrive.description)} />
            </div>
          )}
          
          {khojTheCampusDrive?.table_data3 && (
            <div className={`${cstyles.sectionContent} ${cstyles.customUlListing} mb-8`}>
              {khojTheCampusDrive.table_data3.title && <HTMLRender htmlString={`<h3>${khojTheCampusDrive.table_data3.title}</h3>`} />}
              <HTMLRender htmlString={wrapInParagraph(khojTheCampusDrive.table_data3.description)} />
            </div>
          )}

          {khojTheCampusDrive?.table_data?.title && (
            <div className={`${cstyles.sectionContent} mb-6`}>
              <HTMLRender htmlString={`<h3>${khojTheCampusDrive.table_data.title}</h3>`} />
            </div>
          )}
          
          {programmeHighlightsRows.length > 0 && (
            <div className="mb-6">
              <CommonTable 
                columns={programmeHighlightsHeaders} 
                rows={programmeHighlightsRows} 
                className="!mt-2"
              />
            </div>
          )}

          {rolesOfferedChecklist.length > 0 && (
             <Checklist 
               title={`<h3>${rolesOfferedTitle}</h3>`} 
               items={rolesOfferedChecklist} 
             />
          )}

          {khojJourneyChecklist.length > 0 && (
            <Checklist 
              title={`<h3>${khojTheCampusDrive?.table_headers?.title || "THE KHOJ JOURNEY"}</h3>`} 
              description={khojJourneyDescription}
              items={khojJourneyChecklist} 
            />
          )}
        </div>
      </section>
    </>
  );
};

export default page;
