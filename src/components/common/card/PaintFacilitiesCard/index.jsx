import React from "react";
import styles from "./style.module.css";

const PaintFacilitiesCard = ({ data ,isLeft=false , isDifferent }) => {
  return (
    <article className="h-full">
      <div className={`h-full flex flex-col items-start ${styles.card} ${isDifferent ? "bg-[#E7E7E7] !text-black" : "bg-[#00418E] text-white"}`}>
        <h4 className={`${isDifferent ? "bg-[#00418E] !text-white" : "bg-[#E7E7E7] text-[#00418E]"}`}>{data?.title}</h4>
        <p className="flex-1">{data?.desc}</p>
      </div>
    </article>
  );
};

export default PaintFacilitiesCard;
