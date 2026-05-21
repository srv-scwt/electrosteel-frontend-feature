import HeroSection from "@/components/common/heroSection";
import PressDetailSection from "../_components/PressDetailSection";
import PressClient from "../_components/PressClient";
import style from "@/app/common.module.css";
import { getBlogDetailsBySlug } from "@/services/blogs/blog-slug.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { createImageSourceURL } from "@/utils";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";

const page = async ({ params }) => {
  const { id } = await params;
  const PageDetails = await getBlogDetailsBySlug(id);

  const heroData = {
    banner:
      createImageSourceURL(PageDetails?.data?.banner_image) ??
      "/images/blog/blogBanner.jpg",
    title: PageDetails?.data?.banner_title ?? "Blog",
  };

  const LatestEclCardData = await getBlogResponseByCategory({
    category: "latestATECLPage",
  });

  if (!PageDetails || PageDetails?.error || !LatestEclCardData || LatestEclCardData.error) return <SomethingWentWrong />;

  return (
    <>
      <HeroSection data={heroData} />
      <PressDetailSection data={PageDetails?.data} />
      <section>
        <div className={`${style.containerLg} !py-0`}>
          <div className={`${style.sectionContent}`}>
            <h2>
              Our <span>Gallery</span>
            </h2>
          </div>
          <PressClient
            data={PageDetails?.data?.relatedBlogs || []}
            className={"!pt-0"} />
        </div>
      </section>
    </>
  );
};

export default page;
