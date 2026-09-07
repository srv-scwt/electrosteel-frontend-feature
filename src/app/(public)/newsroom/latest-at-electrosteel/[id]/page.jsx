import React from "react";
import styles from "@/app/common.module.css";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import ElectrosteelImageCarousel from "../_components/ElectrosteelImageCarousel";
import { createImageSourceURL, formatDate } from "@/utils";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getBlogDetailsBySlug } from "@/services/blogs/blog-slug.api";

import { buildMetadataForPathname } from "@/utils/seo";

// Mirrors what the shared layout used to derive from headers(): metadata is
// resolved from the full request path, slug included, so each article keeps
// its own canonical URL.
export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadataForPathname(`/newsroom/latest-at-electrosteel/${id}`);
}


const page = async({ params }) => {
  const { id } = await params;
  const PageDetails = await getBlogDetailsBySlug(id)

    if (!PageDetails || PageDetails?.error) return <SomethingWentWrong />;
    
    const heroData = {
      banner:
        createImageSourceURL(PageDetails?.data?.banner_image) ??
        "/images/blog/blogBanner.jpg",
      title: PageDetails?.data?.banner_title ?? "Blog",
    };


  return (
    <>
      <HeroSection data={heroData} />

      <section className={`${styles.containerLg} !py-0`}>
        <div className={styles.containerLg}>
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={`<h2>${PageDetails?.data?.title}</h2>`} className={styles.sectionContent} />
            <p><strong>{formatDate(PageDetails?.data?.date)}</strong></p>

            <div className="mt-4">
              <HTMLRender htmlString={PageDetails?.data?.editor_description} className={styles.sectionContent} />
            </div>
          </div>
        </div>
      </section>
      <ElectrosteelImageCarousel images={PageDetails?.data?.images} />
    </>
  );
};

export default page;
