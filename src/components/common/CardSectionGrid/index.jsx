"use client";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import { createImageSourceURL } from "@/utils";

export default function CardSectionGrid({data , CardTitle="Product Brochure"}) {
  return (
    <section className="bg-[#f9f9f9]">
      <div className={cstyles.containerLg}>
        <div className={`${cstyles.sectionContent}`}>
          <h2>
            <span>{CardTitle}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(data?.data) && data?.data?.map((post) => {
            const imageSrc = createImageSourceURL(post?.image, "/images/logo.png");
            const downloadHref = createImageSourceURL(post?.download_link);

            return (
            <div key={post.id} className={styles.socialCardWrapper}>
              <div className={`${styles.sectionContent} min-h-[90px]`}>
                <h3>{post?.title}</h3>
              </div>
              <div
                className={`${styles.socialCardImage} relative w-full aspect-square`}
              >
                <Image
                  src={imageSrc}
                  alt={post?.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.cardLink}>
                  {downloadHref ? (
                    <OutlineButtonLink
                      goto={downloadHref}
                      action={"_blank"}
                      title={"Download"}
                      className={"!text-white"}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
