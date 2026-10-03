"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  ConfiguratorAnswers,
  HeaterModel,
  HeaterModelId,
  Locale,
  ModelId,
  SiteCheck,
} from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { getProduct, LINE_NAME } from "@/content/products";
import { getHeaterModel, heaterModelsByProduct } from "@/content/heaterModels";
import { formatFootprint } from "@/content/foundationDimensions";
import { routeMap } from "@/lib/site";
import {
  MODELS_BY_SIZE,
  getFootprint,
  type Conflict,
  type Recommendation,
} from "@/lib/recommend";
import {
  fill,
  formatChecks,
  formatSpace,
  optionLabel,
  seatsWord,
} from "@/lib/configurator-summary";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Wizard = Dictionary["configurator"]["wizard"];
type Intent = "project" | "installation";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif text-xl text-bark-700 sm:text-2xl">{children}</h3>;
}

// ---- CONFLICT -----------------------------------------------------------

export function ConflictPanel({
  locale,
  W,
  answers,
  conflict,
  onAcceptFallback,
  onChangeSpace,
  onChangePeople,
  onConsult,
}: {
  locale: Locale;
  W: Wizard;
  answers: Partial<ConfiguratorAnswers>;
  conflict: Conflict;
  onAcceptFallback: (model: ModelId) => void;
  onChangeSpace: () => void;
  onChangePeople: () => void;
  onConsult: () => void;
}) {
  const C = W.conflict;
  const needed = getProduct(conflict.needed)!;
  const neededSize = formatFootprint(getFootprint(conflict.needed).recommendedM, locale);
  const space = formatSpace(answers.space, locale, W);
  const fallback = conflict.fallback ? getProduct(conflict.fallback) : null;
  const smallest = MODELS_BY_SIZE[0];
  const people = answers.people ? W.peopleGenitive[answers.people] : "";

  const options: {
    id: string;
    label: string;
    hint: string;
    onClick: () => void;
  }[] = [
    ...(fallback
      ? [
          {
            id: "config-conflict-fallback",
            label: fill(C.acceptFallback, { model: fallback.name, capacity: fallback.capacity }),
            hint: C.acceptFallbackHint,
            onClick: () => onAcceptFallback(fallback.id),
          },
        ]
      : []),
    {
      id: "config-conflict-space",
      label: fill(C.changeSpace, { needed: needed.name }),
      hint: fill(C.changeSpaceHint, { size: neededSize }),
      onClick: onChangeSpace,
    },
    {
      id: "config-conflict-people",
      label: C.changePeople,
      hint: C.changePeopleHint,
      onClick: onChangePeople,
    },
    {
      id: "config-conflict-consult",
      label: C.consult,
      hint: C.consultHint,
      onClick: onConsult,
    },
  ];

  return (
    <div data-guide="form-configurator" className="animate-step-in mx-auto max-w-3xl rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-9">
      <p className="text-xs font-medium uppercase tracking-widest text-clay-500">{C.eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl text-bark-700 sm:text-3xl">
        {fallback ? fill(C.title, { people }) : C.noneFitsTitle}
      </h2>
      <p className="mt-3 text-bark-500">
        {fallback
          ? fill(C.body, { needed: needed.name, neededSize, space })
          : fill(C.noneFitsBody, {
              smallest: getProduct(smallest)!.name,
              smallestSize: formatFootprint(getFootprint(smallest).recommendedM, locale),
              space,
            })}
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            data-guide={o.id}
            onClick={o.onClick}
            className="flex flex-col items-start rounded-xl border border-sand-300 p-4 text-left transition-all duration-300 ease-calm hover:-translate-y-0.5 hover:border-clay-400 hover:bg-sand-100/40 hover:shadow-card active:scale-[0.98]"
          >
            <span className="font-serif text-base text-bark-700">{o.label}</span>
            <span className="mt-0.5 text-sm text-bark-500">{o.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---- RESULT -------------------------------------------------------------

export function ProjectResult({
  locale,
  dict,
  answers,
  rec,
  model,
  heater,
  suggestedHeater,
  checks,
  status,
  onSelectModel,
  onSelectHeater,
  onEditAnswers,
  onCta,
}: {
  locale: Locale;
  dict: Dictionary;
  answers: Partial<ConfiguratorAnswers>;
  rec: Recommendation;
  model: ModelId;
  heater: HeaterModelId;
  suggestedHeater: HeaterModelId;
  checks: SiteCheck[];
  status: "ready" | "toConfirm";
  onSelectModel: (model: ModelId) => void;
  onSelectHeater: (heater: HeaterModelId) => void;
  onEditAnswers: () => void;
  onCta: (intent: Intent) => void;
}) {
  const W = dict.configurator.wizard;
  const R = W.result;
  const product = getProduct(model)!;
  const copy = product.i18n[locale];
  const footprint = getFootprint(model);
  const evaluation = rec.evaluations.find((e) => e.model === model)!;
  const manual = model !== rec.model;
  const recommendedProduct = rec.model ? getProduct(rec.model) : null;
  const people = answers.people ? W.peopleGenitive[answers.people] : "";
  const foundationSize = formatFootprint(footprint.recommendedM, locale);
  const saunaSize = formatFootprint(footprint.exteriorM, locale);
  const spaceText = formatSpace(answers.space, locale, W);
  const heaterCopy = R.heaters[heater];

  const [view, setView] = useState<"exterior" | "interior" | "drawing">("exterior");
  const viewImage = {
    exterior: product.images[0],
    interior: product.images[1] ?? product.images[0],
    drawing: product.images[3] ?? product.images[0],
  }[view];

  const desktopImage =
    view === "exterior"
      ? `/images/${model}-config.png`
      : view === "interior"
        ? `/images/${model}-int-config.png`
        : null;

  // Headline sentence
  const fitKey = evaluation.fit === "tooSmall" ? "unknown" : evaluation.fit;
  const because =
    manual && recommendedProduct
      ? fill(R.manualBecause, { recommended: recommendedProduct.name })
      : fill(R.because, {
          usage: answers.people ? R.peoplePhrase[answers.people] : "",
          spaceClause: R.spaceClause[fitKey],
        });

  // Three reasons derived strictly from the answers
  const vars = {
    model: product.name,
    capacity: product.capacity,
    seats: seatsWord(product.capacity, locale, W),
    people,
    foundation: foundationSize,
    space: spaceText,
  };
  const comfortReason = manual
    ? R.reasons.manual
    : rec.comfortOutcome === "upgraded"
      ? answers.comfort === "lounge"
        ? R.reasons.upgradedLounge
        : R.reasons.upgradedSpace
      : R.reasons[rec.comfortOutcome];
  const reasons = [
    fill(evaluation.capacityOk ? R.reasons.capacity : R.reasons.capacityShort, vars),
    fill(R.reasons[fitKey], vars),
    fill(comfortReason, vars),
  ];

  // Heaters available for this model only
  const heaters = heaterModelsByProduct[model]
    .map(getHeaterModel)
    .filter((h): h is HeaterModel => Boolean(h));

  // Preparation list
  const prepare: string[] = [];
  if (checks.includes("space")) prepare.push(fill(R.prepare.space, { size: foundationSize }));
  prepare.push(
    fill(
      answers.foundation === "ready"
        ? R.prepare.foundationReady
        : answers.foundation === "todo"
          ? R.prepare.foundationTodo
          : R.prepare.foundationUnknown,
      { size: foundationSize },
    ),
  );
  prepare.push(
    fill(
      answers.power === "ready"
        ? R.prepare.powerReady
        : answers.power === "check"
          ? R.prepare.powerCheck
          : R.prepare.powerUnknown,
      { supply: heaterCopy.supply },
    ),
  );
  prepare.push(R.prepare.access);

  const alternatives = MODELS_BY_SIZE.filter((m) => m !== model);
  const downgradeMode = rec.model === null;

  const ctas = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        type="button"
        size="lg"
        data-guide="config-goto-contact"
        onClick={() => onCta("project")}
        className="w-full sm:w-auto"
      >
        {R.ctaProject}
      </Button>
      <Button
        type="button"
        size="lg"
        variant="outline"
        data-guide="config-goto-installation"
        onClick={() => onCta("installation")}
        className="w-full sm:w-auto"
      >
        {R.ctaInstallation}
      </Button>
    </div>
  );

  return (
    <div data-guide="form-configurator" className="animate-step-in space-y-6">
      {/* Header card */}
      <div className="overflow-hidden rounded-3xl border border-sand-200 bg-ivory shadow-card">
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          {/* Visual */}
          <div className="relative bg-sand-100">
            <div className="relative aspect-[4/3] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Image
                key={viewImage.src}
                src={viewImage.src}
                alt={viewImage.alt}
                fill
                sizes="100vw"
                className={cn(
                  "animate-fade-in",
                  view === "drawing" ? "bg-white object-contain p-4" : "object-cover",
                  desktopImage && "lg:hidden",
                )}
              />
              {desktopImage && (
                <Image
                  key={desktopImage}
                  src={desktopImage}
                  alt={viewImage.alt}
                  fill
                  sizes="600px"
                  className="hidden animate-fade-in object-cover lg:block"
                />
              )}
            </div>
            <div
              role="tablist"
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-white/90 p-1 shadow-card backdrop-blur"
            >
              {(["exterior", "interior", "drawing"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  data-guide={`config-view-${v}`}
                  onClick={() => setView(v)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4",
                    view === v ? "bg-bark-700 text-ivory" : "text-bark-600 hover:text-bark-800",
                  )}
                >
                  {R.views[v]}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-widest text-clay-500">{R.eyebrow}</p>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
                  status === "ready" ? "bg-emerald-50 text-emerald-800" : "bg-brass/20 text-bark-700",
                )}
              >
                {status === "ready" ? R.statusReady : R.statusToConfirm}
              </span>
              {manual && (
                <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-bark-600">
                  {R.manualBadge}
                </span>
              )}
            </div>
            <h2 className="mt-2 font-serif text-3xl text-bark-700 sm:text-4xl">
              {LINE_NAME} {product.name}
            </h2>
            <p className="mt-1 text-sm text-bark-500">{copy.tagline}</p>
            <p className="mt-4 text-bark-600">{because}</p>

            <dl className="mt-5 space-y-2 rounded-2xl bg-sand-100/70 p-4 text-sm">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-bark-500">{R.saunaSize}:</dt>
                <dd className="font-medium text-bark-700">
                  {saunaSize} · {R.foundationSize}: {foundationSize}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-bark-500">{R.toCheck}:</dt>
                <dd className="font-medium text-bark-700">{formatChecks(checks, W)}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-sand-200 pt-5">
              <p className="text-sm text-bark-500">{R.priceFrom}</p>
              <p className="font-serif text-3xl text-bark-700">
                {formatPrice(product.priceFrom, locale)} {dict.common.currency}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-bark-500">{R.priceNote}</p>
            </div>

            <div className="mt-6">{ctas}</div>
          </div>
        </div>
      </div>

      {/* Why */}
      <section className="rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-8">
        <SectionTitle>{R.whyTitle}</SectionTitle>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <li key={reason} className="rounded-2xl bg-sand-100/60 p-5">
              <span className="font-serif text-2xl text-clay-500">{i + 1}</span>
              <p className="mt-2 text-sm leading-relaxed text-bark-600">{reason}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Heater */}
      <section className="rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-8">
        <SectionTitle>{R.heaterTitle}</SectionTitle>
        <p className="mt-2 text-sm text-bark-500">{fill(R.heaterDescription, { model: product.name })}</p>
        <div className={cn("mt-5 grid gap-4", heaters.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {heaters.map((h) => {
            const active = h.id === heater;
            const suggested = h.id === suggestedHeater;
            const hc = R.heaters[h.id];
            return (
              <button
                key={h.id}
                type="button"
                data-guide={`config-heater-${h.id}`}
                aria-pressed={active}
                onClick={() => onSelectHeater(h.id)}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-calm",
                  active
                    ? "border-bark-700 bg-sand-100 shadow-card"
                    : "border-sand-300 hover:-translate-y-0.5 hover:border-clay-400 hover:shadow-card",
                )}
              >
                <div className="relative aspect-[4/3] bg-white">
                  <Image src={h.image.src} alt={h.image.alt} fill sizes="(max-width: 768px) 100vw, 300px" className="object-contain p-3" />
                  <div className="absolute left-3 top-3 flex gap-1.5">
                    {suggested && (
                      <span className="rounded-full bg-brass px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-bark-800">
                        {R.heaterSuggested}
                      </span>
                    )}
                    {active && (
                      <span className="rounded-full bg-bark-700 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-ivory">
                        {R.heaterSelected}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-serif text-lg text-bark-700">Harvia {h.family}</p>
                  {suggested && answers.climate && (
                    <p className="mt-1 text-sm font-medium text-clay-600">{R.heaterWhy[answers.climate]}</p>
                  )}
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-bark-400">{R.heaterExperience}</dt>
                      <dd className="text-bark-600">{hc.experience}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-bark-400">{R.heaterLook}</dt>
                      <dd className="text-bark-600">{hc.look}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-bark-400">{R.heaterSupply}</dt>
                      <dd className="text-bark-600">{hc.supply}</dd>
                    </div>
                  </dl>
                  {!active && (
                    <span className="mt-4 text-sm font-medium text-bark-700 underline-offset-4 group-hover:underline">
                      {R.heaterChoose} →
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Included + prepare */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-8">
          <SectionTitle>{R.includedTitle}</SectionTitle>
          <ul className="mt-5 space-y-2.5">
            {[...copy.included, R.includedExtra].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-bark-600">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-8">
          <SectionTitle>{R.prepareTitle}</SectionTitle>
          <ul className="mt-5 space-y-3">
            {prepare.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-bark-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={routeMap.foundation[locale]}
            target="_blank"
            className="mt-5 inline-block text-sm font-medium text-bark-700 underline underline-offset-4 hover:text-clay-600"
          >
            {R.prepare.foundationLink} →
          </Link>
        </section>
      </div>

      {/* Alternatives */}
      <section className="rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-8">
        <SectionTitle>{R.alternativesTitle}</SectionTitle>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {alternatives.map((alt) => {
            const p = getProduct(alt)!;
            const ev = rec.evaluations.find((e) => e.model === alt)!;
            const fp = getFootprint(alt);
            const isRecommended = alt === rec.model;
            const selectable =
              ev.eligible || isRecommended || (downgradeMode && ev.fit !== "tooSmall");
            const blockReason = !selectable
              ? ev.fit === "tooSmall"
                ? R.alternativeNoSpace
                : fill(R.alternativeNoSeats, { people })
              : null;
            const seatsDiff = p.capacity - product.capacity;
            const priceDiff = p.priceFrom - product.priceFrom;
            const signed = (n: number, text: string) => `${n > 0 ? "+" : "−"}${text}`;
            return (
              <div key={alt} className="flex gap-4 rounded-2xl border border-sand-200 p-4">
                <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-sand-100 sm:block">
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="112px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg text-bark-700">
                    {LINE_NAME} {p.name}
                  </p>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                    <dt className="text-bark-500">{R.alternativeSeats}</dt>
                    <dd className="text-bark-700">
                      {p.capacity}{" "}
                      <span className="text-bark-500">({signed(seatsDiff, String(Math.abs(seatsDiff)))})</span>
                    </dd>
                    <dt className="text-bark-500">{R.alternativeSize}</dt>
                    <dd className="text-bark-700">{formatFootprint(fp.exteriorM, locale)}</dd>
                    <dt className="text-bark-500">{R.alternativeFoundation}</dt>
                    <dd className="text-bark-700">{formatFootprint(fp.recommendedM, locale)}</dd>
                    <dt className="text-bark-500">{R.alternativePrice}</dt>
                    <dd className="text-bark-700">
                      {formatPrice(p.priceFrom, locale)} {dict.common.currency}{" "}
                      <span className="text-bark-500">
                        ({signed(priceDiff, `${formatPrice(Math.abs(priceDiff), locale)} ${dict.common.currency}`)})
                      </span>
                    </dd>
                  </dl>
                  {selectable ? (
                    <button
                      type="button"
                      data-guide={`config-model-${alt}`}
                      onClick={() => onSelectModel(alt)}
                      className="mt-3 text-sm font-medium text-bark-700 underline underline-offset-4 hover:text-clay-600"
                    >
                      {isRecommended ? R.alternativeRecommended : fill(R.alternativeSelect, { model: p.name })} →
                    </button>
                  ) : (
                    <p className="mt-3 text-sm text-red-700">{blockReason}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col-reverse items-center gap-4 rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:flex-row sm:justify-between sm:p-8">
        <button
          type="button"
          data-guide="config-step-back"
          onClick={onEditAnswers}
          className="text-sm font-medium text-bark-600 transition-colors hover:text-bark-800"
        >
          ← {R.adjust}
        </button>
        {ctas}
      </div>
    </div>
  );
}
