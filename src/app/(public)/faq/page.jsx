import HeroSection from "@/components/common/heroSection";
import FAQAccordion from "./_components/FAQAccordion";
import styles from "@/app/common.module.css";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";
import { createImageSourceURL, groupByTitle } from "@/utils";

export default async function Page() {
      const homeBanner = await getCommonBanner("faqListPage");
      const FAQData1 = await getBlogResponseByCategory({
        category: "faqListPage",
      });
      console.log(FAQData1?.data, "FAQData1-----------");
      
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