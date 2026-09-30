"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type {
  ConfiguratorAnswers,
  ConfiguratorLeadData,
  HeaterModelId,
  LeadPayload,
  Locale,
  ModelId,
} from "@/types";
import type { Dictionary } from "@/lib/i18n";
import {
  projectStatus,
  recommend,
  recommendHeater,
  siteChecks,
} from "@/lib/recommend";
import { heaterModelsByProduct } from "@/content/heaterModels";
import { buildAnswerRows, type SummaryStep } from "@/lib/configurator-summary";
import { trackEvent } from "@/lib/analytics";
import { useAttribution } from "@/lib/useAttribution";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SpacePlanner } from "@/components/configurator/SpacePlanner";
import { ConflictPanel, ProjectResult } from "@/components/configurator/ProjectResult";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEP_KEYS = [
  "usage",
  "people",
  "comfort",
  "space",
  "preparation",
  "climate",
  "timing",
] as const satisfies readonly SummaryStep[];
type StepKey = (typeof STEP_KEYS)[number];
type TileKey = "usage" | "people" | "comfort" | "climate" | "timing";
type Phase = "questions" | "result" | "contact" | "success";
type Intent = ConfiguratorLeadData["intent"];

const MIN_M = 0.5;
const MAX_M = 30;

function parseMeters(raw: string): number | null {
  const value = Number.parseFloat(raw.replace(",", ".").trim());
  if (!Number.isFinite(value) || value < MIN_M || value > MAX_M) return null;
  return Math.round(value * 100) / 100;
}

interface TileOption {
  value: string;
  label: string;
  hint?: string;
  image?: string;
}

function OptionTiles({
  stepKey,
  options,
  selected,
  onSelect,
}: {
  stepKey: string;
  options: readonly TileOption[];
  selected: string | undefined;
  onSelect: (value: string) => void;
}) {
  const withImages = options.some((o) => o.image);
  const tall = withImages && options.length === 3;
  const quad = withImages && options.length === 4;
  // Icon artwork must stay whole; photos may be cropped to fill the tile.
  const contain = stepKey === "people";
  return (
    <div
      role="radiogroup"
      className={cn(
        "grid gap-2.5",
        withImages
          ? tall
            ? "sm:h-full sm:grid-cols-3 sm:grid-rows-[minmax(140px,1fr)_auto] sm:gap-y-0"
            : "grid-cols-2 sm:h-full sm:grid-rows-2"
          : "sm:grid-cols-2",
      )}
    >
      {options.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-guide={`config-${stepKey}-${opt.value}`}
            onClick={() => onSelect(opt.value)}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-calm active:scale-[0.98]",
              tall && "sm:row-span-2 sm:grid sm:grid-rows-subgrid",
              quad && "sm:min-h-0",
              active
                ? "border-bark-700 bg-sand-100 shadow-card ring-1 ring-bark-700"
                : "border-sand-300 bg-ivory hover:-translate-y-0.5 hover:border-clay-400 hover:shadow-card",
            )}
          >
            {opt.image && (
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-white",
                  tall
                    ? "aspect-[16/7] sm:aspect-auto sm:h-full"
                    : "aspect-[4/3] sm:aspect-auto sm:min-h-0 sm:flex-1",
                )}
              >
                <Image
                  src={opt.image}
                  alt=""
                  fill
                  sizes={tall ? "(max-width: 640px) 100vw, 320px" : "(max-width: 640px) 50vw, 320px"}
                  className={cn(
                    "transition-transform duration-700 ease-calm group-hover:scale-105",
                    contain ? "object-contain p-2" : "object-cover",
                  )}
                />
                {active && (
                  <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-bark-700 text-ivory">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>
            )}
            <span className="flex flex-col p-2.5">
              <span className="font-serif text-sm text-bark-700 sm:text-base">{opt.label}</span>
              {opt.hint && <span className="mt-0.5 text-xs text-bark-500 sm:text-sm">{opt.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ChoiceRow({
  groupKey,
  label,
  options,
  selected,
  onSelect,
}: {
  groupKey: string;
  label: string;
  options: readonly { value: string; label: string }[];
  selected: string | undefined;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-bark-600">{label}</legend>
      <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
        {options.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              data-guide={`config-${groupKey}-${opt.value}`}
              onClick={() => onSelect(opt.value)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ease-calm active:scale-[0.98]",
                active
                  ? "border-bark-700 bg-sand-100 font-medium text-bark-700 shadow-card"
                  : "border-sand-300 text-bark-600 hover:border-clay-400 hover:bg-sand-100/40",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ConfiguratorWizard({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const W = dict.configurator.wizard;
  const getAttribution = useAttribution();
  const startedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  function playClick() {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/button.mp3");
        audioRef.current.volume = 0.4;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch {
      /* sound is non-essential */
    }
  }

  const [phase, setPhase] = useState<Phase>("questions");
  const [stepIndex, setStepIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [answers, setAnswers] = useState<Partial<ConfiguratorAnswers>>({});
  const [spaceDraft, setSpaceDraft] = useState({ width: "", depth: "", unknown: false });
  const [spaceTouched, setSpaceTouched] = useState(false);
  const [chosenModel, setChosenModel] = useState<ModelId | null>(null);
  const [heaterChoice, setHeaterChoice] = useState<HeaterModelId | null>(null);
  const [intent, setIntent] = useState<Intent>("project");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const rec = useMemo(() => recommend(answers), [answers]);
  const model = chosenModel ?? rec.model;
  const leadModel: ModelId = model ?? rec.conflict?.needed ?? "comfort";
  const suggestedHeater = recommendHeater(leadModel, answers.climate);
  const heater =
    heaterChoice && heaterModelsByProduct[leadModel].includes(heaterChoice)
      ? heaterChoice
      : suggestedHeater;
  const checks = useMemo(() => siteChecks(answers), [answers]);
  const projStatus = projectStatus(checks);

  const stepKey: StepKey = STEP_KEYS[stepIndex];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [phase, stepIndex]);

  function start() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("offer_form_start", { form_location: "configurator" });
    }
  }

  function showResult(nextAnswers: Partial<ConfiguratorAnswers>) {
    const next = recommend(nextAnswers);
    setChosenModel((prev) => {
      if (!prev) return null;
      const ev = next.evaluations.find((e) => e.model === prev);
      if (ev?.eligible) return prev;
      if (next.model === null && ev && ev.fit !== "tooSmall") return prev;
      return null;
    });
    trackEvent("configurator_result", {
      model: next.model ?? "conflict",
    });
    setEditing(false);
    setPhase("result");
  }

  function advance(nextAnswers: Partial<ConfiguratorAnswers>, delay = 0) {
    const go = () => {
      if (editing || stepIndex === STEP_KEYS.length - 1) showResult(nextAnswers);
      else setStepIndex((i) => i + 1);
    };
    if (delay) setTimeout(go, delay);
    else go();
  }

  function selectTile(key: TileKey, value: string) {
    start();
    playClick();
    const nextAnswers = { ...answers, [key]: value } as Partial<ConfiguratorAnswers>;
    setAnswers(nextAnswers);
    advance(nextAnswers, 280);
  }

  function selectPreparation(key: "foundation" | "power", value: string) {
    start();
    playClick();
    setAnswers((a) => ({ ...a, [key]: value }) as Partial<ConfiguratorAnswers>);
  }

  const draftWidth = parseMeters(spaceDraft.width);
  const draftDepth = parseMeters(spaceDraft.depth);
  const draftSpace = {
    width: spaceDraft.unknown ? null : draftWidth,
    depth: spaceDraft.unknown ? null : draftDepth,
    unknown: spaceDraft.unknown || draftWidth === null || draftDepth === null,
  };
  const spaceValid = spaceDraft.unknown || (draftWidth !== null && draftDepth !== null);

  function submitSpace() {
    setSpaceTouched(true);
    if (!spaceValid) return;
    start();
    const nextAnswers: Partial<ConfiguratorAnswers> = {
      ...answers,
      space: {
        width: spaceDraft.unknown ? null : draftWidth,
        depth: spaceDraft.unknown ? null : draftDepth,
        unknown: spaceDraft.unknown,
      },
    };
    setAnswers(nextAnswers);
    advance(nextAnswers);
  }

  function goToStep(step: SummaryStep | "result") {
    if (step === "result") {
      setPhase("result");
      return;
    }
    setEditing(true);
    setStepIndex(STEP_KEYS.indexOf(step));
    setPhase("questions");
  }

  function goBack() {
    if (editing) {
      setEditing(false);
      setPhase("result");
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function openContact(nextIntent: Intent) {
    setIntent(nextIntent);
    trackEvent("configurator_cta", { intent: nextIntent, model: leadModel });
    setPhase("contact");
  }

  const formRef = useRef<HTMLFormElement>(null);

  // ---- Contact form ---------------------------------------------------------
  function update<K extends keyof typeof contact>(key: K, value: (typeof contact)[K]) {
    setContact((c) => ({ ...c, [key]: value }));
  }

  function validateContact(): boolean {
    const next: Record<string, string> = {};
    if (!contact.name.trim()) next.name = dict.form.required;
    if (!contact.email.trim()) next.email = dict.form.required;
    else if (!EMAIL_RE.test(contact.email)) next.email = dict.form.invalidEmail;
    if (!contact.phone.trim()) next.phone = dict.form.required;
    if (!contact.location.trim()) next.location = dict.form.required;
    if (!contact.consent) next.consent = dict.form.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateContact()) return;
    setStatus("submitting");

    const payload: LeadPayload = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone.trim(),
      preferredModel: leadModel,
      location: contact.location,
      message: contact.message || undefined,
      consent: contact.consent,
      configurator: {
        answers,
        recommendedModel: rec.model,
        selectedModel: leadModel,
        heater,
        status: projStatus,
        checks,
        intent,
      },
      selected_model: leadModel,
      locale,
      ...getAttribution(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      trackEvent("offer_form_submit", {
        form_location: "configurator",
        preferred_model: leadModel,
        intent,
      });
      setPhase("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-sand-300 bg-ivory px-4 py-3 text-bark-700 placeholder:text-bark-400/60 transition-colors focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/20";
  const cardClass =
    "mx-auto max-w-[640px] rounded-3xl border border-sand-200 bg-ivory p-5 shadow-card sm:p-6";

  let content: React.ReactNode;

  // ---- SUCCESS --------------------------------------------------------------
  if (phase === "success") {
    content = (
      <div role="status" data-guide="form-configurator" className={cn(cardClass, "p-10 text-center")}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brass/20 text-bark-700">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-serif text-2xl text-bark-700">{dict.form.successTitle}</p>
        <p className="mt-3 text-bark-500">{dict.form.successMessage}</p>
      </div>
    );
  }

  // ---- RESULT / CONFLICT ----------------------------------------------------
  else if (phase === "result") {
    if (model === null && rec.conflict) {
      content = (
        <ConflictPanel
          locale={locale}
          W={W}
          answers={answers}
          conflict={rec.conflict}
          onAcceptFallback={(m) => setChosenModel(m)}
          onChangeSpace={() => goToStep("space")}
          onChangePeople={() => goToStep("people")}
          onConsult={() => openContact("installation")}
        />
      );
    } else if (model) {
      content = (
        <ProjectResult
          locale={locale}
          dict={dict}
          answers={answers}
          rec={rec}
          model={model}
          heater={heater}
          suggestedHeater={suggestedHeater}
          checks={checks}
          status={projStatus}
          onSelectModel={(m) => {
            playClick();
            setChosenModel(m === rec.model ? null : m);
          }}
          onSelectHeater={(h) => {
            playClick();
            setHeaterChoice(h);
          }}
          onEditAnswers={() => {
            setEditing(false);
            setStepIndex(0);
            setPhase("questions");
          }}
          onCta={openContact}
        />
      );
    }
  }

  // ---- CONTACT --------------------------------------------------------------
  else if (phase === "contact") {
    const rows = buildAnswerRows(answers, leadModel, heater, locale, W);
    content = (
      <div data-guide="form-configurator" className={cn(cardClass, "animate-step-in")}>
        <div className="mb-6">
          <h2 className="font-serif text-2xl text-bark-700 sm:text-3xl">
            {intent === "installation" ? W.contact.installationTitle : W.contact.projectTitle}
          </h2>
          <p className="mt-2 text-bark-500">
            {intent === "installation"
              ? W.contact.installationDescription
              : W.contact.projectDescription}
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-sand-100/70 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
            {W.summary.title}
          </p>
          <dl className="divide-y divide-sand-200">
            {rows.map((row) => (
              <div key={row.key} className="flex items-baseline justify-between gap-4 py-2 text-sm">
                <dt className="shrink-0 text-bark-500">{row.label}</dt>
                <dd className="flex min-w-0 items-baseline gap-3 text-right">
                  <span className="font-medium text-bark-700">{row.value}</span>
                  {row.step && (
                    <button
                      type="button"
                      data-guide={`config-edit-${row.key}`}
                      onClick={() => goToStep(row.step!)}
                      className="shrink-0 text-xs font-medium text-clay-600 underline underline-offset-4 hover:text-bark-700"
                    >
                      {W.summary.edit}
                    </button>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          data-form-id="configurator"
          data-guide="form-configurator"
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                { key: "name", type: "text", autoComplete: "name" },
                { key: "email", type: "email", autoComplete: "email" },
                { key: "phone", type: "tel", autoComplete: "tel" },
                { key: "location", type: "text", autoComplete: "address-level2" },
              ] as const
            ).map((f) => (
              <div key={f.key}>
                <label htmlFor={`cw-${f.key}`} className="mb-1.5 block text-sm font-medium text-bark-600">
                  {dict.form.fields[f.key]}
                  <span className="ml-0.5 text-clay-500">*</span>
                </label>
                <input
                  id={`cw-${f.key}`}
                  data-guide={`field-${f.key}`}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  value={contact[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={dict.form.fields[`${f.key}Placeholder`]}
                  aria-invalid={!!errors[f.key]}
                  className={inputClass}
                />
                {errors[f.key] && <p className="mt-1 text-sm text-red-700">{errors[f.key]}</p>}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="cw-message" className="mb-1.5 block text-sm font-medium text-bark-600">
              {dict.form.fields.message}
            </label>
            <textarea
              id="cw-message"
              data-guide="field-message"
              rows={3}
              value={contact.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={dict.form.fields.messagePlaceholder}
              className={cn(inputClass, "resize-y")}
            />
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-bark-500">
              <input
                id="cw-consent"
                data-guide="field-consent"
                type="checkbox"
                checked={contact.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-invalid={!!errors.consent}
                className="mt-1 h-4 w-4 shrink-0 rounded border-sand-400 text-bark-700 focus:ring-clay-500"
              />
              <span>{dict.form.fields.consent}</span>
            </label>
            {errors.consent && <p className="mt-1 text-sm text-red-700">{errors.consent}</p>}
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-red-700">
              {dict.form.errorMessage}
            </p>
          )}

          <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              data-guide="config-step-back"
              onClick={() => setPhase("result")}
              className="whitespace-nowrap text-center text-sm font-medium text-bark-600 transition-colors hover:text-bark-800 sm:text-left"
            >
              ← {W.backToProject}
            </button>
            <Button
              type="submit"
              data-guide="form-submit"
              size="lg"
              disabled={status === "submitting"}
              className="w-full sm:w-auto"
            >
              {status === "submitting"
                ? dict.form.submitting
                : intent === "installation"
                  ? W.result.ctaInstallation
                  : W.result.ctaProject}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // ---- QUESTIONS ------------------------------------------------------------
  else {
    const steps = W.steps;
    const current = steps[stepKey];
    const isOptional = stepKey === "timing";

    let body: React.ReactNode;
    let footer: React.ReactNode = null;

    if (stepKey === "space") {
      const S = steps.space;
      const showError = spaceTouched && !spaceValid;
      body = (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {(["width", "depth"] as const).map((dim) => (
              <div key={dim}>
                <label htmlFor={`cw-space-${dim}`} className="mb-1.5 block text-sm font-medium text-bark-600">
                  {S[dim]}
                </label>
                <div className="relative">
                  <input
                    id={`cw-space-${dim}`}
                    data-guide={`config-space-${dim}`}
                    type="text"
                    inputMode="decimal"
                    value={spaceDraft[dim]}
                    disabled={spaceDraft.unknown}
                    onChange={(e) => setSpaceDraft((d) => ({ ...d, [dim]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && submitSpace()}
                    placeholder={S.placeholder}
                    aria-invalid={showError && parseMeters(spaceDraft[dim]) === null}
                    className={cn(inputClass, "pr-10 disabled:opacity-50")}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-bark-400">
                    {S.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {showError && <p className="text-sm text-red-700">{S.invalid}</p>}

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sand-300 p-4 text-sm text-bark-600 transition-colors hover:bg-sand-100/40">
            <input
              type="checkbox"
              data-guide="config-space-unknown"
              checked={spaceDraft.unknown}
              onChange={(e) => {
                playClick();
                setSpaceDraft((d) => ({ ...d, unknown: e.target.checked }));
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-sand-400 text-bark-700 focus:ring-clay-500"
            />
            <span>
              <span className="block font-medium text-bark-700">{S.unknown}</span>
              <span className="text-bark-500">{S.unknownHint}</span>
            </span>
          </label>

          <SpacePlanner space={draftSpace} locale={locale} copy={S} />
          <p className="text-xs text-bark-500">{S.photoNote}</p>
        </div>
      );
      footer = (
        <Button type="button" size="lg" data-guide="config-next" onClick={submitSpace}>
          {editing ? W.seeResult : W.next}
        </Button>
      );
    } else if (stepKey === "preparation") {
      const P = steps.preparation;
      const ready = !!answers.foundation && !!answers.power;
      body = (
        <div className="space-y-6">
          <ChoiceRow
            groupKey="foundation"
            label={P.foundation.label}
            options={P.foundation.options}
            selected={answers.foundation}
            onSelect={(v) => selectPreparation("foundation", v)}
          />
          <ChoiceRow
            groupKey="power"
            label={P.power.label}
            options={P.power.options}
            selected={answers.power}
            onSelect={(v) => selectPreparation("power", v)}
          />
        </div>
      );
      footer = (
        <Button type="button" size="lg" data-guide="config-next" disabled={!ready} onClick={() => advance(answers)}>
          {editing ? W.seeResult : W.next}
        </Button>
      );
    } else {
      const tileKey = stepKey as TileKey;
      const tileStep = steps[tileKey];
      body = (
        <OptionTiles
          stepKey={tileKey}
          options={tileStep.options}
          selected={answers[tileKey] as string | undefined}
          onSelect={(v) => selectTile(tileKey, v)}
        />
      );
      if (isOptional) {
        footer = (
          <Button
            type="button"
            variant="outline"
            size="lg"
            data-guide="config-skip"
            onClick={() => {
              const { timing: _omit, ...rest } = answers;
              setAnswers(rest);
              showResult(rest);
            }}
          >
            {W.skip}
          </Button>
        );
      }
    }

    const showBack = editing || stepIndex > 0;

    content = (
      <div
        data-guide="form-configurator"
        className={cn(
          cardClass,
          "flex h-[calc(100dvh-6rem)] min-h-[520px] max-h-[680px] flex-col overflow-hidden sm:h-[calc(100dvh-12rem)] sm:min-h-[460px] sm:max-h-[580px]",
        )}
      >
        <div className="mb-4 shrink-0">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-clay-500">
            <span>
              {W.stepOf} {stepIndex + 1} {W.of} {STEP_KEYS.length}
            </span>
            {isOptional && <span className="text-bark-400">{W.optional}</span>}
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            {STEP_KEYS.map((k, i) => (
              <div
                key={k}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-500",
                  i <= stepIndex ? "bg-bark-700" : "bg-sand-200",
                )}
              />
            ))}
          </div>
        </div>

        <div
          key={stepKey}
          className="flex min-h-0 flex-1 animate-step-in flex-col overflow-y-auto overscroll-contain pr-1"
        >
          <div className="mb-4 shrink-0">
            <h2 className="font-serif text-xl text-bark-700 sm:text-2xl">{current.title}</h2>
            <p className="mt-1.5 text-sm text-bark-500">{current.description}</p>
          </div>
          <div className="min-h-0 flex-1">{body}</div>
        </div>

        {(showBack || footer) && (
          <div className="mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-sand-200 pt-4">
            {showBack ? (
              <button
                type="button"
                data-guide="config-step-back"
                onClick={goBack}
                className="text-sm font-medium text-bark-600 transition-colors hover:text-bark-800"
              >
                ← {editing ? W.backToProject : W.back}
              </button>
            ) : (
              <span />
            )}
            {footer}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="scroll-mt-28">
      {content}
    </div>
  );
}
