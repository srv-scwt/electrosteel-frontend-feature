"use client";

import BlogDetailsSlider from '../_components/blogDetailsSlider';
import BlogDetailsContent from '../_components/blogDetailsContent';
import HeroSection from '@/components/common/heroSection';
import GallerySection from '@/components/common/GallerySection';
import BlogWrapper from '../_components/blogWrapper';

const page = () => {
  // const slides = [
  //   { img: "/images/blog/blogDetailsBanner.png", title: "Slide 1" },
  //   { img: "/images/blog/blogDetailsBanner.png", title: "Slide 2" },
  //   { img: "/images/blog/blogDetailsBanner.png", title: "Slide 3" },
  // ];
  const heroData = {
        banner: "/images/blog/blogBanner.jpg",
        title: "Blog",
    };

  return (
    <div>
      <HeroSection data={heroData} />
      <BlogDetailsContent />
      <GallerySection/>
      <BlogWrapper/>

    </div>
  );
};

export default page;
