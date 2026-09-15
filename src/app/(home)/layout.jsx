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

// The schema is rendered here rather than in page.jsx because loading.js
// wraps the page in a streamed Suspense boundary but not this layout. Inside
// that boundary React ships the tag in a hidden container and moves it into
// place, which schema validators report as a second copy.
export default function HomeLayout({ children }) {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      {children}
    </>
  );
}
