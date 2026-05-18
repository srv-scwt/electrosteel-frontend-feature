import HeroSection from "@/components/common/heroSection";
import React from "react";
import ShareHolderEnquiryForm from "../_components/forms/ShareholderEnquiryForm";
import ActiveIndicator from "@/components/ui/ActiveIndicator";


const page = () => {
  return (
    <>
      <HeroSection
        data={{
          title: "shareholder enquiry",
          banner: "/images/board/enquiry_banner_big.jpg",
        }}
      />
      {/* <ActiveIndicator /> */}
   
          <ShareHolderEnquiryForm />
    </>
  );
};

export default page;
