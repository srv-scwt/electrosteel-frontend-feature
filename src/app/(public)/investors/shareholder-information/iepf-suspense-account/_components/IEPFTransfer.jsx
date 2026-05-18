"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";
import { OutlineButtonLink } from "@/components/ui/Button";

const iepfData = [
  {
    title: "Details of Nodal Officer",
    items: [
      {
        title:
          "Statement of shares to be transfered to the Demat Account of IEPF Authority 2017-18 (SW UNIT)",
        src: "/files/shareholding/Statement-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2017-18-(SW-UNIT).pdf",
        date: "2017-18",
      },
      {
        title:
          "Statement of shares to be transfered to the Demat Account of IEPF Authority 2017-18 (ECL)",
        src: "/files/shareholding/Statement-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2017-18-(ECL).pdf",
        date: "2017-18",
      },
      {
        title:
          "Statements of shares to be transfered to the Demat Account of IEPF Authority 2015-16 (SW UNIT)",
        src: "/files/shareholding/Statements-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2015-16-(SW-UNIT).pdf",
        date: "2015-16",
      },
      {
        title:
          "Statements of shares to be transfered to the Demat Account of IEPF Authority 2015-16 (ECL)",
        src: "/files/shareholding/Statements-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2015-16-(ECL).pdf",
        date: "2015-16",
      },
      {
        title:
          "Statement of Shares to be transferred to the DEMAT Account of the IEPF Authority - 2014-15",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-the-DEMAT-Account-of-the-IEPF-Authority-2014-15.pdf",
        date: "2014-15",
      },
      {
        title: "Transfer of shares to DEMAT Account of IEPF Authority",
        src: "/files/shareholding/Transfer-of-shares-to-DEMAT-Account-of-IEPF-Authority.pdf",
        date: "2014",
      },
      {
        title: "Investor Education and Protection Fund Authority Rules, 2017",
        src: "/files/shareholding/Investor-Education-and-Protection-Fund-Authority-Rules-2017.pdf",
        date: "2017",
      },
      {
        title: "Investor Education and Protection Fund Authority Rules, 2016",
        src: "/files/shareholding/Investor-Education-and-Protection-Fund-Authority-Rules-2016.pdf",
        date: "2016",
      },
      {
        title:
          "Statement of Shares to be transferred to the DEMAT Account of the IEPF Authority - 2013-14",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-the-DEMAT-Account-of-the-IEPF-Authority-2013-14.pdf",
        date: "2013-14",
      },
      {
        title:
          "Statement of Shares to be transferred to the DEMAT Account of the IEPF Authority - 2012-13",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-the-DEMAT-Account-of-the-IEPF-Authority-2012-13.pdf",
        date: "2012-13",
      },
      {
        title:
          "Statement of Shares to be transferred to DEMAT Account of IEPF Authority - 2011-12",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-DEMAT-Account-of-IEPF-Authority-2011-12.pdf",
        date: "2011-12",
      },
      {
        title:
          "Statement of Shares to be transferred to DEMAT Account of IEPF Authority - 2010-11",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-DEMAT-Account-of-IEPF-Authority-2010-11.pdf",
        date: "2010-11",
      },
      {
        title:
          "Statement of Shares to be transferred to DEMAT Account of IEPF Authority - 2009-10",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-DEMAT-Account-of-IEPF-Authority-2009-10.pdf",
        date: "2009-10",
      },
      {
        title:
          "Statement of Shares to be transferred to DEMAT Account of IEPF Authority- 2008-09",
        src: "/files/shareholding/Statement-of-Shares-to-be-transferred-to-DEMAT-Account-of-IEPF-Authority-2008-09.pdf",
        date: "2008-09",
      },
    ],
  },
];

const IEPFTransfer = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {iepfData.map((item, index) => {
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

              <div className="shadow-xl p-6 rounded-md mb-6">
                <h4>Mr. Indranil Mitra</h4>

                <p>
                  <strong>Company Secretary</strong>
                </p>

                <p>
                  <strong>Email: </strong>

                  <span>
                    <a
                      href="mailto:companysecretary@electrosteel.com"
                      className="text-blue-700"
                    >
                      companysecretary@electrosteel.com
                    </a>
                  </span>
                </p>

                <div className="flex flex-wrap">
                  <OutlineButtonLink
                    goto={"#"}
                    title="Click here to visit the IEPF website and claim refund of Shares transferred to IEPF Authority"
                    className="pt-6"
                  />
                </div>
              </div>

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

export default IEPFTransfer;