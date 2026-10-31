import type { ConfiguratorAnswers } from "@/lib/recommend";
import type { HeaterModelId, ModelId } from "@/types";
import { currentPathname, isConfiguratorPath } from "@/lib/voice/page-map";

export const CONTACT_FORM_ID = "contact";
export const CONFIGURATOR_FORM_ID = "configurator";

export type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  postalCode: string;
  preferredModel: ModelId;
  message: string;
  consent: boolean;
};

export type LeadFormField = keyof LeadFormValues;

export type ConfiguratorContactValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  postalCode: string;
  message: string;
  consent: boolean;
};

export type ConfiguratorContactField = keyof ConfiguratorContactValues;

export type ConfiguratorUiState = {
  phase: "questions" | "result" | "contact" | "success";
  qIndex: number;
  step: string;
  answers: Partial<ConfiguratorAnswers>;
  /** Null when the answers contradict each other (e.g. 6 people, too little space). */
  recommendedModel: ModelId | null;
  selectedModel: ModelId | null;
  heater: HeaterModelId;
  conflict: boolean;
  contact: ConfiguratorContactValues;
};

export type LeadFormHandlers = {
  fill: (field: LeadFormField, value: LeadFormValues[LeadFormField]) => void;
  getValues: () => LeadFormValues;
  getElement: () => HTMLFormElement | null;
};

export type ConfiguratorHandlers = {
  fillContact: (
    field: ConfiguratorContactField,
    value: ConfiguratorContactValues[ConfiguratorContactField],
  ) => void;
  getState: () => ConfiguratorUiState;
  getFormElement: () => HTMLFormElement | null;
};

const leadForms = new Set<LeadFormHandlers>();
const configurators = new Set<ConfiguratorHandlers>();

export function registerLeadForm(handlers: LeadFormHandlers): () => void {
  leadForms.add(handlers);
  return () => {
    leadForms.delete(handlers);
  };
}

export function registerConfigurator(
  handlers: ConfiguratorHandlers,
): () => void {
  configurators.add(handlers);
  return () => {
    configurators.delete(handlers);
  };
}

function isUsable(el: HTMLElement | null): el is HTMLElement {
  return !!el && el.isConnected;
}

export function getLeadFormHandlers(): LeadFormHandlers | null {
  const list = [...leadForms];
  const visible = list.find((h) => isUsable(h.getElement()));
  return visible ?? list[list.length - 1] ?? null;
}

export function getConfiguratorHandlers(): ConfiguratorHandlers | null {
  const list = [...configurators];
  return list[list.length - 1] ?? null;
}

export function mapLeadFieldName(fieldName: string): LeadFormField | null {
  switch (fieldName.trim()) {
    case "name":
    case "email":
    case "phone":
    case "message":
    case "consent":
      return fieldName.trim() as LeadFormField;
    case "location":
    case "city":
      return "location";
    case "postalCode":
    case "postal_code":
    case "zip":
    case "zipCode":
      return "postalCode";
    case "model":
    case "preferredModel":
    case "preferred_model":
      return "preferredModel";
    default:
      return null;
  }
}

export function mapConfiguratorFieldName(
  fieldName: string,
): ConfiguratorContactField | null {
  const mapped = mapLeadFieldName(fieldName);
  if (!mapped || mapped === "preferredModel") return null;
  return mapped;
}

export function parseConsent(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  const raw = String(value).trim().toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes" || raw === "tak" || raw === "on";
}

const MODELS = new Set<ModelId>(["compact", "comfort", "premium"]);

export function parseModel(value: unknown): ModelId | null {
  const raw = String(value).trim().toLowerCase();
  return MODELS.has(raw as ModelId) ? (raw as ModelId) : null;
}

export function resolveFormId(formId?: string): string {
  if (formId && formId.trim()) return formId.trim();
  if (typeof document === "undefined") return CONTACT_FORM_ID;
  const configuratorForm = document.querySelector(
    `[data-form-id="${CONFIGURATOR_FORM_ID}"]`,
  );
  const configuratorUi = document.querySelector(
    '[data-guide="form-configurator"]',
  );
  const contact = document.querySelector(`[data-form-id="${CONTACT_FORM_ID}"]`);
  const onConfigurator =
    isConfiguratorPath(currentPathname()) || !!configuratorForm || !!configuratorUi;
  if (onConfigurator && !contact) return CONFIGURATOR_FORM_ID;
  return CONTACT_FORM_ID;
}

export function findFormElement(formId: string): HTMLFormElement | null {
  if (typeof document === "undefined") return null;
  const byAttr = document.querySelector(`[data-form-id="${formId}"]`);
  if (byAttr instanceof HTMLFormElement) return byAttr;

  if (formId === CONTACT_FORM_ID) {
    const byHas = document.querySelector("form:has(#lf-name)");
    if (byHas instanceof HTMLFormElement) return byHas;
    const input = document.getElementById("lf-name");
    const closest = input?.closest("form");
    if (closest instanceof HTMLFormElement) return closest;
  }

  if (formId === CONFIGURATOR_FORM_ID) {
    const byHas = document.querySelector("form:has(#cw-name)");
    if (byHas instanceof HTMLFormElement) return byHas;
    const input = document.getElementById("cw-name");
    const closest = input?.closest("form");
    if (closest instanceof HTMLFormElement) return closest;
  }

  return null;
}

/** Dispatched after a React-state fill so any extra listeners can react. */
export const FILL_FIELD_EVENT = "royal:fill-field";

export function dispatchFillEvent(
  formId: string,
  field: string,
  value: string | boolean,
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(FILL_FIELD_EVENT, {
      detail: { formId, field, value },
    }),
  );
}
