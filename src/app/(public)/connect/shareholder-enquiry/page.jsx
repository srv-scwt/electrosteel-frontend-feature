import HeroSection from "@/components/common/heroSection";
import React from "react";
import ShareHolderEnquiryForm from "../_components/forms/ShareholderEnquiryForm";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";

const page = async () => {
  const heroBanner = await getCommonBanner("shareholder-enquiry");

  return (
    <>
      <HeroSection
        data={{
          title: heroBanner?.data?.title ?? "Shareholder Enquiry",
          image: heroBanner?.data?.image ?? "",
          banner: "/images/board/enquiry_banner_big.jpg",
        }}
      />
      <ShareHolderEnquiryForm />
    </>
  );
};

export default page;
