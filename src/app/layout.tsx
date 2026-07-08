import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { MetaPixelProvider } from "@/components/analytics/MetaPixelProvider";
import { ClarityProvider } from "@/components/analytics/ClarityProvider";
import { CookiebotProvider } from "@/components/analytics/CookiebotProvider";
import { getSiteUrl } from "@/lib/site";

/** GTM-KMWKNDBD — GA4 is configured inside the GTM container, not hardcoded here. */
const GTM_ID = "GTM-KMWKNDBD";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "RoyalSauna – premium sauny ogrodowe",
    template: "%s · RoyalSauna",
  },
  description:
    "RoyalSauna – sauny ogrodowe premium z estońskiego świerka. Jeden model w trzech rozmiarach. Prywatne domowe spa w Twoim ogrodzie.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <CookiebotProvider />
        <MetaPixelProvider />
        <ClarityProvider />
      </head>
      <body className="min-h-screen antialiased">
        {/* Google Tag Manager (noscript) — fallback for visitors with JS disabled */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {children}
        <GoogleTagManager gtmId={GTM_ID} />
      </body>
    </html>
  );
}
