"use client";

import Image from "next/image";
import React from "react";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

export default function PolicyFrameworkSection({ data }) {
  if (!data) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={createImageSourceURL(data?.image)}
          alt="Policy Framework Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay - Bluish theme */}
      <div className="absolute inset-0 bg-[#004aa1] opacity-80 -z-10" />

      <div className={`${cstyles.containerLg}`}>
        {/* HEADER */}
        <div className={`${cstyles.sectionContent} pb-6 md:pb-12 text-white`}>
          <h2 className="text-[#ffd306]">POLICY COMMITMENTS</h2>
          <HTMLRender htmlString={`<h2 class="text-white">${data?.title}</h2>`} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(data?.policies) &&
            data.policies.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 transition-all duration-300 hover:bg-white/20"
                >
                  <div className="flex flex-col gap-4">
                    <h4 className="fontF-primary text-2xl tracking-wide text-[#ffd306]">
                      {item?.title}
                    </h4>
                    <p
                      className="font-montserrat text-sm leading-relaxed text-white"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(item?.description) }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
