import React from "react";
import styles from "./style.module.css";

const PaintFacilitiesCard = ({ data ,isLeft=false , isDifferent, isLegendsTitle=false }) => {
  return (
    <article className="h-full">
      <div className={`h-full flex flex-col items-start ${styles.card} ${isDifferent ? "bg-[#E7E7E7] !text-black" : "bg-[#00418E] text-white"}`}>
        {data?.icon && <div className="mb-4">{data.icon}</div>}
        <div className={isLegendsTitle ? "flex-1 flex flex-col gap-[clamp(0.5rem,1vw,1rem)] w-full" : "flex-1 w-full flex flex-col"}>
          <h4 className={isLegendsTitle ? styles.legendsTitle : `${isDifferent ? "bg-[#00418E] !text-white" : "bg-[#E7E7E7] text-[#00418E]"}`}>{data?.title}</h4>
          <div className={`text-sm md:text-base ${isLegendsTitle ? 'leading-snug' : 'leading-relaxed'}`}>
            {data?.desc}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PaintFacilitiesCard;
