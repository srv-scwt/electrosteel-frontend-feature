import HeroSection from "@/components/common/heroSection";
import React from "react";
import EventDetails from "../_components/eventDetails";
import GallerySection from "@/components/common/GallerySection";

const page = () => {
  const heroData = {
    banner: "/images/events/eventsBanner.jpg",
    title: "Events Details",
    imageFit: "object-cover",
    opacity: "opacity-30",
  };
  return (
    <>
      <HeroSection data={heroData} />
      <EventDetails />
      <GallerySection contentHidden = {true}/>
    </>
  );
};

export default page;
