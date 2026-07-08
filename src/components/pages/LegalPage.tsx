import Script from "next/script";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { legalContent } from "@/content/legal";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function LegalPage({
  locale,
  doc,
}: {
  locale: Locale;
  doc: "privacy" | "cookies";
}) {
  const dict = getDictionary(locale);
  const content = legalContent[doc][locale];
  const href = routeMap[doc][locale];

  return (
    <>
      <Container className="pt-28">
        <Breadcrumbs
          items={[
            { name: dict.nav.home, href: routeMap.home[locale] },
            { name: content.title, href },
          ]}
        />
      </Container>

      <Section tone="ivory" className="pt-10">
        <div className="mx-auto max-w-prose">
          <h1 className="font-serif text-4xl text-bark-700 sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-3 text-sm text-bark-400">
            {dict.legal.lastUpdated}: {content.updated}
          </p>
          <p className="mt-6 leading-relaxed text-bark-600">{content.intro}</p>

          <div className="mt-10 space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl text-bark-700">
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-bark-600">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {doc === "cookies" && <CookiebotDeclaration />}
        </div>
      </Section>
    </>
  );
}

/**
 * Cookiebot's own auto-generated, always-up-to-date list of cookies actually
 * detected on the site — more trustworthy than a hand-written list. Renders
 * nothing if Cookiebot isn't configured for this environment.
 */
function CookiebotDeclaration() {
  const cbid = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  if (!cbid) return null;

  return (
    <section className="mt-10">
      <div id="CookieDeclaration" />
      <Script
        id="CookieDeclaration"
        src={`https://consent.cookiebot.com/${cbid}/cd.js`}
        strategy="lazyOnload"
      />
    </section>
  );
}
