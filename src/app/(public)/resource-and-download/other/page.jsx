import HeroSection from "@/components/common/heroSection";
import { OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import styles from "@/app/common.module.css";
import { createImageSourceURL } from "@/utils";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";


const Page = async() => {
  const homeBanner = await getCommonBanner("assets-others");
  const data = await getCommonProductsCategory("assestsothers");

  const heroData = {
    banner: createImageSourceURL(homeBanner?.data?.image) ?? "/images/board/policies_banner_large.jpg",
    title: homeBanner?.data?.title ?? "Policy",
  };
  return (
    <>
      <HeroSection data={heroData} />

      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {data?.data?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between md:items-center gap-5 mt-[26px] pb-4"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src="/images/icons/pdf.png"
                  width={30}
                  height={30}
                  alt="pdf"
                  className="object-contain"
                />
                <p className="text-gray-700">{item?.title}</p>
              </div>

              <OutlineButtonLink action={"_blank"} goto={createImageSourceURL(item?.download_link)} title="Download" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
