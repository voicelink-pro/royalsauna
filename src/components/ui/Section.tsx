import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

type Tone = "ivory" | "sand" | "bark" | "transparent";

const tones: Record<Tone, string> = {
  ivory: "bg-sand-100 text-bark-700",
  sand: "bg-sand-100 text-bark-700",
  bark: "bg-bark-800 text-sand-100",
  transparent: "",
};

export function Section({
  children,
  tone = "ivory",
  className,
  containerClassName,
  id,
  ariaLabel,
  animate = true,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  ariaLabel?: string;
  /** Subtle fade-up reveal as the section scrolls into view. */
  animate?: boolean;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-20 lg:py-28", tones[tone], className)}
    >
      <Container className={containerClassName}>
        {animate ? <SectionReveal>{children}</SectionReveal> : children}
      </Container>
    </section>
  );
}
