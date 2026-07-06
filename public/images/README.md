# Zdjęcia RoyalSauna — gdzie wrzucić i jakie wymiary

Format: **JPG** (zdjęcia) lub **PNG** (rysunki z przezroczystością).  
Jakość: **80–90%** przy eksporcie. Next.js sam zoptymalizuje do WebP/AVIF.

---

## Modele sauny (`public/images/`)

Każdy model (Cubus 2, 3, 5) — **4 pliki**:

| Plik | Proporcje | Wymiary (px) | Gdzie używane |
|------|-----------|--------------|---------------|
| `cubus2-hero.jpg` | 4:3 | **1920 × 1440** | Galeria, karty modeli, menu header |
| `cubus2-interior.jpg` | 4:5 | **1600 × 2000** | Sekcja „Wnętrze” na stronie modelu |
| `cubus2-cutout.jpg` | 4:5 lub 4:3 | **1600 × 2000** | Sekcja „Bryła i design” |
| `cubus2-technic.jpg` | ~6:5 | **2400 × 2000** | Rysunek techniczny (cały widoczny, bez przycinania) |
| `cubus2-banner.jpg` | 16:9 lub szersze | min. **2400 × 1350** | Pełnoekranowy baner na górze strony modelu, z napisem „Cubus 2” na zdjęciu |

To samo dla `cubus3-*` i `cubus5-*`.

**Polecane piece** — sekcja nad FAQ na stronie modelu. Łącznie **5 plików**: 3 dla Cubus 2/3 (współdzielone między tymi dwoma modelami) + 2 osobne dla Cubus 5.

| Plik | Piec | Proporcje | Wymiary (px) | Używany w |
|------|------|-----------|--------------|-----------|
| `heater-harvia-cilindro.jpg` | Harvia Cilindro PC90XW WiFi Steel | 4:3 | **1200 × 900** | Cubus 2, 3 |
| `heater-harvia-legend.jpg` | Harvia Legend PO110FC WiFi black | 4:3 | **1200 × 900** | Cubus 2, 3 |
| `heater-harvia-spirit.jpg` | Harvia Spirit SP90FC WiFi | 4:3 | **1200 × 900** | Cubus 2, 3 |
| `cubus5-heater-cilindro.jpg` | Harvia Cilindro PC90XW WiFi Steel | 4:3 | **1200 × 900** | Cubus 5 |
| `cubus5-heater-legend.jpg` | Harvia Legend PO110FC WiFi black | 4:3 | **1200 × 900** | Cubus 5 |

**Baner modelu** — zdjęcie jest przyciemniane gradientem (góra/dół), więc najlepiej sprawdzą się kadry z czytelnym, niezbyt „zabałaganionym” środkiem (tam ląduje tekst). Orientacja pozioma, wysoka rozdzielczość, bo zdjęcie rozciąga się na całą szerokość ekranu.

**Miniatury w galerii** — nie trzeba osobnych plików; Next.js skaluje z `hero`.

---

## Strona główna

| Plik | Proporcje | Wymiary (px) | Gdzie |
|------|-----------|--------------|-------|
| `quality.jpg` | 5:4 | **2400 × 1920** | Sekcja „Luxury / jakość” |
| `interior-poster.jpg` | 16:9 | **1920 × 1080** | Poster przed wideo wnętrza |
| `cubus5-frontinterir.png` | dowolne | min. **1920** szer. | Ostatnia klatka sekcji wideo |
| `included-heater.jpg` | 4:5 lub kwadrat | min. **1600 × 2000** | Sekcja „Co zawiera sauna” — duży kafel: piec |
| `included-benches.jpg` | 16:9 | min. **1600 × 900** | Sekcja „Co zawiera sauna” — ławy i zagłówki |
| `included-lighting.jpg` | 4:3 lub kwadrat | min. **1200 × 1200** | Sekcja „Co zawiera sauna” — oświetlenie LED |
| `included-accessories.jpg` | 4:3 lub kwadrat | min. **1200 × 1200** | Sekcja „Co zawiera sauna” — zestaw powitalny (ręczniki, czerpak, kamienie itd.) |

**Hero (wideo):** `public/videos/hero.mp4` + klatki w `public/hero-frames/` (generowane skryptem).

**Wideo wnętrza:** `public/videos/wnetrze.mp4`

---

## Blog (`public/images/blog/`)

| Plik | Wymiary (px) | Proporcje | Gdzie |
|------|--------------|-----------|-------|
| `estonski-swierk.jpg` | **2400 × 1350** | 16:9 | Wpis 1 — lista + nagłówek artykułu |
| `jaki-rozmiar-sauny.jpg` | **2400 × 1350** | 16:9 | Wpis 2 |
| `domowy-rytual-sauny.jpg` | **2400 × 1350** | 16:9 | Wpis 3 |
| `twoj-nowy-wpis.jpg` | **2400 × 1350** | 16:9 | Każdy nowy wpis (nazwa = slug) |

Na liście bloga karta ma proporcje **3:2**, w artykule **16:9** — jedno zdjęcie 16:9 wystarczy (`object-cover` przytnie na karcie).

---

## Specyfikacja (`public/images/spec/`)

| Plik | Wymiary (px) | Proporcje | Gdzie |
|------|--------------|-----------|-------|
| `spec-hero.jpg` | **1920 × 1440** | 4:3 | Hero strony `/jakosc` |
| `spec-detail.jpg` | **1200 × 1500** | 4:5 | Sekcja jakości (jeśli używana) |

Menu „Specyfikacja” w headerze używa też: `cubus5-interior.jpg`, `quality.jpg`, `cubus3-cutout.jpg`.

---

## Opcjonalne

| Plik | Wymiary | Gdzie |
|------|---------|-------|
| `wellness-bg.jpg` | **2560 × 1440** (16:9) | Tło sekcji wellness (obecnie wyłączona z home) |
| `og-image.jpg` (w `public/`) | **1200 × 630** | Podgląd linku w Facebook / LinkedIn |

---

## PDF oferty

Statyczny PDF do maili: `public/documents/oferta.pdf`  
Gotowe oferty HTML: `public/oferty/` (osobny system, nie Next.js).

---

## Szybka checklista — co wrzucić teraz

```
public/images/
  cubus2-hero.jpg, cubus2-interior.jpg, cubus2-cutout.jpg, cubus2-technic.jpg
  cubus3-hero.jpg, cubus3-interior.jpg, cubus3-cutout.jpg, cubus3-technic.jpg
  cubus5-hero.jpg, cubus5-interior.jpg, cubus5-cutout.jpg, cubus5-technic.jpg
  quality.jpg
  interior-poster.jpg
  cubus5-frontinterir.png

public/images/blog/
  estonski-swierk.jpg
  jaki-rozmiar-sauny.jpg
  domowy-rytual-sauny.jpg

public/images/spec/
  spec-hero.jpg
```

Pliki, które już masz w `public/images/`, zostaw — tylko uzupełnij brakujące z listy powyżej.
