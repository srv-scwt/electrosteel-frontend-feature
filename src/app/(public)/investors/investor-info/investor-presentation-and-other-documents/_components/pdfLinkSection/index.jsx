

import React from "react";
import styles from "@/app/common.module.css";
import Image from "next/image";
import { OutlineButton } from "@/components/ui/Button";
import AudioPlayer from "../audioPlayList";
import InvestorCard from "@/components/common/card/InvestorCard";

// PDF and other documents data
const pdfInvestorPresentation = [
  {
    title: "Familiarization Programme for the Independent Directors",
    src: "/files/shareholding/Familiarization-Programme-for-the-Independent-Directors.pdf",
    date: "2022",
  },
  {
    title: "Transcript of Investors Concall held on 14 November 2022",
    src: "/files/shareholding/Transcript-of-Investors-Concall-held-on-14-November-2022.pdf",
    date: "14th November 2022",
  },
  {
    title: "Transcript of Investors concall held on 12 May 2022",
    src: "/files/shareholding/Transcript-of-Investors-concall-held-on-12-May-2022.pdf",
    date: "12th May 2022",
  },
  {
    title: "Earning Presentation Q4 FY 2022",
    src: "/files/shareholding/Earning-Presentation-Q4-FY-2022.pdf",
    date: "2022",
  },
];

// Audio data
const audioList = [
  {
    title: "Audio Of Conference Call Dated 12th May 2022",
    file: "/audios/horse.mp3",
  },
  {
    title: "Audio of Conference Call held on 16th August, 2022",
    file: "/audios/horse.mp3",
  },
];

// Investor Documents data
const investorDocuments = [
  {
    title: "Familiarization Programme for the Independent Directors",
    src: "/files/shareholding/Familiarization-Programme-for-the-Independent-Directors.pdf",
    date: "2022",
  },
  {
    title: "Transcript of Investors Concall held on 14 November 2022",
    src: "/files/shareholding/Transcript-of-Investors-Concall-held-on-14-November-2022.pdf",
    date: "14th November 2022",
  },
  {
    title: "Transcript of Investors concall held on 12 May 2022",
    src: "/files/shareholding/Transcript-of-Investors-concall-held-on-12-May-2022.pdf",
    date: "12th May 2022",
  },
  {
    title: "Earning Presentation Q4 FY 2022",
    src: "/files/shareholding/Earning-Presentation-Q4-FY-2022.pdf",
    date: "2022",
  },
];

const PdfLInkSection = () => {
  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {/* Investor Presentation */}
          <h2>
            Investor <span>Presentation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
            {pdfInvestorPresentation.map((item, idx) => (
              <InvestorCard
                key={idx}
                post={{ title: item.title, pdf: item.src, date: item.date }}
              />
            ))}
          </div>

          {/* Audio List */}
          <h2 className="mt-[50px]">
            Audio <span>Files</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
            {audioList.map((item, idx) => (
              <InvestorCard
                key={idx}
                post={{ title: item.title, pdf: item.file, date: "" }}
              />
            ))}
          </div>

          {/* Investor Documents */}
          <h2 className="mt-[50px]">
            Investor <span>Documents</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
            {investorDocuments.map((item, idx) => (
              <InvestorCard
                key={idx}
                post={{ title: item.title, pdf: item.src, date: item.date }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdfLInkSection;
