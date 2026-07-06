import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactLink } from "@/components/ui/ContactLink";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Container className="pt-28">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: dict.nav.contact, href: routeMap.contact[locale] },
          ]}
        />
      </Container>

      <Section tone="ivory" className="pt-10">
        <SectionHeading
          as="h1"
          eyebrow={dict.contact.hero.eyebrow}
          title={dict.contact.hero.h1}
          description={dict.contact.hero.description}
          className="mb-14 max-w-3xl"
        />

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
                {dict.contact.phoneTitle}
              </p>
              <ContactLink
                type="phone"
                href={dict.brand.phoneHref}
                location="contact_page"
                className="mt-1 block font-serif text-2xl text-bark-700"
              >
                {dict.brand.phone}
              </ContactLink>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
                {dict.contact.emailTitle}
              </p>
              <ContactLink
                type="email"
                href={dict.brand.emailHref}
                location="contact_page"
                className="mt-1 block font-serif text-2xl text-bark-700"
              >
                {dict.brand.email}
              </ContactLink>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
                {dict.contact.addressTitle}
              </p>
              <p className="mt-1 text-bark-500">{dict.brand.address}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-sand-200 bg-sand-100 p-6 shadow-card sm:p-8">
            <h2 className="mb-6 font-serif text-2xl text-bark-700">
              {dict.contact.formTitle}
            </h2>
            <LeadForm locale={locale} dict={dict} formLocation="contact_page" />
          </div>
        </div>
      </Section>
    </>
  );
}
