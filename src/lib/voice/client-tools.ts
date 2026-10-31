import type { ClientToolsConfig } from "@elevenlabs/client";
import type { Locale } from "@/types";
import {
  currentPathname,
  isConfiguratorPath,
  localeFromPath,
  normalizePath,
  pageKeyFromPath,
  resolveVoicePage,
} from "@/lib/voice/page-map";
import { voiceRouterPush } from "@/lib/voice/navigation-bridge";
import {
  CONFIGURATOR_FORM_ID,
  CONTACT_FORM_ID,
  dispatchFillEvent,
  findFormElement,
  getConfiguratorHandlers,
  getLeadFormHandlers,
  mapConfiguratorFieldName,
  mapLeadFieldName,
  parseConsent,
  parseModel,
  resolveFormId,
  type LeadFormField,
} from "@/lib/voice/form-bridge";
import {
  clickGuideControl,
  hasConfiguratorInDom,
  hasFormInDom,
  highlightGuide,
  listVisibleSections,
  readLeadFormFromDom,
  resolveConfiguratorControlId,
  scrollToGuide,
} from "@/lib/voice/dom-tools";

type ToolOk = { ok: true; [key: string]: unknown };
type ToolErr = { ok: false; error: string };
type ToolResult = ToolOk | ToolErr;

function result(value: ToolResult): string {
  return JSON.stringify(value);
}

function safe(
  fn: (params: Record<string, unknown>) => ToolResult | Promise<ToolResult>,
): (parameters: Record<string, unknown>) => Promise<string> {
  return async (parameters) => {
    try {
      return result(await fn(parameters ?? {}));
    } catch {
      return result({ ok: false, error: "unexpected_error" });
    }
  };
}

function asLocale(value: unknown): Locale | undefined {
  return value === "pl" || value === "en" ? value : undefined;
}

function getPageContext(): ToolResult {
  const path = currentPathname();
  const locale = localeFromPath(path);
  return {
    ok: true,
    path,
    locale,
    page_key: pageKeyFromPath(path),
    visible_sections: listVisibleSections(),
    has_form: hasFormInDom(),
    has_configurator: isConfiguratorPath(path) || hasConfiguratorInDom(),
  };
}

function navigateTo(params: { page?: string; locale?: string }): ToolResult {
  const page = typeof params.page === "string" ? params.page : "";
  if (!page) return { ok: false, error: "missing_page" };

  const current = currentPathname();
  const locale = asLocale(params.locale) ?? localeFromPath(current);
  const resolved = resolveVoicePage(page, locale);
  if (!resolved) return { ok: false, error: "unknown_page" };

  if (normalizePath(current) === normalizePath(resolved.path)) {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return {
      ok: true,
      already_there: true,
      path: resolved.path,
      page_key: resolved.key,
    };
  }

  if (!voiceRouterPush(resolved.path)) {
    return { ok: false, error: "navigation_unavailable" };
  }

  return { ok: true, path: resolved.path, page_key: resolved.key };
}

function scrollTo(params: { section?: string }): ToolResult {
  const section = typeof params.section === "string" ? params.section : "";
  if (!section) return { ok: false, error: "missing_section" };
  const el = scrollToGuide(section);
  if (!el) return { ok: false, error: "element_not_found" };
  return { ok: true, section };
}

function highlightElement(params: {
  element_id?: string;
  duration_ms?: number;
}): ToolResult {
  const elementId =
    typeof params.element_id === "string" ? params.element_id : "";
  if (!elementId) return { ok: false, error: "missing_element_id" };
  const duration =
    typeof params.duration_ms === "number" && params.duration_ms > 0
      ? params.duration_ms
      : 4000;
  const el = highlightGuide(elementId, duration);
  if (!el) return { ok: false, error: "element_not_found" };
  return { ok: true, element_id: elementId, duration_ms: duration };
}

function fillFormField(params: {
  form_id?: string;
  field_name?: string;
  value?: unknown;
}): ToolResult {
  const fieldName =
    typeof params.field_name === "string" ? params.field_name : "";
  if (!fieldName) return { ok: false, error: "missing_field_name" };
  if (params.value === undefined) return { ok: false, error: "missing_value" };

  const formId = resolveFormId(params.form_id);

  if (formId === CONFIGURATOR_FORM_ID) {
    const handlers = getConfiguratorHandlers();
    const field = mapConfiguratorFieldName(fieldName);
    if (!field) return { ok: false, error: "unknown_field" };
    if (!handlers) return { ok: false, error: "form_not_found" };

    if (field === "consent") {
      handlers.fillContact("consent", parseConsent(params.value));
      dispatchFillEvent(formId, field, parseConsent(params.value));
    } else {
      const text = String(params.value);
      handlers.fillContact(field, text);
      dispatchFillEvent(formId, field, text);
    }
    return { ok: true, form_id: formId, field_name: field };
  }

  const handlers = getLeadFormHandlers();
  const field = mapLeadFieldName(fieldName);
  if (!field) return { ok: false, error: "unknown_field" };
  if (!handlers && !findFormElement(CONTACT_FORM_ID)) {
    return { ok: false, error: "form_not_found" };
  }
  if (!handlers) return { ok: false, error: "form_not_ready" };

  if (field === "consent") {
    const value = parseConsent(params.value);
    handlers.fill("consent", value);
    dispatchFillEvent(formId, field, value);
    return { ok: true, form_id: formId, field_name: field };
  }

  if (field === "preferredModel") {
    const model = parseModel(params.value);
    if (!model) return { ok: false, error: "invalid_model" };
    handlers.fill("preferredModel", model);
    dispatchFillEvent(formId, field, model);
    return { ok: true, form_id: formId, field_name: field };
  }

  const text = String(params.value);
  handlers.fill(field as Exclude<LeadFormField, "consent" | "preferredModel">, text);
  dispatchFillEvent(formId, field, text);
  return { ok: true, form_id: formId, field_name: field };
}

function submitForm(params: { form_id?: string }): ToolResult {
  const formId = resolveFormId(params.form_id);

  if (formId === CONFIGURATOR_FORM_ID) {
    const handlers = getConfiguratorHandlers();
    const consent = handlers?.getState().contact.consent;
    if (!consent) return { ok: false, error: "consent_required" };
    const form = handlers?.getFormElement() ?? findFormElement(formId);
    if (!form) return { ok: false, error: "form_not_found" };
    form.requestSubmit();
    return { ok: true, form_id: formId };
  }

  const handlers = getLeadFormHandlers();
  const consent =
    handlers?.getValues().consent ??
    (readLeadFormFromDom()?.consent === true);
  if (!consent) return { ok: false, error: "consent_required" };

  const form = handlers?.getElement() ?? findFormElement(formId);
  if (!form) return { ok: false, error: "form_not_found" };
  form.requestSubmit();
  return { ok: true, form_id: formId };
}

function clickConfiguratorControl(params: {
  control_id?: string;
  value?: string;
}): ToolResult {
  const controlId =
    typeof params.control_id === "string" ? params.control_id : "";
  if (!controlId) return { ok: false, error: "missing_control_id" };
  const value = typeof params.value === "string" ? params.value : undefined;
  const resolved = resolveConfiguratorControlId(controlId, value);
  const el = clickGuideControl(resolved);
  if (!el) return { ok: false, error: "element_not_found" };
  return { ok: true, control_id: resolved };
}

function getUiState(params: { scope?: string }): ToolResult {
  const scope = params.scope === "form" || params.scope === "configurator"
    ? params.scope
    : "all";

  const form =
    getLeadFormHandlers()?.getValues() ?? readLeadFormFromDom();
  const configurator = getConfiguratorHandlers()?.getState() ?? null;

  if (scope === "form") {
    if (!form) return { ok: false, error: "form_not_found" };
    return { ok: true, form };
  }
  if (scope === "configurator") {
    if (!configurator) return { ok: false, error: "configurator_not_found" };
    return { ok: true, configurator };
  }
  return { ok: true, form, configurator };
}

/**
 * Case-sensitive names must match the ElevenLabs agent client tools.
 * SDK only accepts string/number/void — objects are JSON-serialized.
 */
export const voiceClientTools: ClientToolsConfig["clientTools"] = {
  get_page_context: safe(() => getPageContext()),
  navigate_to: safe((params) =>
    navigateTo({
      page: typeof params.page === "string" ? params.page : undefined,
      locale: typeof params.locale === "string" ? params.locale : undefined,
    }),
  ),
  scroll_to: safe((params) =>
    scrollTo({
      section: typeof params.section === "string" ? params.section : undefined,
    }),
  ),
  highlight_element: safe((params) =>
    highlightElement({
      element_id:
        typeof params.element_id === "string" ? params.element_id : undefined,
      duration_ms:
        typeof params.duration_ms === "number" ? params.duration_ms : undefined,
    }),
  ),
  fill_form_field: safe((params) =>
    fillFormField({
      form_id: typeof params.form_id === "string" ? params.form_id : undefined,
      field_name:
        typeof params.field_name === "string" ? params.field_name : undefined,
      value: params.value,
    }),
  ),
  submit_form: safe((params) =>
    submitForm({
      form_id: typeof params.form_id === "string" ? params.form_id : undefined,
    }),
  ),
  click_configurator_control: safe((params) =>
    clickConfiguratorControl({
      control_id:
        typeof params.control_id === "string" ? params.control_id : undefined,
      value: typeof params.value === "string" ? params.value : undefined,
    }),
  ),
  get_ui_state: safe((params) =>
    getUiState({
      scope: typeof params.scope === "string" ? params.scope : undefined,
    }),
  ),
};
