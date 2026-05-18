import React from "react";
import styles from "./style.module.css";
import Image from "next/image";

const ImageContentSquareCard = ({ image, content, altImage }) => {
  return (
    <div className={`relative bg-[#fdd307]`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="relative w-full h-[300px] lg:h-full">
          {/* Make sure the image takes full container space and is responsive */}
          <Image
            src={image}
            alt={altImage ?? "img"}
            layout="fill" // Ensures the image covers the full container
            objectFit="cover" // Keeps the aspect ratio intact while covering the container
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* <div className={styles.sectionCardContent}> */}
        <div className={`${styles.sectionCardContent} ${styles.sectionContent} ${styles.paddingF}`}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageContentSquareCard;
