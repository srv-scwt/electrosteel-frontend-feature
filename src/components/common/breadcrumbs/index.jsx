"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <nav
      className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-1"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="text-[#00418E] hover:underline transition">
        Home
      </Link>

      {pathParts.map((part, idx) => {
        const href = "/" + pathParts.slice(0, idx + 1).join("/");
        const isLast = idx === pathParts.length - 1;

        return (
          <span key={idx} className="flex items-center gap-1">
            <span>/</span>
            {isLast ? (
              <span className="text-gray-600 font-medium capitalize">
                {decodeURIComponent(part.replace(/-/g, " "))}
              </span>
            ) : (
              <Link
                href={href}
                className="text-[#00418E] hover:underline transition capitalize"
              >
                {decodeURIComponent(part.replace(/-/g, " "))}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
