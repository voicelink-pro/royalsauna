/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
