import { NextResponse } from "next/server";
import type { LeadPayload, ModelId } from "@/types";
import { buildOfferData } from "@/lib/offer";
import { sendOfferEmail } from "@/lib/email/send-offer";

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

    if (!data?.name || !data?.email || !data?.phone?.trim() || !data?.consent) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const payload = data as LeadPayload;

    // eslint-disable-next-line no-console
    console.info("[lead] received", {
      name: payload.name,
      email: payload.email,
      preferredModel: payload.preferredModel,
      location: payload.location,
      locale: payload.locale,
      sourceLabel: payload.sourceLabel,
    });

    // Attach the pre-designed offer PDF and send via Resend.
    if (process.env.RESEND_API_KEY) {
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
      } catch (emailErr) {
        // Log but don't fail the lead submission if email sending fails.
        // eslint-disable-next-line no-console
        console.error("[lead] email send failed", emailErr);
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
