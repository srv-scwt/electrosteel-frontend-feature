"use client";
import React from "react";
import Image from "next/image";
import videoCardStyles from "@/components/common/card/VideoImageBadgeCard/style.module.css";
import { createImageSourceURL } from "@/utils";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const ProductCategoryCard = ({ data }) => {
  return (
    <article 
      className={`${videoCardStyles.socialCardWrapper} !p-0 flex flex-col`} 
      style={{ cursor: 'default', minHeight: '100%', maxWidth: 'none', overflow: 'visible' }}
    >
      <div className="relative">
        <div className={`${videoCardStyles.socialCardImage} rounded-t-[32px] border border-gray-300 bg-white p-4 sm:p-6`}>
          <div className="relative w-full h-full">
            {data?.image && (
              <Image 
                src={createImageSourceURL(data.image)} 
                alt={data?.title || "Category Image"} 
                fill 
                className="object-contain" 
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-[clamp(16px,2.8vw,24px)] pb-[clamp(16px,2.8vw,24px)] flex-1">
        <div className={`${videoCardStyles.sectionContent} mt-3`}>
          {data?.title && <h3 className="uppercase">{data.title}</h3>}
          {data?.desc && <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.desc) }} />}
        </div>
      </div>
    </article>
  );
};

export default ProductCategoryCard;
