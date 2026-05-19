"use client";

import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const RegistrarGrievance = ({ section1, section2 }) => {

  const overseasData = [
    {
      cardName: [
        {
          heading: section1?.data?.[0]?.heading ?? "",
          heading2:"",
          company: section1?.data?.[0]?.company ?? "",
          post: section1?.data?.[0]?.post ?? "",
          address: section1?.data?.[0]?.address,
          phone: section1?.data?.[0]?.phone ?? "",
          email:  section1?.data?.[0]?.email ?? "",
        },
      ],
    },
    {
      cardName: [
        {
          heading: section2?.title ?? "",
          heading2: section2?.data?.[0]?.heading ?? "",
          company: section2?.data?.[0]?.company ?? "",
          post: section2?.data?.[0]?.post ?? "",
          address: section2?.data?.[0].address,
          email:  section2?.data?.[0]?.email ?? "",
        },
      ],
    },
  ];

  return (
    <section className="bg-white" id="cardName">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overseasData.map((item, idx) => (
              <div
                key={idx}
                className={`bg-[#004aa1] p-5 shadow-md border border-[#00000029] rounded-[12px]`}
              >
                {item.cardName.map((cards, index) => (
                  <div key={index} className="p-[40px]">
                    <h4 className="text-sm md:text-lg font-semibold mb-2 !text-white">
                      {cards.heading}
                    </h4>

                    <p className="!text-white">
                      <strong>{cards.heading2}</strong>
                    </p>
                     <p className="!text-white">
                      {cards.post}
                    </p>
                    <p className="!text-white">
                     <strong>{cards.company}</strong> 
                    </p>
                   
                    <HTMLRender
                      htmlString={cards?.address}
                       className="[&_*]:!text-white"
                    />

                    {cards.phone && (
                      <p className="!text-white">
                        <strong>Phone:</strong> {cards.phone}
                      </p>
                    )}

                    <p className="!text-white">
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${cards.email}`}
                        className="!text-gray-200 hover:underline break-all"
                      >
                        {cards.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrarGrievance;
