"use client";

import { useEffect } from "react";

export default function CarrerEnquiryModal({ open, onClose, children }) {
  // Close when pressing ESC. Hooks must run on every render, so the effect stays
  // above the early return and no-ops while the modal is closed.
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-[70vw] max-h-[85vh] 
                    p-6 transform transition-all duration-300
                    opacity-100 scale-100 animate-modalFadeIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {children}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-[12px] bg-blue-600 hover:bg-blue-700 
                     text-white font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
