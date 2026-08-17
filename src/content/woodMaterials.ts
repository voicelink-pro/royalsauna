import type { WoodMaterial } from "@/types";

/**
 * Catalogue of woods used across the Regenerum line, shown on
 * /specyfikacja/drewno. ThermoWood forms the shell and floor; aspen is used
 * for benches and headrests.
 */
export const woodMaterials: WoodMaterial[] = [
  {
    id: "thermowood",
    image: {
      src: "/images/swierk-quality.jpg",
      alt: "Bryła sauny wykonana z termowanego świerku ThermoWood",
    },
    elements: [
      {
        image: {
          src: "/images/swierk-quality.jpg",
          alt: "Bryła sauny wykonana z ThermoWood",
        },
        i18n: {
          pl: { label: "Bryła sauny" },
          en: { label: "Sauna shell" },
        },
      },
      {
        image: {
          src: "/images/termowood-podloga.jpg",
          alt: "Podłoga sauny wykonana z ThermoWood",
        },
        i18n: {
          pl: { label: "Podłoga" },
          en: { label: "Floor" },
        },
      },
    ],
    i18n: {
      pl: {
        name: "ThermoWood",
        usageTag: "Bryła i podłoga",
        description:
          "Z ThermoWood, czyli termowanego świerku budujemy bryłę sauny oraz podłogę. To ten sam szlachetny świerk, poddany obróbce termicznej w temperaturze 180–230°C z użyciem wyłącznie pary wodnej, bez chemii. Dzięki temu jest wyjątkowo odporny na wilgoć, stabilny wymiarowo i gotowy na wymagające warunki sauny przez długie lata.",
      },
      en: {
        name: "ThermoWood",
        usageTag: "Shell & floor",
        description:
          "We build the sauna shell and floor from ThermoWood – thermally modified spruce. It is the same fine spruce, heat-treated at 180–230°C using only steam, with no chemicals. The result is outstanding moisture resistance, dimensional stability and a material made for the demanding conditions inside a sauna for many years.",
      },
    },
  },
  {
    id: "aspen",
    image: {
      src: "/images/osika.jpg",
      alt: "Struktura drewna osiki",
    },
    elements: [
      {
        image: {
          src: "/images/included-benches.jpg",
          alt: "Ławy i 2 zagłówki wykonane z osiki",
        },
        i18n: {
          pl: { label: "Ławy i 2 zagłówki" },
          en: { label: "Benches & 2 headrests" },
        },
      },
    ],
    i18n: {
      pl: {
        name: "Osika",
        usageTag: "Ławy i 2 zagłówki",
        description:
          "Ławy wykonujemy z drewna osikowego premium, a w standardzie dołączamy 2 zagłówki z osiki – drewna delikatnego i niezwykle przyjemnego w dotyku, które nawet w wysokiej temperaturze nie parzy skóry. Osika ma jednolitą, gładką strukturę i mało żywicy, dzięki czemu nie plami ciała i skutecznie odprowadza wilgoć, zachowując świeżość przez lata.",
      },
      en: {
        name: "Aspen",
        usageTag: "Benches & 2 headrests",
        description:
          "We make the benches from premium aspen wood and include 2 aspen headrests as standard – a gentle wood that's remarkably pleasant to the touch and stays cool enough not to burn skin even at high temperatures. Aspen has a smooth, even grain with little resin, so it won't mark your skin and sheds moisture well, staying fresh for years.",
      },
    },
  },
];
