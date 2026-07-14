import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import CommonTable from "@/components/common/CommonTable";
import CommonTab from "@/components/common/CommonTab";
import { Check } from "lucide-react";
import cstyles from "@/app/common.module.css";
import { careerData } from "./career.data";
import CareerEnquiryForm from "./_components/forms/CareerEnquiryForm";

// Reusable Checklist Component
const Checklist = ({ title, items }) => (
  <div className="mt-0 mb-6">
    {title && <h4 className="text-[#004aa1] font-bold text-xl mb-4">{title}</h4>}
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <Check size={20} className="text-[#004aa1] mt-1 mr-3 flex-shrink-0" />
          <span className="text-[#333] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const page = () => {
  // Map current openings to CommonTab structure
  const currentOpeningsTabs = careerData.joinUs.currentOpenings.categories.map((category) => ({
    id: category.id,
    title: category.title,
    content: (
      <div className="p-4">
        <h5 className="text-[#004aa1] font-bold text-lg mb-4">{category.title} Opportunities</h5>
        <div className="flex flex-wrap gap-3">
          {category.functions.map((func, i) => (
            <span 
              key={i} 
              className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full shadow-sm border border-gray-200"
            >
              {func}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <>
      <HeroSection data={careerData.hero} />

      {/* OVERVIEW SECTION */}
      <section id="overview" className="scroll-mt-24 pb-0">
        <ContentSection data={{ title: careerData.overview.title }} />
        
        <div className={`${cstyles.containerLg} !pt-0`}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{careerData.overview.subTitle}</h4>
          <div className="text-[#545454] font-medium text-[clamp(14px,2.5vw,18px)] mb-8" dangerouslySetInnerHTML={{ __html: careerData.overview.description }} />
          
          <Checklist title={careerData.whyJoinUs.title} items={careerData.whyJoinUs.checklist} />
          {careerData.whyJoinUs.postDescription && (
            <div className="text-[#545454] font-medium text-[clamp(14px,2.5vw,18px)] mb-8" dangerouslySetInnerHTML={{ __html: careerData.whyJoinUs.postDescription }} />
          )}

          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{careerData.ourPromise.title}</h4>
          <div className="text-[#545454] font-medium text-[clamp(14px,2.5vw,18px)]" dangerouslySetInnerHTML={{ __html: careerData.ourPromise.description }} />
        </div>
      </section>

      {/* JOIN US SECTION */}
      <section id="join-us" className="scroll-mt-24 pb-0">
        <ContentSection data={careerData.joinUs} />
        
        <div className={`${cstyles.containerLg} !pt-0`}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-2">{careerData.joinUs.currentOpenings.title}</h4>
          
          {careerData.joinUs.currentOpenings.description && (
            <div className="mb-4 text-[#545454] font-medium text-[clamp(14px,2.5vw,18px)]" dangerouslySetInnerHTML={{ __html: careerData.joinUs.currentOpenings.description }} />
          )}

          <div className="mb-8">
            <CommonTab tabsData={currentOpeningsTabs} />
          </div>

          <Checklist title={careerData.joinUs.whatWeLookFor.title} items={careerData.joinUs.whatWeLookFor.checklist} />
          <Checklist title={careerData.joinUs.whatWeOffer.title} items={careerData.joinUs.whatWeOffer.checklist} />
        </div>
      </section>

      {/* KHOJ SECTION */}
      <section id="khoj" className="scroll-mt-24 pb-0">
        <ContentSection data={{ title: careerData.khoj.title, description: `<p>${careerData.khoj.description}</p>` }} />
        <div className="-mt-16 md:-mt-32">
          <ContentSection data={careerData.khoj.khojIntro} />
        </div>

        <div className={`${cstyles.containerLg} !pt-0`}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-2">{careerData.khoj.programmeHighlights.title}</h4>
          
          <div className="mb-6">
            <CommonTable 
              columns={careerData.khoj.programmeHighlights.table.tableHeaders.map(h => h.text)} 
              rows={careerData.khoj.programmeHighlights.table.tableBody} 
              className="!mt-2"
            />
          </div>

          <Checklist title={careerData.khoj.rolesOffered.title} items={careerData.khoj.rolesOffered.checklist} />
          <Checklist title={careerData.khoj.khojJourney.title} items={careerData.khoj.khojJourney.checklist} />
        </div>
      </section>

      {/* CAREER ENQUIRY SECTION */}
      <section id="career-enquiry" className="scroll-mt-24 pb-12">
        <ContentSection data={careerData.careerEnquiry} />
        <div className={`${cstyles.containerLg} !pt-0`}>
          <CareerEnquiryForm />
        </div>
      </section>
    </>
  );
};

export default page;
