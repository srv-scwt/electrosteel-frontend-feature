

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const noticeData = [
  {
    title: "160 Notices",
    items: [
      {
        title: "Notice of Candidature of Mr. Amrendra Prasad Verma",
        src: "/files/shareholding/Notice-of-Candidature-of-Mr.-Amrendra-Prasad-Verma.pdf",
        date: "1st January 2025",
      },
      {
        title: "Notice of Candidature of Mr. Sunil Katial",
        src: "/files/shareholding/Notice-of-Candidature-of-Mr.-Sunil-Katial.pdf",
        date: "2nd January 2025",
      },
      {
        title: "Notice of Candidature of Mr. Binod Kumar Khaitan",
        src: "/files/shareholding/Notice-of-Candidature-of-Mr.-Binod-Kumar-Khaitan.pdf",
        date: "3rd January 2025",
      },
      {
        title: "Notice of Candidature of Mr. Uddhav Kejriwal",
        src: "/files/shareholding/Notice-of-Candidature-of-Mr.-Uddhav-Kejriwal.pdf",
        date: "4th January 2025",
      },
      {
        title: "Notice of Candidature of Mr. Rajkumar Khanna",
        src: "/files/shareholding/Notice-of-Candidature-of-Mr.-Rajkumar-Khanna.pdf",
        date: "5th January 2025",
      },
      {
        title: "Notice of Candidature of Dr. Mohua Banerjee",
        src: "/files/shareholding/Notice-of-Candidature-of-Dr.-Mohua-Banerjee.pdf",
        date: "6th January 2025",
      },
      {
        title: "Notice of Candidature of Mr. Pradip Kumar Khaitan",
        src: "/files/shareholding/Notice-of-Candidature-of-Mr.-Pradip-Kumar-Khaitan.pdf",
        date: "7th January 2025",
      },
    ],
  },
];

const Notices160 = () => {
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
                htmlString={`<h2 class="text-left text-2xl sm:text-3xl font-semibold text-primaryBlue mb-6">160<span> Notices</span></h2>`}
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

export default Notices160;