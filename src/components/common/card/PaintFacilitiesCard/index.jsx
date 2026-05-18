import React from "react";
import styles from "./style.module.css";

const PaintFacilitiesCard = ({ data ,isLeft=false , isDifferent }) => {
  return (
    <article className={`w-[100%] ${isLeft ? "ml-auto" : "mr-auto "}`}>
      <div className={`${styles.card} ${isDifferent ? "bg-[#E7E7E7] !text-black" : "bg-[#00418E] text-white"}`}>
        <h4 className={`${isDifferent ? "bg-[#00418E] !text-white" : "bg-[#E7E7E7] text-[#00418E]"}`}>{data?.title}</h4>
        <p>{data?.desc}</p>
      </div>
    </article>
  );
};

export default PaintFacilitiesCard;
