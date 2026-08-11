# Dokumenty / oferty PDF

Wrzuć tutaj trzy gotowe, zaprojektowane pliki ofert — jeden dla każdego modelu,
pod dokładnie takimi nazwami:

```
oferta-compact.pdf
oferta-comfort.pdf
oferta-premium.pdf
```

System automatycznie dołącza jako załącznik do e-maila po wypełnieniu
formularza lub konfiguratora ten plik, który odpowiada modelowi
rekomendowanemu/wybranemu przez klienta (Compact / Comfort / Premium).

Jeśli plik dla danego modelu jeszcze nie istnieje, system tymczasowo wysyła
zapasowy plik `oferta.pdf` (jeśli jest dodany) — dzięki temu możesz wgrywać
pliki po kolei, bez przerywania działania formularza.

Aby użyć innych nazw/ścieżek, ustaw zmienne w `.env.local` (ścieżki względem
katalogu głównego projektu), np.:

```
OFFER_PDF_PATH_COMPACT=public/documents/oferta-compact.pdf
OFFER_PDF_PATH_COMFORT=public/documents/oferta-comfort.pdf
OFFER_PDF_PATH_PREMIUM=public/documents/oferta-premium.pdf
```
