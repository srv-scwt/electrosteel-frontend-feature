import { SITE_URL } from "@/utils/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/private/",
        "/temp/",
        "/cache/",
        "/career/career-enquiry",
        "/connect/business-enquiry",
        "/connect/shareholder-enquiry",
      ],
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}