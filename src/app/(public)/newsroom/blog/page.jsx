import React from "react";
import BlogListSection from "./_components/blogListSection";
import HeroSection from "@/components/common/heroSection";
import BlogFilter from "./_components/blogfFilter";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";

const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; 
  const homeBanner = await getCommonBanner("blogListPage");
  const BlogData = await getBlogResponseByCategory({
    category: "blogListPage",
    year: resolvedSearchParams?.year,
    month: resolvedSearchParams?.month,
    keywords: resolvedSearchParams?.search_by,
  });

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
