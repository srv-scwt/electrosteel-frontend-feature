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
