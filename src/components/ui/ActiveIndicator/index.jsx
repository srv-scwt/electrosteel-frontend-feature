"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveIndicator() {
  const pathname = usePathname();

  const items = [
    { label: "Business Enquiry", slug: "/connect/business-enquiry" },
    { label: "Shareholder Enquiry", slug: "/connect/shareholder-enquiry" },
    { label: "Careers Enquiry", slug: "/connect/careers-enquiry" },
  ];

  // Derived straight from the pathname — no state to fall out of sync.
  // findIndex returns -1 when nothing matches, which falls back to the first tab.
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => pathname === i.slug)
  );

  return (
    <div className="relative w-full border-b border-gray-300 mt-6">
      <div className="flex justify-center text-center gap-6 md:gap-14 px-4">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={item.slug}
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
