import React from "react";
import Image from "next/image";
import HTMLRender from "@/components/ui/HTMLRender";
import videoCardStyles from "@/components/common/card/VideoImageBadgeCard/style.module.css";

const ProductCategoryCard = ({ data }) => {
  return (
    <article 
      className={`${videoCardStyles.socialCardWrapper} group flex flex-col`} 
      style={{ cursor: 'default', minHeight: '100%', maxWidth: 'none' }}
    >
      {/* Content */}
      <div className={`${videoCardStyles.sectionContent} flex flex-col flex-grow`} style={{ paddingTop: 0 }}>
        {data.title && <h3>{data.title}</h3>}
        {data.desc && <HTMLRender htmlString={`<p>${data.desc}</p>`} />}
        
        {/* Category Icon */}
        {data.image && (
          <div className="mt-auto pt-6 flex items-end justify-end">
             <div className="flex h-[30px] w-[30px] items-center justify-center xl:h-[39px] xl:w-[39px] relative">
               <Image 
                 src={data.image} 
                 alt={data.title || "Category Icon"} 
                 fill
                 className="object-contain transition-transform duration-500 group-hover:scale-110" 
               />
             </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCategoryCard;
