"use client";

import React from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const EventInformation = ({ data }) => {

  return (
    <section className="bg-[#004aa1]" id="cardName">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2 className="text-[#ffffff]">{data?.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(data?.data) &&
              data?.data?.map((cards, index) => (
                <div
                  key={index}
                  className={`${commonStyles.cardBox} bg-white p-2 lg:p-[5px] shadow-md border border-white rounded-[12px]`}
                >
                  <div key={index} className="py-3 px-[10px] xl:px-[25px]">
                    <h4 className="text-sm md:text-lg font-semibold mb-2">
                      {cards.heading}
                    </h4>

                    <p>{cards.post}</p>
                    <br />

                    <p>{cards.company}</p>

                    <HTMLRender htmlString={cards?.address} />

                    <p className="text-[#545454]">
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${cards.email}`}
                        className="text-[#00418e] hover:underline break-all"
                      >
                        {cards.email}
                      </a>
                    </p>

                    {cards.phone && (
                      <p className="text-[#545454]">
                        <strong>Phone:</strong> {cards.phone}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {/* ))} */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default EventInformation;
