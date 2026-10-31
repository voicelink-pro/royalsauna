function escapeAttr(value: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  return value.replace(/"/g, '\\"');
}

function firstElement(...selectors: string[]): HTMLElement | null {
  if (typeof document === "undefined") return null;
  for (const selector of selectors) {
    try {
      const el = document.querySelector(selector);
      if (el instanceof HTMLElement) return el;
    } catch {
      /* invalid selector — try next */
    }
  }
  return null;
}

const FORM_ALIASES = new Set([
  "formularz",
  "form-contact",
  "oferta",
  "kontakt",
  "contact",
  "cta",
  "form-submit",
  "field-message",
  "footer",
]);

function findContactForm(): HTMLElement | null {
  return firstElement(
    '[data-guide="form-contact"]',
    '[data-form-id="contact"]',
    "form:has(#lf-name)",
    "#lf-name",
  );
}

export function findScrollTarget(section: string): HTMLElement | null {
  const key = section.trim();
  if (!key) return null;

  if (FORM_ALIASES.has(key)) {
    return findContactForm();
  }

  if (key === "faq") {
    return firstElement('[data-guide="faq"]', "#faq");
  }

  if (key === "konfigurator" || key === "form-configurator") {
    return firstElement(
      '[data-guide="form-configurator"]',
      '[data-form-id="configurator"]',
      '[data-guide="konfigurator"]',
      "#konfigurator",
    );
  }

  const safe = escapeAttr(key);
  return firstElement(`[data-guide="${safe}"]`, `#${safe}`);
}

export function findHighlightTarget(elementId: string): HTMLElement | null {
  const id = elementId.trim();
  if (!id) return null;

  if (FORM_ALIASES.has(id)) {
    return findContactForm();
  }

  const safe = escapeAttr(id);
  const bare = id.replace(/^field-/, "");
  const bareSafe = escapeAttr(bare);

  return firstElement(
    `[data-guide="${safe}"]`,
    `#${safe}`,
    `#lf-${bareSafe}`,
    `#cw-${bareSafe}`,
  );
}

function getStickyHeaderOffset() {
  const header =
    document.querySelector("header") ??
    document.querySelector("[data-site-header]");
  return (
    (header instanceof HTMLElement
      ? header.getBoundingClientRect().height
      : 88) + 16
  );
}

function scrollElementUnderHeader(el: HTMLElement) {
  const top =
    el.getBoundingClientRect().top + window.scrollY - getStickyHeaderOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function scrollToGuide(section: string): HTMLElement | null {
  const el = findScrollTarget(section);
  if (!el) return null;
  scrollElementUnderHeader(el);
  return el;
}

let highlightTimer: number | null = null;
let highlightedEl: HTMLElement | null = null;

export function highlightGuide(
  elementId: string,
  durationMs = 4000,
): HTMLElement | null {
  const el = findHighlightTarget(elementId);
  if (!el) return null;

  if (highlightedEl) {
    highlightedEl.classList.remove("voice-guide-highlight");
  }
  el.classList.add("voice-guide-highlight");
  highlightedEl = el;

  if (highlightTimer !== null) window.clearTimeout(highlightTimer);
  highlightTimer = window.setTimeout(() => {
    el.classList.remove("voice-guide-highlight");
    if (highlightedEl === el) highlightedEl = null;
    highlightTimer = null;
  }, durationMs);

  return el;
}

const SECTION_SKIP = /^(field-|form-|config-|faq-\d+)/;

export function listVisibleSections(): string[] {
  if (typeof document === "undefined") return [];
  const values = [...document.querySelectorAll("[data-guide]")]
    .map((el) => el.getAttribute("data-guide"))
    .filter((v): v is string => !!v && !SECTION_SKIP.test(v));
  return [...new Set(values)];
}

export function hasFormInDom(): boolean {
  return (
    typeof document !== "undefined" &&
    !!(
      document.querySelector("[data-form-id]") ||
      document.querySelector("form:has(#lf-name)") ||
      document.getElementById("lf-name")
    )
  );
}

export function hasConfiguratorInDom(): boolean {
  return (
    typeof document !== "undefined" &&
    !!(
      document.querySelector('[data-guide="form-configurator"]') ||
      document.querySelector('[data-form-id="configurator"]') ||
      document.querySelector('[data-guide="konfigurator"]')
    )
  );
}

/** Click only by exact data-guide — never by tile label. */
export function clickGuideControl(controlId: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const el = document.querySelector(
    `[data-guide="${escapeAttr(controlId)}"]`,
  );
  if (!(el instanceof HTMLElement)) return null;
  el.click();
  return el;
}

export function resolveConfiguratorControlId(
  controlId: string,
  value?: string,
): string {
  if (value && !controlId.includes(String(value))) {
    const candidate = controlId.startsWith("config-")
      ? `${controlId}-${value}`
      : `config-${controlId}-${value}`;
    if (typeof document !== "undefined") {
      const el = document.querySelector(
        `[data-guide="${escapeAttr(candidate)}"]`,
      );
      if (el) return candidate;
    }
  }
  return controlId;
}

export function readLeadFormFromDom(): Record<string, string | boolean> | null {
  if (typeof document === "undefined") return null;
  const form =
    document.querySelector('[data-form-id="contact"]') ??
    document.querySelector("form:has(#lf-name)") ??
    document.getElementById("lf-name")?.closest("form");
  if (!(form instanceof HTMLFormElement)) return null;
  const valueOf = (id: string) =>
    (
      form.querySelector(`#${id}`) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null
    )?.value ?? "";
  const consent = form.querySelector("#lf-consent") as HTMLInputElement | null;
  return {
    name: valueOf("lf-name"),
    email: valueOf("lf-email"),
    phone: valueOf("lf-phone"),
    location: valueOf("lf-location"),
    postalCode: valueOf("lf-postal-code"),
    preferredModel: valueOf("lf-model"),
    message: valueOf("lf-message"),
    consent: !!consent?.checked,
  };
}
