# RoyalSauna

Premium garden saunas — marketing & lead-generation website.
**Next.js (App Router) · TypeScript · Tailwind CSS.**

Jeden dopracowany model w trzech rozmiarach (S/M/L), pozycjonowany jako luksusowe domowe spa do ogrodu. Główny cel: zbieranie zapytań ofertowych (lead gen) B2C w Polsce.

---

## Wymagania

- Node.js 18.18+ (zalecane 20+)
- npm 9+

## Szybki start

```bash
# 1. Zainstaluj zależności
npm install

# 2. Skonfiguruj zmienne środowiskowe
cp .env.example .env.local
# uzupełnij wartości w .env.local (patrz niżej)

# 3. Uruchom serwer deweloperski
npm run dev
# http://localhost:3000
```

### Pozostałe komendy

```bash
npm run build       # produkcyjny build
npm run start       # uruchomienie produkcyjne (po build)
npm run lint        # ESLint
npm run type-check  # sprawdzenie typów TypeScript
```

---

## Zmienne środowiskowe

Większość ID trackingowych jest wstrzykiwana przez zmienne środowiskowe — jeśli zmienna nie jest ustawiona, dany skrypt po prostu się nie ładuje. Wyjątkiem jest Google Tag Manager: jego ID jest zahardkodowane jako stała `GTM_ID` w `src/app/layout.tsx` (ładowany przez oficjalny `@next/third-parties/google`), a GA4 jest skonfigurowany wewnątrz kontenera GTM, nie w kodzie.

| Zmienna | Opis |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Pełny adres produkcyjny (bez końcowego `/`), np. `https://royalsauna.pl`. Używany do canonical, hreflang, sitemap, JSON-LD. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel ID. |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity Project ID. |
| `NEXT_PUBLIC_COOKIEBOT_ID` | Cookiebot Domain Group ID — steruje banerem zgody i auto-blokadą GTM/Pixel/Clarity. |
| `NEXT_PUBLIC_ENABLE_AI_AGENT` | `true`/`false` — włącza placeholdery AI voice agent / chat widget. |

---

## Struktura projektu

```
src/
├── app/
│   ├── layout.tsx              # root layout (html/body, fonty, analytics)
│   ├── (pl)/                   # strony PL (URL bez prefiksu)
│   │   ├── layout.tsx          # SiteShell locale="pl"
│   │   ├── page.tsx            # /
│   │   ├── sauny/…             # /sauny, /sauny/royalsauna-{s,m,l}
│   │   ├── jakosc/…
│   │   ├── konfigurator-oferty/…
│   │   ├── blog/… , blog/[slug]/…
│   │   ├── kontakt/…
│   │   ├── polityka-prywatnosci/… , polityka-cookies/…
│   ├── en/                     # strony EN (prefiks /en)
│   ├── api/lead/route.ts       # endpoint leadów (CRM-ready)
│   ├── sitemap.ts , robots.ts
│   └── not-found.tsx
├── components/
│   ├── layout/                 # Header, Footer, MobileStickyCTA, LanguageSwitcher, SiteShell, CookieBanner
│   ├── sections/               # HeroVideoScroll, ProductCards, ProductComparison, QualitySection, WellnessSection, ProcessSection, FAQSection, BlogPreview, CTASection
│   ├── product/                # ProductHero, ProductSpecs, ProductGallery, ProductIncluded, ProductOptions
│   ├── forms/                  # LeadForm, MultiStepOfferForm
│   ├── seo/                    # JsonLd, Breadcrumbs
│   ├── analytics/              # CookiebotProvider, MetaPixelProvider, ClarityProvider (GTM: @next/third-parties w layout.tsx)
│   ├── widgets/                # VoiceAgentPlaceholder, ChatWidgetPlaceholder
│   ├── pages/                  # widoki stron (re-używane przez PL i EN)
│   └── ui/                     # Container, Section, SectionHeading, CtaButton, Reveal, FeatureGrid, ContactLink
├── content/
│   ├── products.ts             # dane produktów (CMS-ready)
│   ├── faq.ts                  # globalne FAQ
│   ├── blog.ts                 # wpisy blogowe (CMS-ready)
│   ├── legal.ts                # polityki prywatności/cookies
│   └── i18n/{pl,en}.ts         # teksty strony PL/EN
├── lib/
│   ├── analytics.ts            # trackEvent + dataLayer + atrybucja
│   ├── i18n.ts , navigation.ts , seo.ts , site.ts , utils.ts
│   └── useAttribution.ts       # UTM/click-id capture (first-touch)
└── types/index.ts
```

---

## Dwujęzyczność (PL/EN)

- **PL** to język domyślny, dostępny pod rootem (`/`, `/sauny`, …).
- **EN** pod prefiksem `/en` (`/en`, `/en/saunas`, …).
- Mapowanie ścieżek znajduje się w `src/lib/site.ts` (`routeMap`).
- `LanguageSwitcher` tłumaczy bieżącą ścieżkę na drugi język (`getAlternatePath`).
- `hreflang` (`pl-PL`, `en`, `x-default`) oraz canonical generowane są w `src/lib/seo.ts`.

Dodanie nowego języka: dodaj słownik w `content/i18n/`, rozszerz `routeMap` i `getDictionary`.

---

## Analityka i eventy

Helper `trackEvent(eventName, params)` (`src/lib/analytics.ts`) wypycha eventy do `window.dataLayer` (GTM). Działa bezpiecznie również, gdy GTM nie jest załadowany (fallback + opcjonalny log w dev).

Obsługiwane eventy: `cta_click`, `product_view`, `product_size_select`, `offer_form_start`, `offer_form_submit`, `phone_click`, `email_click`, `newsletter_submit`, `language_change`.

### Atrybucja leadów

`useAttribution()` przechwytuje (first-touch, sessionStorage): `utm_source/medium/campaign/content/term`, `gclid`, `fbclid`, `landing_page`, `referrer`. Wszystkie formularze dołączają te pola wraz z `selected_model` do payloadu leada.

---

## Formularze i CRM

- `LeadForm` — pełny formularz „Poproś o ofertę”.
- `MultiStepOfferForm` — krokowy konfigurator oferty (`/konfigurator-oferty`).
- Oba wysyłają `POST /api/lead`. Endpoint (`src/app/api/lead/route.ts`) jest **jedynym punktem integracji** — tu podłączysz CRM / e-mail / webhook (HubSpot, Pipedrive itp.). Kontrakt front-endu pozostaje bez zmian.

---

## SEO

- `metadata` + canonical + hreflang dla każdej strony (`buildMetadata`, `pageMetadata`).
- `sitemap.ts`, `robots.ts`.
- JSON-LD: `Organization`, `WebSite`, `Product`, `FAQPage`, `BreadcrumbList`, `Article`.
- Semantyczny HTML, `aria-label`, focus states, poprawne labele formularzy, skip-link.
- `prefers-reduced-motion` respektowane globalnie i w animacjach (`Reveal`, hero).

---

## Zdjęcia i video

- Placeholdery używają Unsplash (skonfigurowane w `next.config.mjs`). **Podmień na realne zdjęcia RoyalSauna** (najlepiej lokalne w `public/` lub z CDN).
- Hero (`HeroVideoScroll`) ma slot `data-video-placeholder` przygotowany pod `<video>` oraz scroll-based animation (parallax + scale).
- `ProductGallery` ma slot gotowy pod zamianę głównego obrazu na `<video>`.

---

## Gotowość do rozbudowy

- **CMS**: `content/*` ma kształt gotowy do zastąpienia fetchem z headless CMS.
- **CRM**: jeden endpoint `/api/lead`.
- **AI voice / chat**: `VoiceAgentPlaceholder`, `ChatWidgetPlaceholder` (flaga `NEXT_PUBLIC_ENABLE_AI_AGENT`).
- **Ads / Clarity / Pixel**: przez zmienne środowiskowe, bez zmian w kodzie.

---

## Uwagi produkcyjne (przed launchem)

- Uzupełnij realne dane firmy (NIP, adres, telefon, e-mail) w `content/i18n/*` i JSON-LD.
- Zweryfikuj treści polityki prywatności/cookies z prawnikiem (`content/legal.ts`).
- Dodaj realne `favicon.ico`, `og-image.jpg`, `logo.png` do `public/`.
- Podmień zdjęcia placeholder na finalne materiały.
```
