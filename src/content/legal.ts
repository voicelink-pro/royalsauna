import type { Locale } from "@/types";

interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

/**
 * Placeholder legal copy. Replace with text reviewed by legal counsel before
 * production launch. Structure is CMS-ready.
 */
export const legalContent: Record<
  "privacy" | "cookies",
  Record<Locale, LegalDoc>
> = {
  privacy: {
    pl: {
      title: "Polityka prywatności",
      updated: "2026-06-01",
      intro:
        "Niniejsza polityka prywatności opisuje, w jaki sposób RoyalSauna przetwarza dane osobowe osób korzystających z naszej strony oraz kontaktujących się z nami w celu otrzymania oferty.",
      sections: [
        {
          heading: "Administrator danych",
          body: "Administratorem danych jest B4wood Sp. z o.o. z siedzibą w Łysomicach (87-148). W sprawach dotyczących danych osobowych można kontaktować się pod adresem biuro@royalsauna.pl.",
        },
        {
          heading: "Zakres i cel przetwarzania",
          body: "Przetwarzamy dane podane w formularzach (imię, e-mail, telefon, lokalizacja, treść wiadomości) wyłącznie w celu przygotowania i przedstawienia oferty oraz kontaktu w tej sprawie. Dane analityczne przetwarzamy w celu ulepszania strony.",
        },
        {
          heading: "Podstawa prawna",
          body: "Podstawą przetwarzania jest zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO) oraz nasz prawnie uzasadniony interes polegający na prowadzeniu działań marketingowych i analitycznych.",
        },
        {
          heading: "Odbiorcy danych",
          body: "Dane mogą być powierzane podmiotom wspierającym nas technicznie (hosting, narzędzia analityczne, CRM) wyłącznie w zakresie niezbędnym do realizacji wskazanych celów.",
        },
        {
          heading: "Prawa użytkownika",
          body: "Przysługuje Państwu prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu i skargi do organu nadzorczego.",
        },
      ],
    },
    en: {
      title: "Privacy policy",
      updated: "2026-06-01",
      intro:
        "This privacy policy describes how RoyalSauna processes the personal data of people using our website and contacting us to receive an offer.",
      sections: [
        {
          heading: "Data controller",
          body: "The data controller is B4wood Sp. z o.o., based in Łysomice (87-148), Poland. For matters concerning personal data, contact biuro@royalsauna.pl.",
        },
        {
          heading: "Scope and purpose of processing",
          body: "We process data provided in forms (name, email, phone, location, message) solely to prepare and present an offer and to contact you about it. We process analytics data to improve the website.",
        },
        {
          heading: "Legal basis",
          body: "Processing is based on the consent of the data subject (Art. 6(1)(a) GDPR) and our legitimate interest in conducting marketing and analytics activities.",
        },
        {
          heading: "Data recipients",
          body: "Data may be entrusted to entities supporting us technically (hosting, analytics tools, CRM) only to the extent necessary to fulfil the stated purposes.",
        },
        {
          heading: "Your rights",
          body: "You have the right to access, rectify, erase, restrict and transfer your data, as well as to object and lodge a complaint with the supervisory authority.",
        },
      ],
    },
  },
  cookies: {
    pl: {
      title: "Polityka cookies",
      updated: "2026-06-01",
      intro:
        "Korzystamy z plików cookies i podobnych technologii, aby zapewnić prawidłowe działanie strony, analizować ruch oraz prowadzić działania marketingowe.",
      sections: [
        {
          heading: "Czym są pliki cookies",
          body: "Cookies to niewielkie pliki tekstowe zapisywane na urządzeniu użytkownika, które umożliwiają rozpoznanie przeglądarki przy kolejnych wizytach.",
        },
        {
          heading: "Rodzaje wykorzystywanych cookies",
          body: "Stosujemy cookies niezbędne do działania strony oraz cookies analityczne i marketingowe (m.in. Google Tag Manager, Meta Pixel, Microsoft Clarity), które uruchamiane są zgodnie z Państwa zgodą.",
        },
        {
          heading: "Zarządzanie cookies",
          body: "W każdej chwili mogą Państwo zmienić ustawienia dotyczące cookies w swojej przeglądarce lub wycofać udzieloną zgodę.",
        },
      ],
    },
    en: {
      title: "Cookie policy",
      updated: "2026-06-01",
      intro:
        "We use cookies and similar technologies to ensure the website works correctly, to analyse traffic and to run marketing activities.",
      sections: [
        {
          heading: "What cookies are",
          body: "Cookies are small text files stored on the user's device that allow the browser to be recognised on subsequent visits.",
        },
        {
          heading: "Types of cookies we use",
          body: "We use cookies essential for the website to work, as well as analytics and marketing cookies (e.g. Google Tag Manager, Meta Pixel, Microsoft Clarity) that run in line with your consent.",
        },
        {
          heading: "Managing cookies",
          body: "You can change your cookie settings in your browser at any time or withdraw the consent you have given.",
        },
      ],
    },
  },
};
