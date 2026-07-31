import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "./components/navbar";
import "./globals.css";
import Footer from "./components/footer";
import Providers from "./providers";
import ShippingCountriesDropdown from "./components/currency-selector";
import { SITE_NAME, SITE_URL } from "./utils/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Swimwear For Endless Summer Days`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "WLVE swimwear — vibrant, sun-kissed, unforgettable. Shop the latest collection of swimwear designed for endless summer days.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Analytics />
          <Navbar />
          {children}
            <ShippingCountriesDropdown />
          <Footer />
          
        </Providers>
      </body>
    </html>
  );
}
