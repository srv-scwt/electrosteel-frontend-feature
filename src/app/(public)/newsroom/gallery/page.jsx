
import HeroSection from "@/components/common/heroSection";
import React from "react";
import GalleryGrid from "../_components/gallerygrid";
import VideoGrid from "../_components/videogrid";
import NewsGrid from "../_components/newsGrid";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";

const page = async () => {

  const galleryData = await getBlogResponseByCategory({
      category : "galleryPage",
     });
  const videoData = await getBlogResponseByCategory({
      category : "galleryVideoPage",
     });
  const newsData = await getBlogResponseByCategory({
      category : "galleryNewsPage",
     });
  if (
    galleryData?.error &&
    videoData?.error &&
    newsData?.error
  ) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <HeroSection
        data={{
          title: "Gallery",
          banner: "/images/board/newsletters_banner_large.jpg",
        }}
      />

      <GalleryGrid sectionId="photo" data={galleryData?.data || []} />

      <VideoGrid sectionId="video" data={videoData?.data || []} />

      <NewsGrid sectionId="news" data={newsData?.data || []} />
    </>
  );
};

export default page;