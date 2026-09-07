import React from "react";
import HeroSection from "@/components/common/heroSection";
import ProductTextGrid from "./_components/producttextgrid";
import { getEmployeewelfare } from "@/services/employeeWelfare.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/sustainability/social-initiatives/employee-welfare");
}
const page = async () => {
  const Employeewelfare = await getEmployeewelfare();
  if (!Employeewelfare || Employeewelfare.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection
        data={Employeewelfare?.data?.heroData?.[0]}
      />
      <ProductTextGrid
        data={Employeewelfare?.data?.caresList || []}
        label={Employeewelfare?.data?.workplaceThatCares?.[0]}
      />
    </>
  );
};

export default page;
