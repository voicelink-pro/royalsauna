import type { FaqItem, Locale } from "@/types";

/**
 * Globalne FAQ wyświetlane na stronie głównej i innych stronach ogólnych.
 * FAQ produktowe znajduje się w `products.ts`.
 */
export const generalFaq: Record<Locale, FaqItem[]> = {
  pl: [
    {
      question: "Czym różnią się rozmiary S, M i L?",
      answer:
        "To jeden, dopracowany model w trzech rozmiarach. Różni je wyłącznie pojemność i gabaryty – jakość estońskiego świerka, wykonanie i zakres wyposażenia w standardzie pozostają takie same. S jest idealna dla par, M to najpopularniejszy wybór dla rodzin, a L sprawdza się przy większym gronie.",
    },
    {
      question: "Ile kosztuje RoyalSauna?",
      answer:
        "Ceny zaczynają się od 32 000 zł za rozmiar S. Finalna cena zależy od konfiguracji: rodzaju pieca, przeszkleń, tarasu, oświetlenia oraz kosztów dostawy i montażu. Po wypełnieniu formularza przygotujemy spersonalizowaną ofertę.",
    },
    {
      question: "Co wchodzi w skład sauny w standardzie?",
      answer:
        "Każdą saunę dostarczamy gotową do pierwszego seansu: z piecem dobranym do kubatury, kompletem kamieni, profilowanymi ławami, oświetleniem LED, zagłówkami, podnóżkami oraz akcesoriami takimi jak termometr, higrometr, cebrzyk i czerpak.",
    },
    {
      question: "Czy zajmujecie się dostawą i montażem?",
      answer:
        "Tak. Dostarczamy saunę i przygotowujemy ją w Twoim ogrodzie. Koszt zależy od lokalizacji i warunków dojazdu – uwzględniamy go w indywidualnej ofercie.",
    },
    {
      question: "Jakiego podłoża wymaga sauna?",
      answer:
        "Potrzebne jest równe, stabilne i nośne podłoże – np. płyta betonowa, kostka brukowa lub odpowiednio przygotowany fundament punktowy. Doradzimy najlepsze rozwiązanie dla Twojego ogrodu.",
    },
    {
      question: "Jak długo trwa realizacja zamówienia?",
      answer:
        "Czas realizacji zależy od wybranego rozmiaru i konfiguracji. Dokładny termin podajemy w ofercie – zależy nam, by każda RoyalSauna była wykonana bez pośpiechu, z dbałością o detale.",
    },
  ],
  en: [
    {
      question: "How do sizes S, M and L differ?",
      answer:
        "It's one refined model in three sizes. Only capacity and dimensions differ – the quality of Estonian spruce, the craftsmanship and the standard equipment stay the same. S is ideal for couples, M is the most popular choice for families, and L works well for larger groups.",
    },
    {
      question: "How much does a RoyalSauna cost?",
      answer:
        "Prices start from PLN 32,000 for size S. The final price depends on configuration: heater type, glazing, terrace, lighting and delivery and installation costs. Once you complete the form, we'll prepare a personalised offer.",
    },
    {
      question: "What's included as standard?",
      answer:
        "Every sauna is delivered ready for the first session: with a heater matched to the volume, a set of stones, profiled benches, LED lighting, headrests, footrests and accessories such as a thermometer, hygrometer, bucket and ladle.",
    },
    {
      question: "Do you handle delivery and installation?",
      answer:
        "Yes. We deliver the sauna and prepare it in your garden. The cost depends on location and access conditions – we include it in the personalised offer.",
    },
    {
      question: "What kind of base does the sauna need?",
      answer:
        "You need a level, stable, load-bearing base – e.g. a concrete slab, paving or a properly prepared point foundation. We'll advise the best solution for your garden.",
    },
    {
      question: "How long does an order take?",
      answer:
        "Lead time depends on the chosen size and configuration. We provide the exact date in the offer – we want every RoyalSauna built without haste, with care for detail.",
    },
  ],
};
