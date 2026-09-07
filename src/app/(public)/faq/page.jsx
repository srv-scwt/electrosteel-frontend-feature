import HeroSection from "@/components/common/heroSection";
import FAQAccordion from "./_components/FAQAccordion";
import styles from "@/app/common.module.css";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";
import { createImageSourceURL, groupByTitle } from "@/utils";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/faq");
}
export default async function Page() {
      const homeBanner = await getCommonBanner("faqListPage");
      const FAQData1 = await getBlogResponseByCategory({
        category: "faqListPage",
      });
   
      
      const FAQData = groupByTitle(FAQData1?.data)
        
      if (!FAQData || FAQData1?.error) return <SomethingWentWrong />;
      
      const heroData = {
        banner:
          createImageSourceURL(homeBanner?.data?.image) ??
          "/images/blog/blogBanner.jpg",
        title: homeBanner?.data?.title ?? "FAQ",
      };
    return (
        <>
            <HeroSection data={heroData}/>
            <section className="!pt-0">

                <div className={`${styles.containerLg} !py-0`}>
                    <FAQAccordion data={FAQData} />
                </div>
            </section>
        </>
    );
}