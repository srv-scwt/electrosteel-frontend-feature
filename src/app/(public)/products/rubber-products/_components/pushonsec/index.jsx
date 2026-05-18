"use client";

import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { OutlineButtonLink } from "@/components/ui/Button";

const ContentListSection = ({
  data,
  sectionID,
  className = "",

  // optional props
  showButton = false,
  buttonLink = "/",
  buttonTitle = "",
  isDownloadLink = false,
  children,
}) => {
  return (
    <section id={sectionID}>
      <div className={`${styles.containerLg} ${className}`}>
        {/* ✅ Single Column Content */}
        <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
          {/* Title */}
          {data?.title && <HTMLRender htmlString={data.title} />}

          {/* Description (UL/LI or paragraph) */}
          {data?.description && <HTMLRender htmlString={data.description} />}

          {/* Button */}
          {showButton && (
            <OutlineButtonLink
              goto={buttonLink}
              title={buttonTitle}
              className="mt-[16px]"
            />
          )}

          {/* Download Button */}
          {isDownloadLink && (
            <OutlineButtonLink
              goto={"#"}
              title={"Download"}
              className="mt-[24px]"
            />
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentListSection;
