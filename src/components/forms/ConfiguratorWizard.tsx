"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Locale, LeadPayload } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { recommend, type ConfiguratorAnswers } from "@/lib/recommend";
import { getProduct } from "@/content/products";
import { trackEvent } from "@/lib/analytics";
import { useAttribution } from "@/lib/useAttribution";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type AnswerKey = keyof ConfiguratorAnswers;

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

  const questions = useMemo(
    () =>
      [
        { key: "people", ...W.questions.people },
        { key: "garden", ...W.questions.garden },
        { key: "frequency", ...W.questions.frequency },
      ] as const,
    [W],
  );

  const [phase, setPhase] = useState<
    "questions" | "result" | "contact" | "success"
  >("questions");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<ConfiguratorAnswers>>({});

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error"
  >("idle");

  function start() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("offer_form_start", { form_location: "configurator" });
    }
  }

  function selectAnswer(key: AnswerKey, value: string) {
    start();
    playClick();
    const nextAnswers = { ...answers, [key]: value } as Partial<ConfiguratorAnswers>;
    setAnswers(nextAnswers);
    if (qIndex < questions.length - 1) {
      setTimeout(() => setQIndex((i) => i + 1), 280);
    } else {
      const rec = recommend(nextAnswers);
      trackEvent("configurator_result", { model: rec.model });
      setTimeout(() => setPhase("result"), 280);
    }
  }

  const rec = useMemo(() => recommend(answers), [answers]);
  const product = getProduct(rec.model);

  const reasons = useMemo(() => {
    const r: string[] = [W.result.reasons.peopleModel];
    if (answers.garden === "small" && answers.people === "5") {
      r.push(W.result.reasons.smallGarden);
    }
    return r;
  }, [answers, W]);

  function update<K extends keyof typeof contact>(
    key: K,
    value: (typeof contact)[K],
  ) {
    setContact((c) => ({ ...c, [key]: value }));
  }

  function validateContact(): boolean {
    const next: Record<string, string> = {};
    if (!contact.name.trim()) next.name = dict.form.required;
    if (!contact.email.trim()) next.email = dict.form.required;
    else if (!EMAIL_RE.test(contact.email))
      next.email = dict.form.invalidEmail;
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
      phone: contact.phone || undefined,
      preferredModel: rec.model,
      location: contact.location,
      message: contact.message || undefined,
      consent: contact.consent,
      peopleCount: answers.people,
      gardenSpace: answers.garden,
      frequency: answers.frequency,
      selected_model: rec.model,
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
        preferred_model: rec.model,
      });
      setPhase("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-sand-300 bg-ivory px-4 py-3 text-bark-700 placeholder:text-bark-400/60 transition-colors focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/20";

  // ---- SUCCESS ---------------------------------------------------------
  if (phase === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-sand-200 bg-ivory p-10 text-center shadow-card"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brass/20 text-bark-700">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-serif text-2xl text-bark-700">
          {dict.form.successTitle}
        </p>
        <p className="mt-3 text-bark-500">{dict.form.successMessage}</p>
      </div>
    );
  }

  // ---- RESULT ----------------------------------------------------------
  if (phase === "result" && product) {
    const copy = product.i18n[locale];
    return (
      <div className="animate-step-in rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-9">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-clay-500">
            {W.result.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-bark-700">
            {W.result.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-bark-500">
            {W.result.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-2xl border border-sand-200">
          <div className="relative aspect-[4/3]">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-bark-600 backdrop-blur">
              {W.result.modelLabel}
            </span>
          </div>
          <div className="p-5">
            <h3 className="font-serif text-2xl text-bark-700">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-bark-500">{copy.tagline}</p>
            <p className="mt-3 font-serif text-lg text-bark-700">
              {W.result.priceFrom}{" "}
              {formatPrice(product.priceFrom, locale)} {dict.common.currency}
            </p>
          </div>
        </div>

        {/* Reasons */}
        <div className="mt-6 rounded-2xl bg-sand-100/60 p-5">
          <p className="text-sm font-medium text-bark-700">
            {W.result.whyLabel}
          </p>
          <ul className="mt-3 space-y-2">
            {reasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-2.5 text-sm text-bark-500"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-clay-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => {
              setPhase("questions");
              setQIndex(0);
            }}
            className="text-sm font-medium text-bark-600 transition-colors hover:text-bark-800"
          >
            ← {W.result.adjust}
          </button>
          <Button
            type="button"
            size="lg"
            onClick={() => setPhase("contact")}
            className="w-full sm:w-auto"
          >
            {W.result.cta}
          </Button>
        </div>
      </div>
    );
  }

  // ---- CONTACT ---------------------------------------------------------
  if (phase === "contact") {
    return (
      <div className="animate-step-in rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-9">
        <div className="mb-6">
          <h2 className="font-serif text-2xl text-bark-700">
            {W.contact.title}
          </h2>
          <p className="mt-2 text-bark-500">{W.contact.description}</p>
        </div>

        {/* Summary chip */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-sand-100 px-3 py-1.5 text-xs text-bark-600">
            {product?.name}
          </span>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cw-name"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.name}
                <span className="ml-0.5 text-clay-500">*</span>
              </label>
              <input
                id="cw-name"
                type="text"
                autoComplete="name"
                value={contact.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={dict.form.fields.namePlaceholder}
                aria-invalid={!!errors.name}
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-700">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="cw-email"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.email}
                <span className="ml-0.5 text-clay-500">*</span>
              </label>
              <input
                id="cw-email"
                type="email"
                autoComplete="email"
                value={contact.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={dict.form.fields.emailPlaceholder}
                aria-invalid={!!errors.email}
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-700">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="cw-phone"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.phone}
              </label>
              <input
                id="cw-phone"
                type="tel"
                autoComplete="tel"
                value={contact.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={dict.form.fields.phonePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="cw-location"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.location}
                <span className="ml-0.5 text-clay-500">*</span>
              </label>
              <input
                id="cw-location"
                type="text"
                value={contact.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder={dict.form.fields.locationPlaceholder}
                aria-invalid={!!errors.location}
                className={inputClass}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-700">{errors.location}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="cw-message"
              className="mb-1.5 block text-sm font-medium text-bark-600"
            >
              {dict.form.fields.message}
            </label>
            <textarea
              id="cw-message"
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
                type="checkbox"
                checked={contact.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-invalid={!!errors.consent}
                className="mt-1 h-4 w-4 shrink-0 rounded border-sand-400 text-bark-700 focus:ring-clay-500"
              />
              <span>{dict.form.fields.consent}</span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-sm text-red-700">{errors.consent}</p>
            )}
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-red-700">
              {dict.form.errorMessage}
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setPhase("result")}
              className="text-sm font-medium text-bark-600 transition-colors hover:text-bark-800"
            >
              {dict.configurator.wizard.back}
            </button>
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting"
                ? dict.form.submitting
                : dict.form.submit}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // ---- QUESTIONS -------------------------------------------------------
  const q = questions[qIndex];
  const selected = answers[q.key as AnswerKey];

  return (
    <div className="rounded-3xl border border-sand-200 bg-ivory p-6 shadow-card sm:p-9">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-clay-500">
          <span>
            {W.questionOf} {qIndex + 1} {W.of} {questions.length}
          </span>
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {questions.map((qq, i) => (
            <div
              key={qq.key}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-500",
                i <= qIndex ? "bg-bark-700" : "bg-sand-200",
              )}
            />
          ))}
        </div>
      </div>

      <div key={qIndex} className="animate-step-in">
        <div className="mb-5">
          <h2 className="font-serif text-2xl text-bark-700 sm:text-3xl">
            {q.title}
          </h2>
          <p className="mt-2 text-bark-500">{q.description}</p>
        </div>

        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">{q.title}</legend>
          {q.options.map((opt) => {
            const active = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => selectAnswer(q.key as AnswerKey, opt.value)}
                className={cn(
                  "group relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 ease-calm active:scale-[0.98]",
                  active
                    ? "border-bark-700 bg-sand-100 shadow-card"
                    : "border-sand-300 hover:-translate-y-0.5 hover:border-clay-400 hover:bg-sand-100/40 hover:shadow-card",
                )}
              >
                <span className="font-serif text-base text-bark-700">
                  {opt.label}
                </span>
                {"hint" in opt && opt.hint && (
                  <span className="mt-0.5 text-sm text-bark-500">
                    {opt.hint}
                  </span>
                )}
              </button>
            );
          })}
        </fieldset>
      </div>

      {qIndex > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setQIndex((i) => i - 1)}
            className="text-sm font-medium text-bark-600 transition-colors hover:text-bark-800"
          >
            ← {W.back}
          </button>
        </div>
      )}
    </div>
  );
}
