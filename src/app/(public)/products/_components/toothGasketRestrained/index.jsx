import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import CommonTable from "@/components/common/CommonTable";
import { createImageSourceURL } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";


const ToothGasketRestrained = ({ data, images = [], TableData }) => {
  return (
    <section id="tooth-gasket-joint">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
          <div className="grid grid-cols-2 gap-4 w-full">
            {Array.isArray(images) && images?.map((i) => (
              <div
                key={i?.id}
                className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 rounded-md overflow-hidden"
              >
                <Image
                  src={createImageSourceURL(i?.img)}
                  alt={i?.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                />
              </div>
            ))}
          </div>
          <div
            className={`${styles.sectionContent} ${styles.title} ${styles.customUlListing}`}
          >
            <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
            <HTMLRender htmlString={data?.description} />
          </div>
        </div>
        <div className="mt-8">
          <CommonTable
            className={""}
            key={TableData?.title}
            title={""}
            columns={TableData?.columns}
            rows={TableData?.rows}
          />
        </div>
        <br />
        <div className={styles.sectionContent}>
          <p># To use this system for other class of pipes, the manufacturer may be contacted</p>
        </div>
      </div>
    </section>
  );
};

export default ToothGasketRestrained;
