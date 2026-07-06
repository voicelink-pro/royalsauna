import Image from "next/image";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { LeadForm } from "@/components/forms/LeadForm";

/**
 * Final conversion section. With `withForm`, embeds the LeadForm directly;
 * otherwise shows headline + CTA buttons to the configurator.
 */
export function CTASection({
  locale,
  dict,
  withForm = false,
  location = "final_cta",
}: {
  locale: Locale;
  dict: Dictionary;
  withForm?: boolean;
  location?: string;
}) {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden py-20 text-sand-100 lg:min-h-[56.25vw] lg:py-28">
      <Image
        src="/images/form-back.png"
        alt=""
        fill
        sizes="100vw"
        className="animate-zoom-slow object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bark-900/90 via-bark-900/55 to-bark-900/25" />

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-400">
              {dict.home.finalCta.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-ivory sm:text-4xl lg:text-5xl">
              {dict.home.finalCta.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-sand-100/85">
              {dict.home.finalCta.description}
            </p>
            {!withForm && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaButton
                  href={routeMap.configurator[locale]}
                  location={location}
                  variant="primary"
                  className="bg-brass text-bark-800 hover:bg-brass-light"
                >
                  {dict.nav.requestOffer}
                </CtaButton>
                <CtaButton
                  href={routeMap.contact[locale]}
                  location={`${location}_contact`}
                  variant="secondary"
                  className="border-ivory text-ivory hover:bg-ivory hover:text-bark-700"
                >
                  {dict.nav.contact}
                </CtaButton>
              </div>
            )}
          </div>

          {withForm && (
            <div className="rounded-2xl bg-ivory p-6 shadow-soft sm:p-8">
              <LeadForm
                locale={locale}
                dict={dict}
                formLocation={location}
                compact
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
