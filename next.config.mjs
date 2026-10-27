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
        destination: "https://www.electrosteel.com/sustainability/social-initiatives/external-social-support",
        permanent: true,
      },
      {
        source: "/csr/community_development.php",
        destination: "https://www.electrosteel.com/sustainability/social-initiatives/external-social-support",
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
        destination: "https://www.electrosteel.com/newsroom/events",
        permanent: true,
      },
      {
        source: "/digital/digital_videos.php",
        destination: " https://www.electrosteel.com/newsroom/gallery#video",
        permanent: true,
      },
      {
        source: "/shareholder-enquiry.php",
        destination: "https://www.electrosteel.com/connect/shareholder-enquiry",
        permanent: true,
      },
      {
        source: "/careers-enquiry.php",
        destination: "https://www.electrosteel.com/career/career-enquiry",
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
        destination: "https://www.electrosteel.com/about/people#life-at-ecl",
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
        destination: "https://www.electrosteel.com/investors/financials/quarterly-results/archive",
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
        destination: "https://www.electrosteel.com/investors/compliance-report",
        permanent: true,
      },
      {
        source: "/investor/amalgamation.php",
        destination: "https://www.electrosteel.com/investors/amalgamation",
        permanent: true,
      },
      {
        source: "/investor/agm-egm.php",
        destination: "https://www.electrosteel.com/investors/agm-egm",
        permanent: true,
      },
      {
        source: "/investor/shareholder-information.php",
        destination: "https://www.electrosteel.com/investors/shareholder-information",
        permanent: true,
      },
      {
        source: "/investor/policies.php",
        destination: "https://www.electrosteel.com/investors/policies",
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
      {
        source: "/disclaimer.php",
        destination: "https://www.electrosteel.com/disclaimer",
        permanent: true,
      },
      {
        source: "/privacy-policy.php",
        destination: "https://www.electrosteel.com/privacy-policy",
        permanent: true,
      },
      {
        source: "/about/umang-kejriwal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/mayank-kejriwal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/amrendra-prasad-verma.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/mohua-banerjee.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/rajkumar_khanna.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/jitendra_kumar_jain.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/vyas-mitre-ralli.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/bal_kishan_choudhury.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/virendra_sinha.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/sangeeta_singh.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/bikramjit_ghosh.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/sunil_katial.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/uddhav-kejriwal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/priya_manjari_todi.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/radha_kejriwal_agarwal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/nityangi_kejriwal_jaiswal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/madhav_kejriwal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/about/ashutosh_agarwal.php",
        destination: "https://www.electrosteel.com/about/leadership/board-of-directors",
        permanent: true,
      },
      {
        source: "/document/Shareholding-Pattern-as-on-30-June-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787547947706-Shareholding-Pattern-as-on-30-June-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Resuls-for-the-Quarter-ended-30-June-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787650703966-Financial-Resuls-for-the-Quarter-ended-30-June-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Annual-Report-2025-26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306702816-Annual-Report-2025-26.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1608017827code-of-conduct-49.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309381640-code-of-conduct-49.pdf",
        permanent: true,
      },
      {
        source: "/document/164582479-Code-of-Conduct-SEBI-PIT-Regulations.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309387263-Code-of-Conduct-SEBI-PIT-Regulations.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1608017904business-responsibility-policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309387263-Code-of-Conduct-SEBI-PIT-Regulations.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1608017945QUALITY_POLICY.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308929682-QUALITY_POLICY.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1608017985Environmental_Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308635566-Environmental_Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/6328547-Health-&-Safety-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787813677875-6328547-Health---Safety-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/13625485-SA-8000-POLICY-REAFFIRMED-MAR24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308702651-SA-8000-POLICY-REAFFIRMED-MAR24.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1654857-Energy-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308997259-Energy-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1608019994Policy-for-determining-Material-Subsidiaries.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308711095-Policy-for-determining-Material-Subsidiaries.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1630859-Version-5-Related-Party-Transaction-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309021049-Version-5-Related-Party-Transaction-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1608020082nominationRemunerationPolicy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308735312-nominationRemunerationPolicy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19642584-Policy-for-determination-of-Materiality-of-Events-Information-for-Disclosure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309040947-Vigil-Mechanism-Whistle-Blower-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16136369078CSR-policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308768837-CSR-policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Familiarisation-Programme-for-the-Independent-Directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308790176-Familiarisation-Programme-for-the-Independent-Directors.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613637038policy-for-preservation-of-documents-and-archival.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309085821-policy-for-preservation-of-documents-and-archival.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1064444546454-Dividend-Distribution-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308808454-Dividend-Distribution-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/5623585696-Electrosteel-AntiCompetition-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309108008-Electrosteel-AntiCompetition-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18562356-Electrosteel-Sustainable-Procurement-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308830251-Electrosteel-Sustainable-Procurement-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/385692356-Electrosteel-Antibribery-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309243121-Electrosteel-Antibribery-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Risk-Management-Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308850855-Risk-Management-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/3125879-24_ECL_Non_Discrimination_Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309262471-ECL_Non_Discrimination_Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/3258781-24_ECL_Compensatory_Leave.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308901347-24_ECL_Compensatory_Leave.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1826357-3Tier_Grievance_Eng_Beng_Hindi.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309290744-3Tier_Grievance_Eng_Beng_Hindi.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/Lanco_AR_2010-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321868471-Lanco_AR_2010-2011.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/Lanco-Annual-Report-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321863861-Lanco-Annual-Report-2011-2012.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/Annual-Report-2012-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321857406-Annual-Report-2012-13.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/Annaul-Report-2013-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321844447-Annaul-Report-2013-14.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/SPL_AR_RESULTS-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321836424-SPL_AR_RESULTS-2015.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/SPLAR201516.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321831600-SPLAR201516.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/Srikalahasthi_AR2016_17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321824060-Srikalahasthi_AR2016_17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/SriKalahasthi_AR_2017_18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321809566-SriKalahasthi_AR_2017_18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/SriKalahasthi_AR_2018_19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321805087-SriKalahasthi_AR_2018_19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/SriKalahasthi_AR_2019_20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321800186-SriKalahasthi_AR_2019_20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Report/SriKalahasthi_AR_2020_21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321795377-SriKalahasthi_AR_2020_21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2011-2012/LIL-quarterly-results-june-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335833546-LIL-quarterly-results-june-11.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2011-2012/LIL-quarterly-results-Unnaudited-Q2-2011-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335823016-LIL-quarterly-results-Unnaudited-Q2-2011-12.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2011-2012/lil-audited-reulsts-31-march-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335810206-lil-audited-reulsts-31-march-12.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2012-2013/Un-Audited-LIL-Q-I-Results.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335785897-Un-Audited-LIL-Q-I-Results.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2012-2013/lil-qrly-results-sept-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335771636-lil-qrly-results-sept-12.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2012-2013/lil-qrly-results-DEC12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335761077-lil-qrly-results-DEC12.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2012-2013/lil-audited-reulsts-31-march-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335748297-lil-audited-reulsts-31-march-13.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2013-2014/Resultsforpublication%20March.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335471775-Resultsforpublication-March.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2013-2014/LIL-results-dec-2013_Page_3.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335453933-LIL-results-dec-2013_Page_3.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2013-2014/LIL-Q1-2013-14-Results%20june.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335440294-LIL-Q1-2013-14-Results-june.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2013-2014/LIL-Q2-2013-14-sepResults.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335426303-LIL-Q2-2013-14-sepResults.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2014-2015/lil-audited-reulsts-31-march15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335405796-lil-audited-reulsts-31-march15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2014-2015/ReulutsQ1june.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335399426-ReulutsQ1june.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2014-2015/LIL-Q2-Sep2014-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335384987-LIL-Q2-Sep2014-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2014-2015/LIL-Q3-Dec2014-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787335375750-LIL-Q3-Dec2014-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2018-2019/Results%20June-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334550360-Results-June-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2018-2019/resultsSep18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334542920-resultsSep18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2018-2019/resultsDec18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334535504-resultsDec18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2018-2019/resultsMar19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334523155-resultsMar19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2019-2020/Results%20June-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334429997-Results-June-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2019-2020/results-sep-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334415365-results-sep-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2019-2020/results-dec-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334396171-results-dec-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2019-2020/resultsMar20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334383337-resultsMar20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2020-2021/results-mar-21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334348631-results-mar-21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2020-2021/results-june-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334247378-results-june-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2020-2021/results-sep-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334237978-results-sep-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2020-2021/results-dec-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334227240-results-dec-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2021-2022/results-june-21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334214690-results-june-21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Financial-Results/2021-2022/results-sep-21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787334204773-results-sep-21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Annual-Return/annual-return-2019-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321697945-annual-return-2019-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2010-2011/CG%20Jun-10.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321380224-CG-Jun-10.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2010-2011/CG%20Sep-10.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321371208-CG-Sep-10.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2010-2011/CG%20Dec-10.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321353366-CG-Dec-10.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2010-2011/CG%20Mar-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321342163-CG-Mar-11.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2011-2012/CG.June-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321333672-CG.June-11.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2011-2012/CG%20Sep-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321311774-CG-Sep-11.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2011-2012/CG%20Dec-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321298407-CG-Dec-11.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2011-2012/CG%20Mar-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321292241-CG-Mar-12.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2012-2013/CG%20June-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321261612-CG-June-12.pdf",
        permanent: true,
      },
      //18-9-26
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2018-2019/shareholding-pattern-31-12-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316387688-shareholding-pattern-31-12-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2018-2019/shareholding-pattern-30-09-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316392019-shareholding-pattern-30-09-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2017-2018/Jan-Mar.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787336487234-Jan-Mar.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2015-2016/October-December.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337042703-October-December.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2015-2016/July-September.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337048038-July-September.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2014-2015/October-December.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337042703-October-December.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2014-2015/July-September.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337048038-July-September.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2014-2015/April-June.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337146472-April-June.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2014-2015/January-March.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337151078-January-March.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2013-2014/October-December.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337042703-October-December.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2013-2014/July-September.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337048038-July-September.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2013-2014/January-March.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787317534341-January-March.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2012-2013/October-December.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337042703-October-December.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2012-2013/July-September.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337048038-July-September.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2012-2013/April-June.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337146472-April-June.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2011-2012/October-December.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337042703-October-December.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2011-2012/July-September.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337048038-July-September.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2011-2012/January-March.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337151078-January-March.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2010-2011/October-December.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337042703-October-December.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2010-2011/July-September.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337048038-July-September.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2010-2011/April-June.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337146472-April-June.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2010-2011/January-March.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787337151078-January-March.pdf",
        permanent: true,
      },

      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2021-2022/CGReportJune21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319292183-CGReportJune21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2020-2021/CGReportDec20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319306862-CGReportDec20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2020-2021/CGReportSep20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319311529-CGReportSep20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2020-2021/CGReportJune20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319319092-CGReportJune20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2020-2021/CGReportMar21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319323701-CGReportMar21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2019-2020/CGReportMar20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319337318-CGReportMar20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2019-2020/CGReportdec19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319344132-CGReportdec19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2019-2020/CGReportsep19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319358846-CGReportsep19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2019-2020/CGReportJune19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787319363144-CGReportJune19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2018-2019/CGReportMar19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320116741-CGReportMar19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2018-2019/CGReportDec18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320220658-CGReportDec18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2018-2019/CGReportSep18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320209466-CGReportSep18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2018-2019/CGReportJune18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320236178-CGReportJune18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2017-2018/CGReportMar18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320275165-CGReportMar18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2017-2018/CGReport31122017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320281593-CGReport31122017.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2017-2018/CGReportSep17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320302002-CGReportSep17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2017-2018/CGReportJune17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320306526-CGReportJune17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2016-2017/CGReport310317.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320317282-CGReport310317.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2016-2017/CGReportDec16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320322192-CGReportDec16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2016-2017/CGReportSEP16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320331583-CGReportSEP16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2016-2017/CorpGovJun16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320355030-CorpGovJun16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2015-2016/CGReportMar16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320361718-CGReportMar16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2015-2016/CG%20Dec-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320370305-CG-Dec-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2015-2016/CG%20Sep-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320374755-CG-Sep-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2015-2016/CG%20Jun-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787320377997-CG-Jun-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2014-2015/CG%20Mar-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321169311-CG-Mar-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2014-2015/CG%20Dec-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321174014-CG-Dec-14.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2014-2015/CG%20Sep-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321179058-CG-Sep-14.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2014-2015/CG%20Jun-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321185005-CG-Jun-14.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2013-2014/CG%20Mar-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321192132-CG-Mar-14.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2013-2014/CG%20Dec-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321199807-CG-Dec-13.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2013-2014/CG%20June-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321209934-CG-June-13.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2013-2014/CG%20Sep-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321216075-CG-Sep-13.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2012-2013/CG%20MAr-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321232504-CG-MAr-13.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2012-2013/CG%20Dec-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321238461-CG-Dec-12.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Corporate-Governance/2012-2013/CG%20Sep-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787321254432-CG-Sep-12.pdf",
        permanent: true,
      },
      /////////////////////////
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2018-2019/shareholding-pattern-31-03-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316383705-shareholding-pattern-31-03-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2019-2020/Shareholding%20Pattern%2030.06.19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316281849-Shareholding-Pattern-300619.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2019-2020/shareholding-pattern-300919.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316231748-shareholding-pattern-300919.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2019-2020/shareholding-pattern-311219.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316201042-shareholding-pattern-311219.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2019-2020/shareholding-pattern-31-03-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316184643-shareholding-pattern-31-03-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2020-2021/shareholding-pattern-30jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787316003669-shareholding-pattern-30jun20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2020-2021/shareholding-pattern-30sep20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787315999045-shareholding-pattern-30sep20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2020-2021/shareholding-pattern-31dec20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787315993130-shareholding-pattern-31dec20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2020-2021/shareholding-pattern-31mar21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787315977673-shareholding-pattern-31mar21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2021-2022/shareholding-pattern-30jun21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787315823416-shareholding-pattern-30jun21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2021-2022/shareholding-pattern-30sep21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787315819353-shareholding-pattern-30sep21.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/164523589-Intimation-of-Board-Meeting-to-be-held-on-9th-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021660373-164523589-Intimation-of-Board-Meeting-to-be-held-on-9th-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/862539618-Outcome-of-Board-Meeting-held-on-17th-May-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022376600-862539618-Outcome-of-Board-Meeting-held-on-17th-May-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/8612534587-Intimation-of-schedue-of-InvestorAnalyst-Meeting-19-May-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022311015-8612534587-Intimation-of-schedue-of-InvestorAnalyst-Meeting-19-May-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/612542859-Intimation-of-schedue-of-InvestorAnalyst-Meeting-20-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022253116-612542859-Intimation-of-schedue-of-InvestorAnalyst-Meeting-20-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/2564385212-Intimation-of-schedue-of-InvestorAnalyst-Meeting-21-June-%202023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022217348-2564385212-Intimation-of-schedue-of-InvestorAnalyst-Meeting-21-June--2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/6412589632578-Intimation-of-Schedule-of-InvestorAnalyst-Meeting-28-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022140907-6412589632578-Intimation-of-Schedule-of-InvestorAnalyst-Meeting-28-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/5123625987-Intimation-of-Schedule-of-InvestorAnalyst-Meeting-30-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022080343-5123625987-Intimation-of-Schedule-of-InvestorAnalyst-Meeting-30-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/294562312587-Intimation-of-Trading-Window-closure-1July-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783022024622-294562312587-Intimation-of-Trading-Window-closure-1July-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/61235487-Intimation-under-Reg-30-Credit-Ratings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021981477-61235487-Intimation-under-Reg-30-Credit-Ratings.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1271542589-Reg30-IEPF-NEWS-PAPER-ADVERTISEMENT.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021931888-1271542589-Reg30-IEPF-NEWS-PAPER-ADVERTISEMENT.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/53124589-Compliance-under-Regulaion-74\\(5\\)-11th-July-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021859446-53124589-Compliance-under-Regulaion-74%285%29-11th-July-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/246231258-Disclosure-under-Regulation-39\\(3\\)-21st-July-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021801340-246231258-Disclosure-under-Regulation-39%283%29-21st-July-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/185264523-Disclosure-under-Regulation-39\\(3\\)-29th-July-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021710538-185264523-Disclosure-under-Regulation-39%283%29-29th-July-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/14523587-Disclosure-under-Regulation-30-Credit-Rating.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021596830-14523587-Disclosure-under-Regulation-30-Credit-Rating.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/641232469-Outcome-of-Board-Meeting-9th-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021414350-641232469-Outcome-of-Board-Meeting-9th-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/152654857-Intimation-of-Schedule-of-Investor-Meet-11th-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021331750-152654857-Intimation-of-Schedule-of-Investor-Meet-11th-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/242135823-Press-Release-on-Q1-FY24-Financial-&-Operational-Performance.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021331750-152654857-Intimation-of-Schedule-of-Investor-Meet-11th-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1653254859-Disclosure-on-Newspaper-Publication-AGM-and-Book-Closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021158700-1653254859-Disclosure-on-Newspaper-Publication-AGM-and-Book-Closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1236598-Disclosure-on-Investor-Meet-11-August-2023-Transcript.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021123182-1236598-Disclosure-on-Investor-Meet-11-August-2023-Transcript.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/28654894-Disclosure-on-Investor-Meet-11-August-2023-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783021068860-28654894-Disclosure-on-Investor-Meet-11-August-2023-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/264523697-Disclosure-on-Investor-Meet-11-August-2023-Audio-Link.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788612238980-264523697-Disclosure-on-Investor-Meet-11-August-2023-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/245623589-Disclosure-on-Investor-Meet-1-Septmber-2023-Intimation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020960273-245623589-Disclosure-on-Investor-Meet-1-Septmber-2023-Intimation.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/265348598-Disclosure-on-Annual-Report-Submission-18-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020923168-265348598-Disclosure-on-Annual-Report-Submission-18-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/246532589-Disclosure-on-Investor-Meet-5-Septmber-2023-Intimation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788960536081-246532589-Disclosure-on-Investor-Meet-5-Septmber-2023-Intimation.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/348569857-Disclosure-under-Regulation-39\\(3\\)-11-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020798045-348569857-Disclosure-under-Regulation-39%283%29-11-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/2645897548-Disclosure-on-submission-of-BRSR-18-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020736720-2645897548-Disclosure-on-submission-of-BRSR-18-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/3521245789-Disclosure-on-Newspaper-Publication-Despatch-of-Annual-Report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020668807-3521245789-Disclosure-on-Newspaper-Publication-Despatch-of-Annual-Report.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1284623658-Intimation-of-Schedule-of-Investor-Meet-16-&-17-Oct-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787815169013-1284623658-Intimation-of-Schedule-of-Investor-Meet-16---17-Oct-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16235485-IntimationunderRegulation30Concallsigned.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788960393622-16235485-IntimationunderRegulation30Concallsigned.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19562358-Intimation-of-Investor-Meet-10-November-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020492070-19562358-Intimation-of-Investor-Meet-10-November-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/2761562358-Intimation-of-Investor-Meet-18-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020428481-2761562358-Intimation-of-Investor-Meet-18-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/25947348589-Intimation-under-Regulation-29-Intimation-of-BAC-Meeting-for-conversion-of-Warrants.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020379234-25947348589-Intimation-under-Regulation-29-Intimation-of-BAC-Meeting-for-conversion-of-Warrants.pdf",
        permanent: true,
      },
      {
        source: "/document/194585694-Intimation-under-Regulation-29-Intimation-of-Board-Meeting-on-8-February-2024-to-consider-proposal-for-Interim-Dividend.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020316124-194585694-Intimation-under-Regulation-29-Intimation-of-Board-Meeting-on-8-February-2024-to-consider-proposal-for-Interim-Dividend.pdf",
        permanent: true,
      },
      {
        source: "/document/1653485-Intimation-under-Regulation-30-Blast-Furnace-in-Khardah-back-in-operations.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020249681-1653485-Intimation-under-Regulation-30-Blast-Furnace-in-Khardah-back-in-operations.pdf",
        permanent: true,
      },
      {
        source: "/document/165396485-Intimation-of-Board-Meeting-to-be%20held-on-8-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020179308-165396485-Intimation-of-Board-Meeting-to-be-held-on-8-February-2024.pdf",
        permanent: true,
      },
      /////////////////////21-09-2026
      {
        source: "/document/165396485-Certificate-under-Regulation-74\\(5\\)-9-January-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020116288-165396485-Certificate-under-Regulation-74%285%29-9-January-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/165396485-Disclosure-on-Investor-Meet-10-November-2023-Transcipt.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020070413-165396485-Disclosure-on-Investor-Meet-10-November-2023-Transcipt.pdf",
        permanent: true,
      },
      {
        source: "/document/165396485-Disclosure-on-Investor-Meet-10-November-2023-Audio-Link.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783020023905-165396485-Disclosure-on-Investor-Meet-10-November-2023-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/document/19856985-Disclosure-under-Regulation-29\\(2\\)-of-SEBI-SAST.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019977914-19856985-Disclosure-under-Regulation-29%282%29-of-SEBI-SAST.pdf",
        permanent: true,
      },
      {
        source: "/document/288569851-Intimation-for-Closure-of-Trading-Window-27-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019943194-288569851-Intimation-for-Closure-of-Trading-Window-27-December-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/3388569852-Disclosure-on-Press-Release-on-Financial-Results-31-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019900157-3388569852-Disclosure-on-Press-Release-on-Financial-Results-31-December-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/438569853-Intimation-under-Regulation-39\\(3\\)-20-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019864350-438569853-Intimation-under-Regulation-39%283%29-20-December-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/538569854-Intimation-under-Regulation-39\\(3\\)-23-November-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019811199-538569854-Intimation-under-Regulation-39%283%29-23-November-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/638569855-Intimation-under-Regulation-39\\(3\\)-24-November-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019770602-638569855-Intimation-under-Regulation-39%283%29-24-November-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/738569856-Intimation-under-Regulation-39\\(3\\)-13-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019611760-938569858-Intimation-under-Regulation-39%283%29-9-December-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/838569857-Outcome-of-BAC-Meeting-for-allotment-of-Equity.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019669718-838569857-Outcome-of-BAC-Meeting-for-allotment-of-Equity.pdf",
        permanent: true,
      },
      {
        source: "/document/938569858-Intimation-under-Regulation-39\\(3\\)-9-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019611760-938569858-Intimation-under-Regulation-39%283%29-9-December-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/128569857-Intimation-under-Regulation-30-Repairs-in-Khardah-Unit.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019573365-128569857-Intimation-under-Regulation-30-Repairs-in-Khardah-Unit.pdf",
        permanent: true,
      },
      {
        source: "/document/228569856-Intimation-under-Regulation-30-NCLAT-Judgement-on-UVARCL-matter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019537461-228569856-Intimation-under-Regulation-30-NCLAT-Judgement-on-UVARCL-matter.pdf",
        permanent: true,
      },
      {
        source: "/document/328569855-Outcome-of-Board-Meeting-held-on-8-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019497904-328569855-Outcome-of-Board-Meeting-held-on-8-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/168569817-Intimation-under-Regulation-39\\(3\\)-13-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019438520-168569817-Intimation-under-Regulation-39%283%29-13-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/178569818-Intimation-under-Regulation-39\\(3\\)-18-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783019396845-178569818-Intimation-under-Regulation-39%283%29-18-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/188569819-Intimation-under-Regulation-39\\(3\\)-21-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782993284035-188569819-Intimation-under-Regulation-39%283%29-21-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/188569819-Intimation-under-Regulation-39\\(3\\)-23-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782993275267-188569819-Intimation-under-Regulation-39%283%29-23-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/198569820-Newspaper-Publication-for-completion-of-despatch-of-Postal-Ballot-Notice-15-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782993093438-198569820-Newspaper-Publication-for-completion-of-despatch-of-Postal-Ballot-Notice-15-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/208569821-Newspaper-Publication-for-completion-of-despatch-of-Postal-Ballot-Notice-15-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782993036310-208569821-Newspaper-Publication-for-completion-of-despatch-of-Postal-Ballot-Notice-15-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/218569822-Submission-of-Postal-Ballot-Notice-14-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782993007812-218569822-Submission-of-Postal-Ballot-Notice-14-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/228569823-Transcript%20of%20Investor%20Meet%2013%20February%202024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782992923620-228569823-Transcript-of-Investor-Meet-13-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/238569824-Closure-of-Trading-Window-27-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782992887433-238569824-Closure-of-Trading-Window-27-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/248569825-Audio-Link-for-Investor-Meet-13-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782992777265-248569825-Audio-Link-for-Investor-Meet-13-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/258569826-Intimation-of-Investor-Meet-13-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782992737299-258569826-Intimation-of-Investor-Meet-13-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/281569831-Presentation-for-Investor-Meet-13-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782992617580-281569831-Presentation-for-Investor-Meet-13-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/268569827-Intimation-under-Regulation-39\\(3\\)-2-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787649834680-268569827-Intimation-under-Regulation-39%283%29-2-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/278569828-Intimation-under-Regulation-39\\(3\\)-6-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782992460467-278569828-Intimation-under-Regulation-39%283%29-6-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Trading%20Window%20Closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062645560-Trading-Window-Closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%208th%20April,%202022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787824547792-Disclosure-under-Regulation-30-of-SEBI-LODR---8th-April-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002353625_Disclosure_under_Regulation_30_of_SEBl_LODR_9th_April_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062552712-160002353625_Disclosure_under_Regulation_30_of_SEBl_LODR_9th_April_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Corrigendum%20Newspaper%20Publications.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062503949-Corrigendum-Newspaper-Publications.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600002362544-Outcome-of-Board-Meeting-10th-May-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062422914-1600002362544-Outcome-of-Board-Meeting-10th-May-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600025352554-Intimation-of-Conference-Call-12-05-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062387570-1600025352554-Intimation-of-Conference-Call-12-05-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1622363533525-Disclosure-under-Regulation-30-of-SEBI-LODR-12th-May-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062350280-1622363533525-Disclosure-under-Regulation-30-of-SEBI-LODR-12th-May-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16002326646466-Intimation-under-Regulation-30-Concall-Audio-Link.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062318444-16002326646466-Intimation-under-Regulation-30-Concall-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Intimation-under-Reg-30-Concall-Transcript-17-May-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787232592759-Intimation-under-Reg-30-Concall-Transcript-17-May-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1856942563215-Secretarial-Compliance-Report-for-the-FY-2021-22-26th-May-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787232548882-1856942563215-Secretarial-Compliance-Report-for-the-FY-2021-22-26th-May-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600023536958-Disclosure-under-Regulation-30-of-SEBI-LODR-24th-June-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062174613-1600023536958-Disclosure-under-Regulation-30-of-SEBI-LODR-24th-June-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure-under-Regulation-30-of-SEBI-LODR-8th%20July-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062142804-Disclosure-under-Regulation-30-of-SEBI-LODR-8th-July-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1666620000025252_Disclosure_under_Regulation_30_of_SEBl_LODR_12th_July_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787232497435-1666620000025252_Disclosure_under_Regulation_30_of_SEBl_LODR_12th_July_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/568923-disclosure-under-Reg-30-of-SEBI-LODR-23rd-July-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062023142-568923-disclosure-under-Reg-30-of-SEBI-LODR-23rd-July-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19654783-Disclosure-under-Regulation-30-of-SEBI-LODR-4-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061988912-19654783-Disclosure-under-Regulation-30-of-SEBI-LODR-4-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1450057825-Disclosure-under-Regulation-30-of-SEBI-LODR-9-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061954265-1450057825-Disclosure-under-Regulation-30-of-SEBI-LODR-9-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1456957825-Intimation-of-Board-Meeting-to-be-held-on-12-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061909928-1456957825-Intimation-of-Board-Meeting-to-be-held-on-12-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/145005965825-Outcome-of-Board-Meeting-held-on-12-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061859847-145005965825-Outcome-of-Board-Meeting-held-on-12-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18564789-Intimation-of-Conference-Call-16-08-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061822077-18564789-Intimation-of-Conference-Call-16-08-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/63215472608-BRSR-16-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061775717-63215472608-BRSR-16-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/129456232608-Submission-of-Annual-Report-2021-22-17-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061718273-129456232608-Submission-of-Annual-Report-2021-22-17-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/2365142806-Intimation-under-Regulation-30-Concall-Transcript-20th-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061471636-2365142806-Intimation-under-Regulation-30-Concall-Transcript-20th-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/146252608-Diclsoure-under-Regulation-30-Submission-of-AGM-Notice-17th-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061617524-146252608-Diclsoure-under-Regulation-30-Submission-of-AGM-Notice-17th-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/135204782608-Disclosure-under-Regulation-30-Submission-of-Public-Notice-for-despatch-of-Annual-Report-19th-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061570113-135204782608-Disclosure-under-Regulation-30-Submission-of-Public-Notice-for-despatch-of-Annual-Report-19th-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/12397826508-Intimation-under-Regulation-39\\(3\\)-of-SEBI-LODR-19th-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783061511948-12397826508-Intimation-under-Regulation-39%283%29-of-SEBI-LODR-19th-August-2022.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/1863254548-Intimation-under-Regulation-30-Proceedings-of-AGM-16th-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060983565-1863254548-Intimation-under-Regulation-30-Proceedings-of-AGM-16th-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1632458952-Intimation-under-Regulation-30-Appointment-of-Auditors-etc-17th-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060916405-1632458952-Intimation-under-Regulation-30-Appointment-of-Auditors-etc-17th-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1234895685-Disclosure-of-Voting-Results-and-Scrutiniser's-Report-17th-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060872643-1234895685-Disclosure-of-Voting-Results-and-Scrutiniser's-Report-17th-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/125469357-Intimation-under-Regulation-39\\(3\\)-of-SEBI-LODR-27th-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060804411-125469357-Intimation-under-Regulation-39%283%29-of-SEBI-LODR-27th-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/6132482813-Intimation-of-Trading-Window-Closure-from-1st-October-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060748000-6132482813-Intimation-of-Trading-Window-Closure-from-1st-October-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/861257482-Compliance-of-Regulation-74\\(5\\)-of-SEBI-DP-Regulations-11th-October-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060690348-861257482-Compliance-of-Regulation-74%285%29-of-SEBI-DP-Regulations-11th-October-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/596541379-Intimation-under-Regulation-39\\(3\\)-of-SEBI-LODR-13th-October-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060655833-596541379-Intimation-under-Regulation-39%283%29-of-SEBI-LODR-13th-October-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/296431584-Intimation-under-Regulation-39\\(3\\)-of-SEBI-LODR-25th-October-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060623659-296431584-Intimation-under-Regulation-39%283%29-of-SEBI-LODR-25th-October-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/196478532-Intimation-under-Regulation-39-of-SEBI-LODR_31st-October-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060586825-196478532-Intimation-under-Regulation-39-of-SEBI-LODR_31st-October-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18245697-Intimation-under-Regulation-39-of-SEBI-LODR-2nd-November-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060546906-18245697-Intimation-under-Regulation-39-of-SEBI-LODR-2nd-November-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/189432697-Intimation-of-Conference-Call-11-11-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060511404-189432697-Intimation-of-Conference-Call-11-11-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/12365897-Outcome-of-Board-Meeting-held-on-11-November-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060471943-12365897-Outcome-of-Board-Meeting-held-on-11-November-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/124961247-Disclosure-under-Regulation-30-of-SEBI-LODR-14th%20November-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060424405-124961247-Disclosure-under-Regulation-30-of-SEBI-LODR-14th-November-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/2362458-Disclosure-under-Regulation-30-of-SEBI-LODR-15-NOVEMBER-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058342094-2362458-Disclosure-under-Regulation-30-of-SEBI-LODR-15-NOVEMBER-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/192548-Disclosure-under-Regulation-30-of-SEBI-LODR-23-NOVEMBER-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058301668-192548-Disclosure-under-Regulation-30-of-SEBI-LODR-23-NOVEMBER-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19632487-Disclosure-under-Regulation-30-of-SEBI-LODR-31-DECEMBER-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058266038-19632487-Disclosure-under-Regulation-30-of-SEBI-LODR-31-DECEMBER-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/163254-Disclosure-under-Regulation-30-of-SEBI-LODR-4-JANUARY-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058231510-163254-Disclosure-under-Regulation-30-of-SEBI-LODR-4-JANUARY-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1856325478-Disclosure-under-Regulation-39\\(3\\)-5th-January-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058181684-1856325478-Disclosure-under-Regulation-39%283%29-5th-January-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/156239857-Disclosure-under-Regulation-39\\(3\\)-13th-January-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058145858-156239857-Disclosure-under-Regulation-39%283%29-13th-January-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/15623485-Disclosure-under-Regulation-39\\(3\\)-4th-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058113168-15623485-Disclosure-under-Regulation-39%283%29-4th-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1973258-Intimation-of-Board-Meeting-to-be-held-on-14th-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058075755-1973258-Intimation-of-Board-Meeting-to-be-held-on-14th-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18562348-Outcome-of-Board-Meeting-held-on-14th-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058025244-18562348-Outcome-of-Board-Meeting-held-on-14th-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/184539658-Intimation-of-Conference-Call-17th-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783057984095-184539658-Intimation-of-Conference-Call-17th-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/VotingResultsAGM29816.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782672365794-VotingResultsAGM29816.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/splqtrlyresults30sept16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782672301097-splqtrlyresults30sept16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/STOCKEXCH%20LTR.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782672157315-STOCKEXCH-LTR.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/Investormeet.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782672082764-Investormeet.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/CreditRating.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671982213-CreditRating.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/CFOresign.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671854462-CFOresign.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/BookClosureIntimation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671720517-BookClosureIntimation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/AnalystMeetPresent.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671626442-AnalystMeetPresent.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/InvestormeetAug17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671565640-InvestormeetAug17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/Rating.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671449779-Rating.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/QIPBMNoticeClarification.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671396968-QIPBMNoticeClarification.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/NSEclarification.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671317717-NSEclarification.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/KartikeyaMisra.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671249091-KartikeyaMisra.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/AGMNoticeInt.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671135536-AGMNoticeInt.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/AppointmentofCompOfficer.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782671087129-AppointmentofCompOfficer.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/EGMScrutiniserreport.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670625638-EGMScrutiniserreport.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/Directorsappointment.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670546740-Directorsappointment.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/DirectorResig.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670391230-DirectorResig.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/DirectorResiBSreedhar.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670327265-DirectorResiBSreedhar.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/CompSecAppointment.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670183918-CompSecAppointment.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/bmoutcome.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670102520-bmoutcome.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/BMNoticeEGM.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782670052911-BMNoticeEGM.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/ResignationofCS.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669987314-ResignationofCS.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/BM_Outcome_June_2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669894732-BM_Outcome_June_2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-25sep-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669833696-stock-exchange-disclosures-25sep-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-27sep-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669752920-stock-exchange-disclosures-27sep-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-16aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669694944-stock-exchange-disclosures-16aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-06aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669582147-stock-exchange-disclosures-06aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-09aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669481575-stock-exchange-disclosures-09aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-10aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782669364332-stock-exchange-disclosures-10aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-20aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668904336-stock-exchange-disclosures-20aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-23aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668839210-stock-exchange-disclosures-23aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-27aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668737938-stock-exchange-disclosures-27aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-29aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668646144-stock-exchange-disclosures-29aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-31aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668552287-stock-exchange-disclosures-31aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-05oct-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668487267-stock-exchange-disclosures-05dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-09oct-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668406849-stock-exchange-disclosures-09oct-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-10oct-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668250272-stock-exchange-disclosures-10oct-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-15nov-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668158512-stock-exchange-disclosures-15nov-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-21nov-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782668028371-stock-exchange-disclosures-21nov-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-01dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782667865365-stock-exchange-disclosures-01dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-03dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782667795724-stock-exchange-disclosures-03dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-05dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782667713223-stock-exchange-disclosures-05dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-06dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782667649635-stock-exchange-disclosures-06dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-07dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666844731-stock-exchange-disclosures-07dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-31dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666779565-stock-exchange-disclosures-31dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/stock-exchange-disclosures-03jan-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666724675-stock-exchange-disclosures-03jan-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/intimation-31jan-2019b.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666663604-intimation-31jan-2019b.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/intimation-31jan-2019a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666614019-intimation-31jan-2019a.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/intimation-31jan-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666559103-intimation-31jan-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/board-meeting-31jan-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782666547358-board-meeting-31jan-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-08feb-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662864781-sed-08feb-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-08feb-2019a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662801669-sed-08feb-2019a.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-08feb-2019b.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662646829-sed-08feb-2019b.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-12feb-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662508813-sed-12feb-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-13feb-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662437268-sed-13feb-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-14feb-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662347859-sed-14feb-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-7mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662289487-sed-7mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-8mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662233519-sed-8mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-9mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782662115977-sed-9mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-12mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661986282-sed-12mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-12mar-2019a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661912809-sed-12mar-2019a.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-13mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661858123-sed-13mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-14mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661766835-sed-14mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-16mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661687819-sed-16mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-19mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661569938-sed-19mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-19mar-2019a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661483041-sed-19mar-2019a.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-27mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661490498-sed-27mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-28mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782661242573-sed-28mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-29mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788954416482-sed-29mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-30mar-2019-pit-murari.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568395846-sed-30mar-2019-pit-murari.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-30mar-2019-pit-gk.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568356132-sed-30mar-2019-pit-gk.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-30mar-2019-lodr.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568320785-sed-30mar-2019-lodr.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-31mar-2019-ictw.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568284710-sed-31mar-2019-ictw.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/board-meeting-8may-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568256158-board-meeting-8may-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-shares-28-06-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568200478-loss-shares-28-06-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/board-meeting-22jul-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568153963-board-meeting-22jul-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/agm-book-closure-05-08-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568113423-agm-book-closure-05-08-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-shares-05-08-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568077745-loss-shares-05-08-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-shares-08-08-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568039305-loss-shares-08-08-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-shares-09-08-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782568002727-loss-shares-09-08-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/agm-notice-10-08-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567962579-agm-notice-10-08-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/sed-24jul-2019-ictw.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567916798-sed-24jul-2019-ictw.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/intimation-of-closure-of-trading-window-28092019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567876128-intimation-of-closure-of-trading-window-28092019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-shares-05-12-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567835686-loss-shares-05-12-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/rpt-07-12-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567801132-rpt-07-12-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/resignation-of-director-71219.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567761900-resignation-of-director-71219.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/ferro-alloy-17012020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567719004-intimation-of-closure-of-trading-window-30122019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/intimation-of-closure-of-trading-window-30122019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567679077-ferro-alloy-17012020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-share-18-01-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567642786-loss-share-18-01-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/board-meeting-03-02-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567608760-board-meeting-03-02-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/shutdown-25032020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567569067-shutdown-25032020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/intimation-of-closure-of-trading-window-31032020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567530692-intimation-of-closure-of-trading-window-31032020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/reg745-23042020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567483134-reg745-23042020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/reg73-23042020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567453610-reg73-23042020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/reg409-30042020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567412507-reg409-30042020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/reconciliation-30042020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567349402-notice-23may20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/notice-23may20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567349402-notice-23may20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/notice-01jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567323493-notice-01jun20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/meet-03jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567292476-meet-03jun20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/lodr-03jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567266239-lodr-03jun20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/tradingWindowJune20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567240480-tradingWindowJune20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/agm-paper-notice-jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567214411-agm-paper-notice-jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/id-resignation-10-09-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567183532-id-resignation-10-09-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/OCBM30092020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567155711-OCBM30092020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/trading-window-merger30-09-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567125098-trading-window-merger30-09-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/rating-withdrawal-11-09-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567098244-rating-withdrawal-11-09-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/loss-of-share-cert-1-Oct-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567065740-loss-of-share-cert-1-Oct-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/bookClosureRecordDate.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567032949-bookClosureRecordDate.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/notice-20jan21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782567007711-notice-20jan21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/agm-noticeInt-jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782566954117-agm-noticeInt-jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/book-closure-cutoffdate-jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782566924461-book-closure-cutoffdate-jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/notice-24jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782566885182-notice-24jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/shutdownInt-july21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782566855837-shutdownInt-july21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/tcm-proceedings-july21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782566827592-tcm-proceedings-july21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/shareholder-exposure/bm-notice-sep21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787327650897-bm-notice-sep21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/qip/Project%20Atlantis_PD_26122017%20v3%20-%20With%20Disclaimer.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787327548971-Project-Atlantis_PD_26122017-v3---With-Disclaimer.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/press%20release%2031%20dec%2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787326313050-press-release-31-dec-15.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/Press%20Release.2.08.16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787326265663-Press-Release-2_08_16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/Press%20Release.12.5.17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787326158998-Press-Release12_5_17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressrelease.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325969512-pressrelease.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/PressReleaseJun18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325942356-PressReleaseJun18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseSep18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788529116971-PressReleaseNov21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseJan19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325672586-pressReleaseJan19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseMay19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325644962-pressReleaseMay19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseJul19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325441732-pressReleaseJul19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseFeb20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325410526-pressReleaseFeb20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseMar20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325374604-pressReleaseMar20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseJul20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325329132-pressReleaseJul20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/pressReleaseSep20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325284624-pressReleaseSep20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/PressReleaseDec20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325261291-PressReleaseDec20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/PressReleaseMar21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325209235-PressReleaseMar21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/PressReleaseJun21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787325146207-PressReleaseJun21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/press-releases/PressReleaseNov21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788529116971-PressReleaseNov21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/board-meeting-29apr19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324506928-board-meeting-29apr19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-9may19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324476570-publication-9may19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/board-meeting-12jul19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324455032-board-meeting-12jul19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-23jul19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324434178-publication-23jul19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-10aug19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324265138-publication-10aug19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-22oct19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324221073-publication-22oct19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-1nov19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324198394-publication-1nov19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-2jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324162514-publication-2jun20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-23jan20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324104880-publication-23jan20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-4feb20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324074280-publication-4feb20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-4jul20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324033345-publication-4jul20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-20jul20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324003776-publication-20jul20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-27oct20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323984280-publication-27oct20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-21jan21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323881242-publication-21jan21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-24apr21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323859213-publication-24apr21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-27jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323829997-publication-27jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/newspaper-publication/publication-26oct21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323800273-publication-26oct21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/spl-Investor%20Presentation-March1.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323674463-spl-Investor-Presentation-March1.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/SEpresnt.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323650206-SEpresnt.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/Analystspresentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323628608-Analystspresentation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/ConcallPresentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323605158-ConcallPresentation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/Investor%20presnt.17.5.17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323583826-Investor-presnt-17_5_17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/investor-presentation-q4-2017-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323462941-investor-presentation-q4-2017-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/PhillipCap-SrikalahasthiPipes-May16-2018%20-Final.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323462941-investor-presentation-q4-2017-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/investor-presenttaion-q1-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323404406-investor-presenttaion-q1-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/presenttaion-q4-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323385400-presenttaion-q4-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/investor-presentation/presenttaion-q3-21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323367866-presenttaion-q3-21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/credit-rating/credit-ratings2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323304800-credit-ratings2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/credit-rating/credit-ratings2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323257437-credit-ratings2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/shareholder-information/credit-rating/credit-rating-feb20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323235604-credit-rating-feb20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/valuation-report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323323899-valuation-report.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/spl-fairness-opinion.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323318763-spl-fairness-opinion.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/regulation37-18nov21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323314575-regulation37-18nov21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/nse-observation-letter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323309860-nse-observation-letter.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/lodr24nov20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323305084-lodr24nov20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/draft-scheme.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323300200-draft-scheme.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/documents-to-bse-27nov20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323293951-documents-to-bse-27nov20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/compliance-report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323278458-compliance-report.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/complaint-report-nse-bse-18dec20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323273655-complaint-report-nse-bse-18dec20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/complaint-report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323266789-complaint-report.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/bse-observation-letter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323257912-bse-observation-letter.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/auditor-certificate.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323241120-auditor-certificate.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/regulation37/audit-committee-report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323230060-audit-committee-report.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/NCTL-Meetings/notice-unsecured-creditors-14may21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323004871-notice-unsecured-creditors-14may21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/NCTL-Meetings/notice-shareholders-14may21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787322990944-notice-shareholders-14may21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/NCTL-Meetings/notice-secured-creditors-14may21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787322860002-notice-secured-creditors-14may21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/NCTL-Meetings/nclt-cruc-25jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787322802426-nclt-cruc-25jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/NCTL-Meetings/nclt-crsc-25jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787322789247-nclt-crsc-25jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/amalgamation/NCTL-Meetings/nclt-crs-25jul21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787322781711-nclt-crs-25jul21.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Voting-Results/2020-2021/VotingResults-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323682196-VotingResults-2020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Voting-Results/2019-2020/VotingResults-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323677115-VotingResults-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Voting-Results/2018-2019/VotingResults-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323669113-VotingResults-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Voting-Results/2017-2018/VotingResults.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323659620-VotingResults.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/SCRUTINIZERS-REPORT/2019-2020/ScrutinizerReport-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323650934-ScrutinizerReport-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/SCRUTINIZERS-REPORT/2018-2019/ScrutinizerReport-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323644606-ScrutinizerReport-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/SCRUTINIZERS-REPORT/2017-2018/ScrutinizerReport.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323640039-ScrutinizerReport.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/notices/2021-2022/AGMNotice-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323629133-AGMNotice-2021.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/notices/2020-2021/AGMNotice-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323627500-AGMNotice-2020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/notices/2019-2020/AGMNotice-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323618626-AGMNotice-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/notices/2018-2019/AGMNotice-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323612354-AGMNotice-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/notices/2017-2018/AGMNotice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323607981-AGMNotice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Chairmans-Speech/2020-2021/chairman-speech-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323592925-chairman-speech-2020.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Chairmans-Speech/2019-2020/chairman-speech-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323581954-chairman-speech-2019.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Chairmans-Speech/2018-2019/chairman-speech-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323577105-chairman-speech-2018.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/AGM-EGM/Chairmans-Speech/2017-2018/Chairman%20Speech%20-%20AGM-Shareholders-29%2008%2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323570829-Chairman-Speech---AGM-Shareholders-29-08-16.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/SPL_Policy%20for%20Preservation%20of%20documents.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324414683-SPL_Policy-for-Preservation-of-documents.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/Nomination%20and%20Remuneration%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324395537-Nomination-and-Remuneration-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/related-party-transaction-policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324392123-related-party-transaction-policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/SPL_Policy-for-material-disclosures.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324369217-SPL_Policy-for-material-disclosures.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/familiarisation-policy-for-directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324364170-familiarisation-policy-for-directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/Annexure%20-%205%20-%20Energy%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324357012-Annexure---5---Energy-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/Annexure%20-%203%20-%20EMS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324128771-Annexure---3---EMS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/Annexure%20-%202%20-%20QMS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787324029265-Annexure---2---QMS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/criteria-ned.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323989588-criteria-ned.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/policies/fair-disclosure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787323982261-fair-disclosure.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/code-of-conduct/Code%20of%20Directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314769622-Code-of-Directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/commiitee/Com_of_Committees.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314761841-Com_of_Committees.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/directors-resignation/directors-resignation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314754159-directors-resignation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/familiarization-programme/familiarization-directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314747067-familiarization-directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/investors-contact/Investors%20details.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314739367-Investors-details.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMintimation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314478125-BMintimation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/appointment-letter/Independent%20Director%20Appointment.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314776276-Independent-Director-Appointment.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BM%20Notice.%20Stock%20Exchange.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314475842-BM-Notice.-Stock-Exchange.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/SENotice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314469012-SENotice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/NSEBMNotice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314461752-NSEBMNotice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BSE.BM%20Notice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314454978-BSE.BM-Notice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNoticeSE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314447172-BMNoticeSE.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNoticetoSE%20Jun_17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314439398-BMNoticetoSE-Jun_17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNoticeSE%20Dec_17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314433475-BMNoticeSE-Dec_17.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice29417.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314425200-BMNotice29417.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-jul-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314396948-BMNotice-jul-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-oct-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314390305-BMNotice-oct-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-jan-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314382111-BMNotice-jan-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-apr-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314364040-BMNotice-apr-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-jul-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314350715-BMNotice-jul-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-oct-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314341337-BMNotice-oct-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-jan-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314333063-BMNotice-jan-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/notices/BMNotice-may-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314325378-BMNotice-may-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/Whistle%20Blower%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314061442-Whistle-Blower-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/SPL_Policy-for-material-disclosures.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314054213-SPL_Policy-for-material-disclosures.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/SPL_Policy%20for%20Preservation%20of%20documents.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314047447-SPL_Policy-for-Preservation-of-documents.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/related-party-transaction-policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314040762-related-party-transaction-policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/Nomination%20and%20Remuneration%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314034274-Nomination-and-Remuneration-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/familiarisation-policy-for-directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314027865-familiarisation-policy-for-directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/fair-disclosure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314013783-fair-disclosure.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/CSR%20Policy.SPL.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788522460775-CSR-Policy-SPL.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/criteria-ned.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313994767-criteria-ned.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/Annexure%20-%205%20-%20Energy%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313986723-Annexure---5---Energy-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/Annexure%20-%204%20-%20OHS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313968043-Annexure---4---OHS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/Annexure%20-%203%20-%20EMS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313959002-Annexure---3---EMS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/governance/policies/Annexure%20-%202%20-%20QMS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313930036-Annexure---2---QMS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/code-of-conduct/Code%20of%20Directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313026943-Code-of-Directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/directors-resignation/directors-resignation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312938316-directors-resignation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/familiarization-programme/familiarization-directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312896745-familiarization-directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/investors-contact/Investors%20details.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312877336-Investors-details.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BSE.BM%20Notice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788521544828-BSE.BM-Notice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/SENotice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312493824-SENotice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/NSEBMNotice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788521573630-NSEBMNotice.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNoticeSE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788521499453-BMNoticeSE.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice29417.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787311033516-BMNotice29417.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-jul-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310991601-BMNotice-jul-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-oct-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310949543-BMNotice-oct-18.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-jan-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310942693-BMNotice-jan-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-apr-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310934366-BMNotice-apr-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-jul-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310918037-BMNotice-jul-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-oct-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310911216-BMNotice-oct-19.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-jan-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310901582-BMNotice-jan-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMNotice-may-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310892331-BMNotice-may-20.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BMintimation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310880816-BMintimation.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/notices/BM%20Notice.%20Stock%20Exchange.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310871973-BM-Notice.-Stock-Excha",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/Whistle%20Blower%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310465446-Whistle-Blower-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/SPL_Policy-for-material-disclosures.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310457828-SPL_Policy-for-material-disclosures.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/SPL_Policy%20for%20Preservation%20of%20documents.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310447716-SPL_Policy-for-Preservation-of-documents.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/related-party-transaction-policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310439641-related-party-transaction-policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/Nomination%20and%20Remuneration%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310431355-Nomination-and-Remuneration-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/familiarisation-policy-for-directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310425956-familiarisation-policy-for-directors.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/fair-disclosure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310420038-fair-disclosure.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/CSR%20Policy.SPL.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788516918234-CSR-Policy-SPL.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/criteria-ned.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310405982-criteria-ned.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/Annexure%20-%205%20-%20Energy%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310394839-Annexure---5---Energy-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/Annexure%20-%204%20-%20OHS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310394839-Annexure---5---Energy-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/Annexure%20-%203%20-%20EMS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310355704-Annexure---3---EMS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/iepfTransfer/policies/Annexure%20-%202%20-%20QMS%20Policy.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310152828-Annexure---2---QMS-Policy.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2023\\(9\\)%20of%20SEBI%20LODR%2031st%20March,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787815704535-Disclosure-under-Regulation-23%289%29-of-SEBI-LODR-31st-March-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1621000224_Notice%20of%20Board%20Meeting%20to%20be%20held%20on%2020th%20May,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787818675321-1621000224_Notice-of-Board-Meeting-to-be-held-on-20th-May-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2014th%20May,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787818816444-Disclosure-under-Regulation-30-of-SEBI-LODR---14th-May-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Outcome%20of%20Board%20Meeting%20-%2020th%20May,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787819255525-Outcome-of-Board-Meeting---20th-May-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2015th%20June,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788503640852-Disclosure-under-Regulation-30-of-SEBI-LODR---15th-June-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Intimation%20for%20Closure%20of%20Trading%20Window%20from%20-%201st%20July,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788503607210-Intimation-for-Closure-of-Trading-Window-from---1st-July-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%205th%20August,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787822806582-Disclosure-under-Regulation-30-of-SEBI-LODR---5th-August-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice%20of%20Board%20Meeting%20to%20be%20held%20on%2013th%20August,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788503530802-Notice-of-Board-Meeting-to-be-held-on-13th-August-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2010th%20August,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788503500239-Disclosure-under-Regulation-30-of-SEBI-LODR---10th-August-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2011th%20August,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788503478816-Disclosure-under-Regulation-30-of-SEBI-LODR---11th-August-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2012th%20August,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788502754275-Disclosure-under-Regulation-30-of-SEBI-LODR---12th-August-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Outcome%20of%20Board%20Meeting%20-%2013th%20August,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788502670475-Outcome-of-Board-Meeting---13th-August-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%203rd%20September,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788502584324-Disclosure-under-Regulation-30-of-SEBI-LODR---3rd-September-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%206th%20September,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787822903812-Disclosure-under-Regulation-30-of-SEBI-LODR---6th-September-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2010th%20September,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787822942178-Disclosure-under-Regulation-30-of-SEBI-LODR---10th-September-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2011th%20September,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823004146-Disclosure-under-Regulation-30-of-SEBI-LODR---11th-September-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2013th%20September,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823058595-Disclosure-under-Regulation-30-of-SEBI-LODR---13th-September-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Intimation%20for%20Closure%20of%20Trading%20Window%20from%20-%201st%20October,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823177039-Disclosure-under-Regulation-30-of-SEBI-LODR---06th-October-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2028th%20October,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823222988-Disclosure-under-Regulation-30-of-SEBI-LODR---28th-October-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice%20of%20Board%20Meeting%20to%20be%20held%20on%2012th%20November,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823292389-Notice-of-Board-Meeting-to-be-held-on-12th-November-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Outcome_of_Board_Meeting_12th_November_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783062941374-Outcome_of_Board_Meeting_12th_November_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2023\\(9\\)%20of%20SEBI%20LODR%20-%207th%20December,2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823349922-Disclosure-under-Regulation-23%289%29-of-SEBI-LODR---7th-December-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030\\(1\\)%20read%20with%20Regulation%2030\\(7\\)%20of%20SEBI%20LODR%20-%2010th%20December,2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823414883-Disclosure-under-Regulation-30%281%29-read-with-Regulation-30%287%29-of-SEBI-LODR---10th-December-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600002536125_Disclosure_under_Regulation_30_of_SEBI_LODR_27th_December_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059247254-1600002536125_Disclosure_under_Regulation_30_of_SEBI_LODR_27th_December_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16000032502085_Intimation_for_Closure_of_Trading_Window%20from_1st%20January_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059208816-16000032502085_Intimation_for_Closure_of_Trading_Window-from_1st-January_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160235825446_Disclosure_under_Regulation_30_of_SEBI_LODR_3rd_January_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059173900-160235825446_Disclosure_under_Regulation_30_of_SEBI_LODR_3rd_January_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600025362549565_Disclosure_under_Regulation_30_of_%20SEBI_LODR_10th_January_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059132291-1600025362549565_Disclosure_under_Regulation_30_of_-SEBI_LODR_10th_January_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160382563554555_Disclosure_under_Regulation_30_of_SEBI_LODR_11th_January_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059094332-160382563554555_Disclosure_under_Regulation_30_of_SEBI_LODR_11th_January_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16002536252412_Disclosure_under_Regulation_30_of_SEBI_LODR_20th_January_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788960921928-16002536252412_Disclosure_under_Regulation_30_of_SEBI_LODR_20th_January_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1620385502154-Notice-of-Board-Meeting-to-be-held-on-14th-February-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058928981-1620385502154-Notice-of-Board-Meeting-to-be-held-on-14th-February-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002536125481_Disclosure_under_Regulation_30_of_SEBI_LODR_15th_February_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058843054-160002536125481_Disclosure_under_Regulation_30_of_SEBI_LODR_15th_February_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16203522585236_Disclosure_under_Regulation_30_of_SEBI_LODR_14th_February_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058913378-16203522585236_Disclosure_under_Regulation_30_of_SEBI_LODR_14th_February_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160025236354225_Intimation_of_Conference_Call_18_02_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058829295-160025236354225_Intimation_of_Conference_Call_18_02_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002356955_Outcome_of_Conference_Call_18th_February_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783058706801-160002356955_Outcome_of_Conference_Call_18th_February_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure-under-Regulation-30-of-SEBI-LODR-18th-August-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059992189-Disclosure-under-Regulation-30-of-SEBI-LODR-18th-August-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure-under-Regulation-30-of-SEBI%20LODR-20th-August-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059956769-Disclosure-under-Regulation-30-of-SEBI-LODR-20th-August-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-08sep20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059889417-lodr-08sep20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure_under_Regulation_30_of_SEBI_LODR_15th_September_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059800570-Disclosure_under_Regulation_30_of_SEBI_LODR_15th_September_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure_under_Regulation_30_of_SEBI_LODR_16th_September_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787233806235-Disclosure_under_Regulation_30_of_SEBI_LODR_16th_September_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Intimation_for_Closure_of_Trading_Window_from_30th_September_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059733024-Intimation_for_Closure_of_Trading_Window_from_30th_September_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure_under_Regulation_30_of_SEBI%20LODR_5th_October_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059701911-Disclosure_under_Regulation_30_of_SEBI-LODR_5th_October_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice_of_Board_Meeting_to_be_held_on_12th_November_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059648324-Notice_of_Board_Meeting_to_be_held_on_12th_November_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-05-jun-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059548457-lodr-05-jun-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/OutcomeofBoardMeeting12thNovember2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783059614292-OutcomeofBoardMeeting12thNovember2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-06-jun-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788441063129-lodr-06-jun-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosures_under_Regulations_30_of_SEBI_LODR_2nd_December_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788441068906-Disclosures_under_Regulations_30_of_SEBI_LODR_2nd_December_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-08-jun-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064773854-lodr-08-jun-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure_under_Regulation_23\\(9\\)_of_SEBI_LODR_30th_September_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064806748-Disclosure_under_Regulation_23%289%29_of_SEBI_LODR_30th_September_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/IntimationforClosureofTradingWindowfrom1stJanuary2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064726610-IntimationforClosureofTradingWindowfrom1stJanuary2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-15-jun-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064681839-lodr-15-jun-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice_of_Board_Meeting_to_be_held_on_12th_February_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064595699-Notice_of_Board_Meeting_to_be_held_on_12th_February_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/intimation-29-jun-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064531676-intimation-29-jun-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Outcome_of_Board_Meeting-12th_February_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064482843-Outcome_of_Board_Meeting-12th_February_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-04-aug-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064375896-lodr-04-aug-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Disclosure_under_Regulation_30_of_SEBI_LODR_26th_February_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064341484-Disclosure_under_Regulation_30_of_SEBI_LODR_26th_February_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-13-aug-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783064301845-lodr-13-aug-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Intimation-for-Closure-of-Trading-Window-from-1st-April-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788440270157-Intimation-for-Closure-of-Trading-Window-from-1st-April-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/lodr-16-aug-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783060025004-lodr-16-aug-2020.pdf",
        permanent: true,
      },
      {
        source: "/document/3164832-Disclosure-of-Postal-Ballot-Scrutinisers-Report-15-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018481111-3164832-Disclosure-of-Postal-Ballot-Scrutinisers-Report-15-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/1965823-Voting-Results-Postal-Ballot-16-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018427608-1965823-Voting-Results-Postal-Ballot-16-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/13625485-Intimation-under-Regulation-39\\(3\\)-18-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018380219-13625485-Intimation-under-Regulation-39%283%29-18-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/12734524-Compliance-Certificate-under-Regulation-7\\(3\\)-24-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018333018-12734524-Compliance-Certificate-under-Regulation-7%283%29-24-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/162345748-Intimation-under-Regulation-39\\(3\\)-25-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018290764-162345748-Intimation-under-Regulation-39%283%29-25-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/143625874-Disclosure-of-Large-Corporate-Bodies-26-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018232822-143625874-Disclosure-of-Large-Corporate-Bodies-26-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/15243685-Intimation-under-Regulation-39\\(3\\)-27-April-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018189605-15243685-Intimation-under-Regulation-39%283%29-27-April-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/192736584-Intimation-of-Concall-8-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018138786-192736584-Intimation-of-Concall-8-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/26452847-Investor-Presentation-of-Concall-13-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018089965-26452847-Investor-Presentation-of-Concall-13-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/13625485-Outcome-of-Board-Meeting-13-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783018066399-13625485-Outcome-of-Board-Meeting-13-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/12625487-Concall-held-on-13-May-2024-Audio-Link-14-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017976053-12625487-Concall-held-on-13-May-2024-Audio-Link-14-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/32625481-Concall-held-on-13-May-2024-Transcript-20-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017924953-32625481-Concall-held-on-13-May-2024-Transcript-20-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/38625486-Annual-Investor-Conference-to-be-held-on-29-May-2024-Disclosure-dated-23-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017870073-38625486-Annual-Investor-Conference-to-be-held-on-29-May-2024-Disclosure-dated-23-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/38625486-Annual-Secretarial-Compliance-Report-30-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017809598-38625486-Annual-Secretarial-Compliance-Report-30-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/27625461-Intimation-under-Regulation-39\\(3\\)-31-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017721825-27625461-Intimation-under-Regulation-39%283%29-31-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/27625461-Intimation-under-Regulation-39\\(3\\)-7-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017636650-27625461-Intimation-under-Regulation-39%283%29-7-June-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/27625461-Intimation-for-Board-Meeting-6-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017547512-27625461-Intimation-for-Board-Meeting-6-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/27625461-Intimation-under-Regulation-30-Signing-of-Term-Sheet-13-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017459881-27625461-Intimation-under-Regulation-30-Signing-of-Term-Sheet-13-June-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/27625461-Intimation-under-Regulation-39\\(3\\)-26-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017186675-27625461-Intimation-under-Regulation-39%283%29-26-June-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/27625461-Closure-of-Trading-Window-27-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783017142962-27625461-Closure-of-Trading-Window-27-June-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-for-Board-Meeting-6May,2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787825689318-Intimation-for-Board-Meeting-6May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/183564849-Submission-of-Postal-Ballot-Notice-10-July-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783016995477-183564849-Submission-of-Postal-Ballot-Notice-10-July-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/1739364-Public-%20Notice-for-despatch-of-Postal-Ballot-Notice-11-July-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783016946280-1739364-Public--Notice-for-despatch-of-Postal-Ballot-Notice-11-July-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/39487652-Certificate-under-Regulation-74\\(5\\)-12-July-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782970196673-39487652-Certificate-under-Regulation-74%285%29-12-July-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/62894173-Board-Meeting-Intimation-24-July-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782970141056-62894173-Board-Meeting-Intimation-24-July-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/16325485-Intimation-of-Concall-29July-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782970081040-16325485-Intimation-of-Concall-29July-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/23254851-Board-Meeting-Outcome-31-July-%202024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782970029350-23254851-Board-Meeting-Outcome-31-July--2024.pdf",
        permanent: true,
      },
      {
        source: "/document/52548512-Press-Release-Q1-FY25-31072024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969962783-52548512-Press-Release-Q1-FY25-31072024.pdf",
        permanent: true,
      },
      {
        source: "/document/52548512-Investor-Presentation-of-Concall-1-August-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969901254-52548512-Investor-Presentation-of-Concall-1-August-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/52548512-Submission-of-Annual-Report-2023-24-1-August-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969830150-52548512-Submission-of-Annual-Report-2023-24-1-August-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/52548512-Submission-of-BRSR-2023-24-August-1-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969767964-52548512-Submission-of-BRSR-2023-24-August-1-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/52548512-Audio-Link-of-Concall-2-August-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969700428-52548512-Audio-Link-of-Concall-2-August-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/52548512-Newspaper-Publication-Despatch-of-Annual-Report-2-August-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719372618-52548512-Newspaper-Publication-Despatch-of-Annual-Report-2-August-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/36548516-Concall-held-on-1-August-2024-Transcript.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969582118-36548516-Concall-held-on-1-August-2024-Transcript.pdf",
        permanent: true,
      },
      {
        source: "/document/36548516-Reg44VotingResult13082024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969553123-36548516-Reg44VotingResult13082024.pdf",
        permanent: true,
      },
      {
        source: "/document/365485156-IntimationofDeclarationofresultsVRandSR.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969481428-365485156-IntimationofDeclarationofresultsVRandSR.pdf",
        permanent: true,
      },
      {
        source: "/document/1942867295-IntimationunderReg30IEPF22082024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969430306-1942867295-IntimationunderReg30IEPF22082024.pdf",
        permanent: true,
      },
      {
        source: "/document/1648579-AGM-Proceedings-23-08-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969375848-1648579-AGM-Proceedings-23-08-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/2848524-AGM-Outcome-23-08-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969305045-2848524-AGM-Outcome-23-08-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/2848524-AGM-Voting-Results-24-08-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969254493-2848524-AGM-Voting-Results-24-08-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/28465241-Intimation-under-Reg-30-Credit-Rating-03-09-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969185220-28465241-Intimation-under-Reg-30-Credit-Rating-03-09-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/15846526-Intimation-under-Regulation-30-Trading-Approval-05-09-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788432315250-15846526-Intimation-under-Regulation-30-Trading-Approval-05-09-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/138249567-Intimation-of-Investors-Meett-to-be-held-on-23-09-24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782969051355-138249567-Intimation-of-Investors-Meett-to-be-held-on-23-09-24.pdf",
        permanent: true,
      },
      {
        source: "/document/2824955-Intimation-under-Regulation39\\(3\\)-19-September-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968952579-2824955-Intimation-under-Regulation39%283%29-19-September-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/1582492-Notice-of-Trading-window-closure-25-09-24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968892698-1582492-Notice-of-Trading-window-closure-25-09-24.pdf",
        permanent: true,
      },
      {
        source: "/document/21582431-Intimation-under-Regulation-39\\(3\\)-25-September-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968837948-21582431-Intimation-under-Regulation-39%283%29-25-September-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/1582429-Disclosure-under-Regulation-30-7-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968782001-1582429-Disclosure-under-Regulation-30-7-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/26824298-Intimation-under-Regulation39\\(3\\)-21-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968729096-26824298-Intimation-under-Regulation39%283%29-21-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-for-Board-Meeting-23October,2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787638707994-26824298-Intimation-under-Regulation39%283%29-21-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/18242982-Outcome-of-Board-Meeting-30-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968626716-18242982-Outcome-of-Board-Meeting-30-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/624298285-Press-Release-on-Financial-Results-30-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968561200-624298285-Press-Release-on-Financial-Results-30-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/524298282-Presentation-on-Investos-Concall-30-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968520167-524298282-Presentation-on-Investos-Concall-30-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/14298256-Intimation-under-Regulation-30-October-30-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968456275-14298256-Intimation-under-Regulation-30-October-30-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/21429827-Transcript-of-Investors-Concall-held-on-30-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968396542-21429827-Transcript-of-Investors-Concall-held-on-30-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/61429848-Punganur-Plant-Commercial-Production-28112024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968343797-61429848-Punganur-Plant-Commercial-Production-28112024.pdf",
        permanent: true,
      },
      {
        source: "/document/61429848-Interaction-in-Singapore-10-11%20Dec-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968256536-61429848-Interaction-in-Singapore-10-11-Dec-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/61429848-Outcome-of-Board-Meeting-12-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968208708-61429848-Outcome-of-Board-Meeting-12-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/5622481-Trading-Window-Closure-26-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968176909-5622481-Trading-Window-Closure-26-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/28648164-Shutdown-Intimation-26-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968088801-28648164-Shutdown-Intimation-26-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/17645864-Submission-of-Postal-Ballot-Notice-December-26-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782968033188-17645864-Submission-of-Postal-Ballot-Notice-December-26-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/26458614-Newspaper-Publication-for-deapatch-of-Postal-Ballot-Notice-27-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967993511-26458614-Newspaper-Publication-for-deapatch-of-Postal-Ballot-Notice-27-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/4671968-Despatch-of-Postal-Ballot-Notice-11-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967760376-4671968-Despatch-of-Postal-Ballot-Notice-11-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/58719628-Newspaper-Publication-for-Despatch-of-Postal-Ballot-Notice-13-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967664007-58719628-Newspaper-Publication-for-Despatch-of-Postal-Ballot-Notice-13-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/16485257-Notice-of-Board-Meeting-to-be-held-on-31-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967606239-16485257-Notice-of-Board-Meeting-to-be-held-on-31-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/2848523-Invite-for-Concall-to-be-held-on-31-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967559540-2848523-Invite-for-Concall-to-be-held-on-31-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/1648523-Intimation-of-Change-in-Credit-Rating-28-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967513375-1648523-Intimation-of-Change-in-Credit-Rating-28-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/56485213-Postal-Ballot-dated-30-October-2024-Voting-Results.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967460432-56485213-Postal-Ballot-dated-30-October-2024-Voting-Results.pdf",
        permanent: true,
      },
      {
        source: "/document/6285137-Press-Release-on-Financial-Results-31-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967386755-6285137-Press-Release-on-Financial-Results-31-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/485213-Outcome-of-Board-Meeting-31-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967341951-485213-Outcome-of-Board-Meeting-31-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/19285138-Concall-31-January-2025-Audio-Link.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967289814-19285138-Concall-31-January-2025-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/document/163253-Voting-Result-of-Postal-Ballot-held-on-10-February-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782967168558-163253-Voting-Result-of-Postal-Ballot-held-on-10-February-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/163528-Disclosure-of-SEBI-Settlement-Order-21-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782964442948-163528-Disclosure-of-SEBI-Settlement-Order-21-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/79654321-Closure-of-Trading-Window-27032025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782964182667-79654321-Closure-of-Trading-Window-27032025.pdf",
        permanent: true,
      },
      {
        source: "/document/Certificate-under-Regulation-74\\(5\\)-12April-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963737739-Certificate-under-Regulation-74%285%29-12April-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Intitial-Disclosure-for-Large-Corporate-entity-28April-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963682316-Intitial-Disclosure-for-Large-Corporate-entity-28April-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Board-Meeting-Intimation-2May-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963635135-Board-Meeting-Intimation-2May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-for-Conference-Call-6-May-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963582235-Intimation-for-Conference-Call-6-May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Outcome-Of-Board-Meeting-10th-May-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963529524-Outcome-Of-Board-Meeting-10th-May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Newspaper-Publication-Financial-Result-Q4-2024-25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963465583-Newspaper-Publication-Financial-Result-Q4-2024-25.pdf",
        permanent: true,
      },
      {
        source: "/document/Press-Release-on-Financial-Results-31-March-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963399977-Press-Release-on-Financial-Results-31-March-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Regulation-30-of-SEBI-LODR-16-May-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963350285-Disclosure-under-Regulation-30-of-SEBI-LODR-16-May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Regulation_30_Intimation_ECL_.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782963227722-Regulation_30_Intimation_ECL_.pdf",
        permanent: true,
      },
      {
        source: "/document/Outcome-Of-Board-Meeting-28th-May,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788429672025-Outcome-Of-Board-Meeting-28th-May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Execution-of-Share-Purchase-Agreement-with-T.I.S-Services-29May,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787826865795-Execution-of-Share-Purchase-Agreement-with-T.I.S-Services-29May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Annual-Secretarial-Compliance-Report-30May,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827059342-Annual-Secretarial-Compliance-Report-30May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Shutdown-of-MBF-Production-Facility-at-Khardah-17June,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827121482-Shutdown-of-MBF-Production-Facility-at-Khardah-17June-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Closure-of-Trading-Window-27-June-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962678024-Closure-of-Trading-Window-27-June-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Compliance-under-Regulation-74\\(5\\)-for-the-Quarter-ended-30.06.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962623470-Compliance-under-Regulation-74%285%29-for-the-Quarter-ended-30.06.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Board-Meeting-Intimation-30.07.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962588549-Board-Meeting-Intimation-30.07.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Regulation-30-30.07.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962551800-Disclosure-under-Regulation-30-30.07.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Outcome-of-Board-Meeting-06.08.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962491999-Outcome-of-Board-Meeting-06.08.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Press-Release-Financial-Results-30.06.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962432715-Press-Release-Financial-Results-30.06.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Analyst-Call-Presentation-06.08.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962385024-Analyst-Call-Presentation-06.08.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Audio-Recording-Link-Conference-Call.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962339487-Audio-Recording-Link-Conference-Call.pdf",
        permanent: true,
      },
      {
        source: "/document/AGM-Proceedings-27.08.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962297532-AGM-Proceedings-27.08.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/AGM-Voting-Results-28.08.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962232721-AGM-Voting-Results-28.08.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Appointment-of-Mr.-Bikranjit-Ghosh-30.08.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962175005-Appointment-of-Mr.-Bikranjit-Ghosh-30.08.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/CFO-Certificate-quarter-ended-30-Sept-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782962088520-CFO-Certificate-quarter-ended-30-Sept-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Board-Meeting-Intimation-03-November,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827215615-Board-Meeting-Intimation-03-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-for-Conference-Call-4-November,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827221746-Intimation-for-Conference-Call-4-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Press-Release-on-Financial-Results-as-on-%20Sep-2025-Quarter-10November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782961942914-Press-Release-on-Financial-Results-as-on--Sep-2025-Quarter-10November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Investor-Presentation-for-Concall-10-November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782961898686-Investor-Presentation-for-Concall-10-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Audio-Link-of-Concall-10-November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782961758279-Audio-Link-of-Concall-10-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Postal-Ballot-Voting-Results-17-November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914736044-Postal-Ballot-Voting-Results-17-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Receipt-of-final-Compensation-Order-21-November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914691977-Receipt-of-final-Compensation-Order-21-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Redemption-Commercial-Paper-27-Nov-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914639984-Redemption-Commercial-Paper-27-Nov-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Redemption-Commercial-Paper-22-December,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827287151-Redemption-Commercial-Paper-22-December-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Closure-of-Trading-Window-26-December-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914545882-Closure-of-Trading-Window-26-December-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Compliance-under-Regulation-74\\(5\\)-for-the-Quarter-ended-31.12.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914483577-Compliance-under-Regulation-74%285%29-for-the-Quarter-ended-31.12.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Regulation-30-7-January-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914443192-Disclosure-under-Regulation-30-7-January-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-for-Conference-Call-30-January,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827347717-Intimation-for-Conference-Call-30-January-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Board-Meeting-Intimation-30-January,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827352641-Board-Meeting-Intimation-30-January-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-under-Regulation-30-Presentation-06022026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914324541-Intimation-under-Regulation-30-Presentation-06022026.pdf",
        permanent: true,
      },
      {
        source: "/document/Outcome-of-Board-Meeting-06022026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914294063-Outcome-of-Board-Meeting-06022026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-under-Regulation-30-Concall-Audio-Link.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788423387832-Intimation-under-Regulation-30-Concall-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/document/Press-Release-06-02-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914226560-Press-Release-06-02-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-Postal-Ballot-13-March,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827420049-Intimation-Postal-Ballot-13-March-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Regulation-30-Credit-Rating-Outlook-02.02.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914161610-Disclosure-under-Regulation-30-Credit-Rating-Outlook-02.02.2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-to-Stock-Exchanges-Reg-7\\(2\\)-SEBI-\\(PIT\\)-Regulations-19.03.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914144331-Disclosure-to-Stock-Exchanges-Reg-7%282%29-SEBI-%28PIT%29-Regulations-19.03.2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Reg-29-\\(2\\)-of-SEBI-\\(SAST\\)-Regulations,2011-19.03.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827556452-Disclosure-under-Reg-29-%282%29-of-SEBI-%28SAST%29-Regulations-2011-19-03-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-to-Stock-Exchanges-Reg-7\\(2\\)-SEBI-\\(PIT\\)-Regulations-23.03.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914051909-Disclosure-to-Stock-Exchanges-Reg-7%282%29-SEBI-%28PIT%29-Regulations-23.03.2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Closure-of-Trading-Window-27March-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782914008199-Closure-of-Trading-Window-27March-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-to-Stock-Exchanges-Reg-7\\(2\\)-SEBI-\\(PIT\\)-Regulations-27.03.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782913976407-Disclosure-to-Stock-Exchanges-Reg-7%282%29-SEBI-%28PIT%29-Regulations-27.03.2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-to-Stock-Exchanges-Reg-7\\(2\\)-SEBI-\\(PIT\\)-Regulations-30.03.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782913918291-Disclosure-to-Stock-Exchanges-Reg-7%282%29-SEBI-%28PIT%29-Regulations-30.03.2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Compliance-under-Regulation-74\\(5\\)-for-the-Quarter-ended-31.03.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786436699095-Compliance-under-Regulation-74%285%29-for-the-Quarter-endedmmj.pdf",
        permanent: true,
      },
      {
        source: "/document/Postal-Ballot-Voting-Results-13-April-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782913695917-Postal-Ballot-Voting-Results-13-April-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intitial-Disclosure-for-Large-Corporate-entity-23-April,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827934788-Intitial-Disclosure-for-Large-Corporate-entity-23-April-2026.pdf",
        permanent: true,
      },

      {
        source: "/document/Intimation-for-Conference-Call-11-May,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827997643-Intimation-for-Conference-Call-11-May-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-under-Regulation-30-Concall-Audio-Link..pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786436457385-Intimation-under-Regulation-30-Concall-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/document/Outcome-of-Board-Meeting-18-05-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782913377145-Outcome-of-Board-Meeting-18-05-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-under-Regulation-30-Presentation-18-05-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782913337098-Intimation-under-Regulation-30-Presentation-18-05-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Regulation-30-of-SEBI-LODR-11-June-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782912954911-Disclosure-under-Regulation-30-of-SEBI-LODR-11-June-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Closure-of-Trading-Window--27-June-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785581656854-Closure-of-Trading-Window---27-June-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Compliance-under-Regulation-74\\(5\\)-for-the-Quarter-ended-30.06.2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786436150553-Compliance-under-Regulation-74%285%29-for-the-Quarter-ended-3.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-Postal-Ballot-14-July,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828095679-Intimation-Postal-Ballot-14-July-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Board-Meeting-Intimation-31-July-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786435500870-Board-Meeting-Intimation-31-July-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Disclosure-under-Regulation-30-of-SEBI-LODR-31-July-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788415225564-Disclosure-under-Regulation-30-of-SEBI-LODR-31-July-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-under-Regulation-30-Presentation-07-08-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786434748268-Intimation-under-Regulation-30-Presentation-07-08-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Outcome-of-Board-Meeting-07-08-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786434627139-Outcome-of-Board-Meeting-07-08-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Press-Release-07-08-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786434088683-Press-Release-07-08-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Intimation-under-Regulation-30-Concall-Audio-Link...pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786433928547-Intimation-under-Regulation-30-Concall-Audio-Link.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2015-2016/January-March.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348599136-January-March.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2015-2016/April-June%20\\(1\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348547941-April-June.pdf",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2016-2017/Jan-Mar.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348196979-Jan-Mar.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2016-2017/April-June.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348130583-April-June.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2016-2017/July-Sep.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348025870-July-Sep.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2016-2017/Oct-Dec.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788347732046-Oct-Dec.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2017-2018/April-June.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788343863233-April-June.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2017-2018/July-Sep.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788343713835-July-Sep.xls",
        permanent: true,
      },
      {
        source: "/pdf/investors/compliance-report/Share-Holding-Pattern/2017-2018/Oct-Dec.xls",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788343646992-Oct-Dec.xls",
        permanent: true,
      },
      {
        source: "//pdf/investors/compliance-report/Share-Holding-Pattern/2021-2022/shareholding-pattern-30sep21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788242827323-shareholding-pattern-30sep21.pdf",
        permanent: true,
      },
      ////////////22-9-2026
      {
        source: "/admin/pdf/ODR-Portal-Link-Circular-for-Clients.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782731253459-ODR-Portal-Link-Circular-for-Clients.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600885253625_11_11_21_Form_ISR-3.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782731137755-1600885253625_11_11_21_Form_ISR-3.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613665025SH-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782731203639-1613665025SH-14.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609748316terms-condition-of-appointment-of-directors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730165657-1609748316terms-condition-of-appointment-of-directors.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600236655558-Form-ISR-4.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730006504-1600236655558-Form-ISR-4.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600005253625_11_11_21_Form_ISR-1.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729925346-1600005253625_11_11_21_Form_ISR-1.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613664934SH-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729889155-1613664934SH-13.pdf",
        permanent: true,
      },
      {
        source: "/document/Q1-FY27-Investors-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828440788-Q1-FY27-Investors-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/Transcript-of-Investors-Concall-held-on-18-May-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729483482-Transcript-of-Investors-Concall-held-on-18-May-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Q4-and-F26-Investors-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721581998-Q4-and-F26-Investors-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/Concall-Intimation-Q4-&-FY26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828521036-Concall-Intimation-Q4---FY26.pdf",
        permanent: true,
      },
      {
        source: "/document/Transcript-of-Investors-Concall-held-on-06-February-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729373284-Transcript-of-Investors-Concall-held-on-06-February-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Q3-&-9M-Investors-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828659123-Q3---9M-Investors-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/Concall-Intimation-Q3&9M-FY26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828721607-Concall-Intimation-Q3-9M-FY26.pdf",
        permanent: true,
      },
      {
        source: "/document/Transcript-of-Investors-Concall-held-on-10-November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721416764-Transcript-of-Investors-Concall-held-on-10-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Concall-Intimation-10-November-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729140290-Concall-Intimation-10-November-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Q2-H1FY26-Earnings-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721304873-Q2-H1FY26-Earnings-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/Concall-Invite-Q2-&-H1-FY-26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828832978-Concall-Invite-Q2---H1-FY-26.pdf",
        permanent: true,
      },
      {
        source: "/document/Transcript-of-Investors-Concall-held-on-06-August-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721214685-Transcript-of-Investors-Concall-held-on-06-August-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Q1-FY26-Earnings-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721068327-Q1-FY26-Earnings-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/Concall-Invite-Q1-FY26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728916150-Concall-Invite-Q1-FY26.pdf",
        permanent: true,
      },
      {
        source: "/document/Transcript-of-Investors-Concall-held-on-12-May-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721005922-Transcript-of-Investors-Concall-held-on-12-May-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Q4-FY25-Earnings-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720937885-Q4-FY25-Earnings-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/Concal-Invite-Q4-&-FY-25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828903477-Concal-Invite-Q4---FY-25.pdf",
        permanent: true,
      },
      {
        source: "/document/2169775-Interaction-with-Systematix-Group-on-19-March-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720871032-2169775-Interaction-with-Systematix-Group-on-19-March-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/3869574-Interaction-in-Khardah-Plant-on-5-March-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728766976-3869574-Interaction-in-Khardah-Plant-on-5-March-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Transcript-of-Investors-Concall-held-on-31-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720790700-Transcript-of-Investors-Concall-held-on-31-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/5429861-Q3-&-9MFY25-Earnings-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828973783-5429861-Q3---9MFY25-Earnings-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/5429861-Concall-Invite-Q3-&-9MFY25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787829049722-5429861-Concall-Invite-Q3---9MFY25.pdf",
        permanent: true,
      },
      {
        source: "/document/16254784-Transcript-of-Investors-Concall-held-on-30-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728496821-16254784-Transcript-of-Investors-Concall-held-on-30-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/16254784-Interaction-with-Tokio-Marine-Asset-Management.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728393547-16254784-Interaction-with-Tokio-Marine-Asset-Management.pdf",
        permanent: true,
      },
      {
        source: "/document/14567275-Q2-&-H1-FY25-Earnings-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787829129673-14567275-Q2---H1-FY25-Earnings-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/14567275-Concall-Invite-Q2-&-H1FY25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787829965216-14567275-Concall-Invite-Q2---H1FY25.pdf",
        permanent: true,
      },
      {
        source: "/document/1632548-Transcript-of-Invesors-concall-held-on-1-August-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720334073-1632548-Transcript-of-Invesors-concall-held-on-1-August-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/584567241-Q1-&-FY25-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788355655915-584567241-Q1---FY25-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/638456721-Electrosteel-Castings-Concall-Invite-Q1FY25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727998870-638456721-Electrosteel-Castings-Concall-Invite-Q1FY25.pdf",
        permanent: true,
      },
      {
        source: "/document/3845671-IntimationtoSE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727961695-3845671-IntimationtoSE.pdf",
        permanent: true,
      },
      {
        source: "/document/2427456-Transcipt-of-Investors-ConCall-held-on-13-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727883649-2427456-Transcipt-of-Investors-ConCall-held-on-13-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/657651525-Q4-&-FY24-Investor-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787829347368-657651525-Q4---FY24-Investor-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/document/197652568-Electrosteel-Castings-Concall-Invite-Q4-&-FY24-Earnings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787829404908-197652568-Electrosteel-Castings-Concall-Invite-Q4---FY24-Earnings.pdf",
        permanent: true,
      },
      {
        source: "/document/367458918-Transcipt-of-Investors-Concall-held-on-13-February-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727616585-367458918-Transcipt-of-Investors-Concall-held-on-13-February-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/28987559-Q3&9MFY24-Investor-Presentation-of-Electrosteel-Castings-Limited.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787829455982-28987559-Q3-9MFY24-Investor-Presentation-of-Electrosteel-Castings-Limited.pdf",
        permanent: true,
      },
      {
        source: "/document/385284579_Electrosteel_Castings_Concall_Invite_Draft_Q3FY24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727274982-385284579_Electrosteel_Castings_Concall_Invite_Draft_Q3FY24.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/15236485-Transcipt-of-Investors-Concall-held-on-10-November-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727199284-15236485-Transcipt-of-Investors-Concall-held-on-10-November-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/15436985-Q2-H1FY24-Earnings-Presentation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727162023-15436985-Q2-H1FY24-Earnings-Presentation.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/194236589-Electrosteel-Castings-Concall-Invite_Q2FY24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727093602-194236589-Electrosteel-Castings-Concall-Invite_Q2FY24.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16487025-Transcipt-of-Invetors-Concall-held-on-11-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727034124-16487025-Transcipt-of-Invetors-Concall-held-on-11-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/165325485-Electrosteel-Castings-Q1FY24-Presentation-Final-10-Aug-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727009133-165325485-Electrosteel-Castings-Q1FY24-Presentation-Final-10-Aug-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/165234529-Electrosteel-Castings-Concall-Invite-Q1FY24-New\.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726936644-165234529-Electrosteel-Castings-Concall-Invite-Q1FY24-New.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/65235897-Transcript-of-investor-concall-held-on-18th-May-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726870160-65235897-Transcript-of-investor-concall-held-on-18th-May-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/35364862369-Earnings-Presentation-Q4FY23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726821693-35364862369-Earnings-Presentation-Q4FY23.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/15364652369-Invitation-of-Earnings-Conference-cal-for-Q4-Fy2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726695101-15364652369-Invitation-of-Earnings-Conference-cal-for-Q4-Fy2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1865348-Transcript-of-Investors-Concall-held-on-17-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726589144-1865348-Transcript-of-Investors-Concall-held-on-17-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/196326458-Invitation-of-Earnings-Conference-cal-for-Q3-Fy2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726501044-196326458-Invitation-of-Earnings-Conference-cal-for-Q3-Fy2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1653478-Transcript-of-Investors-Concall-held-on-14-November-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719535171-1653478-Transcript-of-Investors-Concall-held-on-14-November-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/6325145789-Transcript-of-Investors-Concall-held-on-16-August-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719256887-6325145789-Transcript-of-Investors-Concall-held-on-16-August-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Concall-ElectrosteelCastings-20220512-11.00.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719140216-Concall-ElectrosteelCastings-20220512-11.00.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600025353565-Earning-PresentationQ4-FY-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718308969-1600025353565-Earning-PresentationQ4-FY-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16012536542655_Earning_Presentation_Q3_FY_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726100692-16012536542655_Earning_Presentation_Q3_FY_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609746349familiarisation-programme-for-id.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718219606-1609746349familiarisation-programme-for-id.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619544570withdrawl-letter-14nov-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787810285668-1619544570withdrawl-letter-14nov-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619544502informerics-valuation-rating-letter-12Dec2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811299664-1619544502informerics-valuation-rating-letter-12Dec2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619544401ratings-letter-24jan2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811204844-1619544401ratings-letter-24jan2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609739268ratings-letter-14jan2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811182204-1609739268ratings-letter-14jan2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/India%20Ratings%20&%20Research%20Private%20Limited%20Rating%20Letter%20-%205%20October%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811165728-India-Ratings-Research-Private-Limited-Rating-Letter---5-October-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/CRISIL%20Ratings%20Limited%20Rating%20Letter%20-%207%20July%202022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811258779-CRISIL-Ratings-Limited-Rating-Letter---7-July-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/124121468-CRISIL-Credit-Rating-Letter-2nd-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811122368-124121468-CRISIL-Credit-Rating-Letter-2nd-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/18414686-India-Ratings-and-Research-Rating-Letter-3-September-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811100440-18414686-India-Ratings-and-Research-Rating-Letter-3-September-2024.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619544542rating-letter-14nov-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787810769949-1619544542rating-letter-14nov-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619544467brickwork-ratings-letter-17Dec2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811014268-1619544467brickwork-ratings-letter-17Dec2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609739309ratings-letter-29mar2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787810924961-1609739309ratings-letter-29mar2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1621001824India%20Ratings%20&%20Research%20Private%20Limited%20Rating%20Letter%20-%2013%20May%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348165039-1621001824India-Ratings-Research-Private-Limited-Rating-Letter---13-May-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/CRISIL%20Ratings%20Limited%20Rating%20Letter%20-%205%20July%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787810817641-CRISIL-Ratings-Limited-Rating-Letter---5-July-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1843685245-CRISIL-Credit-Rating-Letter-30th-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787809439968-1843685245-CRISIL-Credit-Rating-Letter-30th-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/18414686-CRISIL-Credit-Rating-Letter-28-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348118545-18414686-CRISIL-Credit-Rating-Letter-28-June-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/1632548-CRISIL-Credit-Ratings-Letter-27-January-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787810180918-1632548-CRISIL-Credit-Ratings-Letter-27-January-2025.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912100_unclaimed-dividend-2010-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783082319469-1609912100_unclaimed-dividend-2010-2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912100_unclaimed-dividend-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787147009131-1609912100_unclaimed-dividend-2011-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912100_unclaimed-dividend-2009-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783082239401-1609912100_unclaimed-dividend-2009-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912100_unclaimed-dividend-2008-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788347230255-1609912100_unclaimed-dividend-2008-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609911866_unclaimed-Final-Dividend-2007-2008F.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783082149483-1609911866_unclaimed-Final-Dividend-2007-2008F.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609911866_unclaimed-interim-dividend-2007-2008i.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783082114717-1609911866_unclaimed-interim-dividend-2007-2008i.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609911866_unclaimed-interim-dividend-2006-2007i.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783082083164-1609911866_unclaimed-interim-dividend-2006-2007i.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609911866_unclaimed-dividend-2005-2006.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783082031289-1609911866_unclaimed-dividend-2005-2006.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912429_unclaimed-dividend-2012-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081804916-1609912429_unclaimed-dividend-2012-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912429_unclaimed-dividend-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081757590-1609912429_unclaimed-dividend-2011-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912429_unclaimed-dividend-2010-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081727939-1609912429_unclaimed-dividend-2010-2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912429_unclaimed-dividend-2009-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081695238-1609912429_unclaimed-dividend-2009-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912429_unclaimed-dividend-2008-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081665642-1609912429_unclaimed-dividend-2008-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912429_unclaimed-dividend-2007-2008F.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081635572-1609912429_unclaimed-dividend-2007-2008F.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609914334_unclaimed-dividend-2013-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081564073-1609914334_unclaimed-dividend-2013-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912788_unclaimed-dividend-2012-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081537544-1609912788_unclaimed-dividend-2012-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912788_unclaimed-dividend-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788346437466-1609912788_unclaimed-dividend-2011-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912788_unclaimed-dividend-2010-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788346039647-1609912788_unclaimed-dividend-2010-2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912788_unclaimed-dividend-2009-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081332190-1609912788_unclaimed-dividend-2009-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912788_unclaimed-dividend-2008-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081297754-1609912788_unclaimed-dividend-2008-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609912788_unclaimed-dividend-2007-2008.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081262446-1609912788_unclaimed-dividend-2007-2008.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609946435_unclaimed-dividend-2014-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081189291-1609946435_unclaimed-dividend-2014-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609946299_unclaimed-dividend-2013-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081159981-1609946299_unclaimed-dividend-2013-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609946299_unclaimed-dividend-2012-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081132473-1609946299_unclaimed-dividend-2012-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609946299_unclaimed-dividend-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081051274-1609946299_unclaimed-dividend-2011-2012.pdf",
        permanent: true,
      },

      {
        source: "/admin/post_img/1609946299_unclaimed-dividend-2010-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783081019678-1609946299_unclaimed-dividend-2010-2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609946299_unclaimed-dividend-2009-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080989616-1609946299_unclaimed-dividend-2009-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609946299_unclaimed-dividend-2008-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080955713-1609946299_unclaimed-dividend-2008-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962203_unclaimed-dividend-2015-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080883715-1609962203_unclaimed-dividend-2015-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962203_unclaimed-dividend-2014-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080853900-1609962203_unclaimed-dividend-2014-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962203_unclaimed-dividend-2013-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080820092-1609962203_unclaimed-dividend-2013-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962202_unclaimed-dividend-2012-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080781332-1609962202_unclaimed-dividend-2012-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962202_unclaimed-dividend-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080743252-1609962202_unclaimed-dividend-2011-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962202_unclaimed-dividend-2010-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788344874446-1609962202_unclaimed-dividend-2010-2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962339_unclaimed-dividend-2016-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080408585-1609962339_unclaimed-dividend-2016-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962339_unclaimed-dividend-2015-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080307869-1609962339_unclaimed-dividend-2015-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962339_unclaimed-dividend-2014-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080250971-1609962339_unclaimed-dividend-2014-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962339_unclaimed-dividend-2013-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080181679-1609962339_unclaimed-dividend-2013-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962339_unclaimed-dividend-2012-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080147288-1609962339_unclaimed-dividend-2012-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/post_img/1609962339_unclaimed-dividend-2011-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783080098272-1609962339_unclaimed-dividend-2011-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613667980iepf-suspense-account-03dec16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717910556-1613667980iepf-suspense-account-03dec16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613666903iepf-demat-account-2009-10.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717855434-1613666903iepf-demat-account-2009-10.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613666806iepf-demat-account-2010-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717809393-1613666806iepf-demat-account-2010-11.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613665430iepf-demat-account-2011-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717728663-1613665430iepf-demat-account-2011-12.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609686948iepf-demat-account-2012-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717654757-1609686948iepf-demat-account-2012-13.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Statement%20of%20Shares%20to%20be%20transferred%20to%20the%20DEMAT%20Account%20of%20the%20IEPF%20Authority%20-%202013-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717601268-Statement-of-Shares-to-be-transferred-to-the-DEMAT-Account-of-the-IEPF-Authority---2013-14.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609686850iepf-suspense-account-03dec16-a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717546012-1609686850iepf-suspense-account-03dec16-a.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609686804iepf-authority-rules-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717467075-1609686804iepf-authority-rules-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600002535525885-Statement-of-Shares-to-be-transferred-to-the-DEMAT-Account-of%20the.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717353365-1600002535525885-Statement-of-Shares-to-be-transferred-to-the-DEMAT-Account-of-the.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/168542563-Statements-of-shares-to-be-transfered%20-to-the-Demat-Account-of-IEPF-Authority-2015-16-\\(ECL\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717281926-168542563-Statements-of-shares-to-be-transfered--to-the-Demat-Account-of-IEPF-Authority-2015-16-%28ECL%29.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18746958-Statements-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2015-16-\\(SW%20UNIT\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717174943-18746958-Statements-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2015-16-%28SW-UNIT%29.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Statement%20of%20shares%20to%20be%20transfered%20to%20the%20Demat%20Account%20of%20IEPF%20Authority%202017-18%20\\(ECL\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717031063-Statement-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2017-18-%28ECL%29.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Statement%20of%20shares%20to%20be%20transfered%20to%20the%20Demat%20Account%20of%20IEPF%20Authority%202017-18%20\\(SW%20UNIT\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782716981982-Statement-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2017-18-%28SW-UNIT%29.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Statement-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2018-19-\\(SW%20UNIT\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785581215680-Statement-of-shares-to-be-transfered-to-the-Demat-Account-of-IEPF-Authority-2018-19-%28SW-UNIT%29.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425684_PostalBallotResult-6122013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787209370840-1609425684_PostalBallotResult-6122013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425684_details-postal-ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787209322367-1609425684_details-postal-ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425684_postal-ballot-18-dec-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787209259106-1609425684_postal-ballot-18-dec-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425684_e-voting-results.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787209205256-1609425684_e-voting-results.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425684_agm-59-outcome.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787209145143-1609425684_agm-59-outcome.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425645_voting-results-14sep15-b.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787209009494-1609425645_voting-results-14sep15-b.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425645_voting-results-14sep15-a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787208953451-1609425645_voting-results-14sep15-a.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425605_voting-results-12sep16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787208845315-1609425605_voting-results-12sep16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425605_declaration-of-resulta-of-61st-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559198914-1609425605_declaration-of-resulta-of-61st-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425570_details-of-voting-results-of-the-62nd-annual-general-meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788337821227-1609425570_details-of-voting-results-of-the-62nd-annual-general-meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425570_scrutinizers-report-of-62nd-annual-general-meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166752920-1609425570_scrutinizers-report-of-62nd-annual-general-meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425570_results-of-remote-e-voting-and-voting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166651228-1609425570_results-of-remote-e-voting-and-voting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425517_remote-e-voting-and-voting-egm-13aug18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166422123-1609425517_remote-e-voting-and-voting-egm-13aug18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425517_scrutinizers-report-egm-13aug18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166376166-1609425517_scrutinizers-report-egm-13aug18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425517_declaration-of-result-evoting-and-ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166323263-1609425517_declaration-of-result-evoting-and-ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425517_details-of-voting-results-63rd-agm.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166271892-1609425517_details-of-voting-results-63rd-agm.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425517_scrutinizers-report-63rd-agm.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166211661-1609425517_scrutinizers-report-63rd-agm.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609425517_voting-results-egm-13aug18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787166485318-1609425517_voting-results-egm-13aug18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619595814_scrutinizers-report-64th-agm.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559094658-1619595814_scrutinizers-report-64th-agm.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619595814_scrutinizers-report-64th-agm-a.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559085655-1619595814_scrutinizers-report-64th-agm-a.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619595814_scrutinizers-report-postal-ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559059879-1619595814_scrutinizers-report-postal-ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619595814_voting-results-postal-ballot-details.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559036526-1619595814_voting-results-postal-ballot-details.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619595814_voting-results-postal-ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559007101-1619595814_voting-results-postal-ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619595814_details-of-voting-results-64th-agm.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787559096366-1619595814_details-of-voting-results-64th-agm.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614533039Scrutinizers_Report_65th_Annual_General_Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165432546-1614533039Scrutinizers_Report_65th_Annual_General_Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614532982Details_of_Voting_Results_65th_Annual_General_Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165422039-1614532982Details_of_Voting_Results_65th_Annual_General_Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614532832Declaration_of_Voting_Results_65th_Annual_General_Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165339790-1614532832Declaration_of_Voting_Results_65th_Annual_General_Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Scrutinizers%20Report%2066th%20Annual%20General%20Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787164920694-Scrutinizers-Report-66th-Annual-General-Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Details%20of%20Voting%20Results%2066th%20Annual%20General%20Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787164999467-Details-of-Voting-Results-66th-Annual-General-Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Declaration%20of%20Voting%20Results%2066th%20Annual%20General%20Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165059353-Declaration-of-Voting-Results-66th-Annual-General-Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Scrutinizer%20Report%20of%20the%20NCLT%20Convened%20Meetings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165117828-Scrutinizer-Report-of-the-NCLT-Convened-Meetings.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Details%20of%20Voting%20Results%20of%20the%20NCLT%20Convened%20Meetings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165193603-Details-of-Voting-Results-of-the-NCLT-Convened-Meetings.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Declaration%20of%20Voting%20Results%20of%20the%20NCLT%20Convened%20Meetings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787165208121-Declaration-of-Voting-Results-of-the-NCLT-Convened-Meetings.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160000025252_Details_of_Voting_Results_of_Postal_Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153921298-160000025252_Details_of_Voting_Results_of_Postal_Ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16000233253652_Scrutinizers_Report_o_%20Postal_Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153762666-16000233253652_Scrutinizers_Report_o_-Postal_Ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160000025252_Declaration_of_Voting_Results_of_Postal_Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788335798135-160000025252_Declaration_of_Voting_Results_of_Postal_Ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/162235236554585-Declaration-of-Voting-Results-of-Postal-Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787210091574-162235236554585-Declaration-of-Voting-Results-of-Postal-Ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16335245555444-Details-of-Voting-Results-of-Postal-Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153600408-16335245555444-Details-of-Voting-Results-of-Postal-Ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16332525252544-Scrutinizers-Report-of-Postal-Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153495359-16332525252544-Scrutinizers-Report-of-Postal-Ballot.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/13265478-Declaration-of-Voting-Results-67th-Annual-General-Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153402198-13265478-Declaration-of-Voting-Results-67th-Annual-General-Meeting.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/23547856-Details-of-Voting-Results-67th-Annual-General-Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153320414-23547856-Details-of-Voting-Results-67th-Annual-General-Meeting.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/15642589-Scrutinizers-Report-67th-Annual-General-Meeting.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153260354-15642589-Scrutinizers-Report-67th-Annual-General-Meeting.pdf",
        permanent: true,
      },
      {
        source: "/document/18632547-Scrutinizers-Report-of-Postal-Ballot.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787153140226-18632547-Scrutinizers-Report-of-Postal-Ballot.pdf",
        permanent: true,
      },
      {
        source: "/document/149374586-Postal-Ballot-Voting-Results-13-08-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787152843805-149374586-Postal-Ballot-Voting-Results-13-08-2024.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663400notice-form-postal-ballot-29102014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788269032619-1613663400notice-form-postal-ballot-29102014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663296PostalBallotForm-24102013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788269120117-1613663296PostalBallotForm-24102013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663207PostalBallotNotice-24102013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788269103809-1613663207PostalBallotNotice-24102013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663163postal-ballot-notice-form-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268983407-1613663163postal-ballot-notice-form-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609402130EGM-Notice-24102013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268966192-1609402130EGM-Notice-24102013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609402107EGM-Notice-11042014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268951654-1609402107EGM-Notice-11042014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609402071agm-notice-170815.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268938332-1609402071agm-notice-170815.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf//1609402043agm-notice-110816.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268915303-1609402043agm-notice-110816.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609402012agm-notice-170817.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268861146-1609402012agm-notice-170817.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609401984notice-of-egm-11-aug-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268842624-1609401984notice-of-egm-11-aug-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609401953notice-of-63rd-agm-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268821721-1609401953notice-of-63rd-agm-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609401922notice-of-64thagm-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268804667-1609401922notice-of-64thagm-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609401887postal-ballot-12-nov-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268753670-1609401887postal-ballot-12-nov-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609401855Notice-of-65th-AGM-15th-September-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268734014-1609401855Notice-of-65th-AGM-15th-September-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002536425875_Postal_Ballot_Notice_dated_3_January_2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788268693320-160002536425875_Postal_Ballot_Notice_dated_3_January_2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19532547-Postal-Ballot-Notice-dated-14th-February-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788269268075-19532547-Postal-Ballot-Notice-dated-14th-February-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18642569872568-Notice-of-67th-AGM-16th-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788267250127-18642569872568-Notice-of-67th-AGM-16th-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18961225568-Postal-Ballot-Notice-dated-11th-November-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788267208132-18961225568-Postal-Ballot-Notice-dated-11th-November-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19532547-Postal-Ballot-Notice-dated-14-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788269260972-19532547-Postal-Ballot-Notice-dated-14-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/13265458-Notice-of-68th-AGM-11th-September-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788267153930-13265458-Notice-of-68th-AGM-11th-September-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/19457568-Postal-Ballot-Notice-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255275347-19457568-Postal-Ballot-Notice-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/284575681-Postal-Ballot-Notice-dated-13-May-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255269619-284575681-Postal-Ballot-Notice-dated-13-May-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/284575681-Notice-of-69th-AGM-23-August-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255262887-284575681-Notice-of-69th-AGM-23-August-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/2946586-Postal-Ballot-Notice-dated-30-October-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255255909-2946586-Postal-Ballot-Notice-dated-30-October-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Notice-of-70th-AGM-27-August-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255241953-Notice-of-70th-AGM-27-August-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Postal-Ballot-Notice-dated-30-August,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255235518-Postal-Ballot-Notice-dated-30-August-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Postal-Ballot-Notice-dated-06-February,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255229627-Postal-Ballot-Notice-dated-06-February-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Postal-Ballot-Notice-dated-18-May,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255223032-Postal-Ballot-Notice-dated-18-May-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Notice-of-71st-AGM-31-August-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788255217313-Notice-of-71st-AGM-31-August-2026.pdf",
        permanent: true,
      },

      {
        source: "/document/168534752-CSR-Projects-2022-23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785582439852-168534752-CSR-Projects-2022-23.pdf",
        permanent: true,
      },
      {
        source: "/document/13648245-CSR-Projects-2023-24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714342675-13648245-CSR-Projects-2023-24.pdf",
        permanent: true,
      },
      {
        source: "/document/CSR-Projects-2024-25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714260046-CSR-Projects-2024-25.pdf",
        permanent: true,
      },
      {
        source: "/document/CSR-Projects-2025-26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787831910211-CSR-Projects-2025-26.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/AnnualReturn-MGT-7-31March2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714096794-AnnualReturn-MGT-7-31March2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1245635-Annual-Return-MGT-7-31st-March-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782713948268-1245635-Annual-Return-MGT-7-31st-March-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Annual%20Return%20-%20MGT-7%20-%2031%20March%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714002391-Annual-Return---MGT-7---31-March-2021.pdf",
        permanent: true,
      },
      {
        source: "/document/196425874-AnnualReturn-MGT-7-31st-March-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782713888051-196425874-AnnualReturn-MGT-7-31st-March-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Saksham-Niveshak-Program.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714381448-Saksham-Niveshak-Program.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002362587945_Revised_MOA_and_AOA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714260479-160002362587945_Revised_MOA_and_AOA.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609693650disclosure-4-oct-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714204735-1609693650disclosure-4-oct-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619543805extract-annual-return-mgt-9-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715810769-1619543805extract-annual-return-mgt-9-20.pdf",
        permanent: true,
      },
      {
        source: "/document/174258759-Annual-Return-Form-MGT-7-31-March-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715671365-174258759-Annual-Return-Form-MGT-7-31-March-2022.pdf",
        permanent: true,
      },
      {
        source: "/document/21425862-Annual-Return-Form-MGT-7-31-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715509410-21425862-Annual-Return-Form-MGT-7-31-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609496878Extract-Annual-Return-MGT-9.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715865290-1609496878Extract-Annual-Return-MGT-9.pdf",
        permanent: true,
      },
      {
        source: "/document/164258759-Annual-Return-Form-MG-7-31-March-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715733773-164258759-Annual-Return-Form-MG-7-31-March-2021.pdf",
        permanent: true,
      },
      {
        source: "/document/174258759-Annual-Return-For-MGT-7-31-March-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715598174-174258759-Annual-Return-For-MGT-7-31-March-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/Annual-Return-Form-MGT-7-31-March-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782715421761-Annual-Return-Form-MGT-7-31-March-2025.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663594notice-of-candidature-pradip-kumar-khaitan.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782733549166-1613663594notice-of-candidature-pradip-kumar-khaitan.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609411024notice-mohua-banerjee.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782733519900-1609411024notice-mohua-banerjee.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609410961notice-rajkumar-khanna.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782733497910-1609410961notice-rajkumar-khanna.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663627notice-of-candidature-uddhav-kejriwal.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782733462174-1613663627notice-of-candidature-uddhav-kejriwal.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613663559notice-of-candidature-binod-kumar-khaitan.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782733438175-1613663559notice-of-candidature-binod-kumar-khaitan.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609410991notice-sunil-katial.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782733403457-1609410991notice-sunil-katial.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice%20of%20Candidature%20of%20Mr.%20Amrendra%20Prasad%20Verma.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788183429720-Notice-of-Candidature-of-Mr-Amrendra-Prasad-Verma.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609398370complaintsreport01012014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730229244-1609398370complaintsreport01012014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609398295observationLetter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730209195-1609398295observationLetter.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609398457scheme-amalgamation-22nov14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730192530-1609398457scheme-amalgamation-22nov14.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609398335SEBI.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730170923-1609398335SEBI.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609398246bseObservationLetter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730144571-1609398246bseObservationLetter.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614532677corporate-governance-report-dec-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730050675-1614532677corporate-governance-report-dec-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614532603corporate-governance-report-mar-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782730026865-1614532603corporate-governance-report-mar-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614532540corporate-governance-report-jun-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729897914-1614532540corporate-governance-report-jun-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614532480corporate-governance-report-sep-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729853458-1614532480corporate-governance-report-sep-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531618corporate-governance-report-dec-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729810471-1614531618corporate-governance-report-dec-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531557corporate-governance-report-mar-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729773417-1614531557corporate-governance-report-mar-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531476corporate-governance-report-jun-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729530159-1614531476corporate-governance-report-jun-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531423corporate-governance-report-sep-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729492483-1614531423corporate-governance-report-sep-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531374corporate-governance-report-dec-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729438134-1614531374corporate-governance-report-dec-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531331corporate-governance-report-mar-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729391963-1614531331corporate-governance-report-mar-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531267corporate-governance-report-jun-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729282921-1614531267corporate-governance-report-jun-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531198corporate-governance-report-sep-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729253306-1614531198corporate-governance-report-sep-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609350052_news-publication-04feb17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728689798-1609350052_news-publication-04feb17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614531004agm-notice-210815.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728654501-1614531004agm-notice-210815.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530948news-publication-30jan16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729058320-1614530948news-publication-30jan16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530875news-publication-31dec15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782729017926-1614530875news-publication-31dec15.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530820news-publication-14may16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728978691-1614530820news-publication-14may16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530766news-publication-31mar16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728939135-1614530766news-publication-31mar16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530710news-publication-27aug16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728901098-1614530710news-publication-27aug16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530654news-publication-31aug16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728863433-1614530654news-publication-31aug16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530608news-publication-11nov16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728823705-1614530608news-publication-11nov16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530557news-publication-24nov16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728789120-1614530557news-publication-24nov16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614530499notice-of-postponement-10122016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782728752731-1614530499notice-of-postponement-10122016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609349937_news-publication-04feb17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788181035558-1609349937_news-publication-04feb17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528853board-meeting-19may17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788180723869-1614528853board-meeting-19may17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528803iepf-5dec16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788180673590-1614528803iepf-5dec16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528744news-publication-20jan17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788180626626-1614528744news-publication-20jan17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609349877_notice-of-board-meeting-02022018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177911448-1609349877_notice-of-board-meeting-02022018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528570iepf-13may17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177873745-1614528570iepf-13may17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528515news-publication-19may17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177847447-1614528515news-publication-19may17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528271board-meeting-03aug17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177765503-1614528271board-meeting-03aug17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528197news-publication-07aug17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177351176-1614528197news-publication-07aug17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528148news-publication-26oct17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177318453-1614528148news-publication-26oct17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614528067news-publication-10nov17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177281049-1614528067news-publication-10nov17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609349877_news-publication-03feb18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788177232307-1609349877_news-publication-03feb18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614527345notice-of-board-meeting-07082018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727140094-1614527345notice-of-board-meeting-07082018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614527280financial-results-30062018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727105343-1614527280financial-results-30062018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614526756news-publication-21aug18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727074018-1614526756news-publication-21aug18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614525970news-publication-10nov18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782727028342-1614525970news-publication-10nov18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614525905financial-results-30092018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726989327-1614525905financial-results-30092018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609349794_news-publication-16may18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782726956501-1609349794_news-publication-16may18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609349716_newspaper-publication-06feb20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174657839-1609349716_newspaper-publication-06feb20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614525737news-publication-14may19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174621063-1614525737news-publication-14may19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614525657news-publication-15may19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174583391-1614525657news-publication-15may19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614522671newspaper-publication-14may19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174522986-1614522671newspaper-publication-14may19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614522556newspaper-publication-16may19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174501083-1614522556newspaper-publication-16may19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614502175newspaper-publication-02aug19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174453751-1614502175newspaper-publication-02aug19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614502106newspaper-publication-16aug19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174420766-1614502106newspaper-publication-16aug19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614501983newspaper-publication-29aug19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174382037-1614501983newspaper-publication-29aug19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614501809newspaper-publication-07sep19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174259064-1614501809newspaper-publication-07sep19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614501528newspaper-publication-02nov19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174236878-1614501528newspaper-publication-02nov19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609349716_financial-results-30-09-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788174037505-1609349716_financial-results-30-09-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614501421newspaper-publication-22jan20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788173862823-1614501421newspaper-publication-22jan20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614501320newspaper-publication-18jan20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788173730426-1614501320newspaper-publication-18jan20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice%20of%20Board%20Meeting%20-%2015.06.2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782722451092-Notice-of-Board-Meeting---15.06.2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newspaper-publication-16jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788173068678-newspaper-publication-16jun20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newspaper-publication-25jun20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782722356851-newspaper-publication-25jun20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newspaper-publication-05aug20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782722282585-newspaper-publication-05aug20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial-Results-30.06.2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782722218454-Financial-Results-30.06.2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Public-Notice-with-respect-to-the-65th-Annual-General-Meeting-of-the-Company-and-Book-Closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721997216-Public-Notice-with-respect-to-the-65th-Annual-General-Meeting-of-the-Company-and-Book-Closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Public-Notice-for-completion-of-despatch-of-AGM-Notice-and-Book-Closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721942475-Public-Notice-for-completion-of-despatch-of-AGM-Notice-and-Book-Closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/corrigendum-to-annual-report-2019-20-8920.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721876782-corrigendum-to-annual-report-2019-20-8920.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice_of_Board_Meeting_12_11_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721823166-Notice_of_Board_Meeting_12_11_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/FinancialResults30092020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721767204-FinancialResults30092020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice-of-Board-Meeting-12-02-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721689643-Notice-of-Board-Meeting-12-02-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial-Results-31-12-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721597931-Financial-Results-31-12-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice%20of%20Board%20Meeting%20-%2020.05.2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721545954-Notice-of-Board-Meeting---20.05.2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial%20Results%20-%2031.03.2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721488931-Financial-Results---31.03.2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice%20in%20respect%20of%20transfer%20of%20Equity%20Shares%20of%20the%20Company%20to%20DEMAT%20Account%20of%20the%20IEPF%20Authority.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721187697-Notice-in-respect-of-transfer-of-Equity-Shares-of-the-Company-to-DEMAT-Account-of-the-IEPF-Authority.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Newspaper%20Advertisement%20of%20Notices%20of%20Tribunal%20Convened%20Meetings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721134066-Newspaper-Advertisement-of-Notices-of-Tribunal-Convened-Meetings.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Public%20Notice%20in%20respect%20of%2066th%20AGM%20of%20the%20Company%20and%20Book%20Closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721090217-Public-Notice-in-respect-of-66th-AGM-of-the-Company-and-Book-Closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Public%20Notice%20for%20completion%20of%20despatch%20of%20AGM%20Notice%20and%20Book%20Closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782721024493-Public-Notice-for-completion-of-despatch-of-AGM-Notice-and-Book-Closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial%20Results%20-%2030.06.2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720976312-Financial-Results---30.06.2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Newspaper%20Notice%20in%20respect%20of%20hearing%20of%20the%20petition%20for%20sanction%20of%20Scheme%20of%20Amalgamation%20of%20SPL%20with%20ECL.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720936396-Newspaper-Notice-in-respect-of-hearing-of-the-petition-for-sanction-of-Scheme-of-Amalgamation-of-SPL-with-ECL.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial%20Results%20-%2030.09.2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720890878-Financial-Results---30.09.2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002533624258_Public_Notice_or_completion_of_despatch_of_Postal_Ballot_Notice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720837516-160002533624258_Public_Notice_or_completion_of_despatch_of_Postal_Ballot_Notice.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16025364224_Financial_Results_31_12_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720785309-16025364224_Financial_Results_31_12_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160023533525-Public-Notice-for-completion-of-despatch-of-Postal-Ballot-Notice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720684621-160023533525-Public-Notice-for-completion-of-despatch-of-Postal-Ballot-Notice.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/163252542554558-Financial-Results-31-03-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720639259-163252542554558-Financial-Results-31-03-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/163325852855252-Notice-in-respect-of-transfer-of-Equity-Shares-of-the-Company-to-DEMAT-Account-of-the-IEPF-Authority.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720603891-163325852855252-Notice-in-respect-of-transfer-of-Equity-Shares-of-the-Company-to-DEMAT-Account-of-the-IEPF-Authority.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/23647854-Financial-Results-30.06.2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720561935-23647854-Financial-Results-30.06.2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/13265489-Public-notice-for-completion-of-despatch-of-AGM-Notice-and-Annual-Report-for-the-FY-2021-22.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720519710-13265489-Public-notice-for-completion-of-despatch-of-AGM-Notice-and-Annual-Report-for-the-FY-2021-22.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/623154855-Public-Notice-for-Submission-of-Agm-Notice-and-Book-closure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720480168-623154855-Public-Notice-for-Submission-of-Agm-Notice-and-Book-closure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/196235478-Public-notice-for-completion-of-despatch-of-Postal%20ballot%20Notice.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720434895-196235478-Public-notice-for-completion-of-despatch-of-Postal-ballot-Notice.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19458762-Financial-Results-30.09.2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720390508-19458762-Financial-Results-30.09.2022.pdf",
        permanent: true,
      },
      {
        source: "/document/18465267-Financial-Results-31.12.22.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720211193-18465267-Financial-Results-31.12.22.pdf",
        permanent: true,
      },
      {
        source: "/document/1675249-Financial-Results-31.03.23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720166072-1675249-Financial-Results-31.03.23.pdf",
        permanent: true,
      },
      {
        source: "/document/15324895-Financial-Results-30.06.23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720128053-15324895-Financial-Results-30.06.23.pdf",
        permanent: true,
      },
      {
        source: "/document/1648591-Transfer-of-Shares-to-IEPF-6-July-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782720017330-1648591-Transfer-of-Shares-to-IEPF-6-July-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/2768549-Financial-Results-30.09.23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719956554-2768549-Financial-Results-30.09.23.pdf",
        permanent: true,
      },
      {
        source: "/document/2846597-Financial-Results-31.12.23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719904246-2846597-Financial-Results-31.12.23.pdf",
        permanent: true,
      },
      {
        source: "/document/16845289-Financial-Results-31.03.24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719854343-16845289-Financial-Results-31.03.24.pdf",
        permanent: true,
      },
      //////////////
      {
        source: "/document/196482-Completion-of-despatch-of-Postal-Ballot-Notice-24-November-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719815776-196482-Completion-of-despatch-of-Postal-Ballot-Notice-24-November-2022.pdf",
        permanent: true,
      },
      {
        source: "/document/21964827-Completion-of-despatch-of-Postal-Ballot-Notice-18-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719762320-21964827-Completion-of-despatch-of-Postal-Ballot-Notice-18-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/2164823-Completion-of-despatch-of-Postal-%20Ballot-Notice-15-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719699901-2164823-Completion-of-despatch-of-Postal--Ballot-Notice-15-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/3127648-AGM-Intimation-and-Book-Closure-12-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719654180-3127648-AGM-Intimation-and-Book-Closure-12-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/63127628-Completion-of-despatch-of-AGM-Notice-19-August-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719595697-63127628-Completion-of-despatch-of-AGM-Notice-19-August-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-30.06.2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719437712-Financial-Results-30.06.2024.pdf",
        permanent: true,
      },

      {
        source: "/document/Financial-Results-30.09.2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719192855-Financial-Results-30.09.2024.pdf",
        permanent: true,
      },
      {
        source: "/document/6548514-Despatch-of-Postal-Ballot-Notice-27-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719132143-6548514-Despatch-of-Postal-Ballot-Notice-27-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-31.12.2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719093899-Financial-Results-31.12.2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-31.03.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782719010845-Financial-Results-31.03.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-30.06.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718881234-Financial-Results-30.06.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Completion-of-despatch-of-AGM-Notice-04August-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718812651-Completion-of-despatch-of-AGM-Notice-04August-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Completion-of-despatch-of-Postal-Ballot-Notice-18-October-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718767471-Completion-of-despatch-of-Postal-Ballot-Notice-18-October-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-30.09.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718719458-Financial-Results-30.09.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-31.12.2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718657553-Financial-Results-31.12.2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Completion-of-despatch-of-Postal-Ballot-Notice-14March-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782718550124-Completion-of-despatch-of-Postal-Ballot-Notice-14March-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-30-06-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788162640343-Financial-Results-30-06-2026.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447463_shareholding-31-mar-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787141050971-1614447463_shareholding-31-mar-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447463_shareholding-30-june-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787141047606-1614447463_shareholding-30-june-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447463_shareholding-30-sept-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787141002560-1614447463_shareholding-30-sept-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447463_shareholding-31-dec-2009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787140986744-1614447463_shareholding-31-dec-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447463_shareholding-31mar-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787140929074-1614447463_shareholding-31mar-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447196_shareholding-30-june-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717613918-1614447196_shareholding-30-june-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614447196_shareholding-31-dec-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717552870-1614447196_shareholding-31-dec-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446990_shareholding-31-dec-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717459653-1614446990_shareholding-31-dec-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446990_shareholding-31-march-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717422596-1614446990_shareholding-31-march-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446764_shareholding-30-jun-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717298981-1614446764_shareholding-30-jun-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446764_shareholding-30-sep-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717261356-1614446764_shareholding-30-sep-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446764_shareholding-30-dec-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717224819-1614446764_shareholding-30-dec-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446764_shareholding-31-mar-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717178014-1614446764_shareholding-31-mar-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614449679shareholding-30-jun-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717080986-1614449679shareholding-30-jun-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614449593shareholding-30-sep-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782717048330-1614449593shareholding-30-sep-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609343345_shareholding-31-dec-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787547789568-1609343345_shareholding-31-dec-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609343345_shareholding-31-march-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787547777523-1609343345_shareholding-31-march-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614450079shareholding-30-june-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714454259-1614450079shareholding-30-june-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614450026shareholding-30-sep-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714386866-1614450026shareholding-30-sep-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609343193_shareholding-31-dec-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714286245-1609343193_shareholding-31-dec-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609343193_shareholding-31-mar-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782714173519-1609343193_shareholding-31-mar-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614449488shareholding-30-june-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787553090685-1614449488shareholding-30-june-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342510_shareholding-30-september-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787553068160-1609342510_shareholding-30-september-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342510_shareholding-31-dec-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787553045214-1609342510_shareholding-31-dec-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342510_shareholding-31-mar-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787553023318-1609342510_shareholding-31-mar-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614449332shareholding-30-jun-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552936135-1614449332shareholding-30-jun-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614449171shareholding-30-sep-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552929229-1614449171shareholding-30-sep-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342401_shareholding-31-dec-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552825757-1609342401_shareholding-31-dec-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342401_shareholding-31-mar-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552817474-1609342401_shareholding-31-mar-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614446185shareholding-30-jun-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552702544-1614446185shareholding-30-jun-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342295_shareholding-30-sep-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552674050-1609342295_shareholding-30-sep-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342295_shareholding-31-dec-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552652732-1609342295_shareholding-31-dec-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609342295_shareholding-31-mar-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787552632086-1609342295_shareholding-31-mar-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619597213_distribution-of-shareholding-9-aug-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788158821700-1619597213_distribution-of-shareholding-9-aug-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619597213_shareholding-30-sep-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788158808830-1619597213_shareholding-30-sep-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619597213_shareholding-31-dec-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788158802196-1619597213_shareholding-31-dec-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619597213_shareholding-31-mar-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788158613986-1619597213_shareholding-31-mar-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/shareholding-30-jun-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711483169-shareholding-30-jun-2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Distribution_of_Shareholding_as_on_30th_September_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711445413-Distribution_of_Shareholding_as_on_30th_September_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Distribution_of_Shareholding_as_on_31st_December_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711405533-Distribution_of_Shareholding_as_on_31st_December_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Distribution%20of%20Shareholding%20as%20on%2031st%20March%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711372393-Distribution-of-Shareholding-as-on-31st-March-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Distribution%20of%20Shareholding%20as%20on%2030th%20June%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711279510-Distribution-of-Shareholding-as-on-30th-June-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Distribution%20of%20Shareholding%20as%20on%2030th%20September%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711246949-Distribution-of-Shareholding-as-on-30th-September-2021.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/160035825412588_Distribution_of_Shareholding_as_on_31st_December_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711209392-160035825412588_Distribution_of_Shareholding_as_on_31st_December_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16000235353525-Distribution-of-Shareholding-as-on-31st-March-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711186663-16000235353525-Distribution-of-Shareholding-as-on-31st-March-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002522525-Distribution-of-Shareholding-as-on-30th-June-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711078990-160002522525-Distribution-of-Shareholding-as-on-30th-June-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/164253478-Distribution-of-Shareholding-as-on-30th-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711047438-164253478-Distribution-of-Shareholding-as-on-30th-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1856234789-Distribution-of-Shareholding-as-on-December-31-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782711010434-1856234789-Distribution-of-Shareholding-as-on-December-31-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18653256-Distribution-of-Shareholding-as-on-31-March-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710966424-18653256-Distribution-of-Shareholding-as-on-31-March-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/6121532458-Distribution-of-shareholding-as-on-30-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710862993-6121532458-Distribution-of-shareholding-as-on-30-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/165236-Shareholding-Pattern-as-on-30-09-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710830671-165236-Shareholding-Pattern-as-on-30-09-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/2485135-Shareholding-Pattern-as-on-31st-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710830671-165236-Shareholding-Pattern-as-on-30-09-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/16523485-Shareholding-Pattern-as-on-24th-January-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710761580-16523485-Shareholding-Pattern-as-on-24th-January-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/28523446-Shareholding-Pattern-as-on-31st-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710730377-28523446-Shareholding-Pattern-as-on-31st-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/39845623-Shareholding-Pattern-as-on-30-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710621568-39845623-Shareholding-Pattern-as-on-30-June-2024.pdf",
        permanent: true,
      },

      {
        source: "/document/16535485-ShareholdingPattern30092024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710577492-16535485-ShareholdingPattern30092024.pdf",
        permanent: true,
      },

      {
        source: "/document/2354851-Shareholding-Pattern-as-on-31-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710540664-2354851-Shareholding-Pattern-as-on-31-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Shareholding-Pattern-as-on-31-March-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710500812-Shareholding-Pattern-as-on-31-March-2025.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Electrosteel%20USA%20LLC.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312975660-Electrosteel-USA-LLC.pdf",
        permanent: true,
      },






      {
        source: "/admin/pdf/1619541494_quarter%20ended%2031st%20December,%202009.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828298917-1619541494_quarter-ended-31st-December-2009.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619541494_Quarter%20and%20Year%20ended%2031st%20March,%202010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787828292976-1619541494_Quarter-and-Year-ended-31st-March-2010.pdf",
        permanent: true,
      },
      {
        source: "/document/Board-Meeting-Intimation-11-May,2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787827992200-Board-Meeting-Intimation-11-May-2026.pdf",
        permanent: true,
      },


      {
        source: "/document/Receipt-of-Provisional-Compensation-Order-16-May,2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787826790375-Receipt-of-Provisional-Compensation-Order-16-May-2025.pdf",
        permanent: true,
      },



      {
        source: "/admin/pdf/Disclosure%20under%20Regulation%2030%20of%20SEBI%20LODR%20-%2006th%20October,%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787823177039-Disclosure-under-Regulation-30-of-SEBI-LODR---06th-October-2021.pdf",
        permanent: true,
      },


      {
        source: "/document/Shareholding-Pattern-as-on-30-June-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710412249-Shareholding-Pattern-as-on-30-June-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Shareholding-Pattern-as-on-30-September-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710360872-Shareholding-Pattern-as-on-30-September-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Shareholding-Pattern-as-on-31-December-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710329639-Shareholding-Pattern-as-on-31-December-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Shareholding-Pattern-as-on-31-March-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782710284710-Shareholding-Pattern-as-on-31-March-2026.pdf",
        permanent: true,
      },

      {
        source: "/document/2864795-Financial-Results-for-the-quarter-ended-30-June-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307352286-2864795-Financial-Results-for-the-quarter-ended-30-June-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/6864715-Financial-Results-for-the-Quarter-ended-30-September-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307329797-6864715-Financial-Results-for-the-Quarter-ended-30-September-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/1864715-Financial-Results-for-the-quarter-ended-31-December-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307290703-1864715-Financial-Results-for-the-quarter-ended-31-December-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-for-the-Quarter-and-Year-ended-31-March-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307260349-Financial-Results-for-the-Quarter-and-Year-ended-31-March-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-for-the-Quarter-ended-30-June-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306897118-Financial-Results-for-the-Quarter-ended-30-June-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-for-the-quarter-and-half-year-ended-30-September-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306865575-Financial-Results-for-the-quarter-and-half-year-ended-30-September-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-for-the-Quarter-ended-31-December-2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306849573-Financial-Results-for-the-Quarter-ended-31-December-2025.pdf",
        permanent: true,
      },
      {
        source: "/document/Financial-Results-For-The-Quarter-and-Year-ended-31st-March-2026.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306740452-Financial-Results-For-The-Quarter-and-Year-ended-31st-March-2026.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-USA-LLC-and-subsidiary.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309187796-Electrosteel-USA-LLC-and-subsidiary.pdf",
        permanent: true,
      },
      /////////////////////////////////


      {
        source: "/document/18465987-Broadcast-January-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783066759132-18465987-Broadcast-January-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/156235248-broadcast-december-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783066851018-156235248-broadcast-december-2023.pdf",
        permanent: true
      },
      {
        source: "/admin/pdf/2945235845-Broadcast-Nov-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783066904431-2945235845-Broadcast-Nov-2023.pdf",
        permanent: true
      },
      {
        source: "/admin/pdf/165235489-october-broadcast-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783066965621-165235489-october-broadcast-2023.pdf",
        permanent: true
      },
      {
        source: "/admin/pdf/286532458-Broadcast-september-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067064398-286532458-Broadcast-september-2023.pdf",
        permanent: true
      },
      {
        source: "/admin/pdf/16423548-Broadcast-august-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067120193-16423548-Broadcast-august-2023.pdf",
        permanent: true
      },
      {
        source: "/admin/pdf/13512456-Electrosteel-Broadcast-july-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067176719-13512456-Electrosteel-Broadcast-july-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/51326589-Newsletter-Broadcast-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067250191-51326589-Newsletter-Broadcast-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/189795623-Newsletter-Broadcast-May-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067316677-189795623-Newsletter-Broadcast-May-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/3965325958-Broadcast-April-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067400865-3965325958-Broadcast-April-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/264238958-Broadcast-March-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067476451-264238958-Broadcast-March-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/196532458-Broadcast-February-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067528816-196532458-Broadcast-February-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18625478569-january-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783067590209-18625478569-january-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1326468586-december-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788937135834-1326468586-december-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1326468586-november-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071034912-1326468586-november-2022.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/132648-Broadcast-Oct-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071077887-132648-Broadcast-Oct-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1564789325-Broadcast-Sept-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071155533-1564789325-Broadcast-Sept-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1856325478-Broadcast-Aug-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071257024-1856325478-Broadcast-Aug-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/15689230-Broadcast-July-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071326563-15689230-Broadcast-July-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/162002025522585-Broadcast-June-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071432288-162002025522585-Broadcast-June-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160025655525-Broadcast-May-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071488646-160025655525-Broadcast-May-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16000252536555-Broadcast-April-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071553025-16000252536555-Broadcast-April-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16025524545-Broadcast-March-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071639076-16025524545-Broadcast-March-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16323535236455_image003.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783071719264-16323535236455_image003.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/160002362251-Jan-2022-Broadcast.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788941095257-160002362251-Jan-2022-Broadcast.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1600256428111_Broadcast_Dec_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072023939-1600256428111_Broadcast_Dec_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Broadcast%20Nov%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072098530-Broadcast-Nov-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Oct%20try.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072193397-Oct-try.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Broadcast%20Sept.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072293187-Broadcast-Sept.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Broadcast%20Aug%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072385968-Broadcast-Aug-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Broadcast%20July%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072477414-Broadcast-July-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/June%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072753269-June-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/May%202021%20Final.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072761043-May-2021-Final.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/April2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072866665-April2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1617870701newsletter_march-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783072944477-1617870701newsletter_march-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1616076028newsletter_Feb-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783073017825-1616076028newsletter_Feb-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614184887_newsletter_Jan-2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783073091704-1614184887_newsletter_Jan-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_dec2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783073341608-newsletter_dec2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_nov2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783073432199-newsletter_nov2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_oct2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077403620-newsletter_oct2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_sep2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077431065-newsletter_sep2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_aug2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077475897-newsletter_aug2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_july2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077533588-newsletter_july2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613630273_newsletter_june20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077586735-1613630273_newsletter_june20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613630273_newsletter_may20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077645835-1613630273_newsletter_may20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613630273_newsletter_feb20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077708614-1613630273_newsletter_feb20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_jan20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783077774231-newsletter_jan20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613631047_newsletter_dec19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078289846-1613631047_newsletter_dec19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613631047_newsletter_nov19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078329423-1613631047_newsletter_nov19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613631047_newsletter_oct19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078374025-1613631047_newsletter_oct19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_sep19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078458490-newsletter_sep19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_aug19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078507001-newsletter_aug19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_july19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078553056-newsletter_july19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_june19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078587469-newsletter_june19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_may19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078629576-newsletter_may19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_april19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078680545-newsletter_april19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_march19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078726755-newsletter_march19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_feb19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078772596-newsletter_feb19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/newsletter_jan19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1783078806974-newsletter_jan19.pdf",
        permanent: true,
      },





      {
        source: "/document/Electrosteel-Europe-S.A..pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310382985-Electrosteel-Europe-SA.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Castings-\\(UK\\)-Ltd.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309253626-Electrosteel-Castings-%28UK%29-Ltd.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Trading-S.A..pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310290506-Electrosteel-Trading-SA.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Brasil-Tubos-e-Conexoes-Duteis.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309326371-Electrosteel-Brasil-Tubos-e-Conexoes-Duteis.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Castings-Gulf-FZE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309361520-Electrosteel-Castings-Gulf-FZE.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Doha-for-Trading-LLC.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309390280-Electrosteel-Doha-for-Trading-LLC.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Bahrain-Holding-W.L.L.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310352554-Electrosteel-Bahrain-Holding-WLL.pdf",
        permanent: true,
      },
      {
        source: "/document/Electrosteel-Algerie-SPA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309678425-Electrosteel-Algerie-SPA.pdf",
        permanent: true,
      },
      {
        source: "/document/Singardo-International-Pte-Ltd..pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309639595-Singardo-International-Pte-Ltd.pdf",
        permanent: true,
      },
      {
        source: "/document/145239564-Electrosteel-USA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310512629-145239564-Electrosteel-USA.pdf",
        permanent: true,
      },
      {
        source: "/document/745239564-Electrosteel-USA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310542106-745239564-Electrosteel-Europe-SA.pdf",
        permanent: true,
      },
      {
        source: "/document/635239564-Electrosteel%20Castings%20\\(UK\\)%20Limited_2024_03_31.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310573664-635239564-Electrosteel-Castings-%28UK%29-Limited_2024_03_31.pdf",
        permanent: true,
      },
      {
        source: "/document/2835239564-Electrosteel-Trading-SA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310611532-2835239564-Electrosteel-Trading-SA.pdf",
        permanent: true,
      },
      {
        source: "/document/2835239564-Electrosteel-Brazil-Ltda-Tubos-e-Conexeos-Duties.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310650978-2835239564-Electrosteel-Brazil-Ltda-Tubos-e-Conexeos-Duties.pdf",
        permanent: true,
      },
      {
        source: "/document/2735239564-Electrosteel-Casting-Gulf-FZE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310691105-2735239564-Electrosteel-Casting-Gulf-FZE.pdf",
        permanent: true,
      },
      {
        source: "/document/1635239564-Electrosteel-Doha-for-Trading-LLC.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310731326-1635239564-Electrosteel-Doha-for-Trading-LLC.pdf",
        permanent: true,
      },
      {
        source: "/document/1645239568-Electrosteel-Bahrain-Holding-WLL.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310813187-1645239568-Electrosteel-Bahrain-Holding-WLL.pdf",
        permanent: true,
      },
      {
        source: "/document/1645239568-Electrosteel-Algerie-SPA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310835019-1645239568-Electrosteel-Algerie-SPA.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1645239568-USA-Electrsoteel-USA-3-31-23-Audit.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787921811676-1645239568-USA-Electrsoteel-USA-3-31-23-Audit.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1989754632-UK-Electrosteel-Castings-\\(UK\\)-Limited-2023-03-31-Accounts-FINAL-SIGNED.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811544209-1989754632-UK-Electrosteel-Castings-%28UK%29-Limited-2023-03-31-Accounts-FINAL-SIGNED.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16533956-Spain-Financial-Statements-&-Memorandum-ETSA-22-23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787811636324-16533956-Spain-Financial-Statements---Memorandum-ETSA-22-23.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16856236-Gulf-Signed-Financial-Statement-ECGF-2022-23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787749926625-16856236-Gulf-Signed-Financial-Statement-ECGF-2022-23.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/13652569-Europe-Audit-Report-22-23-%20English.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787750092591-Europe-Audit-Report-22-23.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19865689-Doha-Electrosteel-Doha-for-Trading-LLC-FS-31-March-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787922172986-19865689-Doha-Electrosteel-Doha-for-Trading-LLC-FS-31-March-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1653265452-Brasil-Electrosteel-Brasil-firmado-JYU-Q4.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787922203113-1653265452-Brasil-Electrosteel-Brasil-firmado-JYU-Q4.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1652354-Bahrain-Electrosteel-Bahrain-Holding-WLL-Consolidated-FS-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787922230161-1652354-Bahrain-Electrosteel-Bahrain-Holding-WLL-Consolidated-FS-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1364986-Algeria_doc01055120230516150819.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787922267386-1364986-Algeria_doc01055120230516150819.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/23846257-Electrosteel-USA-LLC.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312616400-23846257-Electrosteel-USA-LLC.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/94235674-Electrosteel-Algerie-SPA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787312804218-94235674-Electrosteel-Algerie-SPA.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/6325487254-Electrosteel-Brasil-Ltda-Tubos-e-Conexoes-Duteis.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787135554515-6325487254-Electrosteel-Brasil-Ltda-Tubos-e-Conexoes-Duteis.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Electrosteel%20Doha%20For%20Trading%20LLC.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314518855-Electrosteel-Doha-For-Trading-LLC.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/21364886-Electrosteel-Castings-Gulf-FZE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314266507-Electrosteel-Castings-Gulf-FZE.pdf",
        permanent: true,
      },
      /////////////
      {
        source: "/admin/pdf/Electrosteel%20Algerie%20SPA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313003609-Electrosteel-Algerie-SPA.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/Electrosteel%20Bahrain%20Holding%20SPC%20Company.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313032620-Electrosteel-Bahrain-Holding-SPC-Company.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Electrosteel%20Brasil%20Tubos%20E%20Conexoes%20Duties.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314156163-Electrosteel-Brasil-Tubos-E-Conexoes-Duties.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Electrosteel%20Castings%20\\(UK\\)%20Limited.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314214828-Electrosteel-Castings-%28UK%29-Limited.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Electrosteel%20Castings%20Gulf%20FZE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314544928-Electrosteel-Castings-Gulf-FZE.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/236567458-Electrosteel-Europe-SA.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787311815113-236567458-Electrosteel-Europe-SA.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Electrosteel%20Trading%20SA%20Spain.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314491963-Electrosteel-Trading-SA-Spain.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Srikalahasthi%20Pipes%20Limited.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787314456135-Srikalahasthi-Pipes-Limited.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614406586electro-subsidiaries-19-20-09.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863647652-1614406586electro-subsidiaries-19-20-09.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333815_electro-subsidiaries-19-20-01.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863736834-1609333815_electro-subsidiaries-19-20-01.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333815_electro-subsidiaries-19-20-03.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863773538-1609333815_electro-subsidiaries-19-20-03.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333815_electro-subsidiaries-19-20-04.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863777527-1609333815_electro-subsidiaries-19-20-04.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333815_electro-subsidiaries-19-20-05.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863789300-1609333815_electro-subsidiaries-19-20-05.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614406166Electrosteel-Castings-Gulf-FZE-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863822471-1614406166Electrosteel-Castings-Gulf-FZE-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614406924electro-subsidiaries-19-20-07.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863822471-1614406166Electrosteel-Castings-Gulf-FZE-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614406676electro-subsidiaries-19-20-08.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788863624472-1614406676electro-subsidiaries-19-20-08.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614436510electrosteel-usa-llc-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861304088-1614436510electrosteel-usa-llc-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614436771mahadev-vyapaar-pvt-ltd-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861319235-1614436771mahadev-vyapaar-pvt-ltd-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614433972electrosteel-algerie-spa-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861331643-1614433972electrosteel-algerie-spa-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614434167electrosteel-bahrain-holding-spc-company-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861350795-1614434167electrosteel-bahrain-holding-spc-company-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333939_electrosteel-brasil-tubos-e-conexoes-duteis-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861363638-1609333939_electrosteel-brasil-tubos-e-conexoes-duteis-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333939_electrosteel-castings-uk-limited-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861387886-1609333939_electrosteel-castings-uk-limited-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609333939_electrosteel-castings-gulf-fze-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861418446-1609333939_electrosteel-castings-gulf-fze-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614435047electrosteel-doha-for-trading-llc-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788861434091-1614435047electrosteel-doha-for-trading-llc-2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614436066electrosteel-europe-sa-2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788862691234-electrosteel-europe-sa-2018-19.pdf",
        permanent: true,
      },

      ////////////////////////////////////////////
      {
        source: "/admin/pdf/1614440687Electrosteel-USA-LLC-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788849999119-1614440687Electrosteel-USA-LLC-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614440843Mahadev-Vyapaar-Pvt-Ltd-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788850078392-1614440843Mahadev-Vyapaar-Pvt-Ltd-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614439831Electrosteel-Algerie-SPA-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788850091424-1614439831Electrosteel-Algerie-SPA-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614439917Electrosteel-Bahrain-Holding-SPC-Company-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788851554982-1614439917Electrosteel-Bahrain-Holding-SPC-Company-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614440105Electrosteel-Brasil-LTDS-Tubos-e-Conexoes-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788850212776-1614440105Electrosteel-Brasil-LTDS-Tubos-e-Conexoes-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614440258Electrosteel-Castings-UK-Limited-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788850245916-1614440258Electrosteel-Castings-UK-Limited-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614406301Electrosteel-Doha-for-Trading-LLC-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788850299949-1614406301Electrosteel-Doha-for-Trading-LLC-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613472803_Electrosteel-Europe-SA-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788850322710-1613472803_Electrosteel-Europe-SA-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1613472803_Electrosteel-Trading-SA-Spain-16-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788848344426-1613472803_Electrosteel-Trading-SA-Spain-16-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice_of_Tribunal_Convened_Meeting_of_Unsecured_Creditors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309681871-Notice_of_Tribunal_Convened_Meeting_of_Unsecured_Creditors.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice_of_Tribunal_Convened_Meeting_of_Secured_Creditors.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309727590-Notice_of_Tribunal_Convened_Meeting_of_Secured_Creditors.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Notice_of_Tribunal_Convened_Meeting_of_Equity_Shareholders.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309766178-Notice_of_Tribunal_Convened_Meeting_of_Equity_Shareholders.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/NCLT%20Final%20Order%20091221.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309868685-NCLT-Final-Order-091221.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Further%20Submission%20of%20Documents%20to%20Stock%20Exchanges.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310038494-Further-Submission-of-Documents-to-Stock-Exchanges.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Report%20on%20Complaints%20submitted%20to%20BSE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310087028-Report-on-Complaints-submitted-to-BSE.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/NSE_Observation_Letter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310106157-NSE_Observation_Letter.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/BSE_Observation_Letter.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310138644-BSE_Observation_Letter.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Report_on_Complaints_submitted_to_NSE.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310173445-Report_on_Complaints_submitted_to_NSE.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Auditors-Certificate.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310262852-Auditors-Certificate.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Detailed-Compliance-Report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310291618-Detailed-Compliance-Report.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Draft-Scheme-of-Amalgamation.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310323553-Draft-Scheme-of-Amalgamation.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Fairness-Opinion.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310360255-Fairness-Opinion.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Report-from-Audit-Committee.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310392612-Report-from-Audit-Committee.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Valuation-Report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787310431446-Valuation-Report.pdf",
        permanent: true,
      },
      ////////////////////////////
      {
        source: "/admin/pdf/Export-Brochure.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787125250068-Export-Brochure.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Ductile-Iron-Pipes-and-Fittings.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787125210043-Ductile-Iron-Pipes-and-Fittings.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16000253_Electrolock_Clamp_Ring_10_05_22.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787124658140-16000253_Electrolock_Clamp_Ring_10_05_22.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Technical-Catalogue-Valves.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1786437498392-Technical-Catalogue-Valves.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/QMS-ISO9001-2015_updated_Dec2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848007688-QMS-ISO9001-2015_updated_Dec2025.pdf",
        permanent: true,
      },
      {
        source: "/document/1653524-ECL-SW-QMS-Certificate.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848014510-1653524-ECL-SW-QMS-Certificate.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/ISO-14001-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848085237-ISO-14001-2015.pdf",
        permanent: true,
      },
      {
        source: "/document/26452849-ECL-SW-EMS-Certificate.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848092247-26452849-ECL-SW-EMS-Certificate.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1635485-EnMS-Certificate-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848160162-1635485-EnMS-Certificate-2024.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/13852546_ISO_45001_2018_EXP_20_09_2025.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848237103-13852546_ISO_45001_2018_EXP_20_09_2025.pdf",
        permanent: true,
      },
      {
        source: "/document/13845275-OHS-789744-001-Final-Certificate-ISO-45001.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848241214-13845275-OHS-789744-001-Final-Certificate-ISO-45001.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/162312548-SA-8000-certificate_Aug23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848289205-162312548-SA-8000-certificate_Aug23.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1607522890EN598-%20KM%2052142.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848404188-1607522890EN598--KM-52142.pdf",
        permanent: true,
      },
      {
        source: "/document/165235485-KM-766609.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1785848411712-165235485-KM-766609.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1607095034EN545-%20KM%2039560.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787132196948-1607095034EN545--KM-39560.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/19436587-BIS-Pipes-License-&-Endorsement-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787564940400-19436587-BIS-Pipes-License-&-Endorsement-20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/2561325489-BIS-Fittings-License-&-Endorsement-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787564948018-2561325489-BIS-Fittings-License-&-Endorsement-14.pdf",
        permanent: true,
      },
      {
        source: "/document/Six-Month-EC-Compliance-\\(October-25-to-March-26\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787235658542-Six-Month-EC-Compliance-%28October-25-to-March-26%29.pdf",
        permanent: true,
      },
      {
        source: "/document/PDF.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1788348451877-Professional-Modern-CV-Resume-%281%29.pdf.pdf",
        permanent: true,
      },
      {
        source: "/document/Moef_letter_merged.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787235783657-Moef_letter_merged.pdf",
        permanent: true,
      },
      {
        source: "/document/136859-MOEFCC-Scan-Copy-Nov-24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787235806655-136859-MOEFCC-Scan-Copy-Nov-24.pdf",
        permanent: true,
      },
      {
        source: "/document/19562485-merged.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787235875811-19562485-merged.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/163235485_Binder1_april_sept_2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787235896486-163235485_Binder1_april_sept_2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/2956264896-Binder1.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787235979996-2956264896-Binder1.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16000245355454554-Binder1.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236118261-16000245355454554-Binder1.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Six%20monthly%20EC%20Compliance%20\\(April-21%20to%20Sep-21\\).pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236124406-Six-monthly-EC-Compliance-%28April-21-to-Sep-21%29.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Binder1_oct_march.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236235241-Binder1_oct_march.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1616760044_Binder1.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236235617-1616760044_Binder1.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609059381_ec-apr19-sep20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236366261-1609059381_ec-apr19-sep20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609059381_ec-oct19-mar20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236370934-1609059381_ec-oct19-mar20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609059603_ec-apr18-sep18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787234399719-ec-oct17-mar18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/ec-apr17-sep17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787234269001-ec-apr17-sep17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/ec-oct17-mar18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787234399719-ec-oct17-mar18.pdf",
        permanent: true,
      },
      {
        source: "/document/ECLSW-EC-compliance-report-Oct-25-to-Mar-26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236609752-ECLSW-EC-compliance-report-Oct-25-to-Mar-26.pdf",
        permanent: true,
      },
      {
        source: "/document/BMW-Annual-Report-2025-ECL-SW.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236640450-BMW-Annual-Report-2025-ECL-SW.pdf",
        permanent: true,
      },
      {
        source: "/document/EC-Compliance-Report-Apr-to-Sep-25-ECL.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236654579-EC-Compliance-Report-Apr-to-Sep-25-ECL.pdf",
        permanent: true,
      },
      {
        source: "/document/BMW-Annual-Report-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236744634-BMW-Annual-Report-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/EC-Compliance-report-Oct'24-to-Mar'25-ECL-SW.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787236780588-EC-Compliance-report-Oct'24-to-Mar'25-ECL-SW.pdf",
        permanent: true,
      },
      {
        source: "/document/17264823-EC-Compliance-Report-October-23-to-March-24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787234609206-17264823-EC-Compliance-Report-October-23-to-March-24.pdf",
        permanent: true,
      },
      {
        source: "/document/856236525-Environmental-Clearance-Compliance-Report-SW-April-2023-to-september-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787234663059-856236525-Environmental-Clearance-Compliance-Report-SW-April-2023-to-september-2023.pdf",
        permanent: true,
      },
      {
        source: "/document/UNGC-CERTIFICATE-Electrosteel-Khardah-Works-2025-26.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787237047187-UNGC-CERTIFICATE-Electrosteel-Khardah-Works-2025-26.pdf",
        permanent: true,
      },
      {
        source: "/document/1526349-Half-yearly--Compliance-report.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787237144452-1526349-Half-yearly--Compliance-report.pdf",
        permanent: true,
      },
      {
        source: "/document/281673495-UNGC-CERTIFICATE-ELECTROSTEEL-KHARDAH-WORKS_24_25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787237135693-281673495-UNGC-CERTIFICATE-ELECTROSTEEL-KHARDAH-WORKS_24_25.pdf",
        permanent: true,
      },
      {
        source: "/document/1632542-EC-Copy-ECL-KW.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787234787669-1632542-EC-Copy-ECL-KW.pdf",
        permanent: true,
      },
      {
        source: "/pdf/employment_form.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787056379023-employment_form.pdf",
        permanent: true,
      },
      {
        source: "/document/38645269-Financial-Results-for-the-Quarter-and-Year-ended-31-March-2024.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307939648-38645269-Financial-Results-for-the-Quarter-and-Year-ended-31-March-2024.pdf",
        permanent: true,
      },
      {
        source: "/document/38645269-Financial-Results-for-the-quarter-ended-31st-December-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308109026-38645269-Financial-Results-for-the-quarter-ended-31st-December-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/182546325-Financial-Results-for-the-quarter-ended-30th-June-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307980331-182546325-Financial-Results-for-the-quarter-ended-30th-June-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/26956489-Financial-Results-for-the-quarter-and-year-ended-31st-March-2023.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308317774-26956489-Financial-Results-for-the-quarter-and-year-ended-31st-March-2023.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/16235458-Financial-Results-for-the-quarter-ended-31-December-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308331416-16235458-Financial-Results-for-the-quarter-ended-31-December-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/18254635478-Financial-Results-for-the-quarter-ended-30-September-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308341018-18254635478-Financial-Results-for-the-quarter-ended-30-September-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1365482875-Financial-Results-for-the-Quarter-ended-30-June-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308351397-1365482875-Financial-Results-for-the-Quarter-ended-30-June-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1602355855850-Financial-Results-for-the-Quarter-and-Year-ended-31st-March-2022.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308438694-1602355855850-Financial-Results-for-the-Quarter-and-Year-ended-31st-March-2022.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial_Results_30_09_2021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308454250-Financial_Results_30_09_2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial%20Results%20for%20the%20Quarter%20ended%2030th%20June%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787308479181-Financial-Results-for-the-Quarter-ended-30th-June-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial%20Results%20for%20the%20quarter%20and%20year%20ended%2031st%20March%202021.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787557487147-Financial-Results-for-the-quarter-and-year-ended-31st-March-2021.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial_Results_for_the_quarter_ended_31st_December_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787557513320-Financial_Results_for_the_quarter_ended_31st_December_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Financial_Results_for_the_quarter_ended_30th_September_2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787557532813-Financial_Results_for_the_quarter_ended_30th_September_2020.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/qr-june-30-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787557549232-qr-june-30-2020.pdf",
        permanent: true,
      },
      {
        source: "/document/556235438-Annual-Report-2023-24.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306972321-556235438-Annual-Report-2023-24.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/185623548-Annual-Report-2022-23.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307051344-185623548-Annual-Report-2022-23.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/59652478-Annual-Report-2021-22.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307187207-59652478-Annual-Report-2021-22.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/Annual%20Report%202020-21.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787307278024-Annual-Report-2020-21.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609327898_ECL_Annual_Report_2019-20.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313170232-1609327898_ECL_Annual_Report_2019-20.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609327954_annual_report_2018-19.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313255230-1609327954_annual_report_2018-19.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609328011_annual_report_2017-18.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313321284-1609328011_annual_report_2017-18.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609328060_annual_report_2016-17.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313364280-1609328060_annual_report_2016-17.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609328344_annual_report_2015-16.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313412138-1609328344_annual_report_2015-16.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609328392_annual_report_2014-15.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313448858-1609328392_annual_report_2014-15.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609595736_annual_report_2013-14.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313516095-1609595736_annual_report_2013-14.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609595883_annual_report_2012-13.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313557504-1609595883_annual_report_2012-13.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609595931_annual_report_2011-12.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313597492-1609595931_annual_report_2011-12.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609595978_annual_report_2010-11.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313639515-1609595978_annual_report_2010-11.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609596062_annual_report_2009-10.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787313672341-1609596062_annual_report_2009-10.pdf",
        permanent: true,
      },


      {
        source: "/admin/pdf/1608529063electrotuff.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1782736387725-1608529063electrotuff.pdf",
        permanent: true,
      },
      //////////////////////
      {
        source: "/admin/pdf/1609581680_qr-mar-31-2020.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309472488-1609581680_qr-mar-31-2020.pdf",
        permanent: true,
      },

      {
        source: "/admin/pdf/1609581680_qr-dec-31-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309509320-1609581680_qr-dec-31-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614430971qr-sep-30-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1790675375897-1614430971qr-sep-30-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614431313qr-june-30-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787309533036-1614431313qr-june-30-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609581765_qr-mar-31-2019.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787328868118-1609581765_qr-mar-31-2019.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609581765_qr-dec-31-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787328885166-1609581765_qr-dec-31-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614431466qr-sep-30-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787328900058-1614431466qr-sep-30-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614431583qr-june-30-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787328923885-1614431583qr-june-30-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609581829_qr-mar-31-2018.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329024910-1609581829_qr-mar-31-2018.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614431860qr-dec-31-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329045438-1614431860qr-dec-31-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614431960qr-sep-30-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329064585-1614431960qr-sep-30-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432057qr-june-30-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329083284-1614432057qr-june-30-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609581916_qr-mar-31-2017.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329175723-1609581916_qr-mar-31-2017.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432176qr-dec-31-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329189586-1614432176qr-dec-31-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432285qr-sep-30-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329202235-1614432285qr-sep-30-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432423qr-june-30-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329212791-1614432423qr-june-30-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609581963_qr-mar-31-2016.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329291066-1609581963_qr-mar-31-2016.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432504qr-dec-31-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329305763-1614432504qr-dec-31-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432638qr-sep-30-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329326588-1614432638qr-sep-30-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614432979qr-june-30-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329392716-1614432979qr-june-30-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1609582009_qr-mar-31-2015.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329489679-1609582009_qr-mar-31-2015.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614433067qr-dec-31-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329526479-1614433067qr-dec-31-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614433161qr-sep-30-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329544649-1614433161qr-sep-30-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1614433233qr-june-30-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329555611-1614433233qr-june-30-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619539334_qr-mar-31-2014.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329718978-1619539334_qr-mar-31-2014.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619539334_qr-dec-31-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329742289-1619539334_qr-dec-31-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619539334_qr-sep-30-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329798845-1619539334_qr-sep-30-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619539334_qr-june-30-2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787329821682-1619539334_qr-june-30-2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540715_Unaudited_Financial_Result_Mar_2013.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330073484-1619540715_Unaudited_Financial_Result_Mar_2013.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540715_Unaudited_Financial_Result_Dec_2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330107378-1619540715_Unaudited_Financial_Result_Dec_2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540715_Quarter-ended-30th-September-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330135605-1619540715_Quarter-ended-30th-September-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540715_june-30-2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330164871-1619540715_june-30-2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540944_Quarter-and-Year-ended-31stMarch2012.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330476906-1619540944_Quarter-and-Year-ended-31stMarch2012.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540944_quarter-ended-31st-December2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330510445-1619540944_quarter-ended-31st-December2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619540944_Quarter-ended-30th-June2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330493967-1619540944_Quarter-ended-30th-June2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619541226_quarter-31stMarch-2011.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330544715-1619541226_quarter-31stMarch-2011.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619541226_Quarter-ended-30th-September-2010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330573544-1619541226_Quarter-ended-30th-September-2010.pdf",
        permanent: true,
      },
      {
        source: "/admin/pdf/1619541226_Quarter%20ended%2030th%20June%202010.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787330593553-1619541226_Quarter-ended-30th-June-2010.pdf",
        permanent: true,
      },
      {
        source: "/document/Annual-Report-2024-25.pdf",
        destination: "https://www.electrosteel.com/electrosteel-static-assets/1787306831763-Annual-Report-2024-25.pdf",
        permanent: true,
      },
      {
        source: "/investor/annual-report-archive.php",
        destination: "https://www.electrosteel.com/investors/reports-and-accounts/archive-annual-report",
        permanent: true,
      },
      {
        source: "/products/valves-overview.php",
        destination: "https://www.electrosteel.com/products/valves",
        permanent: true,
      },

      {
        source: "/products/other-products.php#cast-iron-pipes",
        destination: "https://www.electrosteel.com/products/cast-iron-pipes",
        permanent: true,
      },
      {
        source: "/products/other-products.php#metallurgical-coke",
        destination: "https://www.electrosteel.com/products/other-products#metallurgical-coke-",
        permanent: true,
      },
      {
        source: "/products/other-products.php#sponge-iron",
        destination: "https://www.electrosteel.com/products/other-products#sponge-iron-",
        permanent: true,
      },
      {
        source: "/products/other-products.php#silico-manganese-ferro-alloy",
        destination: "https://www.electrosteel.com/products/other-products#silico-manganese-ferro-alloy-",
        permanent: true,
      },
      {
        source: "/products/other-products.php#gold-cement",
        destination: "https://www.electrosteel.com/products/other-products#spl-gold-cement",
        permanent: true,
      },
      {
        source: "/products/other-products.php#ferro-silicon",
        destination: "https://www.electrosteel.com/products/other-products#sponge-iron-",
        permanent: true,
      },
      {
        source: "/products/other-products.php#pig-iron",
        destination: "https://www.electrosteel.com/products/other-products#pig-iron",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
