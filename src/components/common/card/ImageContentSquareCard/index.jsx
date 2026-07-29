"use client";
import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";

const ButtonSliderImage = dynamic(() => import('@/components/ui/ButtonSliderImage'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] lg:h-full bg-gray-200 animate-pulse flex justify-center items-center z-50" />
  ),
});

const ImageContentSquareCard = ({ image, images, content, altImage }) => {
  const hasImages = images && images.length > 0;

  return (
    <div className={`relative bg-[#fdd307] h-auto lg:h-[350px] overflow-hidden`}>
      <div className="flex flex-col lg:flex-row gap-0 h-full">
        <div className="relative w-full lg:w-1/2 h-[250px] lg:h-full flex-shrink-0">
          {hasImages ? (
            <ButtonSliderImage 
              images={images} 
              imageClassName="h-[250px] lg:h-[350px]" 
            />
          ) : (
            <Image
              src={image}
              alt={altImage ?? "img"}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        {/* <div className={styles.sectionCardContent}> */}
        <div className={`w-full lg:w-1/2 ${styles.sectionCardContent} ${styles.sectionContent} ${styles.paddingF} h-[300px] lg:h-full overflow-y-auto`}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageContentSquareCard;
