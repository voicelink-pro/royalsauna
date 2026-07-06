"use client";

import { useRef, useState } from "react";
import type { Locale, SaunaSize, LeadPayload } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { useAttribution } from "@/lib/useAttribution";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/select";

type ModelValue = SaunaSize | "unknown";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadForm({
  locale,
  dict,
  defaultModel = "unknown",
  formLocation = "lead_form",
  compact = false,
}: {
  locale: Locale;
  dict: Dictionary;
  defaultModel?: ModelValue;
  formLocation?: string;
  compact?: boolean;
}) {
  const getAttribution = useAttribution();
  const startedRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredModel: defaultModel,
    location: "",
    message: "",
    consent: false,
  });

  function onFirstInteraction() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("offer_form_start", { form_location: formLocation });
    }
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    onFirstInteraction();
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = dict.form.required;
    if (!form.email.trim()) next.email = dict.form.required;
    else if (!EMAIL_RE.test(form.email)) next.email = dict.form.invalidEmail;
    if (!form.location.trim()) next.location = dict.form.required;
    if (!form.consent) next.consent = dict.form.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
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
      if (!res.ok) throw new Error("request failed");
      trackEvent("offer_form_submit", {
        form_location: formLocation,
        preferred_model: form.preferredModel,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-sand-300 bg-ivory p-8 text-center"
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

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          id="lf-name"
          label={dict.form.fields.name}
          error={errors.name}
          required
        >
          <Input
            id="lf-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={dict.form.fields.namePlaceholder}
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field
          id="lf-email"
          label={dict.form.fields.email}
          error={errors.email}
          required
        >
          <Input
            id="lf-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={dict.form.fields.emailPlaceholder}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field id="lf-phone" label={dict.form.fields.phone}>
          <Input
            id="lf-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={dict.form.fields.phonePlaceholder}
          />
        </Field>

        <Field
          id="lf-location"
          label={dict.form.fields.location}
          error={errors.location}
          required
        >
          <Input
            id="lf-location"
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder={dict.form.fields.locationPlaceholder}
            aria-invalid={!!errors.location}
          />
        </Field>
      </div>

      <Field id="lf-model" label={dict.form.fields.preferredModel}>
        <NativeSelect
          id="lf-model"
          value={form.preferredModel}
          onChange={(e) =>
            update("preferredModel", e.target.value as ModelValue)
          }
        >
          {models.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <Field id="lf-message" label={dict.form.fields.message}>
        <Textarea
          id="lf-message"
          rows={3}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={dict.form.fields.messagePlaceholder}
          className="resize-y"
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-bark-500">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-sand-400 text-bark-700 focus:ring-clay-500"
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

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? dict.form.submitting : dict.form.submit}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-bark-600"
      >
        {label}
        {required && <span className="ml-0.5 text-clay-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}
