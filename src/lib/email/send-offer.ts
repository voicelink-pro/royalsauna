import { Resend } from "resend";
import type { OfferData } from "@/lib/offer";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

interface SendOfferEmailOptions {
  to: string;
  pdfBuffer: Buffer;
  data: OfferData;
}

/**
 * Sends the offer PDF to the lead, then a separate internal notification to
 * `OFFER_NOTIFY_TO` (e.g. biuro@royalsauna.pl) with the lead's contact details
 * and chosen model. The office mail is intentional — not a BCC of the customer
 * template — so it's easy to scan and reply-to the customer.
 */
export async function sendOfferEmail({
  to,
  pdfBuffer,
  data,
}: SendOfferEmailOptions) {
  const from = process.env.OFFER_EMAIL_FROM || "RoyalSauna <onboarding@resend.dev>";
  const notifyTo = process.env.OFFER_NOTIFY_TO?.trim();

  const subject =
    data.locale === "en"
      ? `Your RoyalSauna offer — ${data.model.line} ${data.model.name}`
      : `Twoja oferta RoyalSauna — ${data.model.line} ${data.model.name}`;

  const fileName =
    data.locale === "en" ? "RoyalSauna-Offer.pdf" : "RoyalSauna-Oferta.pdf";

  const result = await getResend().emails.send({
    from,
    to: [to],
    subject,
    html: buildCustomerEmailHtml(data),
    attachments: [
      {
        filename: fileName,
        content: pdfBuffer,
      },
    ],
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
      throw new Error(
        `Resend notify error: ${notify.error.name} — ${notify.error.message}`,
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
  const L = data.labels;
  const isPl = data.locale === "pl";
  const isCentrumOstaszewo = data.sourceLabel === "Centrum Ostaszewo";
  const greeting = isPl
    ? `Cześć ${escapeHtml(data.client.name.split(" ")[0])},`
    : `Hello ${escapeHtml(data.client.name.split(" ")[0])},`;
  const intro = isPl
    ? "Dziękujemy za zainteresowanie saunami RoyalSauna. W załączniku przesyłamy wstępną ofertę dopasowaną do Twoich preferencji."
    : "Thank you for your interest in RoyalSauna saunas. Attached is a preliminary offer tailored to your preferences.";
  const summary =
    isPl && isCentrumOstaszewo
      ? `<strong>${L.recommendedModel}:</strong> ${escapeHtml(data.model.line)} ${escapeHtml(data.model.name)}<br/><strong>Cena brutto:</strong> 46 200 zł`
      : isPl
        ? `<strong>Model:</strong> ${escapeHtml(data.model.line)} ${escapeHtml(data.model.name)}<br/><strong>Cena od:</strong> ${escapeHtml(data.model.priceFormatted)} ${escapeHtml(data.model.currency)}`
        : `<strong>${L.recommendedModel}:</strong> ${escapeHtml(data.model.line)} ${escapeHtml(data.model.name)}<br/><strong>${L.priceFrom}:</strong> ${escapeHtml(data.model.priceFormatted)} ${escapeHtml(data.model.currency)}`;
  const heaterNote =
    isPl && isCentrumOstaszewo
      ? "W załączonej ofercie znajdziesz pełną listę dostępnych pieców wraz z cenami dla Sauny Regenerum Premium."
      : isPl
        ? "W załączonej ofercie znajdziesz pełną listę dostępnych pieców wraz z cenami dla tego modelu."
        : "The attached offer includes the full heater line-up and pricing for this model.";
  const closing = isPl
    ? "Skontaktujemy się z Tobą wkrótce, aby omówić szczegóły. W razie pytań - odpisz na ten e-mail lub zadzwoń."
    : "We will reach out soon to discuss the details. If you have any questions, reply to this e-mail or give us a call.";
  const signoff = isPl ? "Pozdrawiamy," : "Best regards,";

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
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#5A4632;">${intro}</p>
    <div style="background:#F1E9D9;border-radius:8px;padding:16px 20px;margin:0 0 20px;">
      <p style="margin:0;font-size:13px;line-height:1.7;">${summary}</p>
    </div>
    <p style="margin:0 0 20px;font-size:13px;line-height:1.6;color:#5A4632;">${heaterNote}</p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#5A4632;">${closing}</p>
    <p style="margin:0 0 4px;font-size:14px;">${signoff}</p>
    <p style="margin:0;font-size:14px;font-weight:bold;">${escapeHtml(data.brand.name)}</p>
    <p style="margin:4px 0 0;font-size:12px;color:#5A4632;">${escapeHtml(data.brand.phone)} | ${escapeHtml(data.brand.email)}</p>
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
    ["Model", `${data.model.line} ${data.model.name}`],
    ["Cena od", `${data.model.priceFormatted} ${data.model.currency}`],
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
      Klient właśnie otrzymał ofertę PDF. Poniżej dane z formularza — możesz od razu odpisać (Reply-To = e-mail klienta).
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
