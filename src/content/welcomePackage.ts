/**
 * Items showcased on /specyfikacja/pakiet-powitalny.
 * Photos live in `public/images/pakiet/`. Banner: `pakiet-powitalny-banner.jpg`.
 *
 * `frame: "tall"` — taller box + contain, so vertical products stay fully visible.
 */
export const welcomePackageItems = [
  {
    id: "towels",
    image: "/images/pakiet/recznik.jpg",
    alt: { pl: "Ręczniki saunowe", en: "Sauna towels" },
    frame: "tall" as const,
  },
  {
    id: "bucketLadle",
    image: "/images/pakiet/cebrzyk.jpg",
    alt: { pl: "Cebrzyk i czerpak saunowy", en: "Sauna bucket and ladle" },
    frame: "tall" as const,
  },
  {
    id: "headrests",
    image: "/images/pakiet/zaglowki.jpg",
    alt: { pl: "Zagłówki saunowe", en: "Sauna headrests" },
    frame: "standard" as const,
  },
  {
    id: "thermoHygro",
    image: "/images/pakiet/termometr-higrometr.jpg",
    alt: {
      pl: "Termometr i higrometr",
      en: "Thermometer and hygrometer",
    },
    frame: "standard" as const,
  },
  {
    id: "timer",
    image: "/images/pakiet/klepsydra.jpg",
    alt: { pl: "Klepsydra saunowa", en: "Sauna sand timer" },
    frame: "tall" as const,
  },
  {
    id: "heaterStones",
    image: "/images/pakiet/piec-kamienie.jpg",
    alt: { pl: "Piec i kamienie saunowe", en: "Heater and sauna stones" },
    frame: "tall" as const,
  },
] as const;

export type WelcomePackageItemId = (typeof welcomePackageItems)[number]["id"];
