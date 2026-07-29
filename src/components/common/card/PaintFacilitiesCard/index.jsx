import React from "react";
import styles from "./style.module.css";
import Image from "next/image";

const PaintFacilitiesCard = ({ data ,isLeft=false , isDifferent, isLegendsTitle=false }) => {
  const isFlexRow = !!data?.iconPath;

  return (
    <article className="h-full">
      <div className={`h-full ${isFlexRow ? "flex flex-row items-stretch" : "flex flex-col items-start"} ${styles.card} ${isDifferent ? "bg-[#E7E7E7] !text-black" : "bg-[#00418E] text-white"}`}>
        
        {data?.iconPath && (
          <div className="flex-shrink-0 flex items-center justify-center pr-5 mr-5 border-r border-[#FDD307] opacity-100">
             <div className={`w-20 h-20 flex items-center justify-center rounded-full ${!isDifferent ? "bg-white" : "bg-[#00418E]"}`}>
               <Image src={data.iconPath} alt={data.title} width={48} height={48} className={`object-contain ${!isDifferent ? styles.iconBlue : styles.iconWhite}`} />
             </div>
          </div>
        )}

        {data?.icon && !data?.iconPath && <div className="mb-4">{data.icon}</div>}
        
        <div className={isLegendsTitle ? "flex-1 flex flex-col gap-[clamp(0.5rem,1vw,1rem)] w-full" : "flex-1 w-full flex flex-col justify-center"}>
          <h4 className={isLegendsTitle ? styles.legendsTitle : `${styles.titleNoBg} ${isDifferent ? "text-[#00418E]" : "text-white"}`}>{data?.title}</h4>
          <div className={`text-sm md:text-base ${isLegendsTitle ? 'leading-snug' : 'leading-relaxed'}`}>
            {data?.desc}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PaintFacilitiesCard;
