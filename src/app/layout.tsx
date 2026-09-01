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
    "RoyalSauna – sauny ogrodowe premium z drewna skandynawskiego. Jeden model w trzech wariantach. Prywatne domowe spa w Twoim ogrodzie.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      {/*
        Cookiebot + trackers must NOT sit in a manual <head>.
        Next manages <head> itself; wrapping beforeInteractive Scripts in an
        explicit <head> is a known Cookiebot/Next hydration mismatch.
        beforeInteractive still hoists Cookiebot early from the root layout body.
      */}
      <body className="min-h-screen antialiased">
        <CookiebotProvider />
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
        <MetaPixelProvider />
        <ClarityProvider />
        <GoogleTagManager gtmId={GTM_ID} />
      </body>
    </html>
  );
}
