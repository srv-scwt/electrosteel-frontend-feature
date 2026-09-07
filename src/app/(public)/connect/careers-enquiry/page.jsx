import HeroSection from "@/components/common/heroSection";
import React from "react";
import ShareHolderEnquiryForm from "../_components/forms/ShareholderEnquiryForm";
import ActiveIndicator from "@/components/ui/ActiveIndicator";
import EnquiryModal from "../_components/model/EnquiryModal";



import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/connect/careers-enquiry");
}
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
