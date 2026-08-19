import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getCastIronPipes } from "@/services/product/castIronPipes.api";
import CardSection from "./_components/cardSection";
import React from "react";

const page = async () => {
  const CastIronPipes = await getCastIronPipes();
  if (!CastIronPipes || CastIronPipes.error) return <SomethingWentWrong />

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
      <HeroSection
        data={CastIronPipes?.data?.heroSection}
      />
      <GridTwoSection
        data={CastIronPipes?.data?.overview}
        bannerOrder={"order-2 lg:order-1"}
        contentOrder={"order-1 lg:order-2"}
        sectionID={"overview"}
      />
      <CardSection data={boxdata} />
    </>
  );
};

export default page;
