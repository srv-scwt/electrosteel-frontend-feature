import { Bebas_Neue, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/common/CookieConsent";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header";
import RouteProgressBar from "@/components/common/RouteProgressBar";
import Script from "next/script";
import { buildMetadata, SITE_URL } from "@/utils/seo";

const GA_MEASUREMENT_ID = "G-XWV3KZGKH5";
const GOOGLE_SITE_VERIFICATION = "bi3Eb-nIxQc77-9DTP9gA71G8uV3OiPV0hSWRFHSiFM";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", 
  variable: "--font-bebas-neue",
});

// comment

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: [
    "100", "200","300","400","500","600","700","800","900", 
  ],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900",
  ],
  variable: "--font-poppins",
});

export const metadata = {
  ...buildMetadata({ currentURL: SITE_URL }),
  // Renders <meta name="google-site-verification" content="..." /> for Search Console.
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};
// comment2212
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${montserrat.variable} ${poppins.variable} antialiased`}>
        {/* Google Analytics (gtag.js). afterInteractive keeps it out of the
            critical path while still loading on every route. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <RouteProgressBar />
        <Header/>
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
