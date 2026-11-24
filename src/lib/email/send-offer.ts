import { Resend } from "resend";
import type { OfferData } from "@/lib/offer";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

interface SendWelcomeEmailOptions {
  to: string;
  data: OfferData;
}

function getVslUrl(data: OfferData): string {
  const configured = process.env.WELCOME_VSL_URL?.trim();
  if (configured) return configured;
  return data.locale === "en" ? `${data.brand.url}/en/film` : `${data.brand.url}/film`;
}

/**
 * Sends a welcome email with the VSL link to the lead (without an offer PDF),
 * then a separate internal notification to `OFFER_NOTIFY_TO` (e.g.
 * biuro@royalsauna.pl) with the lead's contact details and chosen model.
 * The office mail is intentional — not a BCC of the customer template — so
 * it's easy to scan and reply-to the customer.
 */
export async function sendWelcomeEmail({ to, data }: SendWelcomeEmailOptions) {
  const from = process.env.OFFER_EMAIL_FROM || "RoyalSauna <onboarding@resend.dev>";
  const notifyTo = process.env.OFFER_NOTIFY_TO?.trim();

  const subject =
    data.locale === "en"
      ? "Thank you for your interest — RoyalSauna"
      : "Dziękujemy za zainteresowanie — RoyalSauna";

  const result = await getResend().emails.send({
    from,
    to: [to],
    subject,
    html: buildCustomerEmailHtml(data),
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.name} — ${result.error.message}`);
  }

  if (notifyTo) {
    const notify = await getResend().emails.send({
      from,
      to: [notifyTo],
      replyTo: data.client.email,
      subject: data.sourceLabel
        ? `Nowe zapytanie ofertowe — ${data.sourceLabel} — ${data.model.line} ${data.model.name} — ${data.client.name}`
        : `Nowe zapytanie ofertowe — ${data.model.line} ${data.model.name} — ${data.client.name}`,
      html: buildNotifyEmailHtml(data),
    });

    if (notify.error) {
      // Don't fail the customer send if the office copy fails — log upstream.
      // eslint-disable-next-line no-console
      console.error(
        `[lead] Resend notify error: ${notify.error.name} — ${notify.error.message}`,
      );
    }
  }

  return result;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCustomerEmailHtml(data: OfferData): string {
  const isPl = data.locale !== "en";
  const vslUrl = getVslUrl(data);
  const safeVslUrl = escapeHtml(vslUrl);

  const greeting = isPl ? "Dzień dobry," : "Hello,";
  const intro = isPl
    ? "dziękujemy za zainteresowanie ofertą Royal Sauna! Cieszymy się, że rozważasz stworzenie własnego miejsca do odpoczynku i regeneracji."
    : "thank you for your interest in Royal Sauna! We are glad you are considering creating your own space for rest and regeneration.";
  const vslLead = isPl
    ? "Przygotowaliśmy krótki film, w którym pokazujemy, dlaczego nasze modele są tak wyjątkowe. Obejrzysz go klikając w poniższy link."
    : "We have prepared a short video showing why our models are so special. You can watch it by clicking the link below.";
  const ctaLabel = isPl ? "Obejrzyj film" : "Watch the video";
  const offerNote = isPl
    ? "Zapoznaj się z filmikiem, a ofertę otrzymasz niebawem."
    : "Watch the video, and you will receive your offer shortly.";
  const signoff = isPl ? "Pozdrawiamy Cię ciepło!" : "Warm regards,";
  const team = isPl ? "Zespół RoyalSauna" : "The RoyalSauna Team";

  return `
<!DOCTYPE html>
<html lang="${data.locale}">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;background:#F1E9D9;color:#33281A;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1E9D9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;">
  <tr><td style="background:#33281A;padding:24px 32px;">
    <span style="font-size:20px;font-weight:bold;color:#FBF8F2;">${escapeHtml(data.brand.name)}</span>
  </td></tr>
  <tr><td style="padding:32px;">
    <p style="margin:0 0 8px;font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#5A4632;">${intro}</p>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#5A4632;">${vslLead}</p>
    <div style="margin:0 0 24px;text-align:center;">
      <a href="${safeVslUrl}" style="display:inline-block;background:#33281A;color:#FBF8F2;text-decoration:none;font-size:14px;font-weight:bold;padding:14px 28px;border-radius:8px;">${ctaLabel}</a>
      <p style="margin:12px 0 0;font-size:12px;line-height:1.5;word-break:break-all;">
        <a href="${safeVslUrl}" style="color:#5A4632;text-decoration:underline;">${safeVslUrl}</a>
      </p>
    </div>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#5A4632;">${offerNote}</p>
    <p style="margin:0 0 4px;font-size:14px;">${signoff}</p>
    <p style="margin:0;font-size:14px;font-weight:bold;">${team}</p>
    <p style="margin:8px 0 0;font-size:12px;color:#5A4632;">${escapeHtml(data.brand.phone)} | ${escapeHtml(data.brand.email)}</p>
  </td></tr>
  <tr><td style="background:#F1E9D9;padding:16px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#5A4632;">${escapeHtml(data.brand.address)}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`.trim();
}

function buildNotifyEmailHtml(data: OfferData): string {
  const rows: [string, string][] = [
    ...(data.sourceLabel ? ([["Źródło", data.sourceLabel]] as [string, string][]) : []),
    ["Imię i nazwisko", data.client.name],
    ["E-mail", data.client.email],
    ["Telefon", data.client.phone || "—"],
    ["Lokalizacja / ogród", data.client.location || "—"],
    ["Kod pocztowy", data.client.postalCode || "—"],
    ["Model", `${data.model.line} ${data.model.name}`],
    ["Cena od (brutto)", `${data.model.priceFormatted} ${data.model.currency}`],
    ["Język formularza", data.locale.toUpperCase()],
    ["Data", data.generatedAt],
  ];

  for (const pref of data.preferences) {
    rows.push([pref.label, pref.value]);
  }

  if (data.client.message) {
    rows.push(["Wiadomość", data.client.message]);
  }

  const tableRows = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #E7DBC6;font-size:13px;color:#5A4632;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E7DBC6;font-size:13px;color:#33281A;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;background:#F1E9D9;color:#33281A;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1E9D9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;">
  <tr><td style="background:#33281A;padding:24px 32px;">
    <span style="font-size:18px;font-weight:bold;color:#FBF8F2;">Nowe zapytanie ofertowe</span>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#5A4632;">
      Klient właśnie otrzymał powitalny e-mail z linkiem do filmu (bez oferty PDF). Poniżej dane z formularza — możesz przygotować ofertę lub od razu odpisać (Reply-To = e-mail klienta).
    </p>
    ${
      data.sourceLabel
        ? `<p style="margin:0 0 16px;padding:12px 16px;background:#F1E9D9;border-radius:8px;font-size:15px;line-height:1.5;color:#33281A;"><strong>Źródło:</strong> ${escapeHtml(data.sourceLabel)}</p>`
        : ""
    }
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E7DBC6;border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`.trim();
}
