"use client";
import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import Link from "next/link";
import commonStyles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";

// Newsletter data (can come from API or CMS later)
const newsletters = [
  {
    id: 1,
    month: "September 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/september-2025.pdf",
  },
  {
    id: 2,
    month: "August 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/august-2025.pdf",
  },
  {
    id: 3,
    month: "July 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/july-2025.pdf",
  },
  {
    id: 4,
    month: "June 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/june-2025.pdf",
  },
  {
    id: 5,
    month: "May 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/may-2025.pdf",
  },
  {
    id: 6,
    month: "April 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/april-2025.pdf",
  },
  {
    id: 7,
    month: "March 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/march-2025.pdf",
  },
  {
    id: 8,
    month: "February 2025",
    image: "/images/newsletters/newLetterseptember.jpg",
    pdf: "/files/february-2025.pdf",
  },
];

const NewslettersListingSection = () => {
  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {/* Top filter & heading */}
          <div className="flex items-center gap-4 justify-between mb-5 flex-wrap sm:flex-nowrap">
            <h2 className="!mb-0">
              Year - <span>2025</span>
            </h2>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
              <label className="whitespace-nowrap">Find Newsletters</label>
              <select className="border border-gray-300 p-3 rounded-md focus:outline-none w-full sm:w-auto text-[#545454]">
                <option value="">All</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
          </div>

          {/* Newsletter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-12 items-start">
            {newsletters.map((item) => (
              <div
                key={item.id}
                className={`${commonStyles.newsLetterCardWrapper} shadow-md`}
              >
                <Link href={item.pdf} target="_blank">
                  <Image
                    src={item.image}
                    alt={item.month}
                    fill
                    className="object-cover !relative rounded-[12px] mb-3 transform hover:scale-105 transition-transform duration-300"
                  />
                  <p className="mb-3 !text-[#545454] hover:!text-[#004aa1] transition ease-in-out">
                    {item.month}
                  </p>
                  <OutlineButtonLink goto={item.pdf} title={"Download"} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewslettersListingSection;
