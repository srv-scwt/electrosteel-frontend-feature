"use client";
import Image from "next/image";
import React from "react";
import styles from "@/app/common.module.css";
import Link from "next/link";

const PdfLinkListSection = () => {
  // Step 1: Define all your data in arrays
  const codeOfConduct = [
    {
      title: "Code of Conduct for Directors and Senior Management",
      link: "/",
    },
    {
      title: "Code of Conduct - SEBI PIT Regulations",
      link: "/",
    },
  ];

  const policies = [
    { title: "Business Responsibility Policy", link: "/" },
    { title: "Quality Policy", link: "/" },
    { title: "Environment Policy", link: "/" },
    { title: "Occupational Health & Safety Policy", link: "/" },
    { title: "Social Accountability Policy", link: "/" },
    { title: "Energy Policy", link: "/" },
    { title: "Policy for determining Material Subsidiaries", link: "/" },
    { title: "Related Party Transaction Policy", link: "/" },
    { title: "Nomination and Remuneration Policy", link: "/" },
    { title: "Vigil Mechanism/Whistle Blower Policy", link: "/" },
    { title: "Corporate Social Responsibility Policy", link: "/" },
    {
      title: "Policy for determination of Materiality of Events/Information for disclosures",
      link: "/",
    },
    {
      title: "Familiarization Programme for the Independent Directors",
      link: "/",
    },
    { title: "Policy for Preservation of Documents and Archival", link: "/" },
    { title: "Dividend Distribution Policy", link: "/" },
    { title: "Electrosteel AntiCompetition Policy", link: "/" },
    { title: "Electrosteel Sustainable Procurement Policy", link: "/" },
    { title: "Electrosteel Antibribery Policy", link: "/" },
    { title: "Risk Management Policy", link: "/" },
    { title: "Non-Discrimination Policy", link: "/" },
    { title: "Compensatory Off Policy", link: "/" },
    { title: "Grievance Handling policy", link: "/" },
  ];

  // Step 2: Reusable component for a single PDF link box
  const PdfLinkItem = ({ title, link }) => (
    <div
      className={`${styles.pdfLinkBox} flex gap-3 items-center bg-white p-4 md:p-6 lg:p-8 shadow-md h-full hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="relative w-[30px] h-[30px] flex-shrink-0">
        <Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain" />
      </div>
      <p className="w-full">
        <Link
          href={link}
          className="text-[#545454] hover:text-[#00418e] transition-colors duration-200"
        >
          {title}
        </Link>
      </p>
    </div>
  );

  // 🔹 Step 3: Return the full layout
  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {/* Code of Conduct Section */}
          <h3>Code of Conduct</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
            {codeOfConduct.map((item, index) => (
              <PdfLinkItem key={index} title={item.title} link={item.link} />
            ))}
          </div>

          {/* Policies Section */}
          <h3 className="lg:mt-[40px] mt-5">Policies</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
            {policies.map((item, index) => (
              <PdfLinkItem key={index} title={item.title} link={item.link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdfLinkListSection;
