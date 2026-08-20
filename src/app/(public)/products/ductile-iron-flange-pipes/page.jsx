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

const page = async () => {
  const DiFlangePipesData = await getDuctileIronFlangePipes();
  if (!DiFlangePipesData || DiFlangePipesData.error) return <SomethingWentWrong />
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
