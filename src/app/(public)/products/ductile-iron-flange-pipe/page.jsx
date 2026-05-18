import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import { advantageOfFlange, applicationOfFlange } from "../data/m.data";
import AdvantagesOfFlange from "./_components/AdvantagesOfFlange";
import FlangePipeTable from "../_components/FlangePipetypesTable";
import ChooseListSection from "@/components/common/ChooseListSection";
import ApplicationSection from "../_components/applicationSection";
import { getDuctileIronFlangePipes } from "@/services/product/ductileIronFlangePipe.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";

const page = async () => {
  const DiFlangePipesData = await getDuctileIronFlangePipes();
  if (!DiFlangePipesData || DiFlangePipesData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={DiFlangePipesData?.data?.heroSection} />
      <FlangePipeTable
        data={DiFlangePipesData?.data?.flangeTable?.data}
        tableHeaders={DiFlangePipesData?.data?.flangeTable?.data?.tableHeaders}
        tableData={DiFlangePipesData?.data?.flangeTable?.data?.tableData}
      />
      <ChooseListSection data={DiFlangePipesData?.data?.advantages?.[0]} />
      <ApplicationSection sectionID={"applications"} data={DiFlangePipesData?.data?.applications || []} />
    </>
  );
};

export default page;
