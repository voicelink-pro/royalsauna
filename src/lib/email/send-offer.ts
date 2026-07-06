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
 * Sends the offer PDF to the lead's e-mail address.
 * Also sends a BCC/notification copy to the internal team (if configured).
 */
export async function sendOfferEmail({
  to,
  pdfBuffer,
  data,
}: SendOfferEmailOptions) {
  const from = process.env.OFFER_EMAIL_FROM || "RoyalSauna <onboarding@resend.dev>";
  const notifyTo = process.env.OFFER_NOTIFY_TO;

  const subject =
    data.locale === "en"
      ? `Your RoyalSauna offer — ${data.model.line} ${data.model.name}`
      : `Twoja oferta RoyalSauna — ${data.model.line} ${data.model.name}`;

  const fileName =
    data.locale === "en" ? "RoyalSauna-Offer.pdf" : "RoyalSauna-Oferta.pdf";

  const htmlBody = buildEmailHtml(data);

  const result = await getResend().emails.send({
    from,
    to: [to],
    ...(notifyTo ? { bcc: [notifyTo] } : {}),
    subject,
    html: htmlBody,
    attachments: [
      {
        filename: fileName,
        content: pdfBuffer,
      },
    ],
  });

  // The Resend SDK doesn't throw on API-level failures (e.g. an unverified
  // sending domain) — it returns `{ data: null, error }` instead. Surface
  // that as a real error so the caller logs and can alert on it.
  if (result.error) {
    throw new Error(`Resend error: ${result.error.name} — ${result.error.message}`);
  }

  return result;
}

function buildEmailHtml(data: OfferData): string {
  const L = data.labels;
  const isPl = data.locale === "pl";
  const greeting = isPl
    ? `Cześć ${data.client.name.split(" ")[0]},`
    : `Hello ${data.client.name.split(" ")[0]},`;
  const intro = isPl
    ? "Dziękujemy za zainteresowanie saunami RoyalSauna. W załączniku przesyłamy wstępną ofertę dopasowaną do Twoich preferencji."
    : "Thank you for your interest in RoyalSauna saunas. Attached is a preliminary offer tailored to your preferences.";
  const summary = isPl
    ? `<strong>${L.recommendedModel}:</strong> ${data.model.line} ${data.model.name}<br/><strong>${L.priceFrom}:</strong> ${data.model.priceFormatted} ${data.model.currency}`
    : `<strong>${L.recommendedModel}:</strong> ${data.model.line} ${data.model.name}<br/><strong>${L.priceFrom}:</strong> ${data.model.priceFormatted} ${data.model.currency}`;
  const heaterNote = isPl
    ? "W załączonej ofercie znajdziesz pełną listę dostępnych pieców wraz z cenami dla tego modelu."
    : "The attached offer includes the full heater line-up and pricing for this model.";
  const closing = isPl
    ? "Skontaktujemy się wkrótce, aby omówić szczegóły. W razie pytań — odpisz na ten e-mail lub zadzwoń."
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
    <span style="font-size:20px;font-weight:bold;color:#FBF8F2;">${data.brand.name}</span>
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
    <p style="margin:0;font-size:14px;font-weight:bold;">${data.brand.name}</p>
    <p style="margin:4px 0 0;font-size:12px;color:#5A4632;">${data.brand.phone} | ${data.brand.email}</p>
  </td></tr>
  <tr><td style="background:#F1E9D9;padding:16px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#5A4632;">${data.brand.address}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`.trim();
}
