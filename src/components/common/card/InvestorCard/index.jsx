"use client";

import React from "react";
import Image from "next/image";
import { OutlineButtonLink } from "@/components/ui/Button";

import { createImageSourceURL, truncateText } from "@/utils";

export default function InvestorCard({ post }) {
  const title = post?.title || post?.fileName || "";

  const src = post?.src || post?.pdf || post?.filelink || post?.audio || "";

  const extension = src?.split(".").pop()?.toLowerCase() || "";

  const audioTypes = ["mp3", "wav", "ogg", "m4a", "aac"];
  const pdfTypes = ["pdf"];
  const xcaleTypes = ["xcale", "xlsx", "xls", "csv"];

  const isAudio = audioTypes.includes(extension);
  const isPdf = pdfTypes.includes(extension);
  const isXcale = xcaleTypes.includes(extension);

  return (
    <article
      className="
        w-full h-full lg:h-[238px]
        rounded-[32px]
        bg-[#004AA1] p-6
        shadow-[0px_4px_10px_0px_#00000026]
      "
    >
      <div className="flex h-full flex-col">
        <h3
          className="
            max-w-[95%]
            !my-0
            text-white font-bold uppercase
            text-[16px] leading-[1.35]
            sm:text-[22px]
            xl:!text-[28px]
          "
        >
          {truncateText(title, 100)}
        </h3>


        <div className="mt-auto pt-6">
          {isPdf ? (
            <div className="flex items-end justify-between gap-3">
              <div className="w-[calc(100%-46px)] sm:w-[calc(100%-58px)] xl:w-[calc(100%-67px)]">
                <OutlineButtonLink
                  goto={createImageSourceURL(src)}
                  action={"_blank"}
                  title="Download"
                  className="!text-white !text-xs sm:!text-sm whitespace-nowrap"
                />
              </div>

              <div className="flex h-[30px] w-[30px] items-center justify-center xl:h-[39px] xl:w-[39px]">
                <Image
                  src="/images/icons/pdf.png"
                  alt="PDF"
                  width={39}
                  height={39}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ) : isAudio ? (
            <div className="flex items-end justify-between gap-3">
              <div className="w-[calc(100%-46px)] sm:w-[calc(100%-58px)] xl:w-[calc(100%-67px)]">
                <audio
                  controls
                  preload="metadata"
                  className="h-[39px] w-full overflow-hidden rounded-[12px]"
                >
                  <source src={createImageSourceURL(src)} type={`audio/${extension}`} />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="flex h-[35px] w-[35px] items-center justify-center xl:h-[39px] xl:w-[39px]">
                <Image
                  src="/images/icons/new-investor-sound.png"
                  alt="Audio"
                  width={39}
                  height={39}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ) : isXcale ? (
            <div className="flex items-end justify-between gap-3">
              <div className="w-[calc(100%-46px)] sm:w-[calc(100%-58px)] xl:w-[calc(100%-67px)]">
                <OutlineButtonLink
                  goto={createImageSourceURL(src)}
                  action={"_blank"}
                  title="Download"
                  className="!text-white !text-xs sm:!text-sm whitespace-nowrap"
                />
              </div>

              <div className="flex h-[30px] w-[30px] items-center justify-center xl:h-[39px] xl:w-[39px]">
                <Image
                  src="/images/icons/xls.png"
                  alt="Xcale"
                  width={39}
                  height={39}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="text-sm text-white/70">
              File format not supported
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
