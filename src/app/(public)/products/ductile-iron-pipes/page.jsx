import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import { ductileIronPipePExternal, ductileIronPipePInternal, ductileIronPipesJointingSystem, overviewDuctileIronPipes } from "../data/m.data";
import CommonTable from "@/components/common/CommonTable";
import ApplicationSection from "../_components/applicationSection";
import JointingSystemSection from "../_components/jointingSystemsSection";
import ProtectionSystemSection from "../_components/protectionSystemSection";
import DipProductDetails from "../_components/dipProductDetailsTable";
import { getDuctileIronPipes } from "@/services/product/ductileIronPipes.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import CardSection from "./_components/cardSection";
import JsonLd from "@/components/common/JsonLd";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/products/ductile-iron-pipes");
}

// Product structured data for search engines.
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.electrosteel.com/products/ductile-iron-pipes",
  name: "Electrosteel Ductile Iron Pipes",
  description:
    "Electrosteel manufactures high-quality Ductile Iron Pipes for water supply, pressure sewerage and other demanding pipeline applications. The pipes are manufactured to Indian and international standards including IS 8329, IS 9523, ISO 2531, ISO 7186, EN 545, EN 598 and AWWA C151.",
  url: "https://www.electrosteel.com/products/ductile-iron-pipes-overview.php",
  image: [
    "https://www.electrosteel.com/electrosteel-static-assets/1785403407658-New-Project-(16).webp",
  ],
  brand: {
    "@type": "Brand",
    name: "Electrosteel",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Electrosteel Castings Limited",
    url: "https://www.electrosteel.com/",
  },
  category: "Ductile Iron Pipes",
  material: "Ductile Iron",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Product Type", value: "Ductile Iron Pipe" },
    { "@type": "PropertyValue", name: "Nominal Diameter Range", value: "DN 80 to DN 1200 mm" },
    { "@type": "PropertyValue", name: "Tensile Strength", value: "Minimum 420 MPa" },
    { "@type": "PropertyValue", name: "Yield Strength", value: "300 MPa" },
    { "@type": "PropertyValue", name: "Elongation", value: "Minimum 10%" },
    { "@type": "PropertyValue", name: "Hardness", value: "Maximum 230 BHN" },
    {
      "@type": "PropertyValue",
      name: "Applicable Standards",
      value: "IS 8329, IS 9523, ISO 2531, ISO 7186, EN 545, EN 598, AWWA C151",
    },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Water Supply, Sewerage and Infrastructure Projects",
  },
};

const page = async () => {
  const DuctileIronPipesData = await getDuctileIronPipes();
  // Schema is static, so keep it even when the CMS call fails.
  if (!DuctileIronPipesData || DuctileIronPipesData.error) {
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
      <HeroSection data={DuctileIronPipesData?.data?.heroSection} />
      <GridTwoSection
        data={DuctileIronPipesData?.data?.overview}
        bannerOrder={"order-2"}
        contentOrder={"order-1"}
        sectionID={"overview"}
      >
        <CommonTable
          className={"!mt-0"}
          key={DuctileIronPipesData?.data?.overview?.tableData?.title}
          title={DuctileIronPipesData?.data?.overview?.tableData?.title}
          columns={DuctileIronPipesData?.data?.overview?.tableData?.columns}
          rows={DuctileIronPipesData?.data?.overview?.tableData?.rows}
        />
      </GridTwoSection>
      <DipProductDetails
        tableData={DuctileIronPipesData?.data?.productDetails?.tableData}
        tableExtraData={DuctileIronPipesData?.data?.productDetails?.tableExtraData}
        data={DuctileIronPipesData?.data?.productDetails}
      />
      <ApplicationSection
        sectionID={"applications"}
        data={DuctileIronPipesData?.data?.application}
      />
      <JointingSystemSection
        sectionID={"jointing-systems"}
        label={DuctileIronPipesData?.data?.jointingSystems?.title}
        data={DuctileIronPipesData?.data?.jointingSystems?.systems || []}
        jointingSystemLink={"/products/ductile-iron-pipes/jointing-systems"}
      />
      <ProtectionSystemSection
        data={DuctileIronPipesData?.data?.protectionInternal}
        className={"!pb-0"}
        sectionID={"protection-system"}
      />
      <ProtectionSystemSection
        data={DuctileIronPipesData?.data?.protectionExternal}
      />

      <CardSection data={boxdata} />
    </>
  );
};

export default page;