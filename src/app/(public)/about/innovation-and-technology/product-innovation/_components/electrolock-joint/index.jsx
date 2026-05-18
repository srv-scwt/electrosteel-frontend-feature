"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import {
  ButtonLinkOutlineWithBorder,
  ButtonWithIcon,
  OutlineButton,
  OutlineButtonLink,
} from "@/components/ui/Button";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import WatchVideoButton from "@/components/ui/WatchVideoButton";
import { createImageSourceURL } from "../../../../../../../utils";
// comment

export default function ElectrolockJoint({ data }) {
  return (
    <section className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          <div className="relative w-full h-64 md:h-80 lg:h-[380px]  overflow-hidden shadow-md">
            <Image
              src={data?.Image ?? "/images/about/s1.jpg"}
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={`<h2>${data?.title ?? ""}</h2>`} />
            <HTMLRender htmlString={`<p>${data?.desc ?? ""}</p>`} />
            <div className="flex flex-wrap justify-between flex-row gap-1 lg:gap-3 mt-6">
               <div className="flex-1 flex items-center justify-center">
              <WatchVideoButton />
              </div>
              <div className="w-[2px] bg-[#ccc]"></div>
              <div className="flex-1 flex items-center justify-center">

              <OutlineButtonLink
                goto={createImageSourceURL(data?.downloadLink ?? '#')}
                title={"Download"}
                iconActive={true}
              />
              </div>

              <div className="w-[2px] bg-[#ccc]"></div>
                 <div className="flex-1 flex items-center justify-center">
              <OutlineButtonLink goto={data?.faqLink ?? "#"} title={"FAQ"} iconActive={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
