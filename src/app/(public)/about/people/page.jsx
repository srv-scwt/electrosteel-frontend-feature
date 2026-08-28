import HeroSection from "@/components/common/heroSection";
import React from "react";
import { LifeOfEClPeople, CardSlider } from "./_components";
import ButtonSwiperImageClient from "@/components/common/ButtonSwiperImageClient";
import styles from "@/app/common.module.css";
import ImageContentSquareCard from "@/components/common/card/ImageContentSquareCard";
import { getPeoplePageData } from "@/services/people.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL, formatSliderData } from "@/utils";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";


const page = async () => {
  // Independent requests, run concurrently instead of as a serial waterfall.
  const [PeopleData, LifeAtEclData] = await Promise.all([
    getPeoplePageData(),
    getBlogResponseByCategory({
    category: "people-life-at-ecl",
  }),
  ]);

  const pragatiImage = formatSliderData(PeopleData?.data?.reward?.pragatiData?.images);
  const pratibhaImage = formatSliderData(PeopleData?.data?.reward?.pratihbaImages?.images);


  if (!PeopleData || PeopleData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={PeopleData?.data?.people_hero_data} />
      {LifeAtEclData && (
        <LifeOfEClPeople data={LifeAtEclData?.data?.[0]} />
      )}
      <ButtonSwiperImageClient images={PeopleData?.data?.people_life_at_ecl?.images} className={`${styles.containerLg}`} />

      <section className={styles.containerLg}>
        <div
          className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
        >
          <h2>{PeopleData?.data?.people_data_content?.[0]?.title}</h2>
        </div>
        <div className={styles.sectionContent}>
          <p>{PeopleData?.data?.people_data_content?.[0]?.description}</p>
        </div>
      </section>
      <section id="campus-hire-stories" className={`${styles.containerLg}`}>
        <div
          className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
        >
          <HTMLRender htmlString={`<h2>${PeopleData?.data?.section_content?.title}</h2>`} />
        </div>
        {/* <div className={styles.sectionParaH2Type}> */}
        <div className={styles.sectionContent}>
          <p>{PeopleData?.data?.section_content?.description}</p>
        </div>
        <CardSlider 
          items={PeopleData?.data?.section_content?.images} 
          defaultTitle={PeopleData?.data?.section_content?.title} 
        />
      </section>
      <section id="employee-testimonials" className={`${styles.containerLg}`}>
        <div
          className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
        >
          <HTMLRender htmlString={`<h2>${PeopleData?.data?.testimonial?.title}</h2>`} />
        </div>
        {/* <div className={styles.sectionParaH2Type}> */}
        <div className={styles.sectionContent}>
          <p>{PeopleData?.data?.testimonial?.description}</p>
        </div>
        <CardSlider 
          items={PeopleData?.data?.testimonial?.images} 
          defaultTitle={PeopleData?.data?.testimonial?.title} 
        />
      </section>
    </>
  );
};

export default page;
