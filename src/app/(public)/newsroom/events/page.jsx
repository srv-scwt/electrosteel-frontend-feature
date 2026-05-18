import React from "react";
import { ChooseOurEvents, HandPickedVideos, LatestEvents, UpcomingEvents } from "./_components";
import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getEventPage } from "@/services/events.api";

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
