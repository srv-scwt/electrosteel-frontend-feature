import React from "react";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const PaintApprovalsCard = ({ data, isLeft = false, isTrans, point }) => {
  return (
    <article className="h-full w-full">
      <div
        className={`group relative flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${
          isTrans
            ? "bg-transparent border-gray-200 hover:border-[#003366]/50"
            : "bg-gradient-to-br from-[#004aa1] to-[#001f3f] border-blue-400/20 hover:border-[#00aaff]/50"
        }`}
      >
        {/* Decorative Top Accent Strip */}
        <div className={`absolute top-0 left-0 w-full h-1.5 transition-all duration-500 ${
          isTrans
            ? "bg-gray-200 group-hover:bg-[#003366]"
            : "bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#00aaff] group-hover:to-[#0055ff]"
        }`}></div>

        {/* Decorative Glowing Orb (Only for dark cards) */}
        {!isTrans && (
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00aaff]/15 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-[#00aaff]/25 transition-transform duration-700 z-0 pointer-events-none"></div>
        )}

        {/* Content Container */}
        <div className="p-8 flex flex-col flex-grow relative z-10">
          {point && (
            <h4 className={`text-4xl font-bold mb-4 ${isTrans ? "text-[#003366]" : "text-white/20"}`}>
              {point}
            </h4>
          )}
          
          <div className={`mb-4 transition-colors duration-300 ${styles.card} !p-0 !bg-transparent`}>
             <HTMLRender htmlString={`<h4 class="${isTrans ? 'text-[#003366]' : 'text-white group-hover:text-[#00aaff]'} drop-shadow-sm font-bold tracking-wide">${data?.title}</h4>`} />
          </div>
          
          <div className={`text-sm md:text-base leading-relaxed flex-grow ${styles.card} !p-0 !bg-transparent`}>
            <HTMLRender htmlString={`<div class="${isTrans ? 'text-gray-600' : 'text-blue-100/90'}">${data?.desc}</div>`} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PaintApprovalsCard;
