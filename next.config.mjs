/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Legacy RoyalSauna S/M/L → Regenerum Compact/Comfort/Premium
      { source: "/sauny/royalsauna-s", destination: "/sauny/compact", permanent: true },
      { source: "/sauny/royalsauna-m", destination: "/sauny/comfort", permanent: true },
      { source: "/sauny/royalsauna-l", destination: "/sauny/premium", permanent: true },
      { source: "/en/saunas/royalsauna-s", destination: "/en/saunas/compact", permanent: true },
      { source: "/en/saunas/royalsauna-m", destination: "/en/saunas/comfort", permanent: true },
      { source: "/en/saunas/royalsauna-l", destination: "/en/saunas/premium", permanent: true },
      // Legacy Cubus 2/3/5 → Compact/Comfort/Premium
      { source: "/sauny/cubus-2", destination: "/sauny/compact", permanent: true },
      { source: "/sauny/cubus-3", destination: "/sauny/comfort", permanent: true },
      { source: "/sauny/cubus-5", destination: "/sauny/premium", permanent: true },
      { source: "/en/saunas/cubus-2", destination: "/en/saunas/compact", permanent: true },
      { source: "/en/saunas/cubus-3", destination: "/en/saunas/comfort", permanent: true },
      { source: "/en/saunas/cubus-5", destination: "/en/saunas/premium", permanent: true },
      // Specification page renamed: jakosc → specyfikacja; heaters split into own page.
      { source: "/jakosc", destination: "/specyfikacja", permanent: true },
    ];
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];
    const longCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=2592000, stale-while-revalidate=31536000",
      },
    ];
    return [
      { source: "/(.*)", headers: security },
      { source: "/hero-frames/:path*", headers: longCache },
      { source: "/hero-frames-mobile-day/:path*", headers: longCache },
      { source: "/hero-frames-night/:path*", headers: longCache },
      { source: "/images/:path*", headers: longCache },
      { source: "/videos/:path*", headers: longCache },
      { source: "/logo.png", headers: longCache },
      { source: "/logo.webp", headers: longCache },
    ];
  },
};

export default nextConfig;
