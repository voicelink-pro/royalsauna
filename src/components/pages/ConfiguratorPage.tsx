import Image from "next/image";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ConfiguratorWizard } from "@/components/forms/ConfiguratorWizard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function ConfiguratorPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-sand-100 pb-24">
      <Container className="pt-28">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.configurator, href: routeMap.configurator[locale] },
          ]}
        />
      </Container>

      <Container className="pt-8">
        <SectionReveal className="mx-auto max-w-3xl">
          <SectionHeading
            as="h1"
            eyebrow={dict.configurator.hero.eyebrow}
            title={dict.configurator.hero.h1}
            description={dict.configurator.hero.description}
            align="center"
            className="mb-8"
          />
          <div
            className="mb-8 flex items-center justify-center gap-4"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-sand-300" />
            <Image
              src="/logo.png"
              alt=""
              width={160}
              height={44}
              className="h-8 w-auto object-contain opacity-90"
            />
            <span className="h-px w-12 bg-sand-300" />
          </div>
          <ConfiguratorWizard locale={locale} dict={dict} />
        </SectionReveal>
      </Container>
    </section>
  );
}
