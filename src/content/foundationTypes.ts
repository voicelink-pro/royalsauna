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
        steps: [
          "Wykop teren pod płytę na głębokość ok. 20–30 cm i usuń warstwę humusu.",
          "Wykonaj podsypkę ze żwiru lub piasku (10–15 cm) i dokładnie ją zagęść.",
          "Zbrój i wylej płytę o grubości min. 10–12 cm, z niewielkim spadkiem odprowadzającym wodę od sauny.",
          "Zachowaj min. 3–4 tygodnie na związanie betonu przed montażem sauny.",
        ],
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
        steps: [
          "Excavate the area to a depth of approx. 20–30 cm and remove the topsoil.",
          "Lay a gravel or sand base (10–15 cm) and compact it thoroughly.",
          "Reinforce and pour a slab at least 10–12 cm thick, with a slight slope to drain water away from the sauna.",
          "Allow at least 3–4 weeks for the concrete to cure before installing the sauna.",
        ],
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
        steps: [
          "Wyznacz punkty podparcia w narożnikach i pod środkiem konstrukcji.",
          "Wykop i zagęść podsypkę żwirową (ok. 15–20 cm) pod każdym blokiem.",
          "Ustaw bloczki betonowe i wypoziomuj je względem siebie za pomocą poziomicy lub niwelatora.",
          "Sprawdź poziom całej powierzchni przed montażem – różnice nie powinny przekraczać kilku milimetrów.",
        ],
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
        steps: [
          "Mark support points at the corners and under the centre of the structure.",
          "Excavate and compact a gravel base (approx. 15–20 cm) under each block.",
          "Position the concrete blocks and level them against each other with a spirit level or laser level.",
          "Check the whole surface is level before installation – differences shouldn't exceed a few millimetres.",
        ],
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
        steps: [
          "Wykop koryto na głębokość ok. 25–30 cm.",
          "Ułóż geotkaninę, a na niej podsypkę ze żwiru (15–20 cm) i podsypkę piaskowo-cementową (3–5 cm).",
          "Zagęszczaj każdą warstwę płytą wibracyjną, zachowując spadek 1–2% na odprowadzenie wody.",
          "Ułóż kostkę szczelnie, obrzeżuj całość i zasyp fugi piaskiem.",
        ],
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
        steps: [
          "Excavate a bed approx. 25–30 cm deep.",
          "Lay geotextile, then a gravel base (15–20 cm) and a sand-cement bedding layer (3–5 cm).",
          "Compact each layer with a plate compactor, keeping a 1–2% slope for water drainage.",
          "Lay the pavers tightly, edge the area, and fill the joints with sand.",
        ],
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
