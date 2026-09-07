import React from "react";
import { ChooseOurEvents, HandPickedVideos, LatestEvents, UpcomingEvents } from "./_components";
import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getEventPage } from "@/services/events.api";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/events");
}
const page = async () => {
  const heroData = {
    banner: "/images/events/eventsBanner.jpg",
    title: "Events",
    imageFit: "object-cover",
    opacity: 'opacity-30'
  };

  const EventsCardData = await getEventPage("latest");
  if (!EventsCardData || EventsCardData.error) return <SomethingWentWrong />

  const HandPickedData = await getEventPage("handpicked");
  if (!HandPickedData || HandPickedData.error) return <SomethingWentWrong />

  const UpcomingEventsData = await getEventPage("upcoming");
  if (!UpcomingEventsData || UpcomingEventsData.error) return <SomethingWentWrong />
  return (
    <>
      <HeroSection data={heroData} />
      <ChooseOurEvents />
      <LatestEvents data={EventsCardData?.data?.events} />
      <HandPickedVideos data={HandPickedData?.data?.events} />
      <UpcomingEvents data={UpcomingEventsData?.data?.events} />
    </>
  );
};

export default page;
