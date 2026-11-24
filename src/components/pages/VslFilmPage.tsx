import type { Locale } from "@/types";
import { Container } from "@/components/ui/Container";
import { VslPlayer } from "@/components/vsl/VslPlayer";

const copyByLocale = {
  pl: {
    eyebrow: "RoyalSauna · Film powitalny",
    title: "Dlaczego nasze sauny są tak wyjątkowe?",
    subtitle:
      "Poświęć minutę i poznaj detale, które tworzą własne miejsce do odpoczynku i regeneracji.",
    playLabel: "Obejrzyj film",
    durationLabel: "1 min",
    replayLabel: "Obejrzyj ponownie",
    videoAriaLabel: "Film powitalny RoyalSauna",
  },
  en: {
    eyebrow: "RoyalSauna · Welcome Video",
    title: "What makes our saunas so special?",
    subtitle:
      "Take a minute to discover the details that create your own space for rest and regeneration.",
    playLabel: "Watch video",
    durationLabel: "1 min",
    replayLabel: "Watch again",
    videoAriaLabel: "RoyalSauna welcome video",
  },
} as const;

export function VslFilmPage({ locale }: { locale: Locale }) {
  const t = copyByLocale[locale];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#362618] pb-20 pt-24 text-ivory sm:pt-28 lg:pb-28 lg:pt-36">
      <Container className="relative z-10">
        {/* Intro copy with gentle staggered entrance */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="animate-fade-up inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-brass-light"
            style={{ animationDelay: "40ms" }}
          >
            <span aria-hidden="true" className="h-px w-6 bg-brass/60" />
            <span>{t.eyebrow}</span>
            <span aria-hidden="true" className="h-px w-6 bg-brass/60" />
          </div>

          <h1
            className="animate-fade-up mt-4 font-serif text-3xl leading-[1.12] tracking-tight text-ivory text-balance sm:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: "140ms" }}
          >
            {t.title}
          </h1>

          <p
            className="animate-fade-up mx-auto mt-4 max-w-2xl text-base leading-relaxed text-sand-200/85 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Large rounded video box */}
        <div
          className="animate-fade-up mt-10 sm:mt-12"
          style={{ animationDelay: "320ms" }}
        >
          <VslPlayer
            src="/documents/vsl-video.mp4?v=2"
            playLabel={t.playLabel}
            durationLabel={t.durationLabel}
            replayLabel={t.replayLabel}
            ariaLabel={t.videoAriaLabel}
          />
        </div>
      </Container>
    </section>
  );
}
