import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import type { LeadPayload } from "@/types";
import { buildOfferData } from "@/lib/offer";
import { sendOfferEmail } from "@/lib/email/send-offer";

/**
 * Path to the pre-designed offer PDF that gets attached to every lead e-mail.
 * Override with OFFER_PDF_PATH (relative to the project root) if needed.
 */
const OFFER_PDF_PATH =
  process.env.OFFER_PDF_PATH || "public/documents/oferta.pdf";

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
        const pdfBuffer = await readFile(
          path.join(process.cwd(), OFFER_PDF_PATH),
        );

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
