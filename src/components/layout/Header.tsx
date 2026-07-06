"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { products } from "@/content/products";
import { CtaButton } from "@/components/ui/CtaButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface NavLink {
  key: string;
  label: string;
  href: string;
}

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const specDropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const specTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nav: NavLink[] = [
    { key: "models", label: dict.nav.models, href: routeMap.saunas[locale] },
    { key: "configurator", label: dict.nav.configurator, href: routeMap.configurator[locale] },
    { key: "specification", label: dict.nav.specification, href: routeMap.quality[locale] },
    { key: "blog", label: dict.nav.blog, href: routeMap.blog[locale] },
    { key: "contact", label: dict.nav.contact, href: routeMap.contact[locale] },
  ];

  const modelLinks = products.map((p) => ({
    id: p.id,
    name: p.name,
    tagline: p.i18n[locale].tagline,
    href: `${routeMap.saunas[locale]}/${locale === "pl" ? p.slug : p.enSlug}`,
    image: p.images[0].src,
  }));

  const specLinks = [
    {
      key: "heaters",
      label: dict.nav.specHeaters,
      href: routeMap.heaters[locale],
      image: "/images/heaters-banner.jpg",
    },
    {
      key: "wood",
      label: dict.nav.specWood,
      href: routeMap.wood[locale],
      image: "/images/drewno-banner.jpg",
    },
    {
      key: "foundation",
      label: dict.nav.specFoundation,
      href: routeMap.foundation[locale],
      image: "/images/podloze-banner.jpg",
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setModelsOpen(false);
    setSpecOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setModelsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setModelsOpen(false), 200);
  };

  const handleSpecEnter = () => {
    if (specTimeoutRef.current) clearTimeout(specTimeoutRef.current);
    setSpecOpen(true);
  };

  const handleSpecLeave = () => {
    specTimeoutRef.current = setTimeout(() => setSpecOpen(false), 200);
  };

  const homeHref = routeMap.home[locale];
  const isHomePage = pathname === homeHref || pathname === "/";
  // Product pages (and the heaters/wood spec pages) also open with a
  // full-bleed photo banner, so the header stays transparent over it just
  // like on the home page, until scrolled past.
  const isProductPage = modelLinks.some((m) => m.href === pathname);
  const isHeatersPage = pathname === routeMap.heaters[locale];
  const isWoodPage = pathname === routeMap.wood[locale];
  const isFoundationPage = pathname === routeMap.foundation[locale];
  const hasTransparentHero =
    isHomePage || isProductPage || isHeatersPage || isWoodPage || isFoundationPage;
  const overDark = hasTransparentHero && !pastHero && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-calm",
        overDark
          ? "bg-transparent"
          : "bg-sand-100/95 shadow-[0_1px_0_rgba(90,70,50,0.08)] backdrop-blur",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href={homeHref}
          aria-label={dict.brand.name}
          className="relative block h-11 w-[155px] shrink-0 transition-opacity duration-500 hover:opacity-90 sm:h-12 sm:w-[176px]"
        >
          <Image
            src="/logo.png"
            alt={dict.brand.name}
            fill
            priority
            sizes="176px"
            className={cn(
              "object-contain object-left transition-all duration-500",
              overDark && "brightness-0 invert",
            )}
          />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label={dict.nav.menu}
        >
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== homeHref && pathname?.startsWith(item.href));

            if (item.key === "models") {
              return (
                <div
                  key={item.key}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-1 text-sm tracking-wide transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                      overDark
                        ? active
                          ? "text-ivory"
                          : "text-ivory/80 hover:text-ivory"
                        : active
                          ? "text-clay-600"
                          : "text-bark-600 hover:text-clay-600",
                    )}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        modelsOpen && "rotate-180",
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown compact menu */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-300",
                      modelsOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0",
                    )}
                  >
                    <div className="w-[320px] rounded-xl border border-sand-200 bg-sand-100 p-3 shadow-soft">
                      <div className="space-y-1">
                        {modelLinks.map((model) => (
                          <Link
                            key={model.id}
                            href={model.href}
                            className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-sand-100"
                          >
                            <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={model.image}
                                alt={model.name}
                                fill
                                sizes="56px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-bark-700">
                                {model.name}
                              </h4>
                              <p className="text-[11px] text-bark-500">
                                {model.tagline}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={routeMap.saunas[locale]}
                        className="mt-2 block border-t border-sand-200 pt-2 text-center text-xs font-medium text-clay-600 transition-colors hover:text-clay-500"
                      >
                        {dict.nav.seeSizes} →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.key === "specification") {
              return (
                <div
                  key={item.key}
                  ref={specDropdownRef}
                  className="relative"
                  onMouseEnter={handleSpecEnter}
                  onMouseLeave={handleSpecLeave}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-1 text-sm tracking-wide transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                      overDark
                        ? active
                          ? "text-ivory"
                          : "text-ivory/80 hover:text-ivory"
                        : active
                          ? "text-clay-600"
                          : "text-bark-600 hover:text-clay-600",
                    )}
                  >
                    {item.label}
                    <svg
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        specOpen && "rotate-180",
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Spec dropdown */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-300",
                      specOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0",
                    )}
                  >
                    <div className="w-[280px] rounded-xl border border-sand-200 bg-sand-100 p-3 shadow-soft">
                      <div className="space-y-1">
                        {specLinks.map((link) => (
                          <Link
                            key={link.key}
                            href={link.href}
                            className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-all duration-200 hover:bg-sand-200"
                          >
                            <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={link.image}
                                alt={link.label}
                                fill
                                sizes="56px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <h4 className="text-sm font-medium text-bark-700">
                              {link.label}
                            </h4>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                  overDark
                    ? active
                      ? "text-ivory"
                      : "text-ivory/80 hover:text-ivory"
                    : active
                      ? "text-clay-600"
                      : "text-bark-600 hover:text-clay-600",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher current={locale} className={overDark ? "[&_a]:text-ivory/80 [&_a[aria-current]]:text-ivory [&_span]:text-ivory/40" : ""} />
          <CtaButton
            href={routeMap.configurator[locale]}
            location="header"
            variant="primary"
            className={cn(
              "px-5 py-2.5 transition-colors duration-500",
              overDark && "bg-ivory/20 text-ivory backdrop-blur hover:bg-ivory/30",
            )}
          >
            {dict.nav.requestOffer}
          </CtaButton>
        </div>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center lg:hidden transition-colors duration-500",
            overDark ? "text-ivory" : "text-bark-700",
          )}
          aria-expanded={open}
          aria-label={open ? dict.nav.close : dict.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-sand-100 transition-[max-height] duration-500 ease-calm",
          open ? "max-h-screen border-t border-sand-200" : "max-h-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <div key={item.key}>
              <Link
                href={item.href}
                className="rounded-lg px-2 py-3 text-lg text-bark-700 hover:bg-sand-100 block"
              >
                {item.label}
              </Link>
              {item.key === "models" && (
                <div className="ml-4 mb-2 space-y-1">
                  {modelLinks.map((model) => (
                    <Link
                      key={model.id}
                      href={model.href}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-bark-600 hover:bg-sand-100"
                    >
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{model.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {item.key === "specification" && (
                <div className="ml-4 mb-2 space-y-1">
                  {specLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-bark-600 hover:bg-sand-200"
                    >
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={link.image}
                          alt={link.label}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between border-t border-sand-200 pt-5">
            <LanguageSwitcher current={locale} />
            <CtaButton
              href={routeMap.configurator[locale]}
              location="mobile_menu"
              variant="primary"
              className="px-5 py-2.5"
            >
              {dict.nav.requestOffer}
            </CtaButton>
          </div>
        </Container>
      </div>
    </header>
  );
}
