import React from "react";
import TopSection from "./topSection";
import BottomSection from "./bottomSection";
import { getJolsadhana } from "@/services/jolsadhana.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";

const SustainableWaterMangement = async () => {
  const jolsadhanaData = await getJolsadhana();
  if (!jolsadhanaData || jolsadhanaData.error) return <SomethingWentWrong />

  return (
    <section className="relative w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/videos/sustainableDev.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#004AA1] opacity-80 -z-10"></div>

      {/* Page Content */}
      <div className="relative z-10">
        <TopSection data={jolsadhanaData?.data?.sustainableWaterManagement?.[0]} />
        {/* <BottomSection /> */}
      </div>
    </section>
  );
};

export default SustainableWaterMangement;
