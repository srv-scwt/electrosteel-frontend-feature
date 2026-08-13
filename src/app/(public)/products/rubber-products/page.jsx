import React from "react";
import { rubberData } from "../data/rubber.data";
import HeroSection from "@/components/common/heroSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import ApplicationRubber from "./_components/rubberapplication";
import ChooseListSection from "@/components/common/ChooseListSection";
import ApplicationSection from "../_components/applicationSection";

import ContentListSection from "./_components/pushonsec";
import { getRubberProducts } from "@/services/product/rubberProducts.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

const page = async () => {
  const rubberProductsData = await getRubberProducts();
  if(!rubberProductsData || rubberProductsData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection
        data={rubberProductsData?.data?.heroSection}
        objectPosition="object-right"
      />
      <GridTwoSection
        data={rubberProductsData?.data?.overview}
        bannerOrder="order-2"
        contentOrder="order-1"
        sectionID="overview"
      />
      <ChooseListSection sectionID="whyChooseElectrosteel" data={rubberProductsData?.data?.whyChooseElectrosteel?.[0]} />
      <GridTwoSection
        data={rubberProductsData?.data?.productDetails?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        sectionID={"productDetails"}
        className={"!pb-0"}
      />
      <ChooseListSection sectionID="benefitsAdvantages" data={rubberProductsData?.data?.benefitsAdvantages?.[0]} />
      <GridTwoSection
        data={rubberProductsData?.data?.productRange?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-1 lg:order-2"}
        sectionID="productRange"
        buttonLink="/"
      />

      <ApplicationSection sectionID={"applications"} data={rubberProductsData?.data?.applications} />
      <ContentListSection
        data={rubberProductsData?.data?.ourCertifications?.[0]}
        sectionID="ourCertifications"
      />
    </>
  );
};

export default page;
