import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShelfCheck — Fix Google Shopping catalog issues on Shopify",
    template: "%s | ShelfCheck by Skuform",
  },
  description:
    "Audit Shopify products against Google Merchant Center rules. Find missing GTINs, brand, apparel attributes, and silent sync gaps — then fix them before ads die.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shelfcheck.io"),
  openGraph: {
    title: "ShelfCheck by Skuform",
    description: "Catalog health for Google Shopping on Shopify.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col pt-[4.25rem] antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
