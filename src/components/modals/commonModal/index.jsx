"use client";
import React from "react";

const CommonModal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50  pt-12 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-3xl w-full mx-4 rounded-xl shadow-lg relative">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-[#00418e]">{title}</h3>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-500 hover:text-black"
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
