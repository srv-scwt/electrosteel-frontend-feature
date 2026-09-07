
import HeroSection from "@/components/common/heroSection";
import React from "react";
import GalleryGrid from "../_components/gallerygrid";
import VideoGrid from "../_components/videogrid";
import NewsGrid from "../_components/newsGrid";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/gallery");
}
const page = async () => {

  // Independent requests, run concurrently instead of as a serial waterfall.
  const [galleryData, videoData, newsData] = await Promise.all([
    getBlogResponseByCategory({
      category : "galleryPage",
     }),
    getBlogResponseByCategory({
      category : "galleryVideoPage",
     }),
    getBlogResponseByCategory({
      category : "galleryNewsPage",
     }),
  ]);
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