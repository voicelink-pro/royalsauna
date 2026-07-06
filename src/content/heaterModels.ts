import type { HeaterModel, HeaterModelId, ModelId } from "@/types";

/**
 * Catalogue of named heaters (brand + controller) available across the
 * Regenerum line, shown on the /specyfikacja/piece page.
 *
 * Specification sourced from the manufacturer's (Harvia) product pages.
 */
export const heaterModels: HeaterModel[] = [
  {
    id: "cilindro",
    name: "Harvia Cilindro PC90XW WiFi Steel",
    productCode: "HPC904XW",
    family: "Cilindro",
    mounting: "standing",
    color: "steel",
    powerKw: 9.0,
    volumeM3: { min: 8, max: 14 },
    controller: "Harvia Xenio WiFi",
    wifiApp: "MyHarvia WiFi",
    requiresControlLicense: false,
    stonesKg: 90,
    dimensionsMm: { height: 930, width: 320, depth: 320 },
    image: {
      src: "/images/heater-harvia-cilindro.jpg",
      alt: "Piec Harvia Cilindro PC90XW WiFi Steel",
    },
    i18n: {
      pl: {
        highlight: "Uniwersalny wybór do sauny 8–14 m³",
        description:
          "Nowoczesny piec kolumnowy z dużą pojemnością kamieni, który daje łagodną, przyjemną parę. Uruchomisz go z telefonu przez aplikację MyHarvia, a czujnik drzwi zapewnia bezpieczne uruchamianie zdalne. Piec można też wkomponować w ławy sauny.",
      },
      en: {
        highlight: "A versatile choice for an 8–14 m³ sauna",
        description:
          "A modern column heater with a generous stone capacity that produces soft, pleasant steam. Start it from your phone with the MyHarvia app, with a door sensor ensuring safe remote start-up. The heater can also be built into the sauna benches.",
      },
    },
  },
  {
    id: "legend",
    name: "Harvia Legend PO70FC WiFi Black",
    productCode: "HPO704FC",
    family: "Legend",
    mounting: "standing",
    color: "black",
    powerKw: 6.8,
    volumeM3: null,
    controller: "Harvia Fenix WiFi",
    wifiApp: "MyHarvia WiFi",
    requiresControlLicense: true,
    stonesKg: 100,
    dimensionsMm: { height: 1060, width: 325, depth: 325 },
    image: {
      src: "/images/heater-harvia-legend.jpg",
      alt: "Piec Harvia Legend PO70FC WiFi Black",
    },
    i18n: {
      pl: {
        highlight: "Największa pojemność kamieni – 100 kg",
        description:
          "Czarny, designerski piec kolumnowy o rustykalnym stylu z aż 100 kg kamieni. Mocniejszą parę uzyskasz, polewając wodą górę pieca, a łagodniejszą – polewając boki. Wbudowane kanały wentylacyjne ze stali nierdzewnej przyspieszają nagrzewanie i równomiernie rozprowadzają ciepło.",
      },
      en: {
        highlight: "The largest stone capacity – 100 kg",
        description:
          "A black, design-led column heater with a rustic style and as much as 100 kg of stones. Pour water on top for stronger steam, or on the sides for a softer one. Built-in stainless-steel vent channels speed up heat-up and spread heat evenly.",
      },
    },
  },
  {
    id: "spirit",
    name: "Harvia Spirit SP90FC WiFi",
    productCode: "HSP904MFC",
    family: "Spirit",
    mounting: "hanging",
    color: "black",
    powerKw: 9.0,
    volumeM3: { min: 8, max: 14 },
    controller: "Harvia Fenix WiFi",
    wifiApp: "MyHarvia WiFi",
    requiresControlLicense: true,
    stonesKg: 60,
    dimensionsMm: { height: 750, width: 385, depth: 335 },
    image: {
      src: "/images/heater-harvia-spirit.jpg",
      alt: "Piec Harvia Spirit SP90FC WiFi",
    },
    i18n: {
      pl: {
        highlight: "Najbardziej kompaktowy, ścienny design",
        description:
          "Ścienny piec o nowoczesnym, zaokrąglonym kształcie, produkowany w Finlandii. Wbudowane kanały wentylacyjne zapewniają szybkie nagrzewanie, a zintegrowany system bezpieczeństwa pozwala na zdalne użytkowanie bez osobnego czujnika drzwi – piec wyłączy się automatycznie, jeśli coś zostanie położone na górze.",
      },
      en: {
        highlight: "The most compact, wall-mounted design",
        description:
          "A wall-hung heater with a modern, rounded shape, made in Finland. Built-in vent channels give a fast heat-up, and an integrated safety system allows remote use without a separate door sensor – the heater switches off automatically if something is placed on top.",
      },
    },
  },
];

/** Which named heaters are offered for each cabin size. */
export const heaterModelsByProduct: Record<ModelId, HeaterModelId[]> = {
  compact: ["cilindro", "legend", "spirit"],
  comfort: ["cilindro", "legend", "spirit"],
  premium: ["cilindro", "legend"],
};

export function getHeaterModel(id: HeaterModelId): HeaterModel | undefined {
  return heaterModels.find((h) => h.id === id);
}
