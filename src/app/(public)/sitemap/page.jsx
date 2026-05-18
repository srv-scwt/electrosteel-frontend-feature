import React from "react";
import Link from "next/link";
import HeroSection from "@/components/common/heroSection";
import { sitemapSections } from "./sitemap.data";

const page = () => {
  const heroData = {
    banner: "/images/blog/blogBanner.jpg",
    title: "Sitemap",
  };

  return (
    <>
      <HeroSection data={heroData} />
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1920px] px-4 py-10 sm:px-8 md:py-14 xl:px-[6.67vw]">
          <div className="space-y-10">
            {sitemapSections.map((section) => (
              <div
                key={section.title}
                className="border-b border-slate-200 pb-8 last:border-b-0 last:pb-0"
              >
                <h2 className="text-[clamp(2rem,4vw,2.8rem)] uppercase leading-[0.92] text-[#003366] [font-family:var(--font-bebas-neue)]">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#545454] [font-family:var(--font-montserrat)]">
                  {section.description}
                </p>

                <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="text-sm font-semibold uppercase tracking-[0.08em] text-[#004aa1] transition hover:text-[#003366] [font-family:var(--font-montserrat)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
