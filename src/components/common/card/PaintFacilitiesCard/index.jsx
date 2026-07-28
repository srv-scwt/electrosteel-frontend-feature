import React from "react";
import styles from "./style.module.css";

const PaintFacilitiesCard = ({ data ,isLeft=false , isDifferent, isLegendsTitle=false }) => {
  return (
    <article className="h-full">
      <div className={`h-full flex flex-col items-start ${styles.card} ${isDifferent ? "bg-[#E7E7E7] !text-black" : "bg-[#00418E] text-white"}`}>
        {data?.icon && <div className="mb-4">{data.icon}</div>}
        <h4 className={isLegendsTitle ? styles.legendsTitle : `${isDifferent ? "bg-[#00418E] !text-white" : "bg-[#E7E7E7] text-[#00418E]"}`}>{data?.title}</h4>
        <div className="flex-1 text-sm md:text-base leading-snug">
          {data?.desc}
        </div>
      </div>
    </article>
  );
};

export default PaintFacilitiesCard;
