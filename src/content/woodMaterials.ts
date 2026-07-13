import type { WoodMaterial } from "@/types";

/**
 * Catalogue of the three woods used across the Regenerum line, shown on
 * /specyfikacja/drewno. Each material lists the finished sauna elements it's
 * used for, with a photo slot for each.
 */
export const woodMaterials: WoodMaterial[] = [
  {
    id: "spruce",
    image: {
      src: "/images/swierk-quality.jpg",
      alt: "Bryła sauny wykonana ze świerku skandynawskiego",
    },
    elements: [],
    i18n: {
      pl: {
        name: "Świerk skandynawski",
        usageTag: "Bryła sauny",
        description:
          "Ze świerku skandynawskiego budujemy całą bryłę sauny – ściany, dach i konstrukcję. To drewno z chłodnego, północnego klimatu rośnie wolniej niż w cieplejszych szerokościach geograficznych, dzięki czemu jest gęstsze, bardziej stabilne i lepiej znosi wilgoć oraz zmiany temperatury. Z czasem nabiera głębszego, ciepłego koloru i przyjemnie pachnie żywicą.",
      },
      en: {
        name: "Scandinavian spruce",
        usageTag: "Sauna shell",
        description:
          "We build the entire sauna shell – walls, roof and structure – from Scandinavian spruce. Grown slowly in a cool, northern climate, it's denser and more stable, and copes better with moisture and temperature swings. Over time it takes on a deeper, warm colour and a pleasant scent of resin.",
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
          alt: "Ławy i zagłówki wykonane z osiki",
        },
        i18n: {
          pl: { label: "Ławy i zagłówki" },
          en: { label: "Benches & headrests" },
        },
      },
    ],
    i18n: {
      pl: {
        name: "Osika",
        usageTag: "Ławy i zagłówki",
        description:
          "Ławy i zagłówki wykonujemy z osiki – drewna delikatnego i niezwykle przyjemnego w dotyku, które nawet w wysokiej temperaturze nie parzy skóry. Osika ma jednolitą, gładką strukturę i mało żywicy, dzięki czemu nie plami ciała i skutecznie odprowadza wilgoć, zachowując świeżość przez lata.",
      },
      en: {
        name: "Aspen",
        usageTag: "Benches & headrests",
        description:
          "We make the benches and headrests from aspen – a gentle wood that's remarkably pleasant to the touch and stays cool enough not to burn skin even at high temperatures. Aspen has a smooth, even grain with little resin, so it won't mark your skin and sheds moisture well, staying fresh for years.",
      },
    },
  },
  {
    id: "thermowood",
    image: {
      src: "/images/termowood-podloga.jpg",
      alt: "Podłoga sauny wykonana z termowood",
    },
    elements: [],
    i18n: {
      pl: {
        name: "Termowood",
        usageTag: "Podłoga",
        description:
          "Podłogę wykonujemy z termowood – drewna poddanego obróbce termicznej w wysokiej temperaturze, bez użycia chemii. Proces ten zwiększa jego odporność na wilgoć i grzyby, a przede wszystkim ogranicza nagrzewanie powierzchni, dzięki czemu stopy przez cały seans czują komfortową temperaturę.",
      },
      en: {
        name: "Thermowood",
        usageTag: "Floor",
        description:
          "We make the floor from thermowood – wood heat-treated at high temperature with no chemicals involved. The process boosts its resistance to moisture and fungus, and above all keeps the surface from heating up too much, so your feet stay comfortable through the whole session.",
      },
    },
  },
];
