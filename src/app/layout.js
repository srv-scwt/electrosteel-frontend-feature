import { Bebas_Neue, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/common/CookieConsent";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header";
import { buildMetadata, SITE_URL } from "@/utils/seo";

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

export const metadata = buildMetadata({ currentURL: SITE_URL });
// comment2212
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${montserrat.variable} ${poppins.variable} antialiased`}>
        <Header/>
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
