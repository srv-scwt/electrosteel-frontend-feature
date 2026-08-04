"use client";

import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import { createImageSourceURL } from "@/utils";
import HTMLRender from "@/components/ui/HTMLRender";

export default function HistoryModal({ isOpen, action, historyData }) {
  if (!isOpen || !historyData) return null;

const title = historyData?.heading ?? historyData?.title

  // const historyData = {
  //   year: "1955",
  //   title: "ELECTROSTEEL CASTINGS LTD. WAS BORN",
  //   description:
  //     "Electrosteel raised USD 40 Million through the issue of Global Depository Receipts (GDRs) in October 2005 and became the first Indian Company to be listed on Professional Securities Market (PSM) of the London Stock Exchange.",
  //   image: "/images/modal/history.png",
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div className={`relative bg-white ${styles.containerLg}`}>
        {/* Close Button */}
        <button
          onClick={() => action()}
          className="absolute top-[31px] cursor-pointer right-[48px] text-gray-600 hover:text-black text-xl"
        >
          <AiOutlineClose size={32} />
        </button>

        <div className={`flex flex-row ${styles.containerModelWrapper}`}>
          {/* Left Image */}
          <div className={`${styles.imageContainer}`}>
            <Image
              src={createImageSourceURL(historyData?.image)
              }
              alt={historyData?.title || "Milestone image"}
              fill
              className="object-cover object-center"
              
            />
          </div>

          {/* Right Text Section */}
          <div className={`${styles.sectionContent} ${styles.textSection}`}>
            <h5>{historyData?.year ?? ""}</h5>
            <HTMLRender htmlString={`<h6>${title ?? ""}</h6>`}/>
            <HTMLRender htmlString={`<p>${historyData?.description ?? ""}</p>`}/>
          </div>
        </div>
      </div>
    </div>
  );
}
