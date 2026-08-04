import BlogDetailsContent from '../_components/blogDetailsContent';
import HeroSection from '@/components/common/heroSection';
import GallerySection from '@/components/common/GallerySection';
import BlogWrapper from '../_components/blogWrapper';
import { getBlogDetailsBySlug } from '@/services/blogs/blog-slug.api';
import { getBlogResponseByCategory } from '@/services/blogs/blog.api';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';
import { createImageSourceURL } from '@/utils';

const getAdjacentBlogs = ({ currentSlug, blogDetails, blogList }) => {
  const previousBlog =
    blogDetails?.previousBlog ??
    blogDetails?.prevBlog ??
    blogDetails?.previous_post ??
    blogDetails?.previousPost ??
    null;
  const nextBlog =
    blogDetails?.nextBlog ??
    blogDetails?.next_post ??
    blogDetails?.nextPost ??
    null;

  if (previousBlog || nextBlog) {
    return { previousBlog, nextBlog };
  }

  if (Array.isArray(blogList) && blogList.length > 0) {
    const currentIndex = blogList.findIndex((item) => item?.slug === currentSlug);

    if (currentIndex !== -1) {
      return {
        previousBlog: currentIndex > 0 ? blogList[currentIndex - 1] : null,
        nextBlog:
          currentIndex < blogList.length - 1 ? blogList[currentIndex + 1] : null,
      };
    }
  }

  const fallbackRelatedBlogs = Array.isArray(blogDetails?.relatedBlogs)
    ? blogDetails.relatedBlogs.filter((item) => item?.slug !== currentSlug)
    : [];

  return {
    previousBlog: fallbackRelatedBlogs[0] ?? null,
    nextBlog: fallbackRelatedBlogs[1] ?? null,
  };
};

const page = async ({ params }) => {
  const { id } = await params;
  const BlogDetails = await getBlogDetailsBySlug(id);

  if (!BlogDetails || BlogDetails?.error) return <SomethingWentWrong />;

  const BlogListResponse = await getBlogResponseByCategory({
    category: "blogListPage",
  });

  const heroData = {
    banner:
      createImageSourceURL(BlogDetails?.data?.banner_image) ??
      "/images/blog/blogBanner.jpg",
    title: BlogDetails?.data?.banner_title ?? "Blog",
  };


  const imageArr =
    BlogDetails?.data?.slider_image?.map((item) => ({
      type: typeof item === "string" && /\.mp4$/i.test(item) ? "video" : "image",
      path: item,
    })) || [];
  const currentSlug = BlogDetails?.data?.slug ?? id;
  const relatedBlogs = Array.isArray(BlogDetails?.data?.relatedBlogs)
    ? BlogDetails.data.relatedBlogs
    : [];
  const blogList = Array.isArray(BlogListResponse?.data) ? BlogListResponse.data : [];
  const { previousBlog, nextBlog } = getAdjacentBlogs({
    currentSlug,
    blogDetails: BlogDetails?.data,
    blogList,
  });

  return (
    <>
      <HeroSection data={heroData} />
      <BlogDetailsContent data={BlogDetails?.data} />
      <GallerySection imageData={imageArr} data={BlogDetails?.data} />
      <BlogWrapper
        data={relatedBlogs}
        previousBlog={previousBlog}
        nextBlog={nextBlog}
      />
    </>
  );
};

export default page;
