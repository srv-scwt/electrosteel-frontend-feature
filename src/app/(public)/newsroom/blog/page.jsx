import React from "react";
import BlogListSection from "./_components/blogListSection";
import HeroSection from "@/components/common/heroSection";
import BlogFilter from "./_components/blogfFilter";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/blog");
}
const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; 
  // Independent requests, run concurrently instead of as a serial waterfall.
  const [homeBanner, BlogData] = await Promise.all([
    getCommonBanner("blogListPage"),
    getBlogResponseByCategory({
    category: "blogListPage",
    year: resolvedSearchParams?.year,
    month: resolvedSearchParams?.month,
    keywords: resolvedSearchParams?.search_by,
  }),
  ]);

  if (!BlogData || BlogData?.error) return <SomethingWentWrong />;
  
  const heroData = {
    banner:
      createImageSourceURL(homeBanner?.data?.image) ??
      "/images/blog/blogBanner.jpg",
    title: homeBanner?.data?.title ?? "Blog",
  };
  return (
    <>
      <HeroSection data={heroData} />
      <BlogFilter data={BlogData?.data} searchParams={resolvedSearchParams} />
      <BlogListSection data={BlogData?.data}/>
    </>
  );
};

export default page;
