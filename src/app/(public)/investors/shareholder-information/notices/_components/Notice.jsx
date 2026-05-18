

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const noticeData = [
  {
    title: "Notices",
    items: [
      {
        title: "Postal Ballot Notice dated 06 February, 2026",
        src: "/files/shareholding/postal-ballot-06-feb-2026.pdf",
        date: "06 February 2026",
      },
      {
        title: "Postal Ballot Notice dated 30 August, 2025",
        src: "/files/shareholding/postal-ballot-30-aug-2025.pdf",
        date: "30 August 2025",
      },
      {
        title: "Notice of 70th AGM - 27 August 2025",
        src: "/files/shareholding/agm-70-27-aug-2025.pdf",
        date: "27 August 2025",
      },
      {
        title: "Postal Ballot Notice dated 12 December, 2024",
        src: "/files/shareholding/postal-ballot-12-dec-2024.pdf",
        date: "12 December 2024",
      },
      {
        title: "Postal Ballot Notice dated 30 October, 2024",
        src: "/files/shareholding/postal-ballot-30-oct-2024.pdf",
        date: "30 October 2024",
      },
      {
        title: "Notice of 69th AGM - 23 August 2024",
        src: "/files/shareholding/agm-69-23-aug-2024.pdf",
        date: "23 August 2024",
      },
      {
        title: "Postal Ballot Notice dated 13 May, 2024",
        src: "/files/shareholding/postal-ballot-13-may-2024.pdf",
        date: "13 May 2024",
      },
      {
        title: "Postal Ballot Notice 2024",
        src: "/files/shareholding/postal-ballot-2024.pdf",
        date: "2024",
      },
      {
        title: "Notice of 68th AGM - 11th September, 2023",
        src: "/files/shareholding/agm-68-11-sept-2023.pdf",
        date: "11 September 2023",
      },
      {
        title: "Postal Ballot Notice dated 14 February 2023",
        src: "/files/shareholding/postal-ballot-14-feb-2023.pdf",
        date: "14 February 2023",
      },
      {
        title: "Postal Ballot Notice dated 11th November, 2022",
        src: "/files/shareholding/postal-ballot-11-nov-2022.pdf",
        date: "11 November 2022",
      },
      {
        title: "Notice of 67th AGM - 16th September, 2022",
        src: "/files/shareholding/agm-67-16-sept-2022.pdf",
        date: "16 September 2022",
      },
      {
        title: "Postal Ballot Notice dated 14 February, 2022",
        src: "/files/shareholding/postal-ballot-14-feb-2022.pdf",
        date: "14 February 2022",
      },
      {
        title: "Postal Ballot Notice dated 3 January 2022",
        src: "/files/shareholding/postal-ballot-3-jan-2022.pdf",
        date: "3 January 2022",
      },
      {
        title: "Notice of 66th AGM - 3rd September 2021",
        src: "/files/shareholding/agm-66-3-sept-2021.pdf",
        date: "3 September 2021",
      },
      {
        title: "Notice of 65th AGM - 15th September 2020",
        src: "/files/shareholding/agm-65-15-sept-2020.pdf",
        date: "15 September 2020",
      },
      {
        title: "Postal Ballot Notice and Form dated 12th November 2019",
        src: "/files/shareholding/postal-ballot-12-nov-2019.pdf",
        date: "12 November 2019",
      },
      {
        title: "Notice of 64th AGM - 20th September 2019",
        src: "/files/shareholding/agm-64-20-sept-2019.pdf",
        date: "20 September 2019",
      },
      {
        title: "Notice of 63rd AGM - 14th September 2018",
        src: "/files/shareholding/agm-63-14-sept-2018.pdf",
        date: "14 September 2018",
      },
    ],
  },
];

const Notice = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {noticeData.map((item, index) => {
          const cardData =
            item.items?.map((fileItem) => ({
              title: fileItem.title,
              pdf: fileItem.src,
              date: fileItem.date,
            })) || [];

          return (
            <div key={index} className="mb-10">
              <HTMLRender
                htmlString={`<h2 class="text-left text-2xl sm:text-3xl font-semibold text-primaryBlue mb-6">${item.title}</h2>`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
                {cardData.map((post, idx) => (
                  <InvestorCard
                    key={idx}
                    post={{
                      ...post,
                      pdf: post?.pdf?.replaceAll("\\", "/"),
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Notice;