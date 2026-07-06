import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { GTMProvider, GTMNoScript } from "@/components/analytics/GTMProvider";
import { MetaPixelProvider } from "@/components/analytics/MetaPixelProvider";
import { ClarityProvider } from "@/components/analytics/ClarityProvider";
import { getSiteUrl } from "@/lib/site";

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
        <GTMProvider />
        <MetaPixelProvider />
        <ClarityProvider />
      </head>
      <body className="min-h-screen antialiased">
        <GTMNoScript />
        {children}
      </body>
    </html>
  );
}
