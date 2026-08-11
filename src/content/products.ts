import type { Product, ModelId } from "@/types";

/**
 * Product data – Regenerum line. Structured so it can later be sourced
 * from a headless CMS (replace this module with a fetch + the same `Product[]`).
 *
 * NOTE: wymiary i dokładne moce pieców są wartościami przybliżonymi –
 * potwierdź / zaktualizuj zgodnie z finalną specyfikacją producenta.
 */

/** Shared product line name. */
export const LINE_NAME = "Regenerum";

/** Standardowe wyposażenie wspólne dla całej linii Regenerum (bez ręczników – ich liczba różni się per model). */
const INCLUDED_PL_BASE = [
  "Piec saunowy dobrany do kubatury",
  "Profilowane ławy z drewna premium",
  "Osikowe zagłówki",
  "Cebrzyk i czerpak",
  "Komplet kamieni saunowych",
  "Oświetlenie nastrojowe LED",
  "Termometr i higrometr",
  "Klepsydra saunowa",
];

const INCLUDED_EN_BASE = [
  "Sauna heater matched to the cabin volume",
  "Contoured premium-wood benches",
  "Headrests and footrests",
  "Wooden bucket and ladle",
  "Full set of sauna stones",
  "Ambient LED lighting",
  "Thermometer and hygrometer",
  "Sauna hourglass",
];

/** Liczba ręczników w zestawie powitalnym rośnie z pojemnością modelu. */
const TOWELS_PL: Record<ModelId, string> = {
  compact: "Ręczniki (2 szt.)",
  comfort: "Ręczniki (4 szt.)",
  premium: "Ręczniki (6 szt.)",
};

const TOWELS_EN: Record<ModelId, string> = {
  compact: "Towels (2 pcs.)",
  comfort: "Towels (4 pcs.)",
  premium: "Towels (6 pcs.)",
};

const includedPl = (id: ModelId) => [...INCLUDED_PL_BASE, TOWELS_PL[id]];
const includedEn = (id: ModelId) => [...INCLUDED_EN_BASE, TOWELS_EN[id]];

export const products: Product[] = [
  {
    id: "compact",
    line: LINE_NAME,
    slug: "compact",
    enSlug: "compact",
    name: "Compact",
    priceFrom: 37300,
    capacity: 2,
    images: [
      {
        src: "/images/cubus2-hero.jpg",
        alt: "Sauna Regenerum Compact w ogrodzie",
      },
      {
        src: "/images/cubus2-interior.jpg",
        alt: "Wnętrze sauny Compact ze świerku skandynawskiego",
      },
      {
        src: "/images/cubus2-cutout.jpg",
        alt: "Sauna Compact – widok produktowy",
      },
      {
        src: "/images/cubus2-technic.jpg",
        alt: "Rysunek techniczny sauny Compact",
      },
    ],
    bannerImage: {
      src: "/images/cubus2-banner.jpg",
      mobileSrc: "/images/cubus2-banner-mobile.jpg",
      alt: "Sauna Regenerum Compact – zdjęcie w tle",
    },
    i18n: {
      pl: {
        tagline: "Kameralna sauna dla dwóch osób",
        audience:
          "Dla osób, które cenią prywatność, oraz mniejszych ogrodów, tarasów i działek, gdzie liczy się każdy metr. Compact to intymny rytuał regeneracji dla dwóch osób – bez kompromisów w jakości.",
        shortDescription:
          "Najbardziej kompaktowy model linii Regenerum. Pełnowartościowa sauna dla dwóch osób, która zmieści się nawet w niewielkim ogrodzie.",
        longDescription:
          "Compact to dowód na to, że luksus nie potrzebuje wielu metrów. W zwartej, designerskiej bryle ze świerku skandynawskiego mieści się wszystko, czego potrzebujesz do prawdziwego seansu: dopracowana komora cieplna, panoramiczna szyba otwierająca wnętrze na ogród i piec dobrany do kubatury, który szybko osiąga temperaturę. To sauna, która staje się Twoim prywatnym zakątkiem regeneracji – kameralnym, ciepłym i gotowym na codzienny rytuał.",
        features: [
          {
            title: "Kompaktowa, dopracowana bryła",
            description:
              "Minimalistyczna forma sześcianu, która elegancko wpisuje się nawet w niewielki ogród czy taras.",
          },
          {
            title: "Idealna dla dwóch osób",
            description:
              "Komfortowe miejsce dla dwóch osób z profilowanymi ławami i zagłówkami zaprojektowanymi pod pełen relaks.",
          },
          {
            title: "Szybkie nagrzewanie",
            description:
              "Mniejsza kubatura oznacza krótszy czas nagrzewania – sauna jest gotowa, gdy Ty jesteś.",
          },
          {
            title: "Panoramiczna szyba",
            description:
              "Duże przeszklenie otwiera wnętrze na ogród i wypełnia saunę naturalnym światłem.",
          },
        ],
        specs: [
          { label: "Liczba osób", value: "2" },
          { label: "Wymiary zewnętrzne", value: "2,10 × 2,15 m" },
          { label: "Wysokość", value: "2,06 m" },
          { label: "Powierzchnia użytkowa", value: "4,50 m²" },
          { label: "Grubość ściany", value: "42 mm" },
          { label: "Materiał", value: "Świerk skandynawski premium" },
          { label: "Piec", value: "Harvia Cilindro, Legend lub Spirit" },
          { label: "Moc pieca", value: "od 6 kW" },
          { label: "Przyłącze elektryczne", value: "Po stronie Klienta" },
          { label: "Czas nagrzewania", value: "ok. 30–40 min" },
          { label: "Czas montażu", value: "1–2 dni" },
        ],
        included: includedPl("compact"),
        options: [
          {
            title: "Wybór pieca",
            description:
              "Piec Harvia Cilindro, Legend lub Spirit – dobierzemy model najlepiej dopasowany do Twojej sauny.",
          },
          {
            title: "Wykończenie elewacji",
            description:
              "Naturalny olej, ciemny lakier lub elewacja w kolorze na życzenie.",
          },
          {
            title: "Oświetlenie i audio",
            description:
              "Sceny świetlne LED oraz opcjonalny system audio odporny na wilgoć.",
          },
          {
            title: "Strefa wypoczynku",
            description:
              "Możliwość rozbudowy o zadaszony przedsionek lub taras.",
          },
        ],
        faq: [
          {
            question: "Jakie przygotowanie podłoża jest potrzebne?",
            answer:
              "Wystarczy równe, stabilne i nośne podłoże – np. płyta betonowa, bloczki lub utwardzona nawierzchnia. Szczegółowe wytyczne przekazujemy przed dostawą.",
          },
          {
            question: "Który piec Harvia pasuje do Compact?",
            answer:
              "Do modelu Compact dobierzemy piec Harvia Cilindro, Legend lub Spirit – każdy z modułem WiFi i aplikacją MyHarvia. Pomożemy wybrać wariant najlepiej dopasowany do Twojej instalacji.",
          },
        ],
      },
      en: {
        tagline: "An intimate sauna for two",
        audience:
          "For those who value privacy, and for smaller gardens, terraces and plots where every square metre counts. Compact is an intimate recovery ritual for two people – with no compromise on quality.",
        shortDescription:
          "The most compact model in the Regenerum line. A full-value sauna for two that fits even a small garden.",
        longDescription:
          "Compact proves that luxury doesn't need a lot of space. Its compact, design-led cube of Scandinavian spruce holds everything you need for a true session: a refined heat chamber, a panoramic glass front that opens the interior to the garden, and a heater matched to the volume that reaches temperature quickly. It's a sauna that becomes your private corner of recovery – intimate, warm and ready for a daily ritual.",
        features: [
          {
            title: "Compact, refined form",
            description:
              "A minimalist cube that sits elegantly even in a small garden or on a terrace.",
          },
          {
            title: "Perfect for two people",
            description:
              "A comfortable space for two with contoured benches and headrests designed for full relaxation.",
          },
          {
            title: "Fast heat-up",
            description:
              "A smaller volume means a shorter heat-up time – the sauna is ready when you are.",
          },
          {
            title: "Panoramic glass",
            description:
              "A large glazed front opens the interior to the garden and fills the cabin with natural light.",
          },
        ],
        specs: [
          { label: "People", value: "2" },
          { label: "Exterior dimensions", value: "2.10 × 2.15 m" },
          { label: "Height", value: "2.06 m" },
          { label: "Usable floor area", value: "4.50 m²" },
          { label: "Wall thickness", value: "42 mm" },
          { label: "Material", value: "Premium Scandinavian spruce" },
          { label: "Heater", value: "Harvia Cilindro, Legend or Spirit" },
          { label: "Heater power", value: "from 6 kW" },
          { label: "Electrical connection", value: "Provided by the client" },
          { label: "Heat-up time", value: "approx. 30–40 min" },
          { label: "Installation time", value: "1–2 days" },
        ],
        included: includedEn("compact"),
        options: [
          {
            title: "Heater choice",
            description:
              "Harvia Cilindro, Legend or Spirit – we'll match the model best suited to your sauna.",
          },
          {
            title: "Facade finish",
            description:
              "Natural oil, dark lacquer or a custom-coloured facade on request.",
          },
          {
            title: "Lighting & audio",
            description:
              "LED light scenes and an optional moisture-resistant audio system.",
          },
          {
            title: "Relaxation zone",
            description:
              "Option to extend with a covered porch or terrace.",
          },
        ],
        faq: [
          {
            question: "What ground preparation is needed?",
            answer:
              "A level, stable and load-bearing base is enough – e.g. a concrete slab, blocks or a paved surface. We provide detailed guidelines before delivery.",
          },
          {
            question: "Which Harvia heater suits Compact?",
            answer:
              "For Compact we offer the Harvia Cilindro, Legend or Spirit heater – each with WiFi and the MyHarvia app. We'll help you choose the option best suited to your installation.",
          },
        ],
      },
    },
  },
  {
    id: "comfort",
    line: LINE_NAME,
    slug: "comfort",
    enSlug: "comfort",
    name: "Comfort",
    priceFrom: 42100,
    capacity: 4,
    images: [
      {
        src: "/images/cubus3-hero.jpg",
        alt: "Sauna Regenerum Comfort w nowoczesnym ogrodzie",
      },
      {
        src: "/images/cubus3-interior.jpg",
        alt: "Przestronne wnętrze sauny Comfort",
      },
      {
        src: "/images/cubus3-cutout.jpg",
        alt: "Sauna Comfort – widok produktowy",
      },
      {
        src: "/images/cubus3-technic.jpg",
        alt: "Rysunek techniczny sauny Comfort",
      },
    ],
    bannerImage: {
      src: "/images/cubus3-banner.jpg",
      mobileSrc: "/images/cubus3-banner-mobile.jpg",
      alt: "Sauna Regenerum Comfort – zdjęcie w tle",
    },
    i18n: {
      pl: {
        tagline: "Wszechstronny model dla rodziny",
        audience:
          "Dla rodzin i osób, które chcą dzielić rytuał sauny z najbliższymi. Comfort to złoty środek linii Regenerum – wystarczająco przestronny dla komfortu, wciąż zgrabny dla większości ogrodów.",
        shortDescription:
          "Środkowy, najbardziej uniwersalny model linii Regenerum. Przestrzeń dla rodziny przy zachowaniu zgrabnych proporcji.",
        longDescription:
          "Comfort to model, który najczęściej polecamy – i nie bez powodu. Łączy komfortową przestrzeń dla czterech osób ze zgrabną bryłą, która dobrze odnajduje się w typowym ogrodzie. Wnętrze zaprojektowano z myślą o swobodnym seansie w gronie rodziny: szersze ławy, wygodne zagłówki i przemyślana cyrkulacja ciepła. To sauna, wokół której zbiera się dom – na codzienny relaks i wieczory, które chce się przedłużać.",
        features: [
          {
            title: "Komfort dla rodziny",
            description:
              "Przestrzeń dla 4 osób z szerszymi ławami i swobodą ruchu podczas seansu.",
          },
          {
            title: "Uniwersalne proporcje",
            description:
              "Zgrabna bryła, która harmonijnie wpisuje się w większość ogrodów i aranżacji.",
          },
          {
            title: "Równomierne ciepło",
            description:
              "Przemyślana cyrkulacja powietrza i piec dobrany do kubatury dają stabilny, miękki klimat.",
          },
          {
            title: "Premium w detalu",
            description:
              "Świerk skandynawski, dopracowane okucia i panoramiczna szyba w standardzie.",
          },
        ],
        specs: [
          { label: "Liczba osób", value: "4" },
          { label: "Wymiary zewnętrzne", value: "2,40 × 2,20 m" },
          { label: "Wysokość", value: "2,26 m" },
          { label: "Powierzchnia użytkowa", value: "5,3 m²" },
          { label: "Grubość ściany", value: "42 mm" },
          { label: "Materiał", value: "Świerk skandynawski premium" },
          { label: "Piec", value: "Harvia Cilindro, Legend lub Spirit" },
          { label: "Moc pieca", value: "od 8 kW" },
          { label: "Przyłącze elektryczne", value: "Po stronie Klienta" },
          { label: "Czas nagrzewania", value: "ok. 40–50 min" },
          { label: "Czas montażu", value: "1–2 dni" },
        ],
        included: includedPl("comfort"),
        options: [
          {
            title: "Wybór pieca",
            description:
              "Piec Harvia Cilindro, Legend lub Spirit – dobierzemy model najlepiej dopasowany do Twojej sauny.",
          },
          {
            title: "Wykończenie elewacji",
            description:
              "Naturalny olej, ciemny lakier lub elewacja w kolorze na życzenie.",
          },
          {
            title: "Oświetlenie i audio",
            description:
              "Sceny świetlne LED oraz opcjonalny system audio odporny na wilgoć.",
          },
          {
            title: "Strefa wypoczynku",
            description:
              "Zadaszony przedsionek, taras lub strefa schłodzenia na życzenie.",
          },
        ],
        faq: [
          {
            question: "Ile osób komfortowo zmieści się w Comfort?",
            answer:
              "Comfort komfortowo pomieści 4 osoby. To najbardziej uniwersalny model w linii – sprawdzi się zarówno dla rodziny, jak i dla spotkań w mniejszym gronie.",
          },
          {
            question: "Czy sauna jest gotowa do użytku zaraz po montażu?",
            answer:
              "Tak. Dostarczamy i montujemy saunę w komplecie z wyposażeniem. Po podłączeniu pieca i pierwszym wygrzaniu możesz rozpocząć pierwszy seans.",
          },
          {
            question: "Jak wygląda serwis i gwarancja?",
            answer:
              "Każdą saunę obejmujemy gwarancją i wsparciem posprzedażowym. Szczegółowe warunki przekazujemy wraz z ofertą.",
          },
        ],
      },
      en: {
        tagline: "A versatile model for the family",
        audience:
          "For families and people who want to share the sauna ritual with their loved ones. Comfort is the sweet spot of the Regenerum line – spacious enough for comfort, still neat for most gardens.",
        shortDescription:
          "The middle, most versatile model in the Regenerum line. Room for the family while keeping neat proportions.",
        longDescription:
          "Comfort is the model we recommend most often – and for good reason. It combines comfortable space for four people with a neat form that fits a typical garden well. The interior is designed for a relaxed session with family: wider benches, comfortable headrests and well-considered heat circulation. It's a sauna the household gathers around – for daily relaxation and evenings you want to stretch out.",
        features: [
          {
            title: "Comfort for the family",
            description:
              "Space for 4 people with wider benches and freedom of movement during a session.",
          },
          {
            title: "Versatile proportions",
            description:
              "A neat form that blends harmoniously into most gardens and layouts.",
          },
          {
            title: "Even heat",
            description:
              "Thoughtful air circulation and a heater matched to the volume create a stable, soft climate.",
          },
          {
            title: "Premium in the detail",
            description:
              "Scandinavian spruce, refined fittings and a panoramic glass front as standard.",
          },
        ],
        specs: [
          { label: "People", value: "4" },
          { label: "Exterior dimensions", value: "2.40 × 2.20 m" },
          { label: "Height", value: "2.26 m" },
          { label: "Usable floor area", value: "5.3 m²" },
          { label: "Wall thickness", value: "42 mm" },
          { label: "Material", value: "Premium Scandinavian spruce" },
          { label: "Heater", value: "Harvia Cilindro, Legend or Spirit" },
          { label: "Heater power", value: "from 8 kW" },
          { label: "Electrical connection", value: "Provided by the client" },
          { label: "Heat-up time", value: "approx. 40–50 min" },
          { label: "Installation time", value: "1–2 days" },
        ],
        included: includedEn("comfort"),
        options: [
          {
            title: "Heater choice",
            description:
              "Harvia Cilindro, Legend or Spirit – we'll match the model best suited to your sauna.",
          },
          {
            title: "Facade finish",
            description:
              "Natural oil, dark lacquer or a custom-coloured facade on request.",
          },
          {
            title: "Lighting & audio",
            description:
              "LED light scenes and an optional moisture-resistant audio system.",
          },
          {
            title: "Relaxation zone",
            description:
              "A covered porch, terrace or cool-down zone on request.",
          },
        ],
        faq: [
          {
            question: "How many people fit comfortably in Comfort?",
            answer:
              "Comfort comfortably seats 4 people. It's the most versatile model in the line – great for a family as well as smaller gatherings.",
          },
          {
            question: "Is the sauna ready to use right after installation?",
            answer:
              "Yes. We deliver and install the sauna complete with its equipment. Once the heater is connected and the first heat-up is done, you can begin your first session.",
          },
          {
            question: "What about service and warranty?",
            answer:
              "Every sauna comes with a warranty and after-sales support. We share the detailed terms together with the offer.",
          },
        ],
      },
    },
  },
  {
    id: "premium",
    line: LINE_NAME,
    slug: "premium",
    enSlug: "premium",
    name: "Premium",
    priceFrom: 45900,
    capacity: 6,
    images: [
      {
        src: "/images/cubus5-hero.jpg",
        alt: "Sauna Regenerum Premium – przestronna sauna ogrodowa",
      },
      {
        src: "/images/cubus5-interior.jpg",
        alt: "Wnętrze sauny Premium dla większego grona",
      },
      {
        src: "/images/cubus5-cutout.jpg",
        alt: "Sauna Premium – widok produktowy",
      },
      {
        src: "/images/cubus5-technic.jpg",
        alt: "Rysunek techniczny sauny Premium",
      },
    ],
    bannerImage: {
      src: "/images/cubus5-banner.jpg",
      mobileSrc: "/images/cubus5-banner-mobile.jpg",
      alt: "Sauna Regenerum Premium – zdjęcie w tle",
    },
    i18n: {
      pl: {
        tagline: "Największy model linii Regenerum",
        audience:
          "Dla większych rodzin, miłośników spotkań i tych, którzy traktują saunę jako serce domowego spa. Premium to najbardziej przestronny model linii Regenerum – stworzony, by dzielić ciepło z innymi.",
        shortDescription:
          "Najbardziej przestronny model linii Regenerum. Przestronne wnętrze dla sześciu osób i pełne doświadczenie domowego spa.",
        longDescription:
          "Premium to nasza najbardziej okazała sauna – przestrzeń, w której rytuał staje się wydarzeniem. Wielopoziomowe ławy pozwalają wybrać intensywność seansu, a przestronne wnętrze ze świerku skandynawskiego komfortowo mieści sześć osób. Duże przeszklenie i nastrojowe światło budują atmosferę prawdziwego, prywatnego spa. To model dla tych, którzy lubią dzielić ciepło – z rodziną i przyjaciółmi, w wieczory, które zostają w pamięci.",
        features: [
          {
            title: "Maksimum przestrzeni",
            description:
              "Komfortowe wnętrze dla 6 osób z wielopoziomowymi ławami do wyboru intensywności seansu.",
          },
          {
            title: "Stworzona do spotkań",
            description:
              "Idealna na wspólne wieczory – sauna staje się sercem domowego spa i miejscem spotkań.",
          },
          {
            title: "Pełne doświadczenie spa",
            description:
              "Duże przeszklenie, nastrojowe światło i miękkie ciepło budują atmosferę prawdziwego wellness.",
          },
          {
            title: "Najwyższa jakość wykonania",
            description:
              "Świerk skandynawski premium, solidna konstrukcja i dopracowany każdy detal.",
          },
        ],
        specs: [
          { label: "Liczba osób", value: "6" },
          { label: "Wymiary zewnętrzne", value: "3,00 × 2,40 m" },
          { label: "Wysokość", value: "2,60 m" },
          { label: "Powierzchnia użytkowa", value: "7,2 m²" },
          { label: "Grubość ściany", value: "42 mm" },
          { label: "Materiał", value: "Świerk skandynawski premium" },
          { label: "Piec", value: "Harvia Cilindro lub Legend" },
          { label: "Moc pieca", value: "od 9 kW" },
          { label: "Przyłącze elektryczne", value: "Po stronie Klienta" },
          { label: "Czas nagrzewania", value: "ok. 50–60 min" },
          { label: "Czas montażu", value: "1–2 dni" },
        ],
        included: includedPl("premium"),
        options: [
          {
            title: "Wybór pieca",
            description:
              "Piec Harvia Cilindro lub Legend – dobierzemy model najlepiej dopasowany do Twojej sauny.",
          },
          {
            title: "Wykończenie elewacji",
            description:
              "Naturalny olej, ciemny lakier lub elewacja w kolorze na życzenie.",
          },
          {
            title: "Oświetlenie i audio",
            description:
              "Sceny świetlne LED oraz opcjonalny system audio odporny na wilgoć.",
          },
          {
            title: "Strefa wypoczynku",
            description:
              "Zadaszony przedsionek, taras lub pełna strefa schłodzenia z prysznicem.",
          },
        ],
        faq: [
          {
            question: "Czy Premium potrzebuje instalacji 400V (siły)?",
            answer:
              "Piec Cilindro o mocy 9,0 kW wymaga przyłącza 400V. Jeśli nie masz dostępu do siły, doskonałą alternatywą jest piec Legend, który można podłączyć elastyczniej – 230V, 230V 3~ lub 400V 3N~.",
          },
          {
            question: "Jak długo trwa realizacja zamówienia?",
            answer:
              "Czas realizacji zależy od konfiguracji i bieżącego obłożenia produkcji. Dokładny termin potwierdzamy na etapie wyceny i przygotowania umowy.",
          },
          {
            question: "Czy montaż jest po Twojej stronie?",
            answer:
              "Tak. Zajmujemy się dostawą i profesjonalnym montażem, tak aby sauna była gotowa do użytku. Od Ciebie potrzebujemy jedynie przygotowanego podłoża i przyłączy.",
          },
        ],
      },
      en: {
        tagline: "The largest model in the Regenerum line",
        audience:
          "For larger families, lovers of gatherings and those who treat the sauna as the heart of a home spa. Premium is the most spacious model in the Regenerum line – made to share warmth with others.",
        shortDescription:
          "The largest model in the Regenerum line. A spacious interior for six and a complete home-spa experience.",
        longDescription:
          "Premium is our most generous sauna – a space where the ritual becomes an occasion. Multi-level benches let you choose the intensity of your session, while the spacious Scandinavian-spruce interior comfortably seats six. A large glazed front and ambient lighting build the atmosphere of a true, private spa. It's the model for those who love to share warmth – with family and friends, on evenings worth remembering.",
        features: [
          {
            title: "Maximum space",
            description:
              "A comfortable interior for 6 with multi-level benches to choose your session intensity.",
          },
          {
            title: "Made for gatherings",
            description:
              "Perfect for shared evenings – the sauna becomes the heart of your home spa and a meeting place.",
          },
          {
            title: "A full spa experience",
            description:
              "A large glazed front, ambient light and soft heat build a true wellness atmosphere.",
          },
          {
            title: "Top-tier craftsmanship",
            description:
              "Premium Scandinavian spruce, a solid structure and every detail refined.",
          },
        ],
        specs: [
          { label: "People", value: "6" },
          { label: "Exterior dimensions", value: "3.00 × 2.40 m" },
          { label: "Height", value: "2.60 m" },
          { label: "Usable floor area", value: "7.2 m²" },
          { label: "Wall thickness", value: "42 mm" },
          { label: "Material", value: "Premium Scandinavian spruce" },
          { label: "Heater", value: "Harvia Cilindro or Legend" },
          { label: "Heater power", value: "from 9 kW" },
          { label: "Electrical connection", value: "Provided by the client" },
          { label: "Heat-up time", value: "approx. 50–60 min" },
          { label: "Installation time", value: "1–2 days" },
        ],
        included: includedEn("premium"),
        options: [
          {
            title: "Heater choice",
            description:
              "Harvia Cilindro or Legend – we'll match the model best suited to your sauna.",
          },
          {
            title: "Facade finish",
            description:
              "Natural oil, dark lacquer or a custom-coloured facade on request.",
          },
          {
            title: "Lighting & audio",
            description:
              "LED light scenes and an optional moisture-resistant audio system.",
          },
          {
            title: "Relaxation zone",
            description:
              "A covered porch, terrace or a full cool-down zone with a shower.",
          },
        ],
        faq: [
          {
            question: "Does Premium need 3-phase (400V) power?",
            answer:
              "The 9.0 kW Cilindro heater requires a 400V connection. If you don't have 3-phase access, the Legend heater is an excellent alternative – it can be wired more flexibly at 230V, 230V 3-phase or 400V 3N.",
          },
          {
            question: "How long does an order take to complete?",
            answer:
              "Lead time depends on the configuration and current production schedule. We confirm the exact date during the quote and contract stage.",
          },
          {
            question: "Do you handle the installation?",
            answer:
              "Yes. We take care of delivery and professional installation so the sauna is ready to use. All we need from you is a prepared base and connections.",
          },
        ],
      },
    },
  },
];

export function getProduct(id: ModelId): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(
  slug: string,
  locale: "pl" | "en",
): Product | undefined {
  return products.find((p) =>
    locale === "en" ? p.enSlug === slug : p.slug === slug,
  );
}
