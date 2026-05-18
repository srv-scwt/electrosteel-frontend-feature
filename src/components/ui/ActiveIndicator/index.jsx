"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function ActiveIndicator() {
  const pathname = usePathname();

  const items = [
    { label: "Business Enquiry", slug: "/connect/business-enquiry" },
    { label: "Shareholder Enquiry", slug: "/connect/shareholder-enquiry" },
    { label: "Careers Enquiry", slug: "/connect/careers-enquiry" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  useEffect(() => {
    const index = items.findIndex((i) => pathname === i.slug);
    setActiveIndex(index === -1 ? 0 : index);
  }, [pathname]);


  return (
    <div className="relative w-full border-b border-gray-300 mt-6">
      <div className="flex justify-center text-center gap-6 md:gap-14 px-4">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={item.slug}
            ref={(el) => (tabRefs.current[i] = el)}
            className={`py-4 text-sm md:text-base font-medium transition-all duration-200 relative
              hover:text-blue-600 
              ${
                activeIndex === i
                  ? "text-blue-600 border-b-4 border-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
