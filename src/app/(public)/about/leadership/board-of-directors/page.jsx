import HeroSection from "@/components/common/heroSection";
import React from "react";
import DirectorSection from "./_components/directorSection";
import { getAllDirectors } from "@/services/allDirectors.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";

const page = async () => {
  const DirectorsData = await getAllDirectors();
  const heroBanner = await getCommonBanner("boardOFDirector");
  if (!DirectorsData || DirectorsData?.error) return <SomethingWentWrong />

  const heroData = {
    banner:
      createImageSourceURL(heroBanner?.data?.image) ??
      "/images/blog/blogBanner.jpg",
    title: heroBanner?.data?.title ?? "Board OF director",
  };


  return (
    <>
      <HeroSection
        data={heroData}
      />
      <DirectorSection people={DirectorsData?.data?.data} />
    </>
  );
};

export default page;
