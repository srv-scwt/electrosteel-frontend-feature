import "server-only";

import { getFinishedProductByCategory } from "@/services/product/otherProducts/FinishedProductByCategory.api";
import { sanitizeTextContent } from "@/utils";

// Drives canonical + Open Graph URLs, so this must be the real public origin in
// production. Set NEXT_PUBLIC_SITE_URL per environment; the fallback is only a
// preview deployment and will emit wrong canonicals if it is ever used live.
const FALLBACK_SITE_URL = "https://electrosteel.com";

export const SITE_URL = `${(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
)
  .trim()
  .replace(/\/+$/, "")}/`;

export const DEFAULT_SEO = {
  title: "Electrosteel",
  description: "Electrosteel Official Website",
  image: "/images/seo.webp",
  url: SITE_URL,
};

export const SEO_PAGE_CATEGORIES = [
  { pageName: "Home", category: "seoHome" },
  { pageName: "About Us", category: "seoAboutUs" },
  { pageName: "Vision & Mission", category: "seoVisionMission" },
  { pageName: "MileStone", category: "seoMileStone" },
  { pageName: "Board Of Director", category: "seoBoardOfDirector" },
  { pageName: "Board Committees", category: "seoBoardCommittees" },
  { pageName: "Legend of ECL", category: "seoLegendOfECL" },
  { pageName: "People", category: "seoPeople" },
  { pageName: "Product Innovation", category: "seoProductInnovation" },
  { pageName: "Prestigious Projects", category: "seoPrestigiousProjects" },
  { pageName: "Process Innovation", category: "seoProcessInnovation" },
  { pageName: "Global Pressence", category: "seoGlobalPressence" },
  { pageName: "Our Commitments", category: "seoOurCommitments" },
  {
    pageName: "Employee Welfare",
    category: "seoEmployeeWelfare",
  },
  {
    pageName: "External Social Support",
    category: "seoExternalSocialSupport",
  },
  { pageName: "Jal Sadhana", category: "seoJalSadhana" },
  {
    pageName: "Latest @ Electrosteel",
    category: "seoLatestElectrosteel",
  },
  { pageName: "Press And Media", category: "seoPressAndMedia" },
  { pageName: "Newsletter", category: "seoNewsletter" },
  { pageName: "Blogs", category: "seoBlogs" },
  { pageName: "Gallery", category: "seoGallery" },
  { pageName: "Events", category: "seoEvents" },
  { pageName: "Quarterly Results", category: "seoQuarterlyResults" },
  { pageName: "Annual Reports", category: "seoAnnualReports" },
  {
    pageName: "Accounts of Subsidiaries",
    category: "seoAccountsOfSubsidiaries",
  },
  {
    pageName: "Accounts of Joint Venture",
    category: "seoAccountsOfJointsVenture",
  },
  {
    pageName: "Code Of Conduct And Policies",
    category: "seoCodeOfConductAndPolicies",
  },
  { pageName: "NCLT Meetings", category: "seoNCLTMeetings" },
  { pageName: "NCLT Final order", category: "seoNCLTFinalOrder" },
  {
    pageName: "Regulation 37 of LODR",
    category: "seoRegulation37OfLODR",
  },
  {
    pageName: "Srikalahasthi Pipes Ltd",
    category: "seoSrikalahasthiPipesLtd",
  },
  {
    pageName: "Shareholding Pattern",
    category: "seoShareholdingPattern",
  },
  {
    pageName: "Newspaper Publications",
    category: "seoNewspaperPublications",
  },
  {
    pageName: "Corporate Governance Quarterly Compliance",
    category: "seoCorporateGovernanceQuarterlyCompliance",
  },
  { pageName: "Mergers", category: "seoMergers" },
  {
    pageName: "Transfer of share to DEMAT Account of IEPF authority",
    category: "seoTransferOfShareToDEMATAccountOfIEPFAuthority",
  },
  { pageName: "Unclaimed Dividends", category: "seoUnclaimedDividends" },
  {
    pageName: "Extract of annual return",
    category: "seoExtractOfAnnualReturn",
  },
  {
    pageName: "Disclosures to stock exchange",
    category: "seoDisclosuresToStockExchange",
  },
  { pageName: "Other Disclosure", category: "seoOtherDisclosure" },
  { pageName: "Annual Return", category: "seoAnnualReturn" },
  { pageName: "Notice", category: "seoNotice" },
  { pageName: "160 Notice", category: "seo160Notice" },
  {
    pageName: "Investor Relations",
    category: "seoInvestorRelations",
  },
  { pageName: "Credit Ratings", category: "seoCreditRatings" },
  {
    pageName: "Investor Presentation",
    category: "seoInvestorPresentation",
  },
  {
    pageName: "Board Approved CSR Projects",
    category: "seoBoardApprovedCSRProjects",
  },
  { pageName: "Banners", category: "seoBanners" },
  { pageName: "Nodal Officer", category: "seoNodalOfficer" },
  {
    pageName: "Annual Returns Content",
    category: "seoAnnualReturnsContent",
  },
  {
    pageName: "Code of Conduct Policies Content",
    category: "seoCodeOfConductPoliciesContent",
  },
  { pageName: "Ductile Iron Pipes", category: "seoDuctileIronPipes" },
  {
    pageName: "DI Pipes Jointing System",
    category: "seoDIPipesJointingSystem",
  },
  {
    pageName: "DI Fittings Jointing System",
    category: "seoDIFittingsJointingSystem",
  },
  {
    pageName: "Ductile Iron Flange Pipe",
    category: "seoDuctileIronFlangePipe",
  },
  {
    pageName: "Ductile Iron Fittings",
    category: "seoDuctileIronFittings",
  },
  { pageName: "Valves", category: "seoValves" },
  { pageName: "Rubber Products", category: "seoRubberProducts" },
  { pageName: "Paint", category: "seoPaint" },
  { pageName: "Cast Iron Pipes", category: "seoCastIronPipes" },
  { pageName: "Other Products", category: "seoOtherProducts" },
  { pageName: "Policy", category: "seoPolicy" },
  { pageName: "Others", category: "seoOthers" },
  { pageName: "Brouchers", category: "seoBrouchers" },
  { pageName: "Certificate", category: "seoCertificate" },
  { pageName: "Disclaimer", category: "seoDisclaimer" },
  { pageName: "Privacy Policy", category: "seoPrivacyPolicy" },
  { pageName: "Social Data", category: "seoSocialData" },
  { pageName: "FAQ", category: "seoFAQ" },
];

const SEO_CATEGORY_BY_PAGE = SEO_PAGE_CATEGORIES.reduce((accumulator, item) => {
  accumulator[item.pageName] = item.category;
  return accumulator;
}, {});

const SEO_ROUTE_PAGES = [
  { pathname: "/", pageName: "Home" },
  { pathname: "/about", pageName: "About Us" },
  { pathname: "/about/profile/vision-mission", pageName: "Vision & Mission" },
  { pathname: "/about/vision-mission", pageName: "Vision & Mission" },
  { pathname: "/about/profile/milestones", pageName: "MileStone" },
  {
    pathname: "/about/leadership/board-of-directors",
    pageName: "Board Of Director",
  },
  {
    pathname: "/about/leadership/board-committees",
    pageName: "Board Committees",
  },
  { pathname: "/about/leadership/legends-of-ecl", pageName: "Legend of ECL" },
  { pathname: "/about/people", pageName: "People" },
  {
    pathname: "/about/innovation-and-technology/product-innovation",
    pageName: "Product Innovation",
  },
  {
    pathname: "/about/innovation-and-technology/prestigious-projects",
    pageName: "Prestigious Projects",
  },
  {
    pathname: "/about/innovation-and-technology/process-innovation",
    pageName: "Process Innovation",
  },
  { pathname: "/about/global-presence", pageName: "Global Pressence" },
  {
    pathname: "/about/code-of-conduct-and-policies",
    pageName: "Code of Conduct Policies Content",
  },
  {
    pathname: "/sustainability/social-initiatives/commitment-going-forward",
    pageName: "Our Commitments",
  },
  {
    pathname: "/sustainability/social-initiatives/employee-welfare",
    pageName: "Employee Welfare",
  },
  {
    pathname: "/sustainability/social-initiatives/external-social-support",
    pageName: "External Social Support",
  },
  {
    pathname: "/sustainability/social-initiatives/jal-sadhana",
    pageName: "Jal Sadhana",
  },
  {
    pathname: "/newsroom/latest-at-electrosteel",
    pageName: "Latest @ Electrosteel",
  },
  {
    pathname: "/newsroom/press-and-media",
    pageName: "Press And Media",
  },
  { pathname: "/newsroom/newsletters", pageName: "Newsletter" },
  { pathname: "/newsroom/blog", pageName: "Blogs" },
  { pathname: "/newsroom/gallery", pageName: "Gallery" },
  { pathname: "/newsroom/events", pageName: "Events" },
  {
    pathname: "/newsroom/electrosteel-on-social",
    pageName: "Social Data",
  },
  {
    pathname: "/investors/financials/quarterly-results",
    pageName: "Quarterly Results",
  },
  {
    pathname: "/investors/reports-and-accounts/annual-reports",
    pageName: "Annual Reports",
  },
  {
    pathname: "/investors/reports-and-accounts/accounts-of-subsidiaries",
    pageName: "Accounts of Subsidiaries",
  },
  {
    pathname: "/investors/reports-and-accounts/accounts-of-joint-venture",
    pageName: "Accounts of Joint Venture",
  },
  {
    pathname: "/investors/code-of-conduct-and-policies",
    pageName: "Code Of Conduct And Policies",
  },
  {
    pathname: "/investors/amalgamation/nclt-meetings",
    pageName: "NCLT Meetings",
  },
  {
    pathname: "/investors/amalgamation/nclt-final-order",
    pageName: "NCLT Final order",
  },
  {
    pathname: "/investors/amalgamation/regulation-37-of-lord",
    pageName: "Regulation 37 of LODR",
  },
  {
    pathname: "/investors/amalgamation/srikalahasthi-pipes-ltd",
    pageName: "Srikalahasthi Pipes Ltd",
  },
  {
    pathname: "/investors/shareholder-information/shareholding-pattern",
    pageName: "Shareholding Pattern",
  },
  {
    pathname: "/investors/shareholder-information/newspaper-publication",
    pageName: "Newspaper Publications",
  },
  {
    pathname: "/investors/shareholder-information/corporate-governance",
    pageName: "Corporate Governance Quarterly Compliance",
  },
  {
    pathname: "/investors/shareholder-information/mergers",
    pageName: "Mergers",
  },
  {
    pathname: "/investors/shareholder-information/iepf-suspense-account",
    pageName: "Transfer of share to DEMAT Account of IEPF authority",
  },
  {
    pathname: "/investors/shareholder-information/unclaimed-dividends",
    pageName: "Unclaimed Dividends",
  },
  {
    pathname: "/investors/shareholder-information/extract-of-annual-return",
    pageName: "Extract of annual return",
  },
  {
    pathname: "/investors/shareholder-information/disclosures-to-stock-exchange",
    pageName: "Disclosures to stock exchange",
  },
  {
    pathname: "/investors/shareholder-information/other-disclosures",
    pageName: "Other Disclosure",
  },
  {
    pathname: "/investors/shareholder-information/annual-return",
    pageName: "Annual Return",
  },
  {
    pathname: "/investors/shareholder-information/notices",
    pageName: "Notice",
  },
  {
    pathname: "/investors/shareholder-information/160-notices",
    pageName: "160 Notice",
  },
  {
    pathname: "/investors/investor-info/investor-relations",
    pageName: "Investor Relations",
  },
  {
    pathname: "/investors/investor-info/credit-ratings",
    pageName: "Credit Ratings",
  },
  {
    pathname: "/investors/investor-info/investor-presentation-and-other-documents",
    pageName: "Investor Presentation",
  },
  { pathname: "/investors/csr", pageName: "Board Approved CSR Projects" },
  { pathname: "/products/ductile-iron-pipes", pageName: "Ductile Iron Pipes" },
  {
    pathname: "/products/ductile-iron-pipes/jointing-systems",
    pageName: "DI Pipes Jointing System",
  },
  {
    pathname: "/products/ductile-iron-fittings/jointing-systems",
    pageName: "DI Fittings Jointing System",
  },
  {
    pathname: "/products/ductile-iron-flange-pipes",
    pageName: "Ductile Iron Flange Pipes",
  },
  {
    pathname: "/products/ductile-iron-fittings",
    pageName: "Ductile Iron Fittings",
  },
  { pathname: "/products/valves", pageName: "Valves" },
  { pathname: "/products/rubber-products", pageName: "Rubber Products" },
  { pathname: "/products/industrial-paint", pageName: "Industrial Paint" },
  { pathname: "/products/cast-iron-pipes", pageName: "Cast Iron Pipes" },
  { pathname: "/products/others-products", pageName: "Other Products" },
  { pathname: "/resource-and-download/policy", pageName: "Policy" },
  { pathname: "/resource-and-download/other", pageName: "Others" },
  { pathname: "/resource-and-download/brochure", pageName: "Brouchers" },
  {
    pathname: "/resource-and-download/certificate",
    pageName: "Certificate",
  },
  { pathname: "/quality/certificate", pageName: "Certificate" },
  { pathname: "/disclaimer", pageName: "Disclaimer" },
  { pathname: "/privacy-policy", pageName: "Privacy Policy" },
  { pathname: "/faq", pageName: "FAQ" },
];

export const SEO_ROUTE_CONFIG = SEO_ROUTE_PAGES
  .map((item) => ({
    ...item,
    category: SEO_CATEGORY_BY_PAGE[item.pageName] || null,
  }))
  .filter((item) => item.category);

const SEO_ROUTE_BY_PATHNAME = SEO_ROUTE_CONFIG.reduce((accumulator, item) => {
  accumulator[item.pathname] = item;
  return accumulator;
}, {});

function normalizePathname(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const normalizedPathname = String(pathname).trim();
  const withoutQuery = normalizedPathname.split("?")[0].split("#")[0];
  const withoutTrailingSlash = withoutQuery.replace(/\/+$/, "");

  return withoutTrailingSlash || "/";
}

function pickSeoRecord(seoData) {
  if (Array.isArray(seoData)) {
    return seoData.find(Boolean) || null;
  }

  if (seoData && typeof seoData === "object") {
    return seoData;
  }

  return null;
}

function normalizeSeoText(value, fallback) {
  const sanitizedValue = sanitizeTextContent(value);
  return sanitizedValue || fallback;
}

export function buildCurrentUrl(pathname = "/") {
  return new URL(normalizePathname(pathname), SITE_URL).toString();
}

export function getSeoRouteConfig(pathname = "/") {
  return SEO_ROUTE_BY_PATHNAME[normalizePathname(pathname)] || null;
}

const IMAGE_REFERENCE_PATTERN =
  /^(https?:\/\/|\/|data:)|\.(jpe?g|png|webp|gif|svg|avif)(\?|$)/i;

function isImageReference(value) {
  const text = String(value ?? "").trim();
  return text.length > 0 && IMAGE_REFERENCE_PATTERN.test(text);
}

// The CMS currently returns these three keys shifted by one: `title` carries the
// keywords, `description` carries the title, and `image` carries the description.
// Rather than hard-coding that, detect it — a record that exposes a `keywords`
// key, or whose `image` really does look like an image, is already correct. This
// way the metadata keeps working when the backend mapping is fixed.
function readSeoFields(seoRecord) {
  if (!seoRecord) {
    return { keywords: null, title: null, description: null };
  }

  const isShifted =
    !("keywords" in seoRecord) && !isImageReference(seoRecord.image);

  if (isShifted) {
    return {
      keywords: seoRecord.title,
      title: seoRecord.description,
      description: seoRecord.image,
    };
  }

  return {
    keywords: seoRecord.keywords,
    title: seoRecord.title,
    description: seoRecord.description,
  };
}

export function buildMetadata({ seoData, currentURL } = {}) {
  const normalizedSeoData = pickSeoRecord(seoData);
  const seoFields = readSeoFields(normalizedSeoData);

  const finalSEO = {
    keywords: normalizeSeoText(seoFields.keywords, DEFAULT_SEO.title),
    title: normalizeSeoText(seoFields.title, DEFAULT_SEO.title),
    description: normalizeSeoText(
      seoFields.description,
      DEFAULT_SEO.description
    ),
    image: DEFAULT_SEO.image,
    url: buildCurrentUrl(currentURL || DEFAULT_SEO.url),
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: finalSEO.title,
    description: finalSEO.description,
    keywords: finalSEO.keywords,
    alternates: {
      canonical: finalSEO.url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: finalSEO.title,
      description: finalSEO.description,
      url: finalSEO.url,
      siteName: "Electrosteel",
      type: "website",
      images: [
        {
          url: finalSEO.image,
          width: 1200,
          height: 630,
          alt: finalSEO.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalSEO.title,
      description: finalSEO.description,
      images: [finalSEO.image],
    },
    icons: {
      icon: "/images/favicon.png",
      shortcut: "/images/favicon.png",
    },
  };
}

export async function buildMetadataForPathname(pathname = "/") {
  const routeConfig = getSeoRouteConfig(pathname);
  const currentURL = buildCurrentUrl(pathname);

  if (!routeConfig) {
    return buildMetadata({ currentURL });
  }

  const seoResponse = await getFinishedProductByCategory(routeConfig.category);

  return buildMetadata({
    seoData: seoResponse?.data ?? null,
    currentURL,
  });
}
