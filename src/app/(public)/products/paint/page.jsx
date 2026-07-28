import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import PaintFacilitiesCard from "@/components/common/card/PaintFacilitiesCard";
import HTMLRender from "@/components/ui/HTMLRender";
import cstyles from "@/app/common.module.css";
import { Phone, MapPin, Building2 } from "lucide-react";
import TechnologyMantra from "../_components/technologyIsMantra";
import TestPerformed from "../_components/TestPerformed";

import CurrentManufacture from "../_components/currentManufacture";
import ComprehensiveProducts from "../_components/comprehensiveProducts";
import ComprehensiveProductRange from "./_components/comprehensiveProductRange";
import BusinessOverview from "../_components/BusinessOverview";
import ApplicationSection from "../_components/applicationSection";
import { paintsData } from "./paint.data";

const Paint = () => {
  console.log(paintsData.TalkToOurPaintExperts)
  return (
    <>
      <HeroSection data={paintsData.hero} />
      
      <ContentSection data={paintsData.ElectrosteelLegacyofInnovation} sectionID="overview" />
      
      <GridTwoSection
        data={paintsData.PaintOverview}
        contentOrder={"order-1"}
        bannerOrder={"order-2 "}
        sectionID={"overview-details"}
        className="!py-0"
        objectPosition="object-contain"
      />
      
      <TechnologyMantra
        data={paintsData.PaintTechnologyMantra}
        images={paintsData.PaintTechnologyMantra.slider_images}
      />
      
      <CurrentManufacture
        data={paintsData.ManufacturingExcellence}
        paints={paintsData.ManufacturingExcellence.card} 
      />

      <BusinessOverview data={paintsData.WhyChooseECLPaints} />
      


      <ComprehensiveProducts
        data={paintsData.ProductCategories}
        productCategories={paintsData.ProductCategories.card}
      />

      <ApplicationSection
        sectionID="applications"
        data={paintsData.Application}
      />

      <ComprehensiveProductRange data={paintsData.ComprehensiveProductRange} />

      <ComprehensiveProductRange data={paintsData.WorldClassRnDLaboratory} isGrey={false} />

      <TestPerformed
        data={paintsData.TestPerformed}
      />

      <section id="paint-experts">
        <div className={`${cstyles.containerLg}`}>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing} mb-8`}>
            <HTMLRender htmlString={paintsData.TalkToOurPaintExperts.title} />
            <p>{paintsData.TalkToOurPaintExperts.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {paintsData.TalkToOurPaintExperts.cards.map((item, index) => {
              
              let descContent = null;
              if (item.lines) {
                descContent = item.lines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < item.lines.length - 1 && <br />}
                  </React.Fragment>
                ));
              } else if (item.phones || item.emails || item.website) {
                descContent = (
                  <div className="flex flex-col space-y-0.5">
                    {item.phones?.map((phone, idx) => (
                      <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#FDD307] transition-colors inline-block">
                        {phone}
                      </a>
                    ))}
                    {item.emails?.map((email, idx) => (
                      <a key={idx} href={`mailto:${email}`} className="hover:text-[#FDD307] transition-colors inline-block underline underline-offset-4 mt-1">
                        {email}
                      </a>
                    ))}
                    {item.website && (
                      <a href={`http://${item.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FDD307] transition-colors inline-block underline underline-offset-4 mt-1">
                        {item.website}
                      </a>
                    )}
                  </div>
                );
              }

              const cardData = { ...item, desc: descContent };
              return (
                <PaintFacilitiesCard key={item.title} data={cardData} isDifferent={false} isLegendsTitle={true} />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Paint;
