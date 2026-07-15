"use client";

import Image from "next/image";
import styles from "@/app/common.module.css";
import cstyles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import VideoWithModal from "../VideoWithModal";
import { OutlineButtonLink } from "@/components/ui/Button";
import { createImageSourceURL, createVideoSourceURL } from "@/utils";
import BannerSectionCarousel from "@/components/ui/BannerSectionCarousel";

const GridTwoSection = ({
  data,
  bannerOrder,
  contentOrder,
  sectionID,
  isVideo = false,
  children,
  className = "",
  showButton = false,
  buttonLink = "/",
  downloadButton = '#',
  buttonTitle = "",
  objectPosition = "object-cover",
  isDownloadLink = false,
  isDarkSection = false,
  isIFrame=false,
  gridColsClass = "lg:grid-cols-2",
}) => {
  if (!data) return null;

  return (
    <section id={sectionID} className={isDarkSection ? "bg-[#00418e]" : ""}>
      <div className={`${styles.containerLg} ${className}`}>
        <div className={`grid grid-cols-1 gap-5 md:gap-8 lg:gap-12 items-start ${gridColsClass}`}>
          <div
            className={`relative w-full flex items-center justify-center h-64 md:h-80 lg:h-full min-h-[320px] lg:min-h-[420px] overflow-hidden ${bannerOrder}`}
          >
            {isVideo && data?.link ? (
              <VideoWithModal thumbnail={createVideoSourceURL(data?.image)} title="Video" videoLink={isIFrame ? data?.link : data?.video } isIFrame={isIFrame}/>
            ) : (
              Array.isArray(data?.image ?? data.images) ? (
                <BannerSectionCarousel images={data?.image ?? data?.images} />
              ) : (
                <Image
                  src={createImageSourceURL(data?.image)}
                  alt="Factory"
                  fill
                  className={objectPosition}
                />
              )
            )}
          </div>

          <div
            className={`
    ${styles.sectionContent}
    ${styles.customUlListing}
    ${isDarkSection ? cstyles.darkGridContent : ""}
    ${contentOrder}
  `}
          >
            {data?.title && (
              <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
            )}
            {data?.description && (
              <HTMLRender htmlString={data?.description ?? data?.desc} />
            )}
            {showButton && (
              <OutlineButtonLink
                goto={buttonLink}
                title={buttonTitle}
                className="mt-[16px]"
              />
            )}

            {isDownloadLink && (
              <OutlineButtonLink
                action={"_blank"}
                goto={downloadButton}
                title="Download"
                className="mt-[24px]"
              />
            )}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridTwoSection;