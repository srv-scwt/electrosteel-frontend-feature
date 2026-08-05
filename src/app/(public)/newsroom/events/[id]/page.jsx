import HeroSection from "@/components/common/heroSection";
import React from "react";
import EventDetails from "../_components/eventDetails";
import GallerySection from "@/components/common/GallerySection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { createImageSourceURL } from "@/utils";
import { getEventsDetailsBySlug } from "@/services/events.api";

const page = async ({ params }) => {
  const { id } = await params;
  const PageDetails = await getEventsDetailsBySlug(id);

  
  if (!PageDetails || PageDetails?.error) return <SomethingWentWrong />;

  const heroData = {
    banner:
      createImageSourceURL(PageDetails?.data?.bannerImage) ??
      "/images/events/eventsBanner.jpg",
    title: PageDetails?.data?.bannerTitle ?? "Events Details",
    imageFit: "object-cover",
    opacity: "opacity-30",
  };

  const imageArr = PageDetails?.data?.files?.map((item) => ({
    type: item?.type || "image",
    path: item?.path,
  })) || [];
  
  return (
    <>
      <HeroSection data={heroData} />
      <EventDetails data={PageDetails?.data} />
      <GallerySection contentHidden={true} imageData={imageArr} padding="pt-0!" imageCSS="object-cover object-center"/>
    </>
  );
};

export default page;
