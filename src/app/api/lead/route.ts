import { NextResponse } from "next/server";
import type { LeadPayload } from "@/types";
import { buildOfferData } from "@/lib/offer";
import { sendOfferEmail } from "@/lib/email/send-offer";

/**
 * Path to the pre-designed offer PDF that gets attached to every lead e-mail,
 * relative to `public/`. Override with OFFER_PDF_PATH if needed.
 */
const OFFER_PDF_PATH =
  process.env.OFFER_PDF_PATH || "public/documents/oferta.pdf";

/**
 * Fetches the offer PDF over HTTP from the site's own `public/` folder
 * instead of reading it from disk. Serverless functions on Vercel don't
 * bundle the full `public/` directory into their filesystem, but it's
 * always reachable via the CDN — so this works identically in local dev
 * and in every deployment (preview, production, custom domain) without
 * any extra build configuration.
 */
async function fetchOfferPdf(request: Request): Promise<Buffer> {
  const publicPath = OFFER_PDF_PATH.replace(/^\.?\/?public\//, "");
  const { protocol, host } = new URL(request.url);
  const pdfUrl = `${protocol}//${host}/${publicPath}`;

  const res = await fetch(pdfUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch offer PDF from ${pdfUrl}: ${res.status}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Partial<LeadPayload>;

    if (!data?.name || !data?.email || !data?.consent) {
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
    });

    // Attach the pre-designed offer PDF and send via Resend.
    if (process.env.RESEND_API_KEY) {
      try {
        const offerData = buildOfferData(payload);
        const pdfBuffer = await fetchOfferPdf(request);

        const result = await sendOfferEmail({
          to: payload.email,
          pdfBuffer,
          data: offerData,
        });

        // eslint-disable-next-line no-console
        console.info("[lead] offer email sent", {
          to: payload.email,
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
