import HeroSection from "@/components/common/heroSection";
import React from "react";
import { LifeOfEClPeople } from "./_components";
import ButtonSwiperImageClient from "@/components/common/ButtonSwiperImageClient";
import styles from "@/app/common.module.css";
import ImageContentSquareCard from "@/components/common/card/ImageContentSquareCard";
import { getPeoplePageData } from "@/services/people.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL, formatSliderData } from "@/utils";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";


const page = async () => {
  const PeopleData = await getPeoplePageData();
  const LifeAtEclData = await getBlogResponseByCategory({
    category: "people-life-at-ecl",
  });

  const pragatiImage = formatSliderData(PeopleData?.data?.reward?.pragatiData?.images);
  const pratibhaImage = formatSliderData(PeopleData?.data?.reward?.pratihbaImages?.images);
  const campusSqareCardImage = createImageSourceURL(PeopleData?.data?.section_content?.image1?.image);
  const campusSqareCard2Image = createImageSourceURL(PeopleData?.data?.section_content?.image2?.image);
  const testimonialsSqareCardImage = createImageSourceURL(PeopleData?.data?.testimonial?.image1?.image);
  const testimonialsSqareCard2Image = createImageSourceURL(PeopleData?.data?.testimonial?.image2?.image);
  if (!PeopleData || PeopleData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={PeopleData?.data?.people_hero_data} />
      {LifeAtEclData && (
        <LifeOfEClPeople data={LifeAtEclData?.data?.[0]} />
      )}
      <ButtonSwiperImageClient images={PeopleData?.data?.people_life_at_ecl?.images} className={`pt-4! pb-0! ${styles.containerLg}`} />

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
      <section id="campus-hire-stories" className={`${styles.containerLg} !pt-0`}>
        <div
          className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
        >
          <HTMLRender htmlString={`<h2>${PeopleData?.data?.section_content?.title}</h2>`} />
        </div>
        {/* <div className={styles.sectionParaH2Type}> */}
        <div className={styles.sectionContent}>
          <p>{PeopleData?.data?.section_content?.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <ImageContentSquareCard
              content={
                PeopleData?.data?.section_content?.image1?.content || ""
              }
              image={campusSqareCardImage}
              imageAlt={
                PeopleData?.data?.section_content?.title || "image"
              }
            />
          </div>
          <div>
            <ImageContentSquareCard
              content={
                PeopleData?.data?.section_content?.image2?.content || ""
              }
              image={campusSqareCard2Image}
              imageAlt={
                PeopleData?.data?.section_content?.title || "image"
              }
            />
          </div>
        </div>
      </section>
      <section id="employee-testimonials" className={`${styles.containerLg} !pt-0`}>
        <div
          className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
        >
          <HTMLRender htmlString={`<h2>${PeopleData?.data?.testimonial?.title}</h2>`} />
        </div>
        {/* <div className={styles.sectionParaH2Type}> */}
        <div className={styles.sectionContent}>
          <p>{PeopleData?.data?.testimonial?.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div >
            <ImageContentSquareCard
              content={
                PeopleData?.data?.testimonial?.image1?.content || ""
              }
              image={testimonialsSqareCardImage}
              imageAlt={
                PeopleData?.data?.testimonial?.title || "image"
              }
            />
          </div>
          <div>
            <ImageContentSquareCard
              content={
                PeopleData?.data?.testimonial?.image2?.content || ""
              }
              image={testimonialsSqareCard2Image}
              imageAlt={
                PeopleData?.data?.testimonial?.title || "image"
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
