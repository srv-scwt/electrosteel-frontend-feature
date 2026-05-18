import React from 'react'
import BlogListSection from './_components/blogListSection'
import HeroSection from '@/components/common/heroSection'
import BlogFilter from './_components/blogfFilter';

const page = () => {
  const heroData = {
        banner: "/images/blog/blogBanner.jpg",
        title: "Blog",
    };
  return (
    <>
    <HeroSection data={heroData} />
    <BlogFilter />
    <BlogListSection />
    </>
  )
}

export default page