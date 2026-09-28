import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { ContactLink } from "@/components/ui/ContactLink";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const productBase = locale === "pl" ? "/sauny" : "/en/saunas";
  const h = dict.heatersPage;
  const w = dict.woodPage;
  const p = dict.podlozePage;

  const heatersHref = routeMap.heaters[locale];
  const woodHref = routeMap.wood[locale];
  const foundationHref = routeMap.foundation[locale];

  return (
    <footer className="bg-bark-800 text-sand-200">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <p className="font-serif text-2xl text-ivory">{dict.brand.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-300">
              {dict.footer.tagline}
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-widest text-clay-400">
              {dict.footer.follow}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <SocialLink
                href={dict.brand.instagramUrl}
                label={dict.footer.instagram}
              >
                <InstagramIcon />
              </SocialLink>
              <SocialLink
                href={dict.brand.facebookUrl}
                label={dict.footer.facebook}
              >
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-9">
            {/* Sauny */}
            <FooterColumn title={dict.footer.products}>
              <FooterLink href={routeMap.saunas[locale]}>
                {dict.nav.seeSizes}
              </FooterLink>
              {products.map((product) => {
                const href = `${productBase}/${
                  locale === "pl" ? product.slug : product.enSlug
                }`;
                return (
                  <FooterGroup key={product.id} title={product.name} href={href}>
                    <FooterSubLink href={`${href}#design`}>
                      {dict.common.exteriorEyebrow}
                    </FooterSubLink>
                    <FooterSubLink href={`${href}#wnetrze`}>
                      {dict.common.interiorTitle}
                    </FooterSubLink>
                    <FooterSubLink href={`${href}#wymiary`}>
                      {dict.common.dimensionsTitle}
                    </FooterSubLink>
                    <FooterSubLink href={`${href}#faq`}>
                      {dict.faq.title}
                    </FooterSubLink>
                  </FooterGroup>
                );
              })}
            </FooterColumn>

            {/* Specyfikacja */}
            <FooterColumn title={dict.nav.quality}>
              <FooterLink href={routeMap.quality[locale]}>
                {dict.nav.quality}
              </FooterLink>

              <FooterGroup title={dict.nav.specHeaters} href={heatersHref}>
                <FooterSubLink href={`${heatersHref}#dopasowanie`}>
                  {h.matchSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${heatersHref}#porownanie`}>
                  {h.compareSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${heatersHref}#piece`}>
                  {h.detailSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${heatersHref}#faq`}>
                  {dict.faq.title}
                </FooterSubLink>
              </FooterGroup>

              <FooterGroup title={dict.nav.specWood} href={woodHref}>
                <FooterSubLink href={`${woodHref}#materialy`}>
                  {w.materialsSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${woodHref}#konstrukcja`}>
                  {w.diagramSection.title}
                </FooterSubLink>
              </FooterGroup>

              <FooterGroup title={dict.nav.specFoundation} href={foundationHref}>
                <FooterSubLink href={`${foundationHref}#rodzaje`}>
                  {p.typesSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${foundationHref}#wymagania`}>
                  {p.requirementsSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${foundationHref}#wymiary`}>
                  {p.dimensionsSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${foundationHref}#porownanie`}>
                  {p.compareSection.title}
                </FooterSubLink>
                <FooterSubLink href={`${foundationHref}#faq`}>
                  {dict.faq.title}
                </FooterSubLink>
              </FooterGroup>
            </FooterColumn>

            {/* Informacje */}
            <FooterColumn title={dict.footer.company}>
              <FooterLink href={routeMap.blog[locale]}>
                {dict.nav.blog}
              </FooterLink>
              <FooterLink href={routeMap.configurator[locale]}>
                {dict.nav.configurator}
              </FooterLink>
              <FooterLink href={routeMap.contact[locale]}>
                {dict.nav.contact}
              </FooterLink>
              <FooterLink href={routeMap.privacy[locale]}>
                {dict.footer.privacy}
              </FooterLink>
              <FooterLink href={routeMap.cookies[locale]}>
                {dict.footer.cookies}
              </FooterLink>
            </FooterColumn>

            {/* Kontakt */}
            <FooterColumn title={dict.footer.contact}>
              <ul className="space-y-3 text-sm">
                <li>
                  <ContactLink type="phone" href={dict.brand.phoneHref}>
                    {dict.brand.phone}
                  </ContactLink>
                </li>
                <li>
                  <ContactLink type="email" href={dict.brand.emailHref}>
                    {dict.brand.email}
                  </ContactLink>
                </li>
                <li className="pt-2 text-sand-400">{dict.brand.address}</li>
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-14 border-t border-bark-600 pt-8 text-sm text-sand-400">
          <p>
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2.5 rounded-full border border-bark-600 px-4 py-2 text-sm text-sand-200 transition-colors hover:border-clay-400 hover:text-clay-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
    >
      {children}
      {label}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M14.2 8.5h2.3V5.8h-2.3c-2.1 0-3.7 1.6-3.7 3.7v1.8H8.3v2.7h2.2V20h2.8v-6h2.3l.4-2.7h-2.7v-1.5c0-.7.4-1.3.9-1.3Z" />
    </svg>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-clay-400">
        {title}
      </p>
      <ul className="mt-4 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-clay-400">
        {children}
      </Link>
    </li>
  );
}

/** A subpage link (bold-ish) followed by its own section-heading anchors. */
function FooterGroup({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="pt-1 first:pt-0">
      <Link
        href={href}
        className="font-medium text-sand-100 transition-colors hover:text-clay-400"
      >
        {title}
      </Link>
      <ul className="mt-2 space-y-2 border-l border-bark-600 pl-3">
        {children}
      </ul>
    </li>
  );
}

function FooterSubLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-xs text-sand-400 transition-colors hover:text-clay-400"
      >
        {children}
      </Link>
    </li>
  );
}
