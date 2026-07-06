"use client";

import { useRef, useState } from "react";
import type { Locale, SaunaSize, LeadPayload } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { useAttribution } from "@/lib/useAttribution";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ModelValue = SaunaSize | "unknown";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS = ["model", "details", "contact"] as const;

export function MultiStepOfferForm({
  locale,
  dict,
  defaultModel = "unknown",
}: {
  locale: Locale;
  dict: Dictionary;
  defaultModel?: ModelValue;
}) {
  const getAttribution = useAttribution();
  const startedRef = useRef(false);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    preferredModel: defaultModel as ModelValue,
    location: "",
    message: "",
    name: "",
    email: "",
    phone: "",
    consent: false,
  });

  function start() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("offer_form_start", { form_location: "configurator" });
    }
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    start();
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validateStep(index: number): boolean {
    const next: Record<string, string> = {};
    if (index === 1 && !form.location.trim())
      next.location = dict.form.required;
    if (index === 2) {
      if (!form.name.trim()) next.name = dict.form.required;
      if (!form.email.trim()) next.email = dict.form.required;
      else if (!EMAIL_RE.test(form.email)) next.email = dict.form.invalidEmail;
      if (!form.consent) next.consent = dict.form.consentRequired;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    if (step === STEPS.length - 1) return;
    if (step === 0)
      trackEvent("product_size_select", {
        model: form.preferredModel,
        source: "configurator",
      });
    setStep((s) => s + 1);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;
    setStatus("submitting");

    const payload: LeadPayload = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      preferredModel: form.preferredModel,
      location: form.location,
      message: form.message || undefined,
      consent: form.consent,
      selected_model: form.preferredModel,
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
        preferred_model: form.preferredModel,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-sand-300 bg-ivory px-4 py-3 text-bark-700 placeholder:text-bark-400/60 transition-colors focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/20";

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-sand-300 bg-ivory p-10 text-center shadow-card"
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

  const models: { value: ModelValue; label: string }[] = [
    { value: "compact", label: dict.form.models.compact },
    { value: "comfort", label: dict.form.models.comfort },
    { value: "premium", label: dict.form.models.premium },
    { value: "unknown", label: dict.form.models.unknown },
  ];

  const stepTitles = [
    {
      title: dict.form.stepQuestions.modelTitle,
      description: dict.form.stepQuestions.modelDescription,
    },
    {
      title: dict.form.stepQuestions.detailsTitle,
      description: dict.form.stepQuestions.detailsDescription,
    },
    {
      title: dict.form.stepQuestions.contactTitle,
      description: dict.form.stepQuestions.contactDescription,
    },
  ];

  return (
    <div className="rounded-2xl border border-sand-300 bg-ivory p-6 shadow-card sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-clay-500">
          <span>
            {dict.form.steps.stepOf} {step + 1} {dict.form.steps.of}{" "}
            {STEPS.length}
          </span>
          <span>
            {step === 0 && dict.form.steps.model}
            {step === 1 && dict.form.steps.details}
            {step === 2 && dict.form.steps.contact}
          </span>
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-500",
                i <= step ? "bg-bark-700" : "bg-sand-200",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-serif text-2xl text-bark-700">
          {stepTitles[step].title}
        </h2>
        <p className="mt-2 text-bark-500">{stepTitles[step].description}</p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        {step === 0 && (
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="sr-only">{dict.form.fields.preferredModel}</legend>
            {models.map((m) => (
              <label
                key={m.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
                  form.preferredModel === m.value
                    ? "border-bark-700 bg-sand-100"
                    : "border-sand-300 hover:border-clay-400",
                )}
              >
                <input
                  type="radio"
                  name="model"
                  value={m.value}
                  checked={form.preferredModel === m.value}
                  onChange={() => update("preferredModel", m.value)}
                  className="h-4 w-4 text-bark-700 focus:ring-clay-500"
                />
                <span className="font-medium text-bark-700">{m.label}</span>
              </label>
            ))}
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="ms-location"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.location}
                <span className="ml-0.5 text-clay-500">*</span>
              </label>
              <input
                id="ms-location"
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder={dict.form.fields.locationPlaceholder}
                aria-invalid={!!errors.location}
                className={inputClass}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-700">{errors.location}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="ms-message"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.message}
              </label>
              <textarea
                id="ms-message"
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={dict.form.fields.messagePlaceholder}
                className={cn(inputClass, "resize-y")}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="ms-name"
                  className="mb-1.5 block text-sm font-medium text-bark-600"
                >
                  {dict.form.fields.name}
                  <span className="ml-0.5 text-clay-500">*</span>
                </label>
                <input
                  id="ms-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
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
                  htmlFor="ms-email"
                  className="mb-1.5 block text-sm font-medium text-bark-600"
                >
                  {dict.form.fields.email}
                  <span className="ml-0.5 text-clay-500">*</span>
                </label>
                <input
                  id="ms-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={dict.form.fields.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-700">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="ms-phone"
                className="mb-1.5 block text-sm font-medium text-bark-600"
              >
                {dict.form.fields.phone}
              </label>
              <input
                id="ms-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={dict.form.fields.phonePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-bark-500">
                <input
                  type="checkbox"
                  checked={form.consent}
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
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
              {dict.form.steps.back}
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              {dict.form.steps.next}
            </Button>
          ) : (
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting"
                ? dict.form.submitting
                : dict.form.submit}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
