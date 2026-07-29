"use client";
import React from "react";

const CommonModal = ({ open, onClose, title, children }) => {
  console.log("open: ", open)
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50  pt-12 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-3xl w-full mx-4 rounded-xl shadow-lg relative">
        
        {/* Header */}
        <div className="flex justify-between items-start px-6 pt-6">
          <h3 style={{
            fontFamily: "var(--font-bebas-neue), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(20px, 2.5vw, 28px)",
            lineHeight: "100%",
            color: "#00418e",
            paddingBottom: "4px"
          }}>{title}</h3>
          <button
            onClick={onClose}
            className="text-3xl leading-none text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 text-sm text-gray-700 leading-relaxed max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
