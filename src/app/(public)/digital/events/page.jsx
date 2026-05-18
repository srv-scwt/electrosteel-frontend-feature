import React from "react";
import { ChooseOurEvents, HandPickedVideos, LatestEvents, UpcomingEvents } from "./_components";
import HeroSection from "@/components/common/heroSection";

const page = () => {
  const heroData = {
    banner: "/images/events/eventsBanner.jpg",
    title: "Events",
    imageFit: "object-cover",
    opacity: 'opacity-30'
  };
  return (
    <>
      <HeroSection data={heroData} />
      <ChooseOurEvents/>
      <LatestEvents />
      <HandPickedVideos/>
      <UpcomingEvents />
    </>
  );
};

export default page;
