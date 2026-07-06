# Hero — film przewijany scrollem

Hero na stronie głównej używa **sekwencji klatek rysowanych na canvas** (metoda
„Apple-style"), a nie odtwarzania `<video>`. Dzięki temu scrub jest idealnie
płynny i klatkowo dokładny w każdej przeglądarce — bez zacięć, opóźnień i
„gubienia" klatek, które występują przy ustawianiu `currentTime` na wideo.

## Jak podmienić film

1. Wrzuć nowy plik źródłowy jako `public/videos/hero.mp4`.
2. Wygeneruj klatki skryptem:

```bash
npm run hero:frames
```

Skrypt wyodrębni klatki do `public/hero-frames/` jako `frame-0001.jpg`, ...

3. Jeśli liczba klatek się zmieni, zaktualizuj `FRAME_COUNT`
   w `src/components/sections/HeroVideoScroll.tsx` (skrypt wypisze liczbę na końcu).

## Zalecenia dotyczące pliku źródłowego

- **Format**: MP4 (H.264), bez dźwięku.
- **Rozdzielczość**: 1280×720 lub 1920×1080 (landscape).
- **Długość**: 4–10 s. Krótszy = płynniejszy scrub.
- **fps źródła**: 24–30.

## Parametry sekwencji (w skrypcie `scripts/extract-hero-frames.sh`)

- `fps=12` → 12 klatek na sekundę filmu (canvas i tak interpoluje płynnie).
- `scale=1280:-2` → szerokość 1280 px.
- `-qscale:v 5` → jakość JPEG (niżej = lepiej, większy plik).

Cel: ~80–160 klatek i łączny rozmiar `public/hero-frames/` poniżej ~8 MB.

## Tempo przewijania

Długość „toru" scrolla ustawia prop `scrollHeightVh` (domyślnie `240`) w
`HeroVideoScroll`. Większa wartość = wolniejsze, dłuższe przewijanie.
