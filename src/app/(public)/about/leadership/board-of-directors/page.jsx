import HeroSection from "@/components/common/heroSection";
import React from "react";
import DirectorSection from "./_components/directorSection";
import { getAllDirectors } from "@/services/allDirectors.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";
import { getDirectorshipDetails } from "@/services/product/directorshipDetails.api";
import styles from "@/app/common.module.css";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/leadership/board-of-directors");
}
const page = async () => {
  const [DirectorsData, heroBanner, directorshipDetails] = await Promise.all([
    getAllDirectors(),
    getCommonBanner("boardOFDirector"),
    getDirectorshipDetails()
  ]);

  if (!DirectorsData || DirectorsData?.error) return <SomethingWentWrong />

  const heroData = {
    banner:
      createImageSourceURL(heroBanner?.data?.image) ??
      "/images/blog/blogBanner.jpg",
    title: heroBanner?.data?.title ?? "Board OF director",
  };

  const docs = directorshipDetails?.data?.[0]?.data || directorshipDetails?.data || [];

  return (
    <>
      <HeroSection
        data={heroData}
      />
      <DirectorSection people={DirectorsData?.data?.data} />

      <section className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {/* <h2>
            Details of Directorship and Full-time Position <span>in Body Corporates held by Directors</span>
          </h2> */}

          {docs.length > 0 ? (
            <div className="flex flex-col gap-3 pb-8">
              {docs.map((item, index) => {
                const linkTitle = item.title || "Details of Directorship and Full-time Position in Body Corporates held by Directors";
                const linkUrl = item.download_link || "";
                return (
                  <h2 key={index} className="!mb-0">
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primaryBlue transition-colors block fontF-primary"
                      dangerouslySetInnerHTML={{ __html: linkTitle }}
                    >
                    </a>
                  </h2>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-500 pb-8">No documents available at this time.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
