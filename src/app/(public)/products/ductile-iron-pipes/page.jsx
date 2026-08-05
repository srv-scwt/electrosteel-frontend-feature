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

const page = async () => {
  const DuctileIronPipesData = await getDuctileIronPipes();
  if (!DuctileIronPipesData || DuctileIronPipesData.error) return <SomethingWentWrong />

  return (
    <>
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

    </>
  );
};

export default page;