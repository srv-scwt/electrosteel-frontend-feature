import React from "react";
import HeroSection from "@/components/common/heroSection";
import ProductTextGrid from "./_components/producttextgrid";
import { getEmployeewelfare } from "@/services/employeeWelfare.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

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
