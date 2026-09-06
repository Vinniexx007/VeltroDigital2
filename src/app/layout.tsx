import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PAGE_METADATA } from "@/lib/seo/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.veltrodigital.co.uk"),
  title: {
    default:
      "Veltro Digital | Websites for Small Businesses in the North West",
    template: "%s | Veltro Digital",
  },
  description: PAGE_METADATA.home.description,
  icons: {
    icon: "/logo/veltro-digital-favicon-symbol.png",
  },
  openGraph: {
    siteName: "Veltro Digital",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
