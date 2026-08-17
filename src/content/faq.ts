import type { FaqItem, Locale } from "@/types";
import { routeMap } from "@/lib/site";

/**
 * Globalne FAQ wyświetlane na stronie głównej i innych stronach ogólnych.
 * FAQ produktowe znajduje się w `products.ts`.
 */
export const generalFaq: Record<Locale, FaqItem[]> = {
  pl: [
    {
      question: "Czym różnią się warianty Compact, Comfort i Premium?",
      answer:
        "To jeden, dopracowany model w trzech wariantach. Różni je wyłącznie pojemność i gabaryty – jakość drewna skandynawskiego, wykonanie i zakres wyposażenia w standardzie pozostają takie same. Model compact przewidziany jest dla 2 osób, Comfort dla 4, a największy model Regenerum Premium dla 6 osób.",
    },
    {
      question: "Ile kosztuje RoyalSauna?",
      answer:
        "Ceny zaczynają się od 37 300 zł za wariant Compact, 42 100 zł za Comfort i 49 300 zł za Premium. Finalna cena zależy od wyboru pieca. Po wypełnieniu formularza otrzymasz od nas dokument z pełną wyceną wybranego modelu w różnych konfiguracjach.",
    },
    {
      question: "Co wchodzi w skład sauny w standardzie?",
      answer:
        "Każda sauna Regenerum jest dostarczana z kompletnym wyposażeniem potrzebnym do komfortowego korzystania od pierwszego seansu. W standardzie otrzymujesz piec dobrany do kubatury sauny wraz z kamieniami, nastrojowe oświetlenie LED, 2 zagłówki oraz zestaw akcesoriów: termometr, higrometr, klepsydrę, drewniany cebrzyk i czerpak. Do zestawu dołączamy również ręczniki RoyalSauna – 2 dla modelu Compact, 4 dla modelu Comfort oraz 6 dla modelu Premium.",
    },
    {
      question: "Czy zajmujecie się dostawą i montażem?",
      answer:
        "Tak. Transport oraz profesjonalny montaż są już wliczone w cenę sauny. Nie doliczamy żadnych dodatkowych kosztów za dostawę ani montaż – podana cena obejmuje całość.",
    },
    {
      question: "Jakiego podłoża wymaga sauna?",
      answer:
        "Sauna wymaga równego i stabilnego podłoża. Rekomendujemy przygotowanie go z bloczków betonowych, płyty betonowej lub kostki brukowej. Po zakupie otrzymasz od nas szczegółowe wytyczne techniczne i zalecenia dotyczące przygotowania podłoża pod wybrany model sauny. Zobacz szczegółowy poradnik z wymiarami i kosztami dla każdego wariantu.",
      link: {
        label: "Zobacz specyfikację podłoża",
        href: routeMap.foundation.pl,
      },
    },
    {
      question: "Jak długo trwa realizacja zamówienia?",
      answer:
        "Standardowy czas realizacji od zamówienia do dostawy i montażu wynosi 4-5 tygodni.",
    },
  ],
  en: [
    {
      question: "How do the Compact, Comfort and Premium variants differ?",
      answer:
        "It's one refined model in three variants. Only capacity and dimensions differ – the quality of Scandinavian wood, the craftsmanship and the standard equipment stay the same. The Compact model is designed for 2 people, Comfort for 4, and the largest model, Regenerum Premium, for 6 people.",
    },
    {
      question: "How much does a RoyalSauna cost?",
      answer:
        "Prices start from PLN 37,300 for the Compact variant, PLN 42,100 for Comfort and PLN 49,300 for Premium. The final price depends on the choice of heater. Once you complete the form, you'll receive a document with a full quote for your chosen model in different configurations.",
    },
    {
      question: "What's included as standard?",
      answer:
        "Every Regenerum sauna is delivered with the complete equipment you need for a comfortable first session. As standard you get a heater matched to the sauna's volume together with stones, ambient LED lighting, 2 headrests and an accessory set: a thermometer, hygrometer, sand timer, and a wooden bucket and ladle. We also include RoyalSauna towels – 2 for the Compact model, 4 for Comfort and 6 for Premium.",
    },
    {
      question: "Do you handle delivery and installation?",
      answer:
        "Yes. Transport and professional installation are already included in the sauna's price. We don't add any extra costs for delivery or installation – the price shown covers everything.",
    },
    {
      question: "What kind of base does the sauna need?",
      answer:
        "The sauna needs a level, stable base. We recommend preparing it from concrete blocks, a concrete slab or paving. After purchase, you'll receive detailed technical guidelines and recommendations for preparing the base for your chosen sauna model. See the detailed guide with dimensions and costs for each option.",
      link: {
        label: "See the foundation specification",
        href: routeMap.foundation.en,
      },
    },
    {
      question: "How long does an order take?",
      answer:
        "The standard lead time from order to delivery and installation is 4–5 weeks.",
    },
  ],
};
