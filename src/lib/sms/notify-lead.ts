/**
 * SMS alert to the sales team after every lead, via SuperVoIP REST API
 * (https://restapi.supervoip.pl/ — `POST /api/sms_messages`).
 */

const API_BASE = "https://restapi.supervoip.pl";

/** Mobile VoIP number on the SuperVoIP account the SMS is sent from. */
const SENDER_VOIP_NUMBER = "/api/voip_numbers/388044";

/** MSISDN without "+", as expected by `recipients`. */
const RECIPIENTS = ["48603076043", "48600359180", "48609368977"];

const TEXT = "Nowy lead RoyalSauna - sprawdz maila";

interface Country {
  id: number;
  iso: string;
}

interface SmsMessageResponse {
  status?: string;
  queuedMessages?: { status?: string; errorDescription?: string; recipient?: string }[];
}

let polandIri: string | null = process.env.SUPERVOIP_COUNTRY_IRI?.trim() || null;

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
}

/** `country` is a required IRI; the docs don't list ids, so look Poland up once. */
async function resolvePolandIri(token: string): Promise<string> {
  if (polandIri) return polandIri;
  const res = await fetch(`${API_BASE}/api/countries?sms=true`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`SuperVoIP countries lookup failed: ${res.status}`);
  const countries = (await res.json()) as Country[];
  const poland = countries.find((c) => c.iso?.toUpperCase() === "PL");
  if (!poland) throw new Error("SuperVoIP countries lookup: PL not found");
  polandIri = `/api/countries/${poland.id}`;
  return polandIri;
}

export async function sendLeadSms(): Promise<SmsMessageResponse | null> {
  const token = process.env.SUPERVOIP_API_TOKEN?.trim();
  if (!token) return null;

  const country = await resolvePolandIri(token);
  const res = await fetch(`${API_BASE}/api/sms_messages`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: "voipNumber",
      voipNumber: SENDER_VOIP_NUMBER,
      recipients: RECIPIENTS,
      text: TEXT,
      country,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`SuperVoIP SMS failed: ${res.status} ${body}`);
  }
  return (await res.json()) as SmsMessageResponse;
}
