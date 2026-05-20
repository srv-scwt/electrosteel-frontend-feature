import BlogDetailsSlider from '../_components/blogDetailsSlider';
import BlogDetailsContent from '../_components/blogDetailsContent';
import HeroSection from '@/components/common/heroSection';
import GallerySection from '@/components/common/GallerySection';
import BlogWrapper from '../_components/blogWrapper';
import { getBlogDetailsBySlug } from '@/services/blogs/blog-slug.api';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';
import { createImageSourceURL } from '@/utils';

const page = async ({ params }) => {
  const { id } = await params;
  const BlogDetails = await getBlogDetailsBySlug(id);

  if (!BlogDetails || BlogDetails?.error) return <SomethingWentWrong />;

  const heroData = {
    banner:
      createImageSourceURL(BlogDetails?.data?.banner_image) ??
      "/images/blog/blogBanner.jpg",
    title: BlogDetails?.data?.banner_title ?? "Blog",
  };

  // const slides = [
  //   { img: "/images/blog/blogDetailsBanner.png", title: "Slide 1" },
  //   { img: "/images/blog/blogDetailsBanner.png", title: "Slide 2" },
  //   { img: "/images/blog/blogDetailsBanner.png", title: "Slide 3" },
  // ];

  // const imageData = [
  //   { type: "image", path: "/images/blog/cimage.png" },
  //   { type: "video", path: "/videos/our_peopleVideo.mp4" },
  //   { type: "image", path: "/images/blog/cimage.png" },
  // ];

  // const data = {
  //   description: `Electrosteel Castings Ltd has always championed women empowerment, at their plants and boardrooms across 110-plus countries.
  //   Electrosteel is proud to partner with the Daamini Foundation's 'Daamini Supports - HER Enterprise', an endeavour designed to foster an ecosystem where women entrepreneurs are encouraged to participate, grow, and succeed. Our Whole-Time Director, Mrs Nityangi Kejriwal Jaiswal , a long-time supporter of women in the workplace, is a Nominated Mentor. 
  //   In a recorded video played at the launch of 'Daamini Supports - HER Enterprise' yesterday, she expresses her support for the noble initiative. <br /> At the event, Ms Sanchita Kushary Bose, Founder, Daamini, also expressed her gratitude to Electrosteel and Mrs Nityangi Kejriwal Jaiswal. <br /> This marks the beginning of a journey filled with strength, innovation and limitless possibilities. Onward, forward!`
  // }

  const blogArr = [
    {
      img: "/images/blog/card/img1.png",
      date: `September ${16 - (1 % 10)}, 2024`,
      title: `Blog title ${1 + 1}`,
      desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
      link: "#",
    },
    {
      img: "/images/blog/card/img1.png",
      date: `September ${16 - (1 % 10)}, 2024`,
      title: `Blog title ${1 + 1}`,
      desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
      link: "#",
    },
    {
      img: "/images/blog/card/img1.png",
      date: `September ${16 - (1 % 10)}, 2024`,
      title: `Blog title ${1 + 1}`,
      desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
      link: "#",
    },
    {
      img: "/images/blog/card/img1.png",
      date: `September ${16 - (1 % 10)}, 2024`,
      title: `Blog title ${1 + 1}`,
      desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
      link: "#",
    }
  ]

  const imageArr = BlogDetails?.data?.images?.map((item) => ({
    type: "image",
    path: item,
  })) || [];

  return (
    <>
      <HeroSection data={heroData} />
      <BlogDetailsContent data={BlogDetails?.data} />
      <GallerySection imageData={imageArr} data={BlogDetails?.data} />
      <BlogWrapper data={blogArr} />
    </>
  );
};

export default page;
