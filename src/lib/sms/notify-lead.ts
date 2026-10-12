/**
 * SMS do klienta po wysłaniu oferty e-mail, przez SuperVoIP REST API
 * (https://restapi.supervoip.pl/ — `POST /api/sms_messages`).
 *
 * `sendTime` kolejkuje wiadomość po stronie SuperVoIP, więc funkcja
 * nie czeka tych kilku minut w procesie.
 */

const API_BASE = "https://restapi.supervoip.pl";

/** Mobile VoIP number on the SuperVoIP account the SMS is sent from. */
const SENDER_VOIP_NUMBER = "/api/voip_numbers/388044";

/** Losowe opóźnienie, żeby wiadomość nie wyglądała na wysłaną w tej samej sekundzie co formularz. */
const MIN_DELAY_MS = 5 * 60 * 1000;
const MAX_DELAY_MS = 7 * 60 * 1000;

interface Country {
  id: number;
  iso: string;
}

interface SmsMessageResponse {
  status?: string;
  queuedMessages?: { status?: string; errorDescription?: string; recipient?: string }[];
}

export interface OfferSmsInput {
  /** Numer z formularza, już znormalizowany (`+48…`). */
  phone: string;
  name: string;
  /** Nazwa modelu, np. Compact, Comfort, Premium. */
  modelName: string;
}

export interface ScheduledOfferSms extends SmsMessageResponse {
  sendTime: string;
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

/** MSISDN without "+", as expected by `recipients`. */
function toRecipient(phone: string): string {
  return phone.replace(/^\+/, "");
}

function firstName(fullName: string): string {
  const word = fullName.trim().split(/\s+/)[0]?.replace(/[^\p{L}\p{M}'-]/gu, "") ?? "";
  if (!word) return "";
  const lower = word.toLocaleLowerCase("pl-PL");
  const isUniformCase = word === lower || word === word.toLocaleUpperCase("pl-PL");
  const base = isUniformCase ? lower : word;
  return base.charAt(0).toLocaleUpperCase("pl-PL") + base.slice(1);
}

export function offerSmsText(name: string, modelName: string): string {
  const first = firstName(name);
  const greeting = first ? `Dzień dobry, ${first}!` : "Dzień dobry!";
  const model = modelName.trim() || "ogrodową";
  return [
    `${greeting} Oferta na saunę ${model} z linii Regenerum wysłaliśmy na podany adres e-mail. Zachęcamy do zapoznania się z załącznikiem. Wkrótce skontaktujemy się z Tobą w celu odpowiedzi na pytania.`,
    "Pozdrawiamy!",
    "Zespół RoyalSauna",
  ].join("\n");
}

/** ISO-8601 UTC bez milisekund, w oknie 5–7 minut od teraz. */
export function randomOfferSendTime(now = Date.now()): string {
  const minSec = MIN_DELAY_MS / 1000;
  const maxSec = MAX_DELAY_MS / 1000;
  const delaySec = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));
  const sendAt = Math.ceil(now / 1000) * 1000 + delaySec * 1000;
  return new Date(sendAt).toISOString().replace(/\.\d{3}Z$/, "Z");
}

export async function scheduleOfferSms(
  input: OfferSmsInput,
): Promise<ScheduledOfferSms | null> {
  const token = process.env.SUPERVOIP_API_TOKEN?.trim();
  if (!token) return null;

  const recipient = toRecipient(input.phone);
  if (!/^\d{8,15}$/.test(recipient)) {
    throw new Error("SuperVoIP SMS skipped: invalid recipient");
  }

  const country = await resolvePolandIri(token);
  const sendTime = randomOfferSendTime();
  const res = await fetch(`${API_BASE}/api/sms_messages`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: "voipNumber",
      voipNumber: SENDER_VOIP_NUMBER,
      recipients: [recipient],
      text: offerSmsText(input.name, input.modelName),
      sendTime,
      country,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`SuperVoIP SMS failed: ${res.status} ${body}`);
  }
  const data = (await res.json()) as SmsMessageResponse;
  return { ...data, sendTime };
}
