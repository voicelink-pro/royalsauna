/**
 * Lightweight analytics layer.
 *
 * All events are pushed to `window.dataLayer` so that Google Tag Manager (and,
 * via GTM, Meta Pixel / GA4 / etc.) can consume them. If GTM is not present the
 * helper degrades gracefully — it buffers into a local dataLayer so nothing
 * throws, and optionally logs in development.
 *
 * No tracking IDs are hardcoded anywhere — they are injected through the
 * provider components using NEXT_PUBLIC_* environment variables.
 */

export type TrackEventName =
  | "cta_click"
  | "product_view"
  | "product_size_select"
  | "offer_form_start"
  | "offer_form_submit"
  | "configurator_result"
  | "interior_video_play"
  | "interior_point_click"
  | "hero_theme_toggle"
  | "phone_click"
  | "email_click"
  | "newsletter_submit"
  | "language_change";

export type TrackEventParams = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function ensureDataLayer(): Record<string, unknown>[] | null {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/**
 * Track a custom event. Safe to call on the server (no-op) and on the client
 * regardless of whether GTM has loaded yet.
 */
export function trackEvent(
  eventName: TrackEventName,
  params: TrackEventParams = {},
): void {
  const dataLayer = ensureDataLayer();

  const payload = {
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
  };

  if (dataLayer) {
    dataLayer.push(payload);
  }

  // Optional direct Meta Pixel custom event mirror (GTM can also handle this).
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, params);
    } catch {
      /* no-op: pixel not ready */
    }
  }

  if (
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    !window.dataLayer
  ) {
    // eslint-disable-next-line no-console
    console.info("[analytics] (no dataLayer) ", payload);
  }
}

/** Read all attribution params from the current URL + document. */
export function readAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ];

  const result: Record<string, string> = {};
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) result[key] = value;
  }

  result.landing_page = window.location.pathname;
  result.referrer = document.referrer || "";

  return result;
}
