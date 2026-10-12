import { NextResponse } from "next/server";
import type { LeadPayload, ModelId } from "@/types";
import { buildOfferData } from "@/lib/offer";
import { sendOfferEmail } from "@/lib/email/send-offer";
import { normalizePhone, normalizePostalCode } from "@/lib/utils";
import { scheduleOfferSms } from "@/lib/sms/notify-lead";
import { createCrmLead, sendCrmOfferEvent } from "@/lib/crm/leads";

/**
 * Default path (relative to `public/`) of the model-specific offer PDF.
 * Override per model with `OFFER_PDF_PATH_COMPACT` / `_COMFORT` / `_PREMIUM`.
 */
const DEFAULT_OFFER_PDF_PATHS: Record<ModelId, string> = {
  compact: "public/documents/oferta-compact.pdf",
  comfort: "public/documents/oferta-comfort.pdf",
  premium: "public/documents/oferta-premium.pdf",
};

/** Legacy single-file fallback, used if a model-specific PDF isn't uploaded yet. */
const FALLBACK_OFFER_PDF_PATH =
  process.env.OFFER_PDF_PATH || "public/documents/oferta.pdf";

function getOfferPdfPath(modelId: ModelId): string {
  const envVar = `OFFER_PDF_PATH_${modelId.toUpperCase()}`;
  return process.env[envVar] || DEFAULT_OFFER_PDF_PATHS[modelId];
}

/**
 * Fetches a PDF over HTTP from the site's own `public/` folder instead of
 * reading it from disk. Serverless functions on Vercel don't bundle the full
 * `public/` directory into their filesystem, but it's always reachable via
 * the CDN — so this works identically in local dev and in every deployment
 * (preview, production, custom domain) without any extra build configuration.
 */
async function fetchPdfFromPublic(request: Request, relativePath: string): Promise<Buffer> {
  const publicPath = relativePath.replace(/^\.?\/?public\//, "");
  const { protocol, host } = new URL(request.url);
  const pdfUrl = `${protocol}//${host}/${publicPath}`;

  const res = await fetch(pdfUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch offer PDF from ${pdfUrl}: ${res.status}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

/** Fetches the offer PDF matching the recommended model, falling back to the legacy single file. */
async function fetchOfferPdf(request: Request, modelId: ModelId): Promise<Buffer> {
  try {
    return await fetchPdfFromPublic(request, getOfferPdfPath(modelId));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      `[lead] offer PDF for model "${modelId}" not found, falling back to ${FALLBACK_OFFER_PDF_PATH}`,
      err,
    );
    return fetchPdfFromPublic(request, FALLBACK_OFFER_PDF_PATH);
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Partial<LeadPayload>;

    const postalCode =
      typeof data?.postalCode === "string" ? normalizePostalCode(data.postalCode) : null;
    const phone = typeof data?.phone === "string" ? normalizePhone(data.phone) : null;

    if (!data?.name || !data?.email || !phone || !postalCode || !data?.consent) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const payload = { ...data, postalCode, phone } as LeadPayload;

    // eslint-disable-next-line no-console
    console.info("[lead] received", {
      name: payload.name,
      email: payload.email,
      preferredModel: payload.preferredModel,
      location: payload.location,
      postalCode: payload.postalCode,
      locale: payload.locale,
      sourceLabel: payload.sourceLabel,
    });

    // CRM and e-mail run independently; a failure in one must never
    // block the other or the customer's form submission. The follow-up SMS
    // is queued only after the offer e-mail actually goes out.
    const crm = createCrmLead(payload)
      .then((crmLead) => {
        // eslint-disable-next-line no-console
        console.info("[lead] saved in CRM", {
          externalSubmissionId: crmLead.externalSubmissionId,
          inquiryId: crmLead.inquiryId,
        });
        return crmLead;
      })
      .catch((crmErr) => {
        // eslint-disable-next-line no-console
        console.error("[lead] CRM save failed", crmErr);
        return null;
      });

    // Attach the pre-designed offer PDF and send via Resend.
    const email = (async (): Promise<
      { status: "sent"; id?: string; sentAt: string } | { status: "failed" } | null
    > => {
      if (!process.env.RESEND_API_KEY) return null;
      try {
        const offerData = buildOfferData(payload);
        const pdfBuffer = await fetchOfferPdf(request, offerData.model.id);
        const result = await sendOfferEmail({
          to: payload.email,
          pdfBuffer,
          data: offerData,
        });
        // eslint-disable-next-line no-console
        console.info("[lead] offer email sent", {
          to: payload.email,
          model: offerData.model.id,
          id: result?.data?.id,
        });
        return { status: "sent", id: result?.data?.id, sentAt: new Date().toISOString() };
      } catch (emailErr) {
        // eslint-disable-next-line no-console
        console.error("[lead] email send failed", emailErr);
        return { status: "failed" };
      }
    })();

    const [crmLead, emailResult] = await Promise.all([crm, email]);

    if (emailResult?.status === "sent") {
      try {
        const modelName = buildOfferData(payload).model.name;
        const sms = await scheduleOfferSms({
          phone,
          name: payload.name,
          modelName,
        });
        if (sms) {
          const failed = sms.queuedMessages?.filter((m) => m.errorDescription) ?? [];
          // eslint-disable-next-line no-console
          console.info("[lead] offer sms scheduled", {
            status: sms.status,
            sendTime: sms.sendTime,
            model: modelName,
            failed,
          });
        }
      } catch (smsErr) {
        // eslint-disable-next-line no-console
        console.error("[lead] offer sms failed", smsErr);
      }
    }

    if (crmLead && emailResult) {
      try {
        await sendCrmOfferEvent(
          emailResult.status === "sent"
            ? {
                externalSubmissionId: crmLead.externalSubmissionId,
                externalOfferId:
                  emailResult.id || `web-offer-${crmLead.externalSubmissionId}`,
                status: "sent",
                occurredAt: emailResult.sentAt,
                sentAt: emailResult.sentAt,
              }
            : {
                externalSubmissionId: crmLead.externalSubmissionId,
                externalOfferId: `web-offer-${crmLead.externalSubmissionId}`,
                status: "failed",
                occurredAt: new Date().toISOString(),
              },
        );
      } catch (eventErr) {
        // eslint-disable-next-line no-console
        console.error("[lead] CRM offer event failed", eventErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
