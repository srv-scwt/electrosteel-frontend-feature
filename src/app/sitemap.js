import { sitemapSections } from "@/app/(public)/sitemap/sitemap.data";
import { SITE_URL } from "@/utils/seo";

// Built from the same curated list that backs the human-readable /sitemap page,
// so the two can't drift apart. Anchor links collapse to their base route and
// duplicates are dropped.
export default function sitemap() {
  const paths = sitemapSections.flatMap((section) =>
    (section.items || []).map((item) => String(item.path || "").split("#")[0])
  );

  const uniquePaths = [...new Set(["/", ...paths].filter(Boolean))].sort();
  const lastModified = new Date();

  return uniquePaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
