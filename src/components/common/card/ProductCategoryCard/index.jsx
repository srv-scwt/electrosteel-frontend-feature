"use client";
import React from "react";
import Image from "next/image";
import HTMLRender from "@/components/ui/HTMLRender";

const ProductCategoryCard = ({ data }) => {
  return (
    <div className="group relative flex flex-col h-full bg-gradient-to-br from-[#003366] to-[#001f3f] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/10 hover:border-[#00aaff]/50">
      
      {/* Decorative top accent strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00aaff] to-[#0055ff] opacity-75 z-10"></div>

      {/* Image Container with elegant glowing backdrop */}
      {data.image && (
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-white/5 border-b border-white/10">
          <Image
            src={data.image}
            alt={data.title || "Product Category"}
            fill
            className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out z-10 relative drop-shadow-xl"
          />
          {/* Subtle glow overlay on hover */}
          <div className="absolute inset-0 bg-[#00aaff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00aaff]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      )}

      {/* Content Container */}
      <div className="p-6 md:p-8 flex-grow flex flex-col relative z-20">
        {data.title && (
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-[#00aaff] transition-colors duration-300 drop-shadow-sm">
            {data.title}
          </h3>
        )}
        
        {data.desc && (
          <div className="text-blue-100/90 text-sm md:text-base leading-relaxed flex-grow">
            <HTMLRender htmlString={data.desc} />
          </div>
        )}
      </div>

      {/* Premium Gradient Accent Line at bottom */}
      <div className="h-1 w-full bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#00aaff] group-hover:to-[#0055ff] transition-all duration-500"></div>
    </div>
  );
};

export default ProductCategoryCard;
