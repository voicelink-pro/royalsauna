import { createHash, randomUUID } from "node:crypto";
import type { ConfiguratorAnswers, LeadPayload } from "@/types";

const RETRYABLE_STATUSES = new Set([429, 503]);
const MAX_ATTEMPTS = 3;

interface CrmLeadResult {
  externalSubmissionId: string;
  inquiryId?: string;
}

interface OfferEventInput {
  externalSubmissionId: string;
  externalOfferId: string;
  status: "sent" | "failed";
  occurredAt: string;
  sentAt?: string;
}

function getCrmConfig(): { baseUrl: string; token: string } {
  const configuredUrl = process.env.CRM_API_URL?.trim().replace(/\/+$/, "");
  const baseUrl = configuredUrl?.replace(/\/api\/v1\/integrations(?:\/leads)?$/, "");
  const token = process.env.CRM_INTEGRATION_TOKEN?.trim();

  if (!baseUrl || !token) {
    throw new Error(
      "CRM integration is not configured (CRM_API_URL and CRM_INTEGRATION_TOKEN are required)",
    );
  }

  return { baseUrl, token };
}

function splitName(name: string): { firstName: string; lastName: string | null } {
  const [firstName, ...rest] = name.trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.length ? rest.join(" ") : null,
  };
}

function getExternalSubmissionId(payload: LeadPayload, submittedAt: string): string {
  const submissionId = payload.submissionId?.trim();
  if (submissionId && /^[A-Za-z0-9._:-]{8,160}$/.test(submissionId)) {
    return submissionId;
  }
  return `web-${submittedAt.slice(0, 10)}-${randomUUID()}`;
}

function compact<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined && item !== ""),
  ) as Partial<T>;
}

function peopleCount(value: ConfiguratorAnswers["people"] | undefined): number | null {
  if (!value) return null;
  const count = Number(value.split("-").at(-1));
  return Number.isFinite(count) ? count : null;
}

function gardenSpace(payload: LeadPayload): string | null {
  const space = payload.configurator?.answers.space;
  if (!space || space.unknown || space.width === null || space.depth === null) {
    return payload.location || null;
  }
  return `${payload.location}; ${space.width} × ${space.depth} m`;
}

function buildConfiguration(payload: LeadPayload) {
  const configurator = payload.configurator;
  if (!configurator) {
    return compact({
      model_code: payload.preferredModel,
      garden_space: payload.location,
    });
  }

  const answers = configurator.answers;
  return compact({
    contact_purpose:
      configurator.intent === "project" ? "send_project" : "consultation",
    model_code: configurator.selectedModel,
    heater_code: configurator.heater,
    usage_type: answers.usage ?? "private",
    number_of_people: peopleCount(answers.people),
    garden_space: gardenSpace(payload),
    ground_readiness: answers.foundation === "todo" ? "needs_check" : answers.foundation,
    power_readiness: answers.power === "check" ? "needs_check" : answers.power,
    timing_preference: answers.timing === "months" ? "few_months" : answers.timing,
    preferred_date: null,
  });
}

function buildAttribution(payload: LeadPayload) {
  return compact({
    utm_source: payload.utm_source,
    utm_medium: payload.utm_medium,
    utm_campaign: payload.utm_campaign,
    gclid: payload.gclid,
  });
}

function retryDelay(response: Response, attempt: number): number {
  const retryAfter = response.headers.get("retry-after");
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.min(seconds * 1_000, 10_000);
  }
  return attempt * 500;
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function postToCrm(
  path: string,
  idempotencyKey: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  const { baseUrl, token } = getCrmConfig();

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });

    if (response.ok) {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }

    if (RETRYABLE_STATUSES.has(response.status) && attempt < MAX_ATTEMPTS) {
      await wait(retryDelay(response, attempt));
      continue;
    }

    const responseBody = await response.text().catch(() => "");
    throw new Error(
      `CRM request failed: ${response.status}${responseBody ? ` ${responseBody.slice(0, 500)}` : ""}`,
    );
  }

  throw new Error("CRM request failed after retries");
}

export async function createCrmLead(
  payload: LeadPayload,
  submittedAt = new Date().toISOString(),
): Promise<CrmLeadResult> {
  const externalSubmissionId = getExternalSubmissionId(payload, submittedAt);
  const { firstName, lastName } = splitName(payload.name);
  const source = payload.configurator ? "configurator" : "website_form";

  const body = {
    schema_version: 1,
    external_submission_id: externalSubmissionId,
    source,
    submitted_at: submittedAt,
    contact: {
      first_name: firstName,
      last_name: lastName,
      email: payload.email,
      phone: payload.phone?.trim() || null,
      city: payload.location || null,
      postal_code: payload.postalCode,
      country_code: "PL",
      language: payload.locale,
    },
    message: payload.message?.trim() || null,
    configuration: buildConfiguration(payload),
    attribution: buildAttribution(payload),
    metadata: {
      source_label: payload.sourceLabel?.trim() || null,
      consent: payload.consent,
      selected_model: payload.selected_model || payload.preferredModel,
      configurator: payload.configurator ?? null,
      tracking: compact({
        utm_content: payload.utm_content,
        utm_term: payload.utm_term,
        fbclid: payload.fbclid,
        landing_page: payload.landing_page,
        referrer: payload.referrer,
      }),
    },
  };

  const response = (await postToCrm(
    "/api/v1/integrations/leads",
    externalSubmissionId,
    body,
  )) as { inquiry_id?: string } | null;

  return {
    externalSubmissionId,
    inquiryId: response?.inquiry_id,
  };
}

export async function sendCrmOfferEvent(input: OfferEventInput): Promise<void> {
  const eventSeed = [
    input.externalSubmissionId,
    input.externalOfferId,
    input.status,
    input.occurredAt,
  ].join(":");
  const eventId = `offer-${createHash("sha256").update(eventSeed).digest("hex").slice(0, 32)}`;

  await postToCrm("/api/v1/integrations/offer-events", eventId, {
    external_event_id: eventId,
    external_submission_id: input.externalSubmissionId,
    external_offer_id: input.externalOfferId,
    occurred_at: input.occurredAt,
    status: input.status,
    sent_at: input.sentAt ?? null,
  });
}
