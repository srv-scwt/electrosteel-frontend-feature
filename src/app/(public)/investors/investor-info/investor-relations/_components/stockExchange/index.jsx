"use client";

import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const StockExchangeInfo = ({ data }) => {
  return (
    <section className="bg-white" id="cardName">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2>{data?.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(data?.data) &&
              data?.data?.map((cards, index) => (
                <div
                  key={index}
                  className={`bg-[#004aa1] p-5 lg:p-[30px] shadow-md border border-[#004aa1] rounded-[12px]`}
                >
                  <div key={index} className="py-5 p-[40px]">
                    <h4 className="!text-white">{cards.heading}</h4>

                    <h4 className="!text-white">{cards.post}</h4>

                    <p className="!text-white">{cards.company}</p>

                    <HTMLRender
                      htmlString={cards?.address}
                      className="[&_*]:!text-white"
                    />

                    <p className="!text-white">{cards.code}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockExchangeInfo;
