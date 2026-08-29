// CSP restricts script/connect sources, which would fight local dev (HMR, and the
// backend API URL the team frequently repoints to a local IP during development).
// The client's security review targets the deployed production build, so the CSP
// is scoped to production only; the other headers below carry no such risk and are
// always on.
const contentSecurityPolicy = [
  "default-src 'self'",
  // googletagmanager serves gtag.js; without it the CSP blocks Analytics in
  // production only, which is easy to miss since dev has no CSP.
  "script-src 'self' 'unsafe-inline' https://xcdn.x0pa.ai https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https: https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'self' https://www.youtube.com https://xcdn.x0pa.ai",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "media-src 'self' https://www.electrosteel.com https://*.electrosteel.com",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
    : []),
];

const nextConfig = {
  poweredByHeader: false,
  // Strip console.log / warn / info from production builds so they don't leak to
  // the browser console. console.error is kept -- ServerFetch and the error
  // boundaries rely on it for API-failure logging. Dev is untouched, so logging
  // still works while developing; flip this to `true` to drop console.error too,
  // or remove the NODE_ENV check to strip in dev as well.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "electrosteel.com",
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Files in `public/` are served with `max-age=0` by default, so
        // CloudFront re-fetches every one of them from the origin on every
        // visit. These are build-time assets, so let the CDN hold them.
        // Filenames are not content-hashed: if you replace an image in place
        // without renaming it, viewers can see the old one for up to a day
        // (or invalidate the CloudFront path on deploy).
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/about/corporate-profile.php",
        destination: "https://www.electrosteel.com/about",
        permanent: true,
      },
      {
        source: "/about/company-profile.php",
        destination: "https://www.electrosteel.com/about",
        permanent: true,
      },
      {
        source: "/about/vision-mision.php",
        destination: "https://www.electrosteel.com/about/profile/vision-mission",
        permanent: true,
      },
      {
        source: "/about/board-of-directors.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/board-committees.php",
        destination: "https://www.electrosteel.com/about/leadership/board-committees",
        permanent: true,
      },
      {
        source: "/about/milestones.php",
        destination: "https://www.electrosteel.com/about/profile/milestones",
        permanent: true,
      },
      {
        source: "/about/25-Years-of-DI-Pipes/pipe-art.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/about/global_presence.php",
        destination: "https://www.electrosteel.com/about/global-presence",
        permanent: true,
      },
      {
        source: "/about/subsidiaries.php",
        destination: "https://www.electrosteel.com/about/global-presence",
        permanent: true,
      },
      {
        source: "/about/stockyard.php",
        destination: "https://www.electrosteel.com/about/global-presence",
        permanent: true,
      },
      {
        source: "/investor/code_of_conduct_and_policies.php",
        destination: "https://www.electrosteel.com/investors/code-of-conduct-and-policies",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-pipes-product-details.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-pipes#product-details",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-pipes-applications.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-pipes#applications",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-pipes-jointing-systems.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-pipes#jointing-systems",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-pipes-protection-system-internal.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-pipes#protection-system",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-pipes-protection-system-external.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-pipes#protection-system",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-product-details.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-jointing-systems.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings#jointing-systems",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-protection-system-internal.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings#protection-system",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-protection-system-external.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings#protection-system-external",
        permanent: true,
      },
      {
        source: "/products/other-products.php",
        destination: "https://www.electrosteel.com/products/other-products",
        permanent: true,
      },
      {
        source: "/products/technology-that-cares.php",
        destination: "https://www.electrosteel.com/about/innovation-and-technology/prestigious-projects",
        permanent: true,
      },
      {
        source: "/products/technological_advancements.php",
        destination: "https://www.electrosteel.com/about/innovation-and-technology/product-innovation",
        permanent: true,
      },
      {
        source: "/products/product_brochures.php",
        destination: "https://www.electrosteel.com/resource-and-download/brochure",
        permanent: true,
      },
      {
        source: "/products/business-enquiry.php",
        destination: "https://www.electrosteel.com/connect/business-enquiry",
        permanent: true,
      },
      {
        source: "/quality/quality_certificates.php",
        destination: "https://www.electrosteel.com/resource-and-download/certificate",
        permanent: true,
      },
      {
        source: "/facilities",
        destination: "https://www.electrosteel.com/about#manufacturing-facilities",
        permanent: true,
      },
      {
        source: "/facilities/index.php",
        destination: "https://www.electrosteel.com/about#manufacturing-facilities",
        permanent: true,
      },
      {
        source: "/connect/offices.php",
        destination: "https://www.electrosteel.com/about/global-presence",
        permanent: true,
      },
      {
        source: "/csr/csr-overview.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/csr/community_development.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/csr/csr-evironment-compliance-reports.php",
        destination: "https://www.electrosteel.com/sustainability/evironment-compliance/csr-evironment-compliance-reports",
        permanent: true,
      },
      {
        source: "/digital/latest_electrosteel.php",
        destination: "https://www.electrosteel.com/newsroom/latest-at-electrosteel",
        permanent: true,
      },
      {
        source: "/digital/electrosteel-on-Social.php",
        destination: "https://www.electrosteel.com/newsroom/electrosteel-on-social",
        permanent: true,
      },
      {
        source: "/digital/newsletters.php",
        destination: "https://www.electrosteel.com/newsroom/newsletters",
        permanent: true,
      },
      {
        source: "/digital/events.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/digital/digital_videos.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/shareholder-enquiry.php",
        destination: "https://www.electrosteel.com/connect/shareholder-enquiry",
        permanent: true,
      },
      {
        source: "/careers-enquiry.php",
        destination: "https://www.electrosteel.com/career",
        permanent: true,
      },
      {
        source: "/investor/quarterly-results.php",
        destination: "https://www.electrosteel.com/investors/financials/quarterly-results",
        permanent: true,
      },
      {
        source: "/investor/annual-reports.php",
        destination: "https://www.electrosteel.com/investors/reports-and-accounts/annual-reports",
        permanent: true,
      },
      {
        source: "/investor/accounts-of-subsidiaries.php",
        destination: "https://www.electrosteel.com/investors/reports-and-accounts/accounts-of-subsidiaries",
        permanent: true,
      },
      {
        source: "/investor/accounts-of-joint-venture.php",
        destination: "https://www.electrosteel.com/investors/reports-and-accounts/accounts-of-joint-venture",
        permanent: true,
      },
      {
        source: "/investor/nclt-meetings.php",
        destination: "https://www.electrosteel.com/investors/amalgamation/nclt-meetings",
        permanent: true,
      },
      {
        source: "/investor/nclt_final_order.php",
        destination: "https://www.electrosteel.com/investors/amalgamation/nclt-final-order",
        permanent: true,
      },
      {
        source: "/investor/regulation-37-of-lodr.php",
        destination: "https://www.electrosteel.com/investors/amalgamation/regulation-37-of-lord",
        permanent: true,
      },
      {
        source: "/investor/srikalahasthi-pipes-ltd.php",
        destination: "https://www.electrosteel.com/investors/amalgamation/srikalahasthi-pipes-ltd",
        permanent: true,
      },
      {
        source: "/investor/shareholding-pattern.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/shareholding-pattern",
        permanent: true,
      },
      {
        source: "/investor/newspaper-publication.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/newspaper-publication",
        permanent: true,
      },
      {
        source: "/investor/corporate-governance.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/corporate-governance",
        permanent: true,
      },
      {
        source: "/investor/shareholding-merger.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/mergers",
        permanent: true,
      },
      {
        source: "/investor/notices.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/notices",
        permanent: true,
      },
      {
        source: "/investor/160_notices.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/160-notices",
        permanent: true,
      },
      {
        source: "/investor/voting_results.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/voting-results",
        permanent: true,
      },
      {
        source: "/investor/iepf-suspense-account.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/iepf-suspense-account",
        permanent: true,
      },
      {
        source: "/investor/unclaimed-dividends.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/unclaimed-dividends",
        permanent: true,
      },
      {
        source: "/investor/extract-of-annual-return.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/extract-of-annual-return",
        permanent: true,
      },
      {
        source: "/investor/disclosures-to-stock-exchange.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/disclosures-to-stock-exchange",
        permanent: true,
      },
      {
        source: "/investor/other-disclosures.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/other-disclosures",
        permanent: true,
      },
      {
        source: "/investor/shareholder-information-annual-return.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/annual-return",
        permanent: true,
      },
      {
        source: "/investor/investor_relations.php",
        destination: "https://www.electrosteel.com/investors/investor-info/investor-relations",
        permanent: true,
      },
      {
        source: "/investor/credit-ratings.php",
        destination: "https://www.electrosteel.com/investors/investor-info/credit-ratings",
        permanent: true,
      },
      {
        source: "/investor/investor-presentation-and-other-documents.php",
        destination: "https://www.electrosteel.com/investors/investor-info/investor-presentation-and-other-documents",
        permanent: true,
      },
      {
        source: "/investor/board_approved_csr_projects.php",
        destination: "https://www.electrosteel.com/investors/csr",
        permanent: true,
      },
      {
        source: "/careers/life_electrosteel.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/about/group-profile.php",
        destination: "https://www.electrosteel.com/about",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-pipes-overview.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-pipes",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-overview.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/flange-pipe.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-flange-pipes",
        permanent: true,
      },
      {
        source: "/investor/annual-return.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/annual-return",
        permanent: true,
      },
      {
        source: "/products/flanged_joint.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-flange-pipes",
        permanent: true,
      },
      {
        source: "/products/bolted_restrained_joint.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-flange-pipes",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-push-on-joints.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-flanged_joint.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile_iron_fittings_bolted_restrained_joint.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile_iron_fittings_electrolock_joint.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile_iron_fittings_tooth_gasket_restrained_joint.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/express_mechanical_joint_fittings.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-protection-system-cement-mortar-lining.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile_iron_fittings_fusion_bonded_epoxycoating.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-zinc_rich_paint_coating.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/external-ductile_iron_fittings_fusion_bonded_epoxycoating.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/products/ductile-iron-fittings-polyethylene_sleeving.php",
        destination: "https://www.electrosteel.com/products/ductile-iron-fittings",
        permanent: true,
      },
      {
        source: "/faq.php",
        destination: "https://www.electrosteel.com/faq",
        permanent: true,
      },
      {
        source: "/investor/quarterly-results-archive.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/investor/iepf.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/iepf-suspense-account",
        permanent: true,
      },
      {
        source: "/investor/governance.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information/corporate-governance",
        permanent: true,
      },
      {
        source: "/investor/compliance-report.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/investor/amalgamation.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/investor/agm-egm.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/investor/shareholder-information.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/investor/policies.php",
        destination: "https://www.electrosteel.com",
        permanent: true,
      },
      {
        source: "/business-enquiry.php",
        destination: "https://www.electrosteel.com/connect/business-enquiry",
        permanent: true,
      },
      {
        source: "/pdf/quality_policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308929682-QUALITY_POLICY.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
