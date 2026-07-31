import React from "react";
import HeroSection from "@/components/common/heroSection";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { getPeoplePageData } from "@/services/people.api";
import { formatSliderData } from "@/utils";
import ButtonSwiperImageClient from "@/components/common/ButtonSwiperImageClient";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import RewardsTab from "./_components/RewardsTab";
import { pragatiIntroData, pragatiPillarsData, pratibhaIntroData } from "./rewards.data";

const RewardsRecognitionPage = async () => {
  const PeopleData = await getPeoplePageData();
  const pragatiImage = formatSliderData(PeopleData?.data?.reward?.pragatiData?.images);
  const pratibhaImage = formatSliderData(PeopleData?.data?.reward?.pratihbaImages?.images);

  return (
    <>
      <HeroSection
        data={{
          title: "Rewards & Recognition",
          banner: "/images/board/policies_banner_large.jpg",
        }}
      />
      
      <section className={`${styles.containerLg} pt-4! pb-0!`}>
        <RewardsTab />
      </section>

      <section id="rewards-and-recognitions" className={`${styles.containerLg} pt-0! mt-4`}>
        <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} mb-8`}>
          <HTMLRender htmlString={`<h3>${PeopleData?.data?.reward?.title}</h3>`} />
        </div>
        <div className={`${styles.sectionContent}`}>
          <p>
            At Electrosteel, we believe that recognizing and rewarding exceptional performance is fundamental to fostering a culture of excellence. Our comprehensive rewards framework ensures that dedication, innovation, and leadership are celebrated at every level, motivating our teams to consistently exceed expectations and drive sustainable growth.
          </p>
        </div>
      </section>

      <section id="pragati" className={`${styles.containerLg} pt-8! border-t border-gray-100 mt-8`}>
        <div className={`${styles.sectionContent} mb-4`}>
          <h3>{PeopleData?.data?.reward?.pragatiData?.title || "Pragati"}</h3>
        </div>
        <ButtonSwiperImageClient images={pragatiImage?.imageSrc} imageTitle={pragatiImage.imageTitle} className={"py-0! mb-8"} />
        <ContentSection data={pragatiIntroData} />
        <GridTwoSection 
            data={pragatiPillarsData} 
            bannerOrder="order-first lg:order-last"
            contentOrder="order-last lg:order-first"
        />
      </section>

      <section id="pratibha-pride" className={`${styles.containerLg} pt-8! border-t border-gray-100 mt-8 pb-12!`}>
        <div className={`${styles.sectionContent} mb-4`}>
          <h3>{PeopleData?.data?.reward?.pratihbaImages?.title || "Pratibha & Pride"}</h3>
        </div>
        <ButtonSwiperImageClient images={pratibhaImage?.imageSrc} imageTitle={pratibhaImage.imageTitle} className={"py-0! mb-8"} />
        <GridTwoSection 
            data={pratibhaIntroData} 
            bannerOrder="order-last lg:order-last"
            contentOrder="order-first lg:order-first"
            objectPosition="object-contain" 
        />
      </section>
    </>
  );
};

export default RewardsRecognitionPage;
