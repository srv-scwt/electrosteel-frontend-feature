import JsonLd from "@/components/common/JsonLd";

// Structured data for search engines. Home page only.
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.electrosteel.com/#webpage",
  url: "https://www.electrosteel.com/",
  name: "Electrosteel Castings Limited",
  description:
    "Electrosteel Castings Limited is a leading manufacturer of ductile iron pipes, fittings and related pipeline products for water and infrastructure applications.",
  inLanguage: "en-IN",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Electrosteel Castings Limited",
  alternateName: "ECL",
  url: "https://www.electrosteel.com/",
  logo: "https://www.electrosteel.com/images/logo.png",
  sameAs: [
    "https://www.facebook.com/ElectrosteelGroup/",
    "https://x.com/ElectrosteelG",
    "https://www.instagram.com/electrosteel_group",
    "https://www.youtube.com/@electrosteelgroupofficial9185",
    "https://www.linkedin.com/company/18119245/",
    "https://en.wikipedia.org/wiki/Electrosteel_Castings",
  ],
};

// The schema is rendered here rather than in page.jsx because loading.js
// wraps the page in a streamed Suspense boundary but not this layout. Inside
// that boundary React ships the tag in a hidden container and moves it into
// place, which schema validators report as a second copy.
export default function HomeLayout({ children }) {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={organizationJsonLd} />
      {children}
    </>
  );
}
