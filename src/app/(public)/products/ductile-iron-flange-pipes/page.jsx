import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import { advantageOfFlange, applicationOfFlange } from "../data/m.data";
import AdvantagesOfFlange from "./_components/AdvantagesOfFlange";
import FlangePipeTable from "../_components/FlangePipetypesTable";
import ChooseListSection from "@/components/common/ChooseListSection";
import ApplicationSection from "../_components/applicationSection";
import { getDuctileIronFlangePipes } from "@/services/product/ductileIronFlangePipe.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import CardSection from "./_components/cardSection";
import JsonLd from "@/components/common/JsonLd";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/products/ductile-iron-flange-pipes");
}

// Product structured data for search engines.
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.electrosteel.com/products/ductile-iron-flange-pipes#product",
  name: "Electrosteel Ductile Iron Flange Pipes",
  description:
    "Electrosteel Ductile Iron Flange Pipes are engineered for reliable above-ground, vertical and plant pipeline installations, offering welded-on, screwed-on and integrally cast flange configurations with pressure ratings up to PN 40.",
  url: "https://www.electrosteel.com/products/ductile-iron-flange-pipes",
  brand: {
    "@type": "Brand",
    name: "Electrosteel",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Electrosteel Castings Limited",
    url: "https://www.electrosteel.com/",
  },
  category: "Ductile Iron Flange Pipes",
  material: "Ductile Iron",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Product Type", value: "Ductile Iron Flange Pipes" },
    {
      "@type": "PropertyValue",
      name: "Flange Pipe Types",
      value: "Welded Flange Pipes, Screwed Flange Pipes, As Cast Flange Pipes",
    },
    { "@type": "PropertyValue", name: "Pressure Ratings", value: "PN 10, PN 16, PN 25 and PN 40" },
    {
      "@type": "PropertyValue",
      name: "Applicable Standards",
      value: "IS 8329, IS 9523, ISO 2531, EN 545 and AWWA C115",
    },
    {
      "@type": "PropertyValue",
      name: "Application",
      value:
        "Over-ground pipelines, vertical pipelines, water treatment plants, sewage treatment plants, pump houses and pipeline interconnections",
    },
  ],
};

const page = async () => {
  const DiFlangePipesData = await getDuctileIronFlangePipes();
  // Schema is static, so keep it even when the CMS call fails.
  if (!DiFlangePipesData || DiFlangePipesData.error) {
    return (
      <>
        <JsonLd data={productJsonLd} />
        <SomethingWentWrong />
      </>
    );
  }
  const boxdata = [
    {
      title: "Explore our Product Range",
      description: "Check our complete portfolio of products.",
      image: "https://www.electrosteel.com/electrosteel-static-assets/1786014019518-file-1778767728765-684139422.webp",
      btn_title: "View Product Brochures",
      link: "/resource-and-download/brochure",
    },
    {
      title: "Got a Query?",
      description: "Submit your enquiry here, and our team will get back to you.",
      image: "https://www.electrosteel.com/electrosteel-static-assets/1786014406057-file-1778761081430-589725434.webp",
      btn_title: "Enquire Now",
      link: "/connect/business-enquiry",
    },
  ];
  return (
    <>
      <JsonLd data={productJsonLd} />
      <HeroSection data={DiFlangePipesData?.data?.heroSection} />
      <FlangePipeTable
        data={DiFlangePipesData?.data?.flangeTable?.data}
        tableHeaders={DiFlangePipesData?.data?.flangeTable?.data?.tableHeaders}
        tableData={DiFlangePipesData?.data?.flangeTable?.data?.tableData}
        sectionId={"product-details"}
      />
      <ChooseListSection sectionID={"advantages"} data={DiFlangePipesData?.data?.advantages?.[0]} />
      <ApplicationSection sectionID={"applications"} data={DiFlangePipesData?.data?.applications || []} />
      <CardSection data={boxdata} />
    </>
  );
};

export default page;
