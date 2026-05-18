import HeroSection from "@/components/common/heroSection";
import React from "react";
import ShareHolderEnquiryForm from "../_components/forms/ShareholderEnquiryForm";
import ActiveIndicator from "@/components/ui/ActiveIndicator";
import EnquiryModal from "../_components/model/EnquiryModal";


const page = () => {
  return (
    <>
      <HeroSection
        data={{
          title: "Carrer enquiry",
          banner: "/images/board/enquiry_banner_big.jpg",
        }}
      />
      {/* <ActiveIndicator /> */}
      <EnquiryModal />
    </>
  );
};

export default page;
