import React from "react";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const PaintApprovalsCard = ({ data, isLeft = false, isTrans }) => {
  return (
    <article className={styles.sectionContent}>
      <div
        className={`${styles.card} ${isLeft ? `bg-[#00418E] text-white` : " bg-[#00418E]    text-white"} ${isTrans && "!bg-transparent !text-[#003366]"}`}
      >
        {data?.point && <h4>{data?.point}</h4>}
        <HTMLRender htmlString={`<h4>${data?.title}</h4>`} />
        <HTMLRender htmlString={`<p>${data?.desc}</p>`} />
      </div>
    </article>
  );
};

export default PaintApprovalsCard;
