import type { FoundationType } from "@/types";

/**
 * The three foundation/base types we recommend under Regenerum saunas, shown
 * on /specyfikacja/podloze. Add the matching photos to public/images/spec/
 * under these exact filenames and they'll appear automatically:
 *   - podloze-plyta.jpg
 *   - podloze-bloczki.jpg
 *   - podloze-kostka.jpg
 */
export const foundationTypes: FoundationType[] = [
  {
    id: "slab",
    image: {
      src: "/images/spec/podloze-plyta.jpg",
      alt: "Podłoże z płyty betonowej pod saunę ogrodową",
    },
    i18n: {
      pl: {
        name: "Płyta betonowa",
        description:
          "Najbardziej stabilne i trwałe rozwiązanie – jedna, zbrojona płyta pod całą saunę. Odporna na osiadanie i idealnie równa.",
        compare: {
          cost: "Wyższy",
          time: "5–7 dni + ok. 4 tyg. sezonowania",
          difficulty: "Wymaga fachowca",
          drainage: "Bardzo dobre (ze spadkiem)",
        },
      },
      en: {
        name: "Concrete slab",
        description:
          "The most stable and durable option – one reinforced slab under the whole sauna. Resistant to settling and perfectly level.",
        compare: {
          cost: "Higher",
          time: "5–7 days + approx. 4 weeks curing",
          difficulty: "Needs a professional",
          drainage: "Very good (sloped)",
        },
      },
    },
  },
  {
    id: "blocks",
    image: {
      src: "/images/spec/podloze-bloczki.jpg",
      alt: "Podłoże z bloczków betonowych pod saunę ogrodową",
    },
    i18n: {
      pl: {
        name: "Bloczki betonowe",
        description:
          "Szybkie, dobrze wentylowane podłoże punktowe. Dobrze sprawdza się na stabilnym, wyrównanym gruncie.",
        compare: {
          cost: "Najniższy",
          time: "1–2 dni",
          difficulty: "Można wykonać samodzielnie",
          drainage: "Dobre (podłoże wentylowane)",
        },
      },
      en: {
        name: "Concrete blocks",
        description:
          "A quick, well-ventilated point foundation. Works well on stable, level ground.",
        compare: {
          cost: "Lowest",
          time: "1–2 days",
          difficulty: "DIY-friendly",
          drainage: "Good (ventilated base)",
        },
      },
    },
  },
  {
    id: "pavers",
    image: {
      src: "/images/spec/podloze-kostka.jpg",
      alt: "Podłoże z kostki brukowej pod saunę ogrodową",
    },
    i18n: {
      pl: {
        name: "Kostka brukowa",
        description:
          "Estetyczne rozwiązanie, które łączy solidne podłoże pod saunę z wykończeniem tarasu wokół niej.",
        compare: {
          cost: "Średni",
          time: "3–5 dni",
          difficulty: "Średni, warto zatrudnić fachowca",
          drainage: "Bardzo dobre (ze spadkiem)",
        },
      },
      en: {
        name: "Paving stones",
        description:
          "An attractive option that combines a solid base for the sauna with a finished patio around it.",
        compare: {
          cost: "Medium",
          time: "3–5 days",
          difficulty: "Medium, a professional helps",
          drainage: "Very good (sloped)",
        },
      },
    },
  },
];
