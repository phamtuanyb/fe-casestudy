import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import UIProvider from "@/components/UIProvider";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Phần mềm Marketing AI đa kênh #1 Việt Nam — tự động hoá Zalo, Facebook, TikTok cho doanh nghiệp.",
  sameAs: ["https://www.facebook.com/phanmemmkt", "https://www.youtube.com/@phanmemmkt"],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "vi-VN",
};

// Font chính của thiết kế — Be Vietnam Pro, weights 400–900.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MKT Showcase — Câu chuyện khách hàng thật",
    template: "%s · MKT Showcase",
  },
  description:
    "Câu chuyện thật, số liệu thật, gương mặt thật từ khách hàng dùng giải pháp của MKT Software.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>
        <JsonLd data={orgJsonLd} />
        <JsonLd data={siteJsonLd} />
        <UIProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
            <Nav />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
          <FloatingCTA />
        </UIProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
