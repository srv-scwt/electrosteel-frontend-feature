import React from "react";
import Image from "next/image";
import videoCardStyles from "@/components/common/card/VideoImageBadgeCard/style.module.css";
import { createImageSourceURL } from "@/utils";

const ProductCategoryCard = ({ data }) => {
  return (
    <article 
      className={videoCardStyles.socialCardWrapper} 
      style={{ cursor: 'default', minHeight: '100%', maxWidth: 'none' }}
    >
      <div className="relative">
        <div className={videoCardStyles.socialCardImage}>
          {data?.image && (
            <Image 
              src={createImageSourceURL(data.image)} 
              alt={data?.title || "Category Image"} 
              fill 
              className="w-full h-full absolute object-contain rounded-t-[10px]" 
            />
          )}
        </div>
      </div>
      
      {/* Content */}
      <div>
        <div className={`${videoCardStyles.sectionContent} mt-3`}>
          {data?.title && <h3 className="uppercase">{data.title}</h3>}
          {data?.desc && <p dangerouslySetInnerHTML={{ __html: data.desc }} />}
        </div>
      </div>
    </article>
  );
};

export default ProductCategoryCard;
